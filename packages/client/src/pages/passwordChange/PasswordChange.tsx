import { Container, Typography, Button, Stack, TextField } from '@mui/material';
import {
  IPasswordChangeFormValues,
  usePasswordChangeFormik,
} from '../../features/passwordChange/hooks/usePasswordChangeFormik';
import { userService } from '../../service/UserService';

const PasswordChange = () => {
  const handleSubmit = async (values: IPasswordChangeFormValues) => {
    await userService.updatePassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    });
  };

  const formik = usePasswordChangeFormik({ onSubmit: handleSubmit });

  return (
    <Container>
      <Typography component="h1" variant="h4" mb={3}>
        Изменить пароль
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={1} width={{ xs: '100%', md: '50%' }} mb={2}>
          <TextField
            required
            id="oldPassword"
            label="Текущий пароль"
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
            label="Новый пароль"
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
          Сохранить
        </Button>
      </form>
    </Container>
  );
};

export default PasswordChange;
