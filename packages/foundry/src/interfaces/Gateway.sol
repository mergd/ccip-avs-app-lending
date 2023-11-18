// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface Gateway {
    function onchainDepth(address tokenAddr, uint256 amount) external view returns (uint256 depth, bytes memory sig);
    function createLoanCallback(bytes calldata data, bytes calldata extraData) external;
}
