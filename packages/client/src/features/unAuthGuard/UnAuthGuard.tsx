import { useAppSelector } from '../../../src/utils/hooks';
import { useSearchParams } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';
import { Route as RoutePath } from '@/const';

export default function UnAuthGuard() {
  const user = useAppSelector(state => state.userReducer.user);
  const [searchParams] = useSearchParams();

  if (!user) {
    return <Outlet />;
  }

  return <Navigate to={searchParams.get('from') ?? RoutePath.INDEX} />;
}
