// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./ColabCubeCreditToken.sol";
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";
import "./MultiSigTreasury.sol";

/**
 * @title ColabCube
 * @dev ColabCube contract for managing user token assignments, subscriptions, and token burning.
 * Uses AccessControl for permission management.
 */
contract ColabCube is AccessControl {
    //////////////////////////
    /////// Variables ////////
    //////////////////////////

    ///Pyth network
    IPyth pyth;
    int32 constant ETH_IN_WEI_EXPO = 18;

    /// @notice Role identifier for managers who can perform certain administrative actions
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    /// @notice Role identifier for managers who can perform certain administrative actions
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    /// @notice Reference to the ColabCubeCreditToken contract
    ColabCubeCreditToken public token;

    /// @notice Reference to the Treasury contract
    address public treasury;

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

    /// @notice Stores matching tokens against usd price
    mapping(uint256 tokenAmount => uint256 usdPrice) public tokenUsdPrices;

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

    /// @dev Event emitted when a user buys a token
    /// @param amountUsd The usd price for the token
    /// @param amount The amount of tokens assigned
    event TokenPurchased(uint256 amountUsd, uint256 amount);

    /// @dev Event emitted when usd price for a token amount is set
    /// @param usdPrice The usd price for the token
    /// @param tokenAmount The amount of tokens to assign
    event TokenUsdPriceUpdated(uint256 tokenAmount, uint256 usdPrice);

    /**
     * @dev Constructor for the ColabCube contract.
     * @param pythContract The address of the Pyth contract
     * @param _token Address of the ColabCubeCreditToken contract.
     * @param _treasury Address of the Treasury contract.
     * @param manager Address with the MANAGER_ROLE, allowed to manage administrative tasks.
     */
    constructor(
        address pythContract,
        ColabCubeCreditToken _token,
        address _treasury,
        address manager
    ) {
        token = _token;
        treasury = _treasury;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MANAGER_ROLE, manager);
        // The IPyth interface from pyth-sdk-solidity provides the methods to interact with the Pyth contract.
        // Instantiate it with the Pyth contract address from https://docs.pyth.network/price-feeds/contract-addresses/evm
        pyth = IPyth(pythContract);
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
     * @notice Sets usd price for token amounts
     * @param price The price for the token
     * @param amount The amount of tokens associated with the price
     */
    function setTokenUsdPrice(
        uint256 price,
        uint256 amount
    ) external onlyRole(ADMIN_ROLE) {
        tokenUsdPrices[amount] = price;
        emit TokenUsdPriceUpdated(amount, price);
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
     * @param priceUpdate The encoded data to update the contract with the latest price
     * @param amount The amount of tokens the user wishes to purchase.
     */
    function buyTokens(
        uint256 amount,
        bytes[] memory priceUpdate
    ) external payable {
        uint256 amountUsd = tokenUsdPrices[amount];
        require(amountUsd > 0, "Invalid token amount");

        // Submit a priceUpdate to the Pyth contract to update the on-chain price.
        // Updating the price requires paying the fee returned by getUpdateFee.
        // WARNING: These lines are required to ensure the getPriceNoOlderThan call below succeeds. If you remove them, transactions may fail with "0x19abf40e" error.
        uint fee = pyth.getUpdateFee(priceUpdate);
        pyth.updatePriceFeeds{value: fee}(priceUpdate);

        // Read the current price from a price feed if it is less than 60 seconds old.
        // Each price feed (e.g., ETH/USD) is identified by a price feed ID.
        // The complete list  of feed IDs is available at https://pyth.network/developers/price-feed-ids
        bytes32 priceFeedId = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace; // ETH/USD price feed Id.
        PythStructs.Price memory currentEthPrice = pyth.getPriceNoOlderThan(
            priceFeedId,
            60
        );

        require(currentEthPrice.price >= 0, "Price must be a positive value");

        uint256 amountInWei;

        if (currentEthPrice.expo + ETH_IN_WEI_EXPO >= 0) {
            amountInWei =
                amountUsd *
                uint(uint64(currentEthPrice.price)) *
                10 ** uint32(ETH_IN_WEI_EXPO + currentEthPrice.expo);
        } else {
            amountInWei =
                (amountUsd * uint(uint64(currentEthPrice.price))) /
                10 ** uint32(-(ETH_IN_WEI_EXPO + currentEthPrice.expo));
        }

        require(msg.value - fee >= amountInWei, "Insufficient token provided");

        //transfer to treasury
        payable(treasury).transfer(amountInWei);

        //refund balance to user
        payable(msg.sender).transfer(msg.value - amountInWei - fee);

        //mint token for user
        token.mint(msg.sender, amount);

        emit TokenPurchased(amountUsd, amount);
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
