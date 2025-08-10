import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { RootState } from '../../services/store';
import { fetchOrders } from '../../features/order/ordersSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const dispatch = useAppDispatch();
  const { number } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (number && !location.state?.background) {
      navigate(location.pathname, {
        replace: true,
        state: { background: { pathname: '/profile/orders' } }
      });
    }
  }, [number, location, navigate]);

  const {
    items: orders,
    loading,
    error
  } = useAppSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
