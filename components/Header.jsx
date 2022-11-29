import Link from 'next/link';
import React, { useContext } from 'react'
import { Store } from '../utils/store';

const Header = () => {
  const { state: { cart } } = useContext(Store);

  return (
    <>
      <nav className='flex h-12 justify-between shadow-md items-center px-4'>
        <Link href='/'>
          <p className='text-lg font-bold'>Galaxy Store</p>
        </Link>
        <div className='flex gap-6'>
          <Link href='/cart'>Cart {cart.cartItems.length > 0  && (
            <span className='ml-0 rounded-full bg-red-600 py-1 px-2 text-xs font-bold text-white'>{ cart.cartItems.reduce((a,c)=> a + c.quantity,0)}</span>
          )}</Link>
          <Link href='/login'>Login</Link>
        </div>
      </nav>
    </>
  );
}

export default Header