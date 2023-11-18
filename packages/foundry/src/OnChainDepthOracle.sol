// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IQuoterV2} from "./interfaces/IQuoterV2.sol";
import {IUniswapV2Router02} from "./interfaces/IUniswapV2Router02.sol";
import {CurveFi} from "./interfaces/ICurveInterface.sol";
// import "balancer-v2-monorepo/pkg/interfaces/contracts/vault/IMinimalSwapInfoPool.sol";
import {ERC20Mock} from "./ERC20Mock.sol";
import "../lib/landingprotocol/src/ILoanCoordinator.sol";

/**
 * @title OnChainDepthOracle
 * @author gracked
 * @notice
 */

contract OnchainDepthOracle {
    ERC20 public immutable weth;
    // Anything paired with ETH
    mapping(address => Venue[]) public venues;

    event VenueSet(address indexed token, address indexed exchange, ExchangeType exchangeType);

    struct Venue {
        address exchange;
        ExchangeType typeExch;
    }

    enum ExchangeType {
        UNISWAPv2,
        UNISWAPv3,
        CURVE,
        BALANCERv2
    }

    //
    constructor(ERC20 _weth) {
        weth = _weth;
    }

    /**
     * View function to view swaps
     * @param amount amount in
     * @param tkn token
     * @return depthOut the amount out
     * @return depthIn total amount put in
     * @return deepest
     */

    function testDepth(uint256 amount, address tkn)
        public
        returns (uint256 depthOut, uint256 depthIn, uint256 deepest)
    {
        if (venues[tkn].length == 0) return (0, 0, 0);

        Venue memory venue;
        uint256 length = venues[tkn].length;
        ERC20Mock(tkn).mint(address(this), amount * length);

        for (uint256 i = 0; i < length; i++) {
            venue = venues[tkn][i];
            // query each exchange
            if (venue.typeExch == ExchangeType.UNISWAPv2) {
                // Swap on Router02
                IUniswapV2Router02 router = IUniswapV2Router02(venue.exchange);
                address[] memory path = new address[](2);
                path[0] = tkn;
                path[1] = address(weth);
                uint256[] memory amounts = router.getAmountsOut(amount, path);
                // Select if it's the deepest venue
                deepest = max(deepest, amounts[1]);
                depthOut += amounts[1];
                depthIn += amount;
            } else if (venue.typeExch == ExchangeType.UNISWAPv3) {
                IQuoterV2 quoter = IQuoterV2(venue.exchange);

                IQuoterV2.QuoteExactInputSingleParams memory params =
                    IQuoterV2.QuoteExactInputSingleParams(tkn, address(weth), amount, 3000, 0);
                (uint256 amountOut,,,) = quoter.quoteExactInputSingle(params);
                deepest = max(deepest, amountOut);
                depthOut += amountOut;
                depthIn += amount;
            } else if (venue.typeExch == ExchangeType.CURVE) {
                CurveFi curve = CurveFi(venue.exchange);
                uint256 amountOut = curve.exchange(0, 1, amount, 0);
                deepest = max(deepest, amountOut);
                depthOut += amountOut;
                depthIn += amount;
            } else if (venue.typeExch == ExchangeType.BALANCERv2) {
                // IMinimalSwapInfoPool balancer = IMinimalSwapInfoPool(venue.exchange);
                // IPoolSwapStructs.SwapRequest memory request = IPoolSwapStructs.SwapRequest(
                //     IVault.SwapKind.GIVEN_IN,
                //     IERC20(tkn),
                //     IERC20(address(weth)),
                //     amount,
                //     0,
                //     0,
                //     address(this),
                //     address(this),
                //     ""
                // );

                // uint256 amountOut = balancer.onSwap(request, 0, 0);
                // deepest = max(deepest, amountOut);
                // depthOut += amountOut;
                // depthIn += amount;
            }
        }
    }

    function testDepth(uint256 collAmt, uint256 debtAmt, address collateral) external returns (bool) {
        (,, uint256 deepest) = testDepth(collAmt, collateral);
        if (deepest <= debtAmt) return false;
        else return true;
    }

    function setExchange(address tkn, address exchange, ExchangeType exchangeType) external {
        venues[tkn].push(Venue(exchange, exchangeType));
        emit VenueSet(tkn, exchange, exchangeType);
    }

    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a > b ? a : b;
    }
}
