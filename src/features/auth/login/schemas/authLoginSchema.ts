import * as Yup from 'yup'

export const authLoginSchema = Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email must be filled'),
    password: Yup.string().required('Password must be filled'),
})