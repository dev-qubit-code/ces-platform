import {useMe} from '@/api/auth/api';
import LoaderPage from '@/components/loaderr-page';
import {TOKEN_KEY} from '@/lib/constant';
import {useUser} from '@/store/user.store';
import {Navigate, Outlet} from 'react-router';
import Cookies from 'universal-cookie';

const AuthMiddleware = () => {
  const cookie = new Cookies();
  const token = cookie.get(TOKEN_KEY);
  const {data, isLoading, isFetched, isError} = useMe({enabled: !!token, select: res => res.data});
  const {user, setUser} = useUser();

  if (!token) {
    return <Navigate to={'/login'} />;
  }
  if (isLoading) return <LoaderPage />;

  if (isError && isFetched) {
    return <Navigate to={'/login'} />;
  }
  if (!isError && isFetched && data) {
    if (!user) {
      setUser({
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role
      });
    }
    return <Outlet />;
  }
  return null;
};

export default AuthMiddleware;
