import * as yup from 'yup'
import { useFormik } from 'formik'

interface IFormValue {
  email: string;
  login: string;
  password: string;
  passwordAgain: string;
  firstName: string;
  surname: string;
  phone: string;
}

interface IParams {
  onSubmit(values: IFormValue): void;
}

const initialValues = {
  email: '',
  login: '',
  password: '',
  passwordAgain: '',
  firstName: '',
  surname: '',
  phone: ''
}

export type ISignupFormValues = typeof initialValues

export const useSignupFormik = ({onSubmit}:IParams) => {

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    phone: yup
      .string()
      .required('Phone is required'),
    login: yup
      .string()
      .required('Login is required'),
    firstName: yup
      .string()
      .required('First name is required'),
    surname: yup
      .string()
      .required('Surname is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    passwordAgain: yup
      .string()
      .required('Password is required')
      .min(8, 'Password should be of minimum 8 characters length')
      .oneOf([yup.ref('password'), null], 'Passwords must match')
  });

  return useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit,
  });
}

