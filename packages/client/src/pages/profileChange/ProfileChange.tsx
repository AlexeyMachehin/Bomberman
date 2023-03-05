import { Container, Typography, Button, Stack, TextField } from '@mui/material';
import {
  IProfileChangeFormValues,
  useProfileChangeFormik,
} from '../../features/profileChange/hooks/useProfileChangeFormik';
import { userService } from '../../service/UserService';

const ProfileChange = () => {
  const handleSubmit = async (values: IProfileChangeFormValues) => {
    await userService.updateProfile({
      first_name: values.firstName,
      second_name: values.secondName,
      display_name: values.displayName,
      login: values.login,
      email: values.email,
      phone: values.phone,
    });
  };

  const formik = useProfileChangeFormik({ onSubmit: handleSubmit });

  return (
    <Container>
      <Typography component="h1" variant="h4" mb={3}>
        Изменить данные
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={1} width={{ xs: '100%', md: '50%' }} mb={2}>
          <TextField
            required
            id="firstName"
            label="Имя"
            name="firstName"
            autoFocus
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            onChange={formik.handleChange}
          />
          <TextField
            required
            id="secondName"
            label="Фамилия"
            name="secondName"
            error={
              formik.touched.secondName && Boolean(formik.errors.secondName)
            }
            helperText={formik.touched.secondName && formik.errors.secondName}
            onChange={formik.handleChange}
          />
          <TextField
            required
            id="displayName"
            label="Имя в игре"
            name="displayName"
            error={
              formik.touched.displayName && Boolean(formik.errors.displayName)
            }
            helperText={formik.touched.displayName && formik.errors.displayName}
            onChange={formik.handleChange}
          />
          <TextField
            required
            id="login"
            label="Логин"
            name="login"
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
            onChange={formik.handleChange}
          />
          <TextField
            required
            id="email"
            label="Email"
            name="email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            onChange={formik.handleChange}
          />
          <TextField
            required
            id="phone"
            label="Телефон"
            name="phone"
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
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

export default ProfileChange;
