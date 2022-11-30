import Layout from "../components/Layout";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import Link from "next/link";
import * as yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { getError } from "../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(5, "password is more than 5 chars")
    .required("Please enter a password"),
});

const login = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validateOnBlur: true,
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          ...values,
        });
        if (result.error) {
          toast.error(result.error);
        }
      } catch (error) {
        toast.error(getError(error));
      }
    },
  });

  return (
    <Layout title='Login'>
      <form className='mx-auto max-w-screen-md' onSubmit={formik.handleSubmit}>
        <h1 className='mb-4 text-xl font-semibold'>Login</h1>
        <div className='mb-4'>
          <label
            htmlFor='email'
            className={`block text-sm font-bold ${
              formik.touched.email && formik.errors.email ? "text-red-400" : ""
            } `}>
            {formik.touched.email && formik.errors.email
              ? formik.errors.email
              : "Email"}
          </label>
          <input
            type='email'
            className='w-full py-2 border rounded-lg mt-2 focus:ring-1 focus:outline-none indent-2 bg-slate-100/75 hover:bg-white focus:ring-gray-600'
            id='email'
            autoFocus={true}
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='password'
            className={`block text-sm font-bold ${
              formik.touched.password && formik.errors.password
                ? "text-red-400"
                : ""
            } `}>
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : "Password"}
          </label>
          <input
            type='password'
            className='w-full py-2 border rounded-lg mt-2 focus:ring-1 focus:outline-none indent-2 bg-slate-100/75 hover:bg-white focus:ring-gray-600'
            id='password'
            autoComplete='false'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className='mb-4'>
          <button className='primary-button'>Login</button>
        </div>
        <div className='mb-4'>
          Don&nbsp;t have an account? &nbsp;
          <Link
            href='/register'
            className='font-semibold text-blue-700/75 hover:animate-pulse'>
            Register
          </Link>
        </div>
      </form>
    </Layout>
  );
};

export default login;
