import * as yup from 'yup';
import { useFormik } from 'formik';
import { selectorUser } from '@/store/user/selectors';
import { useAppSelector } from '@/utils/hooks';

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

export interface IProfileChangeFormValues {
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
}

export const useProfileChangeFormik = ({ onSubmit }: IParams) => {
  const {
    first_name: firstName,
    second_name: secondName,
    display_name: displayName,
    login,
    email,
    phone,
  } = useAppSelector(selectorUser)!;

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
    initialValues: {
      firstName,
      secondName,
      displayName,
      login,
      email,
      phone,
    },
    validationSchema,
    onSubmit,
  });
};
