import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';

type ProtectedRouteProps = {
  children: ReactNode;
  guestOnly?: boolean;
};

const userDataSelector = (state: any) => state.auth.user;

export const ProtectedRoute = ({
  guestOnly = false,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { user, isAuthChecked } = useAppSelector((state) => state.auth);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (user && guestOnly) {
    const { from } = (location.state as any) || { from: { pathname: '/' } };
    return <Navigate replace to={from} />;
  }

  if (!user && !guestOnly) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return children;
};
