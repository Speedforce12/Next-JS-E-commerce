import React, { useContext, useEffect, useState } from "react";
import CheckoutWizard from "../components/CheckoutWizard";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as yup from "yup";
import { Store } from "../utils/store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const validationSchema = yup.object({
  fullName: yup.string().required("Full Name is required"),
  address: yup.string().required("Please enter an address"),
  city: yup.string().required("Please enter a city"),
  postalCode: yup.string().required("Please enter a postal code"),
  country: yup.string().required("Country must be entered"),
});

const shipping = () => {
  const { state, dispatch } = useContext(Store);
  const [values, setValues] = useState({});
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValues(shippingAddress);
  }, [shippingAddress]);

  const formik = useFormik({
    initialValues: values,

    validateOnBlur: true,
    validationSchema: validationSchema,
    enableReinitialize: true,

    onSubmit: (values) => {
      const { fullName, address, city, postalCode, country } = values;
      dispatch({ type: "SAVE_SHIPPING_INFO", payload: values });
      Cookies.set(
        "cart",
        JSON.stringify({
          ...state,
          shippingAddress: { fullName, address, city, postalCode, country },
        })
      );
      router.push("/payment");
    },
  });

  return (
    <Layout title='Shipping Address'>
      <CheckoutWizard activeStep={1} />
      <form className='mx-auto max-w-screen-md' onClick={formik.handleSubmit}>
        <h1 className='font-semibold text-lg'>Shipping Address</h1>
        <div className='mb-4 mt-4'>
          <label
            htmlFor='fullName'
            className={`block text-sm font-bold ${
              formik.touched.fullName && formik.errors.fullName
                ? "text-red-400"
                : "text-black"
            } `}>
            {formik.touched.fullName && formik.errors.fullName
              ? formik.errors.fullName
              : "Full Name"}
          </label>
          <input
            type='fullName'
            className='w-full py-2 border rounded-lg mt-2 focus:ring-1 focus:outline-none indent-2 bg-slate-100/75 hover:bg-white focus:ring-gray-600'
            id='fullName'
            autoFocus={true}
            onChange={formik.handleChange}
            value={formik.values.fullName}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='address'
            className={`block text-sm font-bold ${
              formik.touched.address && formik.errors.address
                ? "text-red-400"
                : "text-black"
            } `}>
            {formik.touched.address && formik.errors.address
              ? formik.errors.address
              : "Street Address"}
          </label>
          <input
            type='address'
            className='w-full py-2 border rounded-lg mt-2 focus:ring-1 focus:outline-none indent-2 bg-slate-100/75 hover:bg-white focus:ring-gray-600'
            id='address'
            onChange={formik.handleChange}
            value={formik.values.address}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='city'
            className={`block text-sm font-bold ${
              formik.touched.city && formik.errors.city
                ? "text-red-400"
                : "text-black"
            } `}>
            {formik.touched.city && formik.errors.city
              ? formik.errors.city
              : "City"}
          </label>
          <input
            type='city'
            className='w-full py-2 border rounded-lg mt-2 focus:ring-1 focus:outline-none indent-2 bg-slate-100/75 hover:bg-white focus:ring-gray-600'
            id='city'
            onChange={formik.handleChange}
            value={formik.values.city}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='postalCode'
            className={`block text-sm font-bold ${
              formik.touched.postalCode && formik.errors.postalCode
                ? "text-red-400"
                : "text-black"
            } `}>
            {formik.touched.postalCode && formik.errors.postalCode
              ? formik.errors.postalCode
              : "Postal Code"}
          </label>
          <input
            type='postalCode'
            className='w-full py-2 border rounded-lg mt-2 focus:ring-1 focus:outline-none indent-2 bg-slate-100/75 hover:bg-white focus:ring-gray-600'
            id='postalCode'
            onChange={formik.handleChange}
            value={formik.values.postalCode}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='country'
            className={`block text-sm font-bold ${
              formik.touched.country && formik.errors.country
                ? "text-red-400"
                : "text-black"
            } `}>
            {formik.touched.country && formik.errors.country
              ? formik.errors.country
              : "Country"}
          </label>
          <input
            type='country'
            className='w-full py-2 border rounded-lg mt-2 focus:ring-1 focus:outline-none indent-2 bg-slate-100/75 hover:bg-white focus:ring-gray-600'
            id='country'
            onChange={formik.handleChange}
            value={formik.values.country}
            onBlur={formik.handleBlur}
          />
        </div>
        <div>
          <button className='primary-button'>Next</button>
        </div>
      </form>
    </Layout>
  );
};

export default shipping;

shipping.auth = true;
