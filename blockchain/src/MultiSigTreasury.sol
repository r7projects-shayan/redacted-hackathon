// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MultiSigTreasury {
    // Events
    event Deposit(address indexed sender, uint256 amount);
    event TransactionCreated(
        uint256 indexed txId,
        address indexed to,
        uint256 value,
        bytes data
    );
    event TransactionApproved(address indexed owner, uint256 indexed txId);
    event TransactionExecuted(uint256 indexed txId);
    event OwnerAdded(address indexed owner);
    event OwnerRemoved(address indexed owner);
    event RequirementChanged(uint256 required);

    // State Variables
    mapping(address => bool) public isOwner;
    uint8 public required; // Reduced size for more gas efficiency

    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint8 approvals; // Reduced size for more gas efficiency
    }

    // List of all  transactions
    Transaction[] public transactions;
    mapping(uint256 => mapping(address => bool)) public approved;

    // List of owners and an owner count
    address[] private ownersArray;
    uint256 private ownerCount;

    // Modifiers
    modifier onlyOwner() {
        require(isOwner[msg.sender], "Not an owner");
        _;
    }

    modifier txExists(uint256 _txId) {
        require(_txId < transactions.length, "Transaction does not exist");
        _;
    }

    modifier notApproved(uint256 _txId) {
        require(!approved[_txId][msg.sender], "Transaction already approved");
        _;
    }

    modifier notExecuted(uint256 _txId) {
        require(!transactions[_txId].executed, "Transaction already executed");
        _;
    }

    // Constructor: Initialize owners and required confirmations
    constructor(address[] memory _owners, uint8 _required) {
        require(_owners.length > 0, "Owners required");
        require(
            _required > 0 && _required <= _owners.length,
            "Invalid required number of confirmations"
        );

        for (uint8 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "Invalid owner");
            require(!isOwner[owner], "Owner not unique");

            isOwner[owner] = true;
            ownersArray.push(owner);
        }

        ownerCount = _owners.length;
        required = _required;
    }

    // Fallback function to receive ether
    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // Create a new transaction
    function createTransaction(
        address _to,
        uint256 _value,
        bytes memory _data
    ) external onlyOwner {
        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                approvals: 0
            })
        );
        emit TransactionCreated(transactions.length - 1, _to, _value, _data);
    }

    // Approve a transaction
    function approveTransaction(
        uint256 _txId
    ) external onlyOwner txExists(_txId) notApproved(_txId) notExecuted(_txId) {
        approved[_txId][msg.sender] = true;
        transactions[_txId].approvals += 1;
        emit TransactionApproved(msg.sender, _txId);

        // Execute transaction if enough approvals
        if (transactions[_txId].approvals >= required) {
            _executeTransaction(_txId);
        }
    }

    // Execute a transaction
    function _executeTransaction(uint256 _txId) internal {
        Transaction storage transaction = transactions[_txId];

        require(transaction.approvals >= required, "Insufficient approvals");

        transaction.executed = true;

        // Perform the transaction
        (bool success, ) = transaction.to.call{value: transaction.value}(
            transaction.data
        );
        require(success, "Transaction failed");

        emit TransactionExecuted(_txId);
    }

    // External function for manual execution if needed
    function executeTransaction(
        uint256 _txId
    ) external onlyOwner txExists(_txId) notExecuted(_txId) {
        require(
            transactions[_txId].approvals >= required,
            "Insufficient approvals"
        );
        _executeTransaction(_txId);
    }

    // Add a new owner
    function addOwner(address _owner) external onlyOwner {
        require(_owner != address(0), "Invalid owner");
        require(!isOwner[_owner], "Owner already exists");

        isOwner[_owner] = true;
        ownersArray.push(_owner);
        ownerCount++;
        emit OwnerAdded(_owner);
    }

    // Remove an owner
    function removeOwner(address _owner) external onlyOwner {
        require(isOwner[_owner], "Not an owner");

        // Remove owner by swapping with the last one in the array
        for (uint8 i = 0; i < ownersArray.length; i++) {
            if (ownersArray[i] == _owner) {
                ownersArray[i] = ownersArray[ownersArray.length - 1];
                ownersArray.pop();
                break;
            }
        }

        isOwner[_owner] = false;
        ownerCount--;
        emit OwnerRemoved(_owner);

        // Adjust the required number of confirmations if needed
        if (required > ownerCount) {
            changeRequirement(uint8(ownerCount));
        }
    }

    // Change the number of required approvals
    function changeRequirement(uint8 _required) public onlyOwner {
        require(
            _required > 0 && _required <= ownerCount,
            "Invalid required number of confirmations"
        );
        required = _required;
        emit RequirementChanged(_required);
    }

    // Get the balance of native tokens in the contract (e.g., ETH)
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // Get the owners array
    function getOwners() external view returns (address[] memory) {
        return ownersArray;
    }

    // Get the number of transactions
    function getTransactionCount() external view returns (uint256) {
        return transactions.length;
    }

    // Get the details of a specific transaction
    function getTransaction(
        uint256 _txId
    )
        external
        view
        returns (
            address to,
            uint256 value,
            bytes memory data,
            bool executed,
            uint8 approvals
        )
    {
        Transaction storage transaction = transactions[_txId];
        return (
            transaction.to,
            transaction.value,
            transaction.data,
            transaction.executed,
            transaction.approvals
        );
    }
}
