import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { REDIRECT_URI_PROD, REDIRECT_URI_DEV } from '@/common/consts/consts';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { getUser, signInYandex } from '@/store/user/thunk';
import { getUserTheme } from '@/store/theme/thunk';

export function Layout({ children }: { children: JSX.Element }) {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const currentUser = useAppSelector(state => state.userReducer.user);

  const oAuth = () => {
    if (location.search) {
      const code = new RegExp('code=(.*)').exec(location.search);
      if (code) {
        const codeNumbers = code[1];
        dispatch(
          signInYandex({
            code: codeNumbers,
            redirect_uri:
              process.env.NODE_ENV === 'development'
                ? REDIRECT_URI_DEV
                : REDIRECT_URI_PROD,
          })
        ).then(() => dispatch(getUser()));
      }
      return;
    }
    dispatch(getUser());
  };

  useEffect(() => {
    oAuth();
    dispatch(getUserTheme(currentUser?.id));
  }, []);

  return children;
}
