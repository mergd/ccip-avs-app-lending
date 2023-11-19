'use client'
import { Heading, Box, Container, Button, TextField, Flex } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { ERC20MockABI } from '../../lib/ERC20MockABI'
import { usePrepareContractWrite, useContractWrite, useToken, useAccount } from 'wagmi'
import { Address, formatEther, parseEther, zeroAddress } from 'viem'
import { mockUSDC, mockWETH } from '../../lib/constants'
export default function Mint() {
  const [mintAmount, setMintAmount] = useState(0)
  const [userAddr, setUserAddr] = useState<Address>(zeroAddress)
  const account = useAccount()

  useEffect(() => {
    if (account.address) setUserAddr(account.address)
  }, [account])

  const { config: mintMUSDCConfig } = usePrepareContractWrite({
    address: mockUSDC,
    abi: ERC20MockABI,
    functionName: 'mint',
    args: [userAddr, parseEther(mintAmount.toString())],
  })
  const { config: mintMWETHConfig } = usePrepareContractWrite({
    address: mockWETH,
    abi: ERC20MockABI,
    functionName: 'mint',
    args: [userAddr, parseEther('100')],
  })

  const { isSuccess: isMUSDCMintSucceed, write: writeMUSDC } = useContractWrite(mintMUSDCConfig)
  const { isSuccess: isMWETHMintSucceed, write: writeMWETH } = useContractWrite(mintMWETHConfig)

  return (
    <Box style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
      <Container size='1'>
        <Box py='9' />
        <div className='m-5 flex flex-col gap-2 pb-10'>
          <Heading color='brown'> Mint Testnet Tokens </Heading>

          <TextField.Input
            size={'3'}
            placeholder='Enter the number of tokens here'
            value={mintAmount.toLocaleString()}
            onChange={(e) =>
              setMintAmount(e.target.value ? parseInt(e.target.value.replace(/,/g, '')) : 0)
            }></TextField.Input>

          <Flex gap={'3'}>
            <Button variant='classic' onClick={() => writeMUSDC?.()}>
              {' '}
              Mint {mintAmount == 0 ? '' : mintAmount.toLocaleString()} MockUSDC
            </Button>
            <Button variant='classic' onClick={() => writeMWETH?.()}>
              Mint {mintAmount == 0 ? '' : mintAmount.toLocaleString()} MockWETH
            </Button>
          </Flex>
        </div>
      </Container>
    </Box>
  )
}
