// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";

import {IncredibleLendingProtocol} from "src/IncredibleLendingProtocol.sol";
import {MockUniswap} from "src/MockUniswapV2.sol";
import {ERC20Mock} from "src/ERC20Mock.sol";
import {LoanCoordinator} from "landingprotocol/src/LoanCoordinator.sol";
import {OnchainDepthOracle, ERC20} from "src/OnchainDepthOracle.sol";

contract MessageScript is Script {
    MockUniswap public uniswap;
    ERC20Mock public weth;
    ERC20Mock public usdc;
    IncredibleLendingProtocol public lending;
    OnchainDepthOracle public depthOracle;
    LoanCoordinator public coordinator;

    function run() public {
        uint256 deployer_key = vm.envUint("DEPLOYER_KEY");
        vm.startBroadcast(deployer_key);
        weth = new ERC20Mock();
        usdc = new ERC20Mock();
        coordinator = new LoanCoordinator();
        depthOracle = new OnchainDepthOracle(ERC20(address(weth)));
        string[] memory urls = new string[](1);
        urls[0] = "vercel.app/api";
        lending =
        new  IncredibleLendingProtocol(urls, ERC20(address(usdc)), ERC20(address(weth)),  coordinator, vm.addr(deployer_key));
        uniswap = new MockUniswap();
        // set the exchange
        depthOracle.setExchange(address(usdc), address(uniswap), OnchainDepthOracle.ExchangeType.UNISWAPv2);
    }
}
