'use client'
import { Heading, Box, Container } from '@radix-ui/themes'
import BorrowCard from '@/components/BorrowCard'
export default function Home() {
  return (
    <Box style={{ background: 'var(--gray-a2)', borderRadius: 'var(--radius-3)' }}>
      <Container size='1'>
        <Box py='9' />
        <div className='m-5 flex flex-col gap-2 pb-10'>
          <Heading color='brown'> Borrow </Heading>
          <h2 className='text-lg'>Borrow USDC against your WETH in an incredible way</h2>
          <p>
            {' '}
            Enter the amount of tokens you would like to borrow and the amount of WETH you would like to collateralize
          </p>

          <BorrowCard />
        </div>
      </Container>
    </Box>
  )
}
