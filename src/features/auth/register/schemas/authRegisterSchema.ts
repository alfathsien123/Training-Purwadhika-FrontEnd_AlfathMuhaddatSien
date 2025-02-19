import * as Yup from 'yup'

export const authRegisterSchema = Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email must be filled'),
    password: Yup.string().required('Password must be filled'),
    name: Yup.string().required('Name must be filled'),
    role: Yup.string().required("Role must be filled")
})