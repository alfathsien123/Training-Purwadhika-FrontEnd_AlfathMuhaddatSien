'use client'
import 'daisyui/dist/full.css';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { authLoginSchema } from '@/features/auth/login/schemas/authLoginSchema';
import { HiOutlineMail } from 'react-icons/hi';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { redirect } from 'next/navigation';
import authStore from '@/zustand/authStore';

const delayTimeout = 1000;

const LoginPage = () => {
    const setAuth = authStore((state)=> state.setAuth);
    
    function delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    let isSuccessLogin = false;
    const handleLogin = async (data: { email: string;  password: string;  }) => {
        try {

            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/auth/login`, data);
            setAuth({
                token: response.data.data.token,
                email: response.data.data.email,
                name: response.data.data.name,
                role: response.data.data.role,
            })
            
            toast.success(response.data.message, { autoClose: delayTimeout });
            isSuccessLogin = true

        } catch (error) {

            isSuccessLogin = false
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something went wrong!", { autoClose: delayTimeout });
            } else {
                toast.error("Something went wrong!", { autoClose: delayTimeout });
            }
            // console.log((error as {message: string}).message);
            
        } finally {
            // console.log(isSuccessLogin); 
            
            if (isSuccessLogin) {
                await delay(delayTimeout);
                redirect("/dashboard");
            }
        }
    };
    
    return (
        <div className="flex justify-center items-center h-screen">
            <ToastContainer />
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={authLoginSchema}
                onSubmit={(values, { 
                    setSubmitting,
                    resetForm 
                }) => {
                    handleLogin({
                        email: values.email,
                        password: values.password,
                    }).finally(() => {setSubmitting(false);});
                    if (isSuccessLogin) {
                        resetForm()
                    }
                    
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <h2 className="text-2xl mb-4">Login</h2>
                        <div className='w-full'>
                            <div className="mb-4 flex items-center relative input input-bordered gap-2">
                                <HiOutlineMail />
                                <Field
                                    name="email"
                                    type="text"
                                    className="grow w-full pl-3 rounded-full"
                                    placeholder="Email"
                                />
                            </div>
                            <ErrorMessage name="email" component={'div'} className='text-red-500' />
                            <div className="mb-4 flex items-center relative">
                                <Field
                                    name="password"
                                    type="password"
                                    className="input grow input-bordered w-full pl-3 rounded-full"
                                    placeholder="Password"
                                />
                            </div>
                            <ErrorMessage name="password" component={'div'} className='text-red-500' />
                        </div>
                        <button type="submit" className="btn bg-green-700 w-full rounded-full text-white" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Login'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginPage;
