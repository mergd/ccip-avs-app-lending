export const OnchainOracleABI = [
  {
    inputs: [
      {
        internalType: 'contract ERC20',
        name: '_weth',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'exchange',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'enum OnchainDepthOracle.ExchangeType',
        name: 'exchangeType',
        type: 'uint8',
      },
    ],
    name: 'VenueSet',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'tkn',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'exchange',
        type: 'address',
      },
      {
        internalType: 'enum OnchainDepthOracle.ExchangeType',
        name: 'exchangeType',
        type: 'uint8',
      },
    ],
    name: 'setExchange',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'tkn',
        type: 'address',
      },
    ],
    name: 'testDepth',
    outputs: [
      {
        internalType: 'uint256',
        name: 'depthOut',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'depthIn',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'deepest',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'collAmt',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'debtAmt',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'collateral',
        type: 'address',
      },
    ],
    name: 'testDepth',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'venues',
    outputs: [
      {
        internalType: 'address',
        name: 'exchange',
        type: 'address',
      },
      {
        internalType: 'enum OnchainDepthOracle.ExchangeType',
        name: 'typeExch',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'weth',
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
] as const
