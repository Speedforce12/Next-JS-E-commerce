import Link from 'next/link';
import React from 'react'

const Header = () => {
  return (
    <>
      <nav className='flex h-12 justify-between shadow-md items-center px-4'>
        <Link href='/'>
          <p className='text-lg font-bold'>Galaxy Store</p>
        </Link>
        <div className='flex gap-6'>
          <Link href='/cart'>Cart</Link>
          <Link href='/login'>Login</Link>
        </div>
      </nav>
    </>
  );
}

export default Header