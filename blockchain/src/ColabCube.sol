// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ColabCubeCreditToken.sol";

/**
 * @title ColabCube
 * @dev ColabCube contract for managing user token assignments, subscriptions, and token burning.
 * Uses AccessControl for permission management.
 */
contract ColabCube is AccessControl {
    //////////////////////////
    /////// Variables ////////
    //////////////////////////

    /// @notice Role identifier for managers who can perform certain administrative actions
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    /// @notice Role identifier for managers who can perform certain administrative actions
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    /// @notice Reference to the ColabCubeCreditToken contract
    ColabCubeCreditToken public token;

    /// @notice The fixed token amount assigned monthly to each user (1000 tokens with 18 decimals)
    uint256 public constant MONTHLY_TOKENS = 1000e18;

    //////////////////////////
    /////// Errors ///////////
    //////////////////////////

    /// @dev Error thrown when a user does not have sufficient tokens for an action
    /// @param user The address of the user
    /// @param amount The amount of tokens required for the action
    error COLABCUBE_INSUFFICIENT_USER_BALANCE(address user, uint256 amount);

    //////////////////////////
    /////// Mappings /////////
    //////////////////////////

    /// @notice Stores the last time a user claimed their monthly tokens
    mapping(address => uint256) public lastClaimed;

    /// @notice Stores the subscription expiry dates for users
    mapping(address => uint256) public subscriptionExpiry;

    /// @notice Stores the price of connection tasks based on user levels
    mapping(uint256 level => uint256 price) public taskPrice;

    /// @notice Stores matching tokens against level
    mapping(uint256 level => uint256 amount) public tokensByLevel;

    //////////////////////////
    /////// Events ///////////
    //////////////////////////

    /// @dev Event emitted when tokens are assigned to a user
    /// @param user The address of the user who received tokens
    /// @param amount The amount of tokens assigned
    event TokensAssigned(address indexed user, uint256 amount);

    /// @dev Event emitted when tokens are burned from a user
    /// @param user The address of the user whose tokens were burned
    /// @param amount The amount of tokens burned
    event TokensBurned(address indexed user, uint256 amount);

    /// @dev Event emitted when a user's subscription is updated
    /// @param user The address of the user whose subscription was updated
    /// @param expirationDate The new expiration date for the subscription
    event SubscriptionUpdated(address indexed user, uint256 expirationDate);

    /// @dev Event emitted when a token amount is assigned to a level
    /// @param level The level for the token
    /// @param amount The amount of tokens assigned
    event LevelTokenUpdated(uint256 level, uint256 amount);

    /**
     * @dev Constructor for the ColabCube contract.
     * @param _token Address of the ColabCubeCreditToken contract.
     * @param manager Address with the MANAGER_ROLE, allowed to manage administrative tasks.
     */
    constructor(ColabCubeCreditToken _token, address manager) {
        token = _token;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MANAGER_ROLE, manager);
    }

    /**
     * @notice Sets token amount for each level
     * @param level The users level
     * @param amount The amount of tokens associated with the level
     */
    function setTokenForLevels(
        uint256 level,
        uint256 amount
    ) external onlyRole(ADMIN_ROLE) {
        tokensByLevel[level] = amount;
        emit LevelTokenUpdated(level, amount);
    }

    /**
     * @notice Assign 1000 tokens to a user monthly.
     * @dev Mints MONTHLY_TOKENS to the specified user if they haven't claimed within the last 30 days.
     * @param user The address of the user receiving the tokens.
     */
    function assignMonthlyTokens(address user) external onlyRole(MANAGER_ROLE) {
        require(
            block.timestamp >= lastClaimed[user] + 30 days,
            "Monthly tokens already claimed"
        );

        token.mint(user, MONTHLY_TOKENS);
        lastClaimed[user] = block.timestamp;

        emit TokensAssigned(user, MONTHLY_TOKENS);
    }

    /**
     * @notice Assign 1000 tokens to a user monthly.
     * @dev Mints MONTHLY_TOKENS to the specified user if they haven't claimed within the last 30 days.
     * @param user The address of the user receiving the tokens.
     * @param level The level of the user receiving the tokens.
     */
    function assignMonthlyTokensByLevel(
        address user,
        uint256 level
    ) external onlyRole(MANAGER_ROLE) {
        require(
            block.timestamp >= lastClaimed[user] + 30 days,
            "Monthly tokens already claimed"
        );

        token.mint(user, tokensByLevel[level]);
        lastClaimed[user] = block.timestamp;

        emit TokensAssigned(user, MONTHLY_TOKENS);
    }

    /**
     * @notice Burn tokens from a user for premium features or tasks.
     * @dev Burns the specified amount of tokens from the user's balance.
     * Reverts with COLABCUBE_INSUFFICIENT_USER_BALANCE if the user has insufficient balance.
     * @param user The address of the user whose tokens will be burned.
     * @param amount The amount of tokens to burn.
     */
    function burnTokensForTask(
        address user,
        uint256 amount
    ) public onlyRole(MANAGER_ROLE) {
        if (token.balanceOf(user) < amount) {
            revert COLABCUBE_INSUFFICIENT_USER_BALANCE(user, amount);
        }

        token.burnFrom(user, amount);
        emit TokensBurned(user, amount);
    }

    /**
     * @notice Manage connection tasks by burning tokens based on user level.
     * @param user The address of the user performing the connection task.
     * @param level The user's level, which determines the token cost.
     */
    function connection(
        address user,
        uint256 level
    ) external onlyRole(MANAGER_ROLE) {
        burnTokensForTask(user, taskPrice[level]);
    }

    /**
     * @notice Subscribe a user to either a monthly or yearly plan.
     * @dev Burns tokens from the user for the subscription fee.
     * @param user The address of the user subscribing.
     * @param isYearly If true, subscribes the user for a year. Otherwise, subscribes them for a month.
     */
    function subscribe(
        address user,
        bool isYearly
    ) external onlyRole(MANAGER_ROLE) {
        uint256 cost = isYearly ? 20000e18 : 1200e18;
        uint256 expiryTime = isYearly ? 365 days : 30 days;

        // Burn subscription cost
        burnTokensForTask(user, cost);
        subscriptionExpiry[user] = block.timestamp + expiryTime;

        emit SubscriptionUpdated(user, subscriptionExpiry[user]);
    }

    /**
     * @notice Get the subscription expiry date for a user.
     * @param user The address of the user.
     * @return The timestamp of when the subscription expires.
     */
    function getSubscriptionExpiry(
        address user
    ) external view returns (uint256) {
        return subscriptionExpiry[user];
    }

    /**
     * @notice Allow users to buy additional tokens by sending ETH.
     * @dev Mints tokens based on the amount of ETH sent, ensuring enough ETH is provided.
     * @param amount The amount of tokens the user wishes to purchase.
     */
    function buyTokens(uint256 amount) external payable {
        require(msg.value >= getEthEquivalent(amount), "Insufficient funds");
        token.transfer(msg.sender, amount);
    }

    /**
     * @notice Calculate the equivalent ETH value for a given token amount.
     * @dev Currently a placeholder function. This should integrate with a price feed or other mechanism.
     * @param tokenAmount The amount of tokens to convert to ETH.
     * @return The equivalent amount of ETH required for the specified tokens.
     */
    function getEthEquivalent(
        uint256 tokenAmount
    ) public view returns (uint256) {
        return (tokenAmount * 1 ether) / 1000; // Example calculation, should integrate a price feed
    }

    /**
     * @notice Allow for checking amount of tokens for a level.
     * @param level The level in focus.
     * @return The the amount of tokens for the specified level.
     */
    function getTokenAmountForLevel(
        uint256 level
    ) public view returns (uint256) {
        return tokensByLevel[level];
    }
}
