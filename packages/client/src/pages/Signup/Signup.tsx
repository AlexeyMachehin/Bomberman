import { FC } from 'react';
import { Avatar, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUser, signup } from '../../store/user/thunk';
import { useAppDispatch } from '../../utils/hooks';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Typography from '@mui/material/Typography';
import {
  ISignupFormValues,
  useSignupFormik,
} from '../../features/Signup/hooks/useSignupFormik';
import styles from './Signup.module.css';

const Signup: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values: ISignupFormValues) => {
    dispatch(
      signup({
        first_name: values.firstName,
        second_name: values.surname,
        email: values.email,
        phone: values.phone,
        login: values.login,
        password: values.password,
      })
    )
      .then(() => dispatch(getUser()))
      .then(() => navigate('/'));
  };

  const formik = useSignupFormik({ onSubmit: handleSubmit });

  return (
    <div data-testid="Signup-component" className={styles.mainWrapper}>
      <div className={styles.loginWrapper}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <CheckBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Signup
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            value={formik.values.email}
            onChange={formik.handleChange}
            margin="normal"
            required
            fullWidth
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={formik.values.login}
            onChange={formik.handleChange}
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
            name="login"
            autoComplete="login"
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
          <TextField
            value={formik.values.firstName}
            onChange={formik.handleChange}
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="firstName"
            autoComplete="name"
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            value={formik.values.surname}
            onChange={formik.handleChange}
            margin="normal"
            required
            fullWidth
            id="Surname"
            label="Surname"
            name="surname"
            autoComplete="surname"
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            helperText={formik.touched.surname && formik.errors.surname}
          />
          <TextField
            value={formik.values.phone}
            onChange={formik.handleChange}
            margin="normal"
            required
            fullWidth
            id="Phone"
            label="Phone"
            name="phone"
            autoComplete="phone"
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <TextField
            value={formik.values.password}
            onChange={formik.handleChange}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            value={formik.values.passwordAgain}
            onChange={formik.handleChange}
            margin="normal"
            required
            fullWidth
            name="passwordAgain"
            label="Password-Again"
            type="password"
            id="password-again"
            error={
              formik.touched.passwordAgain &&
              Boolean(formik.errors.passwordAgain)
            }
            helperText={
              formik.touched.passwordAgain && formik.errors.passwordAgain
            }
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            size="large">
            Sign Up
          </Button>
          <Button onClick={() => navigate('/login')} fullWidth size="large">
            Login
          </Button>
        </form>
      </div>
      <div className={styles.mainBackground} />
    </div>
  );
};

export default Signup;
