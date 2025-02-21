'use client'
import { createOrderSchema } from '@/features/auth/createOrder/schemas/createOrderSchema';
import { Formik, Field, ErrorMessage } from 'formik';
import React from 'react';

const CreateProductPage: React.FC = () => {
    const handleAddProduct = () => {
        // Handle add product logic here
    };

    const handleSubmit = (values: any) => {
        // Handle form submission logic here
        console.log(values);
    };

    return (
        <section className='grid grid-cols-1 py05 px-16 gap-10'>
            <Formik
                initialValues={{
                    company: '',
                    productName: '',
                    productPrice: '',
                    productQty: '',
                    discount: '',
                    tax: '',
                    totalPrice: '',
                    grandAmount: '',
                    poItems: []
                }}
                validationSchema={createOrderSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, values, setFieldValue }) => {
                    const handleDeleteItem = (index: number) => {
                        const newPoItems = values.poItems.filter((_: any, i: number) => i !== index);
                        setFieldValue('poItems', newPoItems);
                    };

                    const calculateTotals = () => {
                        const totalPrice = values.poItems.reduce((acc: number, item: any) => acc + (item.price * item.qty), 0);
                        const discount = parseFloat(values.discount) || 0;
                        const tax = parseFloat(values.tax) || 0;
                        const discountAmount = (totalPrice * discount) / 100;
                        const taxAmount = (totalPrice * tax) / 100;
                        const grandAmount = totalPrice - discountAmount + taxAmount;
                        return { totalPrice, grandAmount };
                    };

                    const totals = calculateTotals();
                    const totalPrice = totals.totalPrice;
                    const grandAmount = totals.grandAmount;

                    return (
                        <form onSubmit={handleSubmit} className="p-6 bg-base-200 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">Create Product</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Company Name:</label>
                                <Field
                                    type="text"
                                    name="company"
                                    className="input input-bordered w-full"
                                />
                                <ErrorMessage name="company" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Product Name:</label>
                                <Field
                                    type="text"
                                    name="productName"
                                    className="input input-bordered w-full"
                                />
                                <ErrorMessage name="productName" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Product Price:</label>
                                <Field
                                    type="text"
                                    name="productPrice"
                                    className="input input-bordered w-full"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('productPrice', e.target.value)}
                                />
                                <ErrorMessage name="productPrice" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Product Quantity:</label>
                                <Field
                                    type="text"
                                    name="productQty"
                                    className="input input-bordered w-full"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('productQty', e.target.value)}
                                />
                                {/* <ErrorMessage name="productQty" component="div" className="text-red-500 text-sm" /> */}
                            </div>
                            <button type="button" 
                                    onClick={
                                        ()=> {
                                            setFieldValue('poItems',
                                                [...values.poItems, 
                                                    {itemName: values.productName, price: parseFloat(values.productPrice), qty: parseInt(values.productQty)}
                                                ])
                                                console.log(values.poItems);
                                            }} 
                                    className="btn bg-green-700 text-white w-full mb-4">Add Product</button>
                            <section className="mt-6">
                                <h2 className="text-2xl font-bold mb-4">Product Items</h2>
                                <ErrorMessage name="poItems" component="div" className="text-red-500 text-sm mt-[-20px] mb-2" />
                                <table className="table-auto w-full mb-7">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2">Item Name</th>
                                            <th className="px-4 py-2">Price</th>
                                            <th className="px-4 py-2">Quantity</th>
                                            <th className="px-4 py-2">Total</th>
                                            <th className="px-4 py-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {values.poItems.map((item: any, index) => (
                                            <tr key={index}>
                                                <td className="border px-4 py-2">{item.itemName}</td>
                                                <td className="border px-4 py-2">{item.price.toFixed(2)}</td>
                                                <td className="border px-4 py-2">{item.qty}</td>
                                                <td className="border px-4 py-2">{(item.price * item.qty).toFixed(2)}</td>
                                                <td className="border px-4 py-2 text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteItem(index)}
                                                        className="btn bg-red-700 text-white"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </section>
                            <h2 className="text-2xl font-bold mb-4">Amount</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Total Price:</label>
                                <Field type="text" name="totalPrice" value={totalPrice.toFixed(2)} disabled className="input input-bordered w-full" />
                                <ErrorMessage name="totalPrice" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Discount (%):</label>
                                <Field
                                    type="text"
                                    name="discount"
                                    className="input input-bordered w-full"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('discount', e.target.value)}
                                />
                                <ErrorMessage name="discount" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Tax (%):</label>
                                <Field
                                    type="text"
                                    name="tax"
                                    className="input input-bordered w-full"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('tax', e.target.value)}
                                />
                                <ErrorMessage name="tax" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Grand Amount:</label>
                                <Field type="text" name="grandAmount" value={grandAmount.toFixed(2)} disabled className="input input-bordered w-full" />
                                <ErrorMessage name="grandAmount" component="div" className="text-red-500 text-sm" />
                            </div>
                            <button type="submit" className="btn bg-green-700 text-white w-full">Submit Purchase Order</button>
                        </form>
                    );
                }}
            </Formik>
        </section>
    );
};

export default CreateProductPage;