import React from 'react'
import { Button } from '../button'

function Header() {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5 h-16 bg-white'>
      <img src='/logo.svg' className='h-10'/>
  
    <div>
    <Button>Sign In</Button>
    </div>
      </div>
  )
}

export default Header
