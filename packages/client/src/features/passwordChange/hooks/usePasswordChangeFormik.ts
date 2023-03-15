import * as yup from 'yup';
import { useFormik } from 'formik';

interface IFormValue {
  oldPassword: string;
  newPassword: string;
}

interface IParams {
  onSubmit(values: IFormValue): void;
}

const initialValues = {
  oldPassword: '',
  newPassword: '',
};

export type IPasswordChangeFormValues = typeof initialValues;

export const usePasswordChangeFormik = ({ onSubmit }: IParams) => {
  const validationSchema = yup.object({
    oldPassword: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Old password is required'),
    newPassword: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('New password is required'),
  });

  return useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit,
  });
};
