export const LendingProtocolABI = [
  {
    inputs: [
      {
        internalType: 'string[]',
        name: '_urls',
        type: 'string[]',
      },
      {
        internalType: 'contract ERC20',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'contract ERC20',
        name: '_collToken',
        type: 'address',
      },
      {
        internalType: 'contract ILoanCoordinator',
        name: '_loanCoordinator',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_signer',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        internalType: 'string[]',
        name: 'urls',
        type: 'string[]',
      },
      {
        internalType: 'bytes',
        name: 'callData',
        type: 'bytes',
      },
      {
        internalType: 'bytes4',
        name: 'callbackFunction',
        type: 'bytes4',
      },
      {
        internalType: 'bytes',
        name: 'extraData',
        type: 'bytes',
      },
    ],
    name: 'OffchainLookup',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'debtAmt',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: '_validCalc',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'borrower',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'lender',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'callback',
            type: 'bool',
          },
          {
            internalType: 'contract ERC20',
            name: 'collateralToken',
            type: 'address',
          },
          {
            internalType: 'contract ERC20',
            name: 'debtToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'collateralAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'debtAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'interestRate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startingTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'duration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'terms',
            type: 'uint256',
          },
        ],
        internalType: 'struct ILoanCoordinator.Loan',
        name: 'loan',
        type: 'tuple',
      },
      {
        internalType: 'uint256',
        name: 'lenderReturn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'borrowerReturn',
        type: 'uint256',
      },
    ],
    name: 'auctionSettledHook',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'callback',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'collateralToken',
    outputs: [
      {
        internalType: 'contract ERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'coordinator',
    outputs: [
      {
        internalType: 'contract ILoanCoordinator',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'debtAmt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'collateralAmt',
        type: 'uint256',
      },
    ],
    name: 'createLoan',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
      {
        internalType: 'bytes',
        name: 'extraData',
        type: 'bytes',
      },
    ],
    name: 'createLoanCallback',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'debtToken',
    outputs: [
      {
        internalType: 'contract ERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'borrower',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'lender',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'callback',
            type: 'bool',
          },
          {
            internalType: 'contract ERC20',
            name: 'collateralToken',
            type: 'address',
          },
          {
            internalType: 'contract ERC20',
            name: 'debtToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'collateralAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'debtAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'interestRate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startingTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'duration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'terms',
            type: 'uint256',
          },
        ],
        internalType: 'struct ILoanCoordinator.Loan',
        name: 'loan',
        type: 'tuple',
      },
    ],
    name: 'loanRepaidHook',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'paused',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract IncredibleLendingTaskManager',
        name: '_taskManager',
        type: 'address',
      },
    ],
    name: 'setTaskManager',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string[]',
        name: '_urls',
        type: 'string[]',
      },
    ],
    name: 'setURLs',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string[]',
        name: '_urls',
        type: 'string[]',
      },
    ],
    name: 'setUrls',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'signer',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'taskManager',
    outputs: [
      {
        internalType: 'contract IncredibleLendingTaskManager',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'togglePause',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'urls',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'borrower',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'lender',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'callback',
            type: 'bool',
          },
          {
            internalType: 'contract ERC20',
            name: 'collateralToken',
            type: 'address',
          },
          {
            internalType: 'contract ERC20',
            name: 'debtToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'collateralAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'debtAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'interestRate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startingTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'duration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'terms',
            type: 'uint256',
          },
        ],
        internalType: 'struct ILoanCoordinator.Loan',
        name: 'loan',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'verifyLoan',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'borrower',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'lender',
            type: 'address',
          },
          {
            internalType: 'bool',
            name: 'callback',
            type: 'bool',
          },
          {
            internalType: 'contract ERC20',
            name: 'collateralToken',
            type: 'address',
          },
          {
            internalType: 'contract ERC20',
            name: 'debtToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'collateralAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'debtAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'interestRate',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'startingTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'duration',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'terms',
            type: 'uint256',
          },
        ],
        internalType: 'struct ILoanCoordinator.Loan',
        name: 'loan',
        type: 'tuple',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'viewVerifyLoan',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const
