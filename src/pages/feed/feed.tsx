import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../services/store';
import { RootState, AppDispatch } from '../../services/store';
import { fetchFeeds } from '../../features/feed/feedSlice';
import { fetchIngredients } from '../../features/ingredients/ingredientsSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector((state: RootState) => state.feed);
  // const orders = feed.orders;
  const { items } = useAppSelector((state: RootState) => state.ingredients);

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchIngredients());
    }
    dispatch(fetchFeeds());
  }, [dispatch, items.length]);

  if (!orders.length || loading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};
