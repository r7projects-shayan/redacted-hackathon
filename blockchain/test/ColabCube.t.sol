// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ColabCube.sol";
import "../src/ColabCubeCreditToken.sol";
import "../src/MultiSigTreasury.sol";
import {MockPyth} from "@pythnetwork/pyth-sdk-solidity/MockPyth.sol";

contract ColabCubeTest is Test {
    ColabCube colabCube;
    ColabCubeCreditToken token;
    MultiSigTreasury treasury;

    address owner = address(1);
    address manager = address(2);
    address admin = address(3);
    address user = address(4);

    MockPyth public pyth;
    bytes32 ETH_PRICE_FEED_ID = bytes32(uint256(0x1));
    uint256 ETH_TO_WEI = 10 ** 18;

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
        pyth = new MockPyth(60, 1);

        colabCube = new ColabCube(
            address(pyth),
            token,
            address(treasury),
            manager,
            admin,
            ETH_PRICE_FEED_ID
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

    function createEthUpdate(
        int64 ethPrice
    ) private view returns (bytes[] memory) {
        bytes[] memory updateData = new bytes[](1);
        updateData[0] = pyth.createPriceFeedUpdateData(
            ETH_PRICE_FEED_ID,
            ethPrice * 100000,
            10 * 100000,
            -5,
            ethPrice * 100000,
            10 * 100000,
            uint64(block.timestamp),
            uint64(block.timestamp)
        );

        return updateData;
    }

    function setEthPrice(int64 ethPrice) private {
        bytes[] memory updateData = createEthUpdate(ethPrice);
        uint value = pyth.getUpdateFee(updateData);
        vm.deal(address(this), value);
        pyth.updatePriceFeeds{value: value}(updateData);
    }

    function testBuyToken() public {
        // Set token amount for a level
        vm.prank(admin);
        colabCube.setTokenUsdPrice(1e18, 2);
        // bytes[] memory = IPyth(pyth).getP
        //         // Declare a fixed-size array
        //         bytes[1] memory fixedArray = [bytes("ETH/USD")];

        //         // Create a dynamic array of the same length
        //         bytes[] memory data = new bytes[](fixedArray.length);

        //         // Copy elements from the fixed array to the dynamic array
        //         for (uint i = 0; i < fixedArray.length; i++) {
        //             data[i] = fixedArray[i];
        //         }

        uint256 initialBal = treasury.getBalance();

        bytes[] memory updateData = createEthUpdate(100);
        // get this and add to frontend calculated price for the token amount in question
        uint fee = pyth.getUpdateFee(updateData);

        //user token purchase
        vm.startPrank(user);
        vm.deal(user, 300 ether);
        colabCube.buyTokens{value: 300 ether}(1e18, updateData);
        vm.stopPrank();

        // Verify user balance for token purchase
        assertEq(
            token.balanceOf(user),
            1e18,
            "User did not get the expected token amount"
        );
        assertGt(
            treasury.getBalance(),
            initialBal,
            "Treasury blance was not increased"
        );

        // console.log(treasury.getBalance(), fee);
    }
}
