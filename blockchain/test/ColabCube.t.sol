// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ColabCube.sol";
import "../src/ColabCubeCreditToken.sol";
import "../src/MultiSigTreasury.sol";
import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract ColabCubeTest is Test {
    ColabCube colabCube;
    ColabCubeCreditToken token;
    MultiSigTreasury treasury;
    address pyth;

    address owner = address(1);
    address manager = address(2);
    address admin = address(3);
    address user = address(4);

    function setUp() public {
        token = new ColabCubeCreditToken(owner, owner, owner, owner);

        // Declare a fixed-size array
        address[3] memory fixedArray = [owner, admin, manager];

        // Create a dynamic array of the same length
        address[] memory signers = new address[](fixedArray.length);

        // Copy elements from the fixed array to the dynamic array
        for (uint i = 0; i < fixedArray.length; i++) {
            signers[i] = fixedArray[i];
        }

        treasury = new MultiSigTreasury(signers, 2);
        pyth = 0x74f09cb3c7e2A01865f424FD14F6dc9A14E3e94E;

        colabCube = new ColabCube(
            address(pyth),
            token,
            address(treasury),
            manager,
            admin
        );

        // // Grant admin and manager roles to the appropriate addresses
        // colabCube.grantRole(colabCube.MANAGER_ROLE(), manager);
        // colabCube.grantRole(colabCube.ADMIN_ROLE(), admin);
        vm.startPrank(owner);
        token.grantRole(token.MINTER_ROLE(), address(colabCube));
        token.grantRole(token.BURNER_ROLE(), address(colabCube));
        vm.stopPrank();
    }

    function testAssignMonthlyTokens() public {
        // Assign monthly tokens to user
        vm.prank(manager);
        colabCube.assignMonthlyTokens(user);

        // Verify user balance
        assertEq(
            token.balanceOf(user),
            1000e18,
            "User did not receive the correct token amount"
        );

        // Verify the lastClaimed timestamp was updated
        // assertEq(colabCube.lastClaimed(user), block.timestamp, "Last claimed timestamp was not updated");
    }

    function testAssignMonthlyTokensByLevel() public {
        // Set token amount for a level
        vm.prank(admin);
        colabCube.setTokenForLevels(1, 500e18);

        // Assign monthly tokens by level to user
        vm.prank(manager);
        colabCube.assignMonthlyTokensByLevel(user, 1);

        // Verify user balance for level 1
        assertEq(
            token.balanceOf(user),
            500e18,
            "User did not receive the correct token amount for level 1"
        );
    }

    function testConnectionTask() public {
        // Set token amount for a level
        vm.prank(admin);
        colabCube.setTaskPrice(1, 500e18);

        //user approve token for colabcube contract
        vm.prank(user);
        token.giveFullApproval(address(colabCube));

        // Assign monthly tokens by level to user
        vm.startPrank(manager);
        colabCube.assignMonthlyTokens(user);
        colabCube.connectionTask(user, 1);
        vm.stopPrank();

        // Verify user balance for level 1
        assertEq(
            token.balanceOf(user),
            500e18,
            "User did not use up the correct token amount for level 1 connection"
        );
    }

    function testBurnTokensForTask() public {
        // Assign monthly tokens to user
        vm.prank(manager);
        colabCube.assignMonthlyTokens(user);

        // Verify user balance
        assertEq(
            token.balanceOf(user),
            1000e18,
            "User did not receive the correct token amount"
        );

        //user approve token for colabcube contract
        vm.prank(user);
        token.giveFullApproval(address(colabCube));

        // Burn some tokens for task
        vm.prank(manager);
        colabCube.burnTokensForTask(user, 1000e18);

        // Verify user balance after burn
        assertEq(token.balanceOf(user), 0, "Tokens were not burned correctly");
    }

    function testSubscribeMonthly() public {
        // Assign monthly tokens to user
        vm.prank(address(colabCube));
        token.mint(user, 2000e18);

        //user approve token for colabcube contract
        vm.prank(user);
        token.giveFullApproval(address(colabCube));

        // Subscribe user to a monthly plan
        vm.prank(manager);
        colabCube.subscribe(user, false);

        // Verify subscription expiry is 30 days from now
        assertEq(
            colabCube.subscriptionExpiry(user),
            block.timestamp + 30 days,
            "Subscription expiry is incorrect"
        );

        // Verify token balance after subscription cost is deducted
        assertEq(
            token.balanceOf(user),
            800e18,
            "Tokens were not burned correctly"
        );
    }

    function testSubscribeYearly() public {
        // Assign monthly tokens to user
        vm.prank(address(colabCube));
        token.mint(user, 2000e18);

        //user approve token for colabcube contract
        vm.prank(user);
        token.giveFullApproval(address(colabCube));

        // Subscribe user to a yaerly plan
        vm.prank(manager);
        colabCube.subscribe(user, true);

        // Verify subscription expiry is 30 days from now
        assertEq(
            colabCube.subscriptionExpiry(user),
            block.timestamp + 365 days,
            "Subscription expiry is incorrect"
        );

        // Verify token balance after subscription cost is deducted
        assertEq(token.balanceOf(user), 0, "Tokens were not burned correctly");
    }
}
