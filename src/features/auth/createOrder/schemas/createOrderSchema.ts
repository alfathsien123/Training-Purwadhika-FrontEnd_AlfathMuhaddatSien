import * as Yup from 'yup'

export const createOrderSchema = Yup.object().shape({
    company: Yup.string().required('Company must be filled'),
    discount: Yup.number().required('Discount must be filled'),
    tax: Yup.number().required('Tax must be filled'),
    poItems: Yup.array().min(1,"At least 1 PO Item is required")
})