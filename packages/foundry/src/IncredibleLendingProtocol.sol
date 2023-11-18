// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./CcipRead.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "landingprotocol/src/ILoanCoordinator.sol";
import {Lender} from "landingprotocol/src/Lender.sol";
import "src/interfaces/Gateway.sol";

contract IncredibleLendingProtocol is ReadHandler, Lender {
    using ECDSA for bytes32;

    ERC20 public debtToken;
    ERC20 public collateralToken;

    bool public paused;

    address public taskManager;
    uint256 quorumNumbers = 1;
    uint32 thresholdPctg = 1e6;

    constructor(
        string[] memory _urls,
        ERC20 _token,
        ERC20 _collToken,
        ILoanCoordinator _loanCoordinator,
        address _signer
    ) ReadHandler(_urls) Lender(_loanCoordinator, true) {
        debtToken = _token;
        collateralToken = _collToken;
        signer = _signer;
    }

    function setTaskManager(address _taskManager) external {
        taskManager = _taskManager;
    }

    function setURLs(string[] memory _urls) external {
        urls = _urls;
    }

    function createLoan(address token, uint256 debtAmt, uint256 collateralAmt) public {
        revert OffchainLookup(
            msg.sender,
            urls,
            abi.encodeWithSelector(Gateway.onchainDepth.selector, token, collateralAmt),
            Gateway.createLoanCallback.selector,
            abi.encode(debtAmt, collateralAmt)
        );
    }

    function createLoanCallback(bytes calldata data, bytes calldata extraData) public {
        (uint256 debtAmt, uint256 collateralAmt) = abi.decode(extraData, (uint256, uint256));
        collateralToken.transferFrom(msg.sender, address(this), collateralAmt);
        ILoanCoordinator.Loan memory _loan = ILoanCoordinator.Loan({
            id: 0,
            borrower: msg.sender,
            lender: address(this),
            callback: false,
            collateralToken: collateralToken,
            debtToken: debtToken,
            collateralAmount: collateralAmt,
            debtAmount: debtAmt,
            interestRate: 0,
            startingTime: 0,
            duration: 0,
            terms: 0
        });
        coordinator.createLoan(_loan, data);
    }

    function _validCalc(uint256 debtAmt, bytes memory data) public view returns (bool) {
        if (paused) return false;
        (uint256 slippageAmt, bytes memory sig) = abi.decode(data, (uint256, bytes));

        address recovered = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", keccak256(abi.encodePacked(slippageAmt)))
        ).recover(sig);
        // signer needs to be right
        if (signer == recovered) return false;
        // Onchain liquidity needs to be gt debtAmt
        if (slippageAmt <= debtAmt) return false;
        return true;
    }

    function verifyLoan(ILoanCoordinator.Loan memory loan, bytes calldata data)
        external
        override
        onlyCoordinator
        returns (bytes4)
    {
        if (data.length == 0) {
            revert OffchainLookup(
                msg.sender,
                urls,
                abi.encodeWithSelector(Gateway.onchainDepth.selector, loan.collateralToken, loan.collateralAmount),
                Gateway.createLoanCallback.selector,
                abi.encode(loan.debtAmount, loan.collateralAmount)
            );
        } else if (!_validCalc(loan.debtAmount, data)) {
            revert("Invalid Calculation");
        } else {
            // Create task
            // taskManager.createNewTask(loan.debtAmount, loan.collateralAmount, address(loan.debtToken), thresholdPctg, '');

            return Lender.verifyLoan.selector;
        }
    }

    function viewVerifyLoan(ILoanCoordinator.Loan memory loan, bytes calldata data)
        public
        view
        override
        returns (bool)
    {
        if (data.length == 0) {
            revert OffchainLookup(
                msg.sender,
                urls,
                abi.encodeWithSelector(Gateway.onchainDepth.selector, loan.collateralToken, loan.collateralAmount),
                Gateway.createLoanCallback.selector,
                abi.encode(loan.debtAmount, loan.collateralAmount)
            );
        } else if (!_validCalc(loan.debtAmount, data)) {
            revert("Invalid Calculation");
        } else {
            return true;
        }
    }

    function togglePause() external {
        require(msg.sender == address(taskManager), "Only task manager can pause");
        paused = !paused;
    }

    function auctionSettledHook(ILoanCoordinator.Loan memory loan, uint256 lenderReturn, uint256 borrowerReturn)
        external
        override
        returns (bytes4)
    {}

    function loanRepaidHook(ILoanCoordinator.Loan memory loan) external override returns (bytes4) {}

    function reclaim(uint256 _loanId) external virtual override {}
}
