import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { Store } from "../utils/store";
import { FaRegTimesCircle } from "react-icons/fa";

const CartTable = () => {
  const { state, dispatch} = useContext(Store);
  const {
    cart: { cartItems },
    } = state;
    const removeItem = (item) => {
        dispatch({type:"REMOVE_CART_ITEM", payload: item});
    }

  return (
    <>
      <div className='overflow-x-auto md:cols-span-3 w-full'>
        <table className='w-full table-fixed'>
          <thead className='border-b'>
            <tr>
              <th className='px-5 text-left'>Item</th>
              <th className='px-5 text-right'>Quantity</th>
              <th className='px-5 text-right'>Price</th>
              <th className='px-5'>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.slug} className='border-b'>
                <td>
                  <Link href={`product/${item.slug}`}>
                    <span className='flex items-center my-3 gap-3'>
                      <Image
                        src={item.image}
                        alt={item.name}
                        height={80}
                        width={80}
                      />
                      &nbsp;
                      {item.name}
                    </span>
                  </Link>
                </td>
                <td className='p-5 text-right'>{item.quantity}</td>
                <td className='p-5 text-right'>${item.price}</td>
                <td className='p-5 text-center'>
                  <button onClick={()=> removeItem(item)}>
                    <FaRegTimesCircle className='w-5 h-5' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CartTable;
