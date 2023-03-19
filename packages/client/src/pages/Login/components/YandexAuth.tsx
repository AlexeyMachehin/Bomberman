import { REDIRECT_URI_DEV, REDIRECT_URI_PROD } from '@/common/consts/consts';
import { getServiceId } from '@/store/user/thunk';
import { useAppDispatch } from '@/utils/hooks';
import { Button } from '@mui/material';

import classes from './yandexAuth.module.css';

function YandexAuth() {
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    dispatch(getServiceId()).then(result => {
      if (process.env.NODE_ENV === 'development') {
        document.location = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${result.payload.service_id}&redirect_uri=${REDIRECT_URI_DEV}`;
      } else {
        document.location = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${result.payload.service_id}&redirect_uri=${REDIRECT_URI_PROD}`;
      }
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
