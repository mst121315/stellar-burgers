import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../services/store';
import { fetchOrders } from '../../features/order/ordersSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    items: orders,
    loading,
    error
  } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
