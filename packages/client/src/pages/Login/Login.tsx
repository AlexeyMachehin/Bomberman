import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../utils/hooks';
import { getUser, login } from '../../store/user/thunk';
import { Avatar, Button, TextField } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {
  ILoginFormValues,
  useLoginFormik,
} from '../../features/Login/hooks/useLoginFormik';
import YandexAuth from './components/YandexAuth';
import Link from '@mui/material/Link';
import styles from './Login.module.css';

const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: ILoginFormValues) => {
    dispatch(
      login({
        login: values.login,
        password: values.password,
      })
    )
      .then(() => dispatch(getUser()))
      .then(() => navigate('/'));
  };
  const formik = useLoginFormik({ onSubmit: handleSubmit });

  return (
    <div data-testid="Login-component" className={styles.mainWrapper}>
      <div className={styles.mainBackground} />
      <div className={styles.loginWrapper}>
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
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
            autoFocus
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <YandexAuth />
          <Link href="#" onClick={() => navigate('/signup')}>
            "Don't have an account? Sign Up"
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
