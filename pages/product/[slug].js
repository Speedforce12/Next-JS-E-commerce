import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import Layout from "../../components/Layout";
import data from "../../utils/data";
import { Store } from "../../utils/store";

const ProductDetail = () => {
  const {
    dispatch,
    state: { cart },
  } = useContext(Store);

  const { query } = useRouter();
  const router = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);
   if (!product) {
     return <Layout title='Product Not Found'>Product Not Found</Layout>;
   }

  const handleAddToCart = () => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      alert("Out of stock Product");
    }

    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    router.push("/cart");
  };

  return (
    <Layout title={product.name}>
      <div className='py-2 font-medium '>
        <Link href='/' className='hover:border-b-2 border-gray-400'>
          Back to Products
        </Link>
      </div>
      <div className='grid md:grid-cols-4 md:gap-3 mt-2'>
        <div className='md:col-span-2'>
          <Image
            className='rounded-lg'
            src={product.image}
            alt={product.name}
            width={550}
            height={550}
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className='text-lg'>{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className='card p-2'>
            <div className='flex justify-between mb-2'>
              <div className='font-bold'>Price</div>
              <div className='font-semibold'>${product.price}</div>
            </div>
            <div className='flex justify-between mb-3'>
              <div className='font-bold'>Status</div>
              <div
                className={`rounded-md px-3 py-1 ml-2 whitespace-nowrap ${
                  product.countInStock > 0
                    ? "bg-green-400/50 text-green-800"
                    : "bg-red-400/50 text-red-800"
                }`}>
                {product.countInStock > 0 ? "In stock" : "Out of stock"}
              </div>
            </div>
            <button className='primary-button w-full' onClick={handleAddToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
