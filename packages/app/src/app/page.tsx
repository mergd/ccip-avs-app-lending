'use client'
import { SITE_DESCRIPTION } from '@/utils/site'
import BorrowCard from '@/components/BorrowCard'
export default function Home() {
  return (
    <>
      <h2 className='text-lg'>Next.js + Ethereum starter kit</h2>
      <p>{SITE_DESCRIPTION}</p>

      <BorrowCard />
    </>
  )
}
