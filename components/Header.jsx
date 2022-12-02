import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/store";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";

const Header = () => {
  const {
    state: { cart },dispatch
  } = useContext(Store);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { status, data: session } = useSession();

  const handleLogout = () => {
    Cookies.remove("cart");
    dispatch({type:"CART_RESET"})
    signOut({ callbackUrl: "/login" });
  };

  useEffect(() => {
    setCartItemsCount(cart.cartItems?.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <>
      <nav className='flex h-12 justify-between shadow-md items-center px-4'>
        <Link href='/'>
          <p className='text-lg font-bold'>Galaxy Store</p>
        </Link>
        <div className='flex gap-2 items-center'>
          <Link href='/cart'>
            Cart{" "}
            {cartItemsCount > 0 && (
              <span className='ml-0 rounded-full bg-red-600 py-1 px-2 text-xs font-bold text-white'>
                {cartItemsCount}
              </span>
            )}
          </Link>

          {status === "loading" ? (
            "Loading..."
          ) : session?.user ? (
            <Menu as='div' className='relative inline-block'>
              <Menu.Button className='text-blue-500 font-bold'>
                {session?.user.name}
              </Menu.Button>
              <Menu.Items className='absolute right-0 w-56 origin-top-right shadow-lg rounded-lg mt-2 bg-white'>
                <Menu.Item>
                  <DropdownLink
                    className='dropdown-link border-b'
                    href='/profile'>
                    Profile
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <DropdownLink
                    className='dropdown-link border-b'
                    href='/order-history'>
                    Order History
                  </DropdownLink>
                </Menu.Item>
                <Menu.Item>
                  <DropdownLink
                    className='dropdown-link'
                    href='#'
                    onClick={handleLogout}>
                    Logout
                  </DropdownLink>
                </Menu.Item>
              </Menu.Items>
            </Menu>
          ) : (
            <Link href='/login' className='p-2'>
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
