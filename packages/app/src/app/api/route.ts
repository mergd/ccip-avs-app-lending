import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { mockUSDC, OnchainDepthOracle } from '@/lib/constants'
import { OnchainOracleABI } from '@/lib/OnChainDepthOracleABI'
import dotenv from 'dotenv'
import { Address, createPublicClient, createWalletClient, decodeFunctionData, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { goerli } from 'viem/chains'
dotenv.config()

const client = createWalletClient({
  chain: goerli,
  transport: http(),
})
const publicClient = createPublicClient({
  chain: goerli,
  transport: http(),
})

let pk = process.env.DEPLOYER_KEY ? process.env.DEPLOYER_KEY : '0x00000000'
const account = privateKeyToAccount(pk as `0x${string}`)
export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url, 'http://localhost') // Base URL doesn't matter here
  let data = url.searchParams.get('data') as `0x${string}`
  let extraData = url.searchParams.get('extraData') as `0x${string}`

  // let data = req.searchParams.data as `0x${string}`
  // let extraData = req.query.extraData

  if (data && extraData) {
    const { args } = decodeFunctionData({ abi: OnchainOracleABI, data: data })
    if (args?.[0] != mockUSDC) {
      res = NextResponse.json(
        {
          message: 'Wrong Collateral Type',
        },
        {
          status: 400,
        }
      )

      return
    }

    const { result: req0 } = await publicClient.simulateContract({
      address: OnchainDepthOracle,
      abi: OnchainOracleABI,
      functionName: 'testDepth',
      args: [BigInt(args[0]), args[1] as Address],
    })

    if (Array.isArray(req0)) {
      const signature = await account.signMessage({
        message: { raw: req0[0] },
      })

      res = NextResponse.json(
        {
          data: signature,
        },
        {
          status: 200,
        }
      )
      return
    }
  }

  res = NextResponse.json(
    {
      error: 'Invalid Request',
    },
    {
      status: 400,
    }
  )
  return
}
