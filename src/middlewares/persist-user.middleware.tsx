import {useMe} from '@/api/auth/api';
import LoaderPage from '@/components/loaderr-page';
import {TOKEN_KEY} from '@/lib/constant';
import {Navigate, Outlet} from 'react-router';
import Cookies from 'universal-cookie';

const PersistUserMiddleware = () => {
  const cookie = new Cookies();
  const token = cookie.get(TOKEN_KEY);
  const {data, isLoading, isFetched, isError} = useMe({enabled: !!token, select: res => res.data});
  // Get User Data from Store or useMe
  // Check if user data Persist then redirect to dashboard because his logging already
  if (!token) {
    return <Outlet />;
  }
  if (isLoading) return <LoaderPage />;

  if (isError && isFetched) {
    cookie.remove(TOKEN_KEY);
    return <Outlet />;
  }
  if (data) {
    return <Navigate to={'/'} />;
  }
  return null;
};

export default PersistUserMiddleware;
