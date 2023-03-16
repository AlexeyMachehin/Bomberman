import { Container, Typography, Button, Stack, TextField } from '@mui/material';
import {
  IPasswordChangeFormValues,
  usePasswordChangeFormik,
} from '../../features/passwordChange/hooks/usePasswordChangeFormik';
import { useAppDispatch } from '@/utils/hooks';
import { useNavigate } from 'react-router-dom';
import { getUser, updatePassword } from '@/store/user/thunk';
import { Route as RoutePath } from '@/const';
import { StartPageButton } from '@/features/startPageButton/StartPageButton';
import { GoBackButton } from '@/features/goBackButton/GoBackButton';

const PasswordChange = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: IPasswordChangeFormValues) => {
    dispatch(
      updatePassword({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      })
    )
      .then(() => dispatch(getUser()))
      .then(() => navigate(RoutePath.PROFILE));
  };

  const formik = usePasswordChangeFormik({ onSubmit: handleSubmit });

  return (
    <Container data-testid="passwordChange-component">
      <div className="profilePageTitle">
        <Typography component="h1" variant="h4" mb={3}>
          Change password
        </Typography>
        <StartPageButton />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={1} width={{ xs: '100%', md: '50%' }} mb={2}>
          <TextField
            required
            id="oldPassword"
            label="Current password"
            name="oldPassword"
            type="password"
            error={
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
            onChange={formik.handleChange}
          />
          <TextField
            required
            id="newPassword"
            label="New password"
            name="newPassword"
            type="password"
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            onChange={formik.handleChange}
          />
        </Stack>
        <Button type="submit" variant="contained">
          Save
        </Button>
        <GoBackButton />
      </form>
    </Container>
  );
};

export default PasswordChange;
