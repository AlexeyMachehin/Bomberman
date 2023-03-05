import * as yup from 'yup';
import { useFormik } from 'formik';

interface IFormValue {
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
}

interface IParams {
  onSubmit(values: IFormValue): void;
}

const initialValues = {
  firstName: '',
  secondName: '',
  displayName: '',
  login: '',
  email: '',
  phone: '',
};

export type IProfileChangeFormValues = typeof initialValues;

export const useProfileChangeFormik = ({ onSubmit }: IParams) => {
  const validationSchema = yup.object({
    firstName: yup.string().required('First name is required'),
    secondName: yup.string().required('Second name is required'),
    displayName: yup.string().required('Display name is required'),
    login: yup.string().required('Login is required'),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    phone: yup.string().required('Phone is required'),
  });

  return useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit,
  });
};
