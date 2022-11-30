import Head from "next/head";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify"

const Layout = ({ title, children }) => {

  return (
    <>
      <Head>
        <title>{title ? title + " | Galaxy Store" : "Galaxy Store"} </title>
        <meta name='description' content='E-commerce Site' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <ToastContainer position="top-center" limit={1}/>

      <div className='flex min-h-screen flex-col justify-between'>
        <header>
          <Header />
        </header>

        <main className='container m-auto mt-4 px-4'>{children}</main>

        <footer className='flex justify-center items-center h-10 shadow-inner'>
          <p className="font-bold">Copyright © 2022 Galaxy Store</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
