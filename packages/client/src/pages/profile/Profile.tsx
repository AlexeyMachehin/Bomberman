import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  Stack,
  Button,
  Avatar,
  Fab,
  Box,
} from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Link } from 'react-router-dom';
import { useState, useEffect, ChangeEvent } from 'react';
import { userService } from '../../service/UserService';
import { Route as RoutePath } from '../../const';

// Temporary data
const user = {
  id: 123,
  firstName: 'Petya',
  secondName: 'Pupkin',
  displayName: 'PetyaTop',
  login: 'userLogin',
  email: 'my@email.com',
  phone: '89223332211',
  avatar: '',
  record: '2530',
};

const Profile = () => {
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUploadClick = async () => {
    if (!file) {
      return;
    }

    try {
      await userService.updateAvatar(file);
      setFile(undefined);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Typography component="h1" variant="h4" mb={3}>
        Профиль
      </Typography>
      <Grid container spacing={3}>
        <Grid
          container
          item
          direction="column"
          xs={12}
          md={3}
          alignItems="center">
          <Avatar
            src={user.avatar}
            alt={user.displayName}
            sx={{ width: 200, height: 200, fontSize: 48 }}>
            {`${user.firstName[0]}${user.secondName[0]}`}
          </Avatar>

          <Box sx={{ transform: 'translateY(-50%)' }}>
            <input
              accept="image/*"
              id="contained-button-file"
              type="file"
              hidden
              onChange={handleFileChange}
            />
            <label htmlFor="contained-button-file">
              <Fab component="span">
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
          </Box>

          {preview && (
            <>
              <Avatar src={preview} sx={{ width: 100, height: 100 }} />
              <Button
                variant="outlined"
                component="label"
                onClick={handleUploadClick}>
                Сохранить аватар
              </Button>
            </>
          )}

          <Typography component="h3" variant="h5" mt={3} mb={1}>
            {user.firstName} {user.secondName}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center" mb={3}>
            <EmojiEvents fontSize="large" sx={{ color: 'orange' }} />
            <Typography variant="h6">{user.record}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={9}>
          <List>
            <ListItem disableGutters>
              <ListItemText primary="Имя" secondary={user.firstName} />
            </ListItem>
            <Divider />
            <ListItem disableGutters>
              <ListItemText primary="Фамилия" secondary={user.secondName} />
            </ListItem>
            <Divider />
            <ListItem disableGutters>
              <ListItemText primary="Имя в игре" secondary={user.displayName} />
            </ListItem>
            <Divider />
            <ListItem disableGutters>
              <ListItemText primary="Логин" secondary={user.login} />
            </ListItem>
            <Divider />
            <ListItem disableGutters>
              <ListItemText primary="Email" secondary={user.email} />
            </ListItem>
            <Divider />
            <ListItem disableGutters>
              <ListItemText primary="Телефон" secondary={user.phone} />
            </ListItem>
            <Divider />
          </List>
          <Stack direction="row" spacing={1} py={2}>
            <Button
              variant="outlined"
              component={Link}
              to={RoutePath.PROFILE_CHANGE}>
              Изменить данные
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to={RoutePath.PASSWORD_CHANGE}>
              Изменить пароль
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;
