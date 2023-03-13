import { useAppDispatch } from '../../../utils/hooks';
import { Button } from '@mui/material';
import { getServiceId } from '../../../store/user/thunk';
import { REDIRECT_URI } from '../../../common/consts/consts';
import classes from './yandexAuth.module.css';

function YandexAuth() {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(getServiceId()).then(result => {
      document.location = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${result.payload.service_id}&redirect_uri=${REDIRECT_URI}`;
    });
  };

  return (
    <Button
      variant="contained"
      sx={{
        width: '260px',
        height: '55px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        color: '#ffffff',
        borderRadius: 100,
        cursor: 'pointer',
        margin: '30px 0',
        '&:hover': {
          backgroundColor: '#000000c4',
        },
      }}
      className={classes.yandexID}
      onClick={() => handleOnClick()}>
      Войти с Яндекс ID
    </Button>
  );
}

export default YandexAuth;
