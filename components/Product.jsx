import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdAdd } from "react-icons/md";

const Product = ({ product }) => {
  return (
    <div className='card mt-2'>
      <Link href={`/product/${product.slug}`}>
        <Image
          width={400}
          height={400}
            src={product.image}
            alt={product.name}
            className='rounded shadow'
          />
      </Link>
      <div className='flex flex-col items-center justify-center p-5'>
        <Link href={`/product/${product.slug}`}>
            <h2 className='text-lg'>{product.name}</h2>
        </Link>
        <p className='mb-2'>{product.brand}</p>
        <p>${product.price}</p>
        <button className='primary-button flex items-center gap-1 mt-2' type='button'>
          <MdAdd />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
