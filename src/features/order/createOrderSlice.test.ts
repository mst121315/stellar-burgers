import reducer, { createOrder, resetOrder } from './createOrderSlice';
import { TOrder } from '@utils-types';

describe('createOrderSlice', () => {
  const initialState = { order: null, loading: false, error: null };

  it('createOrder.pending: ставит loading в true и обнуляет error', () => {
    const next = reducer(initialState, createOrder.pending('', []));
    expect(next.loading).toBe(true);
    expect(next.error).toBeNull();
  });

  it('createOrder.fulfilled: записывает order и ставит loading в false', () => {
  const payload = {
    success: true,   
    name: 'Test Order',
    order: {
      _id: '1',
      ingredients: [],
      status: 'done',
      name: 'Order 1',
      number: 1,
      createdAt: '',
      updatedAt: '',
    } as TOrder
  };

  const next = reducer(initialState, createOrder.fulfilled(payload, '', []));
  expect(next.loading).toBe(false);
  expect(next.order).toEqual({success: true, name: payload.name, order: payload.order });
  expect(next.error).toBeNull();
});

  it('createOrder.rejected: ставит error и loading в false', () => {
    const error = { message: 'Ошибка сервера' };
    const next = reducer(initialState, createOrder.rejected(error as any, '', []));
    expect(next.loading).toBe(false);
    expect(next.error).toBe('Ошибка сервера');
  });

  it('resetOrder: сбрасывает state к начальному', () => {
    const prevState = { order: { name: 'X', order: {} as TOrder }, loading: true, error: 'Ошибка' };
    const next = reducer(prevState, resetOrder());
    expect(next).toEqual(initialState);
  });
});
