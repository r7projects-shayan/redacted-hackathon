// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.25;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/manager/AccessManaged.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract ColabCubeCreditToken is ERC20, ERC20Burnable, AccessManaged, ERC20Permit {
    constructor(address initialAuthority)
        ERC20("ColabCubeCreditToken", "CCT")
        AccessManaged(initialAuthority)
        ERC20Permit("ColabCubeCreditToken")
    {}

    function mint(address to, uint256 amount) public restricted {
        _mint(to, amount);
    }
}
