import reducer, { fetchOrders } from './ordersSlice';
import { TOrder } from '@utils-types';

describe('ordersSlice', () => {
  const initialState = { items: [], loading: false, error: null };

  it('fetchOrders.pending: ставит loading в true и обнуляет error', () => {
    const next = reducer(initialState, fetchOrders.pending('', undefined));
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('fetchOrders.fulfilled: записывает данные и ставит loading в false', () => {
    const orders: TOrder[] = [
      { _id: '1', ingredients: [], status: 'done', name: 'Order 1', number: 1, createdAt: '', updatedAt: '' }
    ];
    const next = reducer(initialState, fetchOrders.fulfilled(orders, '', undefined));
    expect(next.loading).toBe(false);
    expect(next.items).toEqual(orders);
    expect(next.error).toBeNull();
  });

  it('fetchOrders.rejected: ставит error и loading в false', () => {
    const error = { message: 'Ошибка сервера' };
    const next = reducer(initialState, fetchOrders.rejected(error as any, '', undefined));
    expect(next.loading).toBe(false);
    expect(next.error).toBe('Ошибка сервера');
  });
});
