import { getUser, signInYandex } from '../../../src/store/user/thunk';
import { useAppDispatch } from '../../../src/utils/hooks';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { REDIRECT_URI } from '@/common/consts/consts';

export function Layout({ children }: { children: JSX.Element }) {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const oAuth = () => {
    if (location.search) {
      const code = new RegExp('code=(.*)').exec(location.search);
      if (code) {
        const codeNumbers = code[1];
        dispatch(
          signInYandex({ code: codeNumbers, redirect_uri: REDIRECT_URI })
        ).then(() => dispatch(getUser()));
      }
      return;
    }
    dispatch(getUser());
  };

  useEffect(() => {
    oAuth();
  }, []);

  return children;
}
