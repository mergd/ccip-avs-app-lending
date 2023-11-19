import {
  TextField,
  TextFieldInput,
  TextFieldRoot,
  Button,
  DropdownMenu,
  IconButton,
  Flex,
  Card,
  Inset,
  Strong,
  Text,
  Callout,
} from '@radix-ui/themes'
import { Coins, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FaEthereum } from 'react-icons/fa6'

import { Address, erc20ABI, useContractWrite, usePrepareContractWrite, useContractRead, useAccount } from 'wagmi'
import { useToken } from 'wagmi'
import { incredibleLendingProtocol, loanCoordinator, mockUSDC, mockWETH } from '../lib/constants'
import { parseEther, zeroAddress } from 'viem'
import { LendingProtocolABI } from '@/lib/LendingProtocolABI'
import { parse } from 'path'

function BorrowCard() {
  const [borrowAmount, setBorrowAmount] = useState(0)
  const [borrowToken, setBorrowToken] = useState<Address>(mockUSDC)
  const [collateralToken, setCollateralToken] = useState('')
  const collateralTokenAddress = mockWETH
  const [collateralAmount, setCollateralAmount] = useState(0)
  const account = useAccount()
  const [userAddr, setUserAddr] = useState<Address>(zeroAddress)
  const [isApproved, setIsApproved] = useState(false)

  useEffect(() => {}, [borrowAmount, borrowToken, collateralToken, collateralAmount, isApproved])

  const inputBox = (isBorrow: boolean) => {
    return (
      <TextField.Root>
        <TextField.Slot>
          <Coins height='16' width='16' />
        </TextField.Slot>
        <TextField.Input placeholder='Input an amount ' size='3' />
        <TextField.Slot pr='3'>
          <IconButton size='2' variant='ghost'>
            {isBorrow && dropdown}
            {!isBorrow && borrowButton}
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
    )
  }

  const { config: approveConfig } = usePrepareContractWrite({
    address: borrowToken,
    abi: erc20ABI,
    functionName: 'approve',
    args: [loanCoordinator, parseEther(borrowAmount.toString())],
  })

  const { data: approvalAmt } = useContractRead({
    address: borrowToken,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [userAddr, loanCoordinator],
  })

  const { config: borrowConfig } = usePrepareContractWrite({
    address: incredibleLendingProtocol,
    abi: LendingProtocolABI,
    functionName: 'createLoan',
    args: [collateralTokenAddress, parseEther(borrowAmount.toString()), parseEther(collateralAmount.toString())],
  })

  const { data: txhash0, isSuccess: isBorrowSucceed, write: writeBorrow } = useContractWrite(borrowConfig)

  const { data: txhash1, isSuccess: isApproveSucceed, write: writeApprove } = useContractWrite(approveConfig)

  useEffect(() => {
    if (account.address) setUserAddr(account.address)
    if (isApproveSucceed) {
      setIsApproved(true)
    } else if (approvalAmt && approvalAmt >= parseEther(borrowAmount.toString())) {
      // User has already approved the loanCoordinator to spend their tokens
      setIsApproved(true)
    }
  }, [account.address, borrowAmount, isApproveSucceed, approvalAmt])

  const dropdown = (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant='soft'>
          {collateralToken && collateralToken}
          {!collateralToken && 'Select Token'}
          <ChevronDown />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item> Select Token </DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Group defaultValue={'USDC'}>
          <DropdownMenu.Item onSelect={() => setCollateralToken('USDC')} textValue='USDC'>
            {' '}
            USDC{' '}
          </DropdownMenu.Item>
          {/* <DropdownMenu.Item onSelect={() => setCollateralToken('WETH')} textValue='WETH'>
            {' '}
            WETH{' '}
          </DropdownMenu.Item>
          <DropdownMenu.Item onSelect={() => setCollateralToken('WBTC')} textValue='WBTC'>
            {' '}
            WBTC{' '}
          </DropdownMenu.Item> */}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )

  const borrowButton = (
    <Button variant='outline'>
      <FaEthereum />
      WETH
    </Button>
  )
  return (
    <Flex direction='column' gap='3' style={{ maxWidth: 400 }}>
      <Card size='2' style={{ maxWidth: 960 }}>
        <Inset clip='padding-box' side='top' pb='current'>
          {inputBox(true)}
          {inputBox(false)}
        </Inset>
        <Flex justify='between' pb={'3'}>
          <div className='flex flex-col '>
            <Text> APY:</Text>
            <Text> Duration :</Text>
          </div>

          <div className='flex flex-col '>
            <Text> 50%</Text>
            <Text> No term</Text>
          </div>
        </Flex>
        <Flex justify='between' gap={'2'} align='center' style={{ padding: '10px 20px' }}>
          {!isApproved && (
            <Button
              disabled={!collateralToken}
              variant='classic'
              size='2'
              style={{ width: '50%' }}
              onClick={() => writeApprove?.()}>
              Approve Tokens
            </Button>
          )}
          <Button
            variant='classic'
            size='2'
            style={!isApproved ? { width: '50%' } : { width: '100%' }}
            disabled={!isApproved}
            onClick={() => writeBorrow?.()}>
            Borrow
          </Button>
        </Flex>
        {isBorrowSucceed && (
          <Callout.Root variant='surface'>
            <Callout.Icon>
              <FaEthereum />
            </Callout.Icon>
            <Callout.Text>
              You just borrowed {borrowAmount} {borrowToken} against {collateralAmount} {collateralToken}
              Your transaction confirmed: {txhash1?.hash}
            </Callout.Text>
          </Callout.Root>
        )}
        {isApproveSucceed && !isBorrowSucceed && (
          <Callout.Root variant='surface'>
            <Callout.Icon>
              <FaEthereum />
            </Callout.Icon>
            <Callout.Text>
              You approved {collateralAmount} {collateralToken} <br />
              Your transaction confirmed: {txhash0?.hash}
            </Callout.Text>
          </Callout.Root>
        )}
      </Card>
    </Flex>
  )
}

export default BorrowCard
