import { Container, Typography, Button, Stack, TextField } from '@mui/material';
import {
  IProfileChangeFormValues,
  useProfileChangeFormik,
} from '@/features/profileChange/hooks/useProfileChangeFormik';
import { getUser, updateProfile } from '@/store/user/thunk';
import { useAppDispatch } from '@/utils/hooks';
import { useNavigate } from 'react-router-dom';
import { StartPageButton } from '@/features/startPageButton/StartPageButton';
import { GoBackButton } from '@/features/goBackButton/GoBackButton';
import { Route as RoutePath } from '@/const';

const ProfileChange = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: IProfileChangeFormValues) => {
    dispatch(
      updateProfile({
        first_name: values.firstName,
        second_name: values.secondName,
        display_name: values.displayName,
        login: values.login,
        email: values.email,
        phone: values.phone,
      })
    )
      .then(() => dispatch(getUser()))
      .then(() => navigate(RoutePath.PROFILE));
  };

  const formik = useProfileChangeFormik({ onSubmit: handleSubmit });
  
  if (!formik) return null;

  return (
    <Container data-testid="profileChange-component">
      <div className="profilePageTitle">
        <Typography component="h1" variant="h4" mb={3}>
          Change data
        </Typography>
        <StartPageButton />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={1} width={{ xs: '100%', md: '50%' }} mb={2}>
          <TextField
            value={formik.values.firstName}
            required
            id="firstName"
            label="Name"
            name="firstName"
            autoFocus
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            onChange={formik.handleChange}
          />
          <TextField
            value={formik.values.secondName}
            required
            id="secondName"
            label="Surname"
            name="secondName"
            error={
              formik.touched.secondName && Boolean(formik.errors.secondName)
            }
            helperText={formik.touched.secondName && formik.errors.secondName}
            onChange={formik.handleChange}
          />
          <TextField
            value={formik.values.displayName}
            required
            id="displayName"
            label="Name in game"
            name="displayName"
            error={
              formik.touched.displayName && Boolean(formik.errors.displayName)
            }
            helperText={formik.touched.displayName && formik.errors.displayName}
            onChange={formik.handleChange}
          />
          <TextField
            value={formik.values.login}
            required
            id="login"
            label="Login"
            name="login"
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
            onChange={formik.handleChange}
          />
          <TextField
            value={formik.values.email}
            required
            id="email"
            label="Email"
            name="email"
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            onChange={formik.handleChange}
          />
          <TextField
            value={formik.values.phone}
            required
            id="phone"
            label="Phone"
            name="phone"
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
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

export default ProfileChange;
