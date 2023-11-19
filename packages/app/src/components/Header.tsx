import React from 'react'
import { LinkComponent } from './LinkComponent'
import { SITE_NAME } from '@/utils/site'
import { Connect } from './Connect'
import { Heading } from '@radix-ui/themes'
export function Header() {
  return (
    <header className='navbar flex justify-between p-4 pt-0'>
      <LinkComponent href='/'>
        <Heading className='text-lg ' color='brown'>
          {' '}
          Incredible Lending System{' '}
        </Heading>
      </LinkComponent>
      <LinkComponent href='/mint'>
        <Heading size={'2'} color='brown'>
          {' '}
          Mint Testnet Tokens{' '}
        </Heading>
      </LinkComponent>
      <Connect />
    </header>
  )
}
