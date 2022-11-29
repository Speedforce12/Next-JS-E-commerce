import Link from "next/link";
import React, { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/store";
import CartTable from "../components/CartTable";
import { useRouter } from "next/router";

const cart = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <Layout title='Shopping Cart'>
      <h1 className='mb-4 text-xl font-bold'>
        Shopping Cart
        <span className='font-normal text-gray-700'>
          ({cartItems.length} items)
        </span>
      </h1>

      {cartItems.length === 0 ? (
        <div className='flex flex-col justify-center items-center mt-28 font-bold'>
          <div className="bg-[url('/images/empty-cart.svg')] h-56 w-56"></div>

          <span className='text-xl font-bold'>Cart is empty!</span>
          <Link
            href='/'
            className='text-green-500 ml-2 mt-2 hover:border-gray-400 hover:border-b-2'>
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className='grid md:flex md:items-center'>
          <div className='max-w-5xl md:grid-cols-4 mr-24 md:gap-5'>
            <CartTable />
          </div>
            <div className='card p-5 mt-10 ml-auto w-full'>
            <ul>
              <li>
                <div className='pb-3 font-bold'>
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)})
                  <span className='font-medium text-gray-700'>
                    {" "}
                    : ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </span>
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("/shipping")}
                  className='primary-button w-full whitespace-nowrap'>
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default cart;
