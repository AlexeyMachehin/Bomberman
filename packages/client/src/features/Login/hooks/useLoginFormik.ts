import * as yup from 'yup'
import { useFormik } from 'formik'

interface IFormValue {
  login: string;
  password: string;
}

interface IParams {
  onSubmit(values: IFormValue): void;
}

const initialValues = {
  login: '',
  password: '',
}

export type ILoginFormValues = typeof initialValues

export const useLoginFormik = ({onSubmit}:IParams) => {

  const validationSchema = yup.object({
    login: yup
      .string()
      .required('Login is required'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  return useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit,
  });
}

