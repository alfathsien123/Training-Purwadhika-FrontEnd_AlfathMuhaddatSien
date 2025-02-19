'use client'
import 'daisyui/dist/full.css';
import { Field, Formik, Form, ErrorMessage } from 'formik';
import { authRegisterSchema } from '@/features/auth/register/schemas/authRegisterSchema';
import { HiOutlineMail } from 'react-icons/hi';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const RegisterPage = () => {

    const handleRegister = async (data: { email: string; name: string; password: string; role: string }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/auth/register`, data);
            toast.success(response.data.message, { autoClose: 1500 });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Something went wrong!", { autoClose: 1500 });
            } else {
                toast.error("Something went wrong!", { autoClose: 1500 });
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
                    name: "",
                    role: "",
                }}
                validationSchema={authRegisterSchema}
                onSubmit={(values, { setSubmitting }) => {
                    handleRegister({
                        email: values.email,
                        name: values.name,
                        password: values.password,
                        role: values.role,
                    }).finally(() => setSubmitting(false));
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <h2 className="text-2xl mb-4">Register User</h2>
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
                                    name="name"
                                    type="text"
                                    className="input grow input-bordered w-full pl-3 rounded-full"
                                    placeholder="Name"
                                />
                            </div>
                            <ErrorMessage name="name" component={'div'} className='text-red-500' />
                            <div className="mb-4 flex items-center relative">
                                <Field
                                    name="password"
                                    type="password"
                                    className="input grow input-bordered w-full pl-3 rounded-full"
                                    placeholder="Password"
                                />
                            </div>
                            <ErrorMessage name="password" component={'div'} className='text-red-500' />
                            <div className="mb-4 flex items-center relative">
                                <Field
                                    as="select"
                                    name="role"
                                    className="select select-bordered w-full pl-3 rounded-full"
                                >
                                    <option value="">{""}</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </Field>
                            </div>
                            <ErrorMessage name="role" component={'div'} className='text-red-500' />
                        </div>
                        <button type="submit" className="btn bg-green-700 w-full rounded-full text-white" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : 'Register'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterPage;
