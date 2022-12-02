import { useRouter } from "next/router";
import React from "react";
import Layout from "../components/Layout";

const unauthorized = () => {
  const router = useRouter();
    const { message } = router.query;
    
    
  return (
    <Layout title='Unauthorized'>
      <h1 className='text-xl text-center mt-20 font-bold'>ACCESS DENIED</h1>
      {message && <div className='mb-4 text-red-500 font-extrabold text-2xl text-center mt-3'>{message}</div>}
    </Layout>
  );
};

export default unauthorized;
