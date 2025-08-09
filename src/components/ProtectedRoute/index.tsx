import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactNode;
  guestOnly?: boolean;
};

const userDataSelector = (state: any) => state.auth.user;

export const ProtectedRoute = ({
  guestOnly = false,
  children
}: ProtectedRouteProps) => {
  const user = useSelector(userDataSelector);

  if (user && guestOnly) {
    return <Navigate replace to='/profile' />;
  }

  if (!user && !guestOnly) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
