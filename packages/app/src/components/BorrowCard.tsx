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
} from '@radix-ui/themes'
import { MagnifyingGlassCircleIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import { DocumentPlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { FaEthereum } from 'react-icons/fa6'

function BorrowCard() {
  const [borrowAmount, setBorrowAmount] = useState(0)
  const [borrowToken, setBorrowToken] = useState('')
  const [collateralToken, setCollateralToken] = useState('')
  const [collateralAmount, setCollateralAmount] = useState(0)
  const inputBox = (isBorrow: boolean) => {
    return (
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassCircleIcon height='16' width='16' />
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

  const dropdown = (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant='soft'>
          {collateralToken}
          <ChevronDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item> Select Token </DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Group
          onSelect={(e) => {
            if (e.currentTarget.ariaValueText !== null) {
              setCollateralToken(e.currentTarget.ariaValueText)
            }
          }}
          defaultValue={'USDC'}>
          <DropdownMenu.Item textValue='USDC'> USDC </DropdownMenu.Item>
          <DropdownMenu.Item textValue='WETH'> WETH </DropdownMenu.Item>
          <DropdownMenu.Item textValue='WBTC'> WBTC </DropdownMenu.Item>
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
        <Text as='p' size='3'>
          <Strong>Typography</Strong> is the art and technique of arranging type to make written language legible,
          readable and appealing when displayed.
        </Text>
      </Card>
    </Flex>
  )
}

export default BorrowCard
