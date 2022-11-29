import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../utils/store';

const Header = () => {
  const { state: { cart } } = useContext(Store);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  
    useEffect(() => {
      setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
    },[cart.cartItems]);

  return (
    <>
      <nav className='flex h-12 justify-between shadow-md items-center px-4'>
        <Link href='/'>
          <p className='text-lg font-bold'>Galaxy Store</p>
        </Link>
        <div className='flex gap-6'>
          <Link href='/cart'>Cart {cartItemsCount > 0  && (
            <span className='ml-0 rounded-full bg-red-600 py-1 px-2 text-xs font-bold text-white'>{ cartItemsCount}</span>
          )}</Link>
          <Link href='/login'>Login</Link>
        </div>
      </nav>
    </>
  );
}

export default Header