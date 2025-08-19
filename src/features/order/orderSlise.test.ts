import reducer, { fetchOrders } from './ordersSlice';
import { TOrder } from '@utils-types';

describe('ordersSlice reducer', () => {
  const initialState = {
    items: [] as TOrder[],
    loading: false,
    error: null as string | null
  };

  it('fetchOrders.pending — включает загрузку и очищает ошибку', () => {
    const action = { type: fetchOrders.pending.type };
    const nextState = reducer(initialState, action);

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('fetchOrders.fulfilled — сохраняет заказы и выключает загрузку', () => {
    const payload: TOrder[] = [
      { _id: '1', name: 'Order 1', status: 'done', ingredients: [], createdAt: '', updatedAt: '', number: 1 }
    ];
    const action = { type: fetchOrders.fulfilled.type, payload };
    const nextState = reducer({ ...initialState, loading: true }, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.items).toEqual(payload);
  });

  it('fetchOrders.rejected — сохраняет ошибку и выключает загрузку', () => {
    const action = {
      type: fetchOrders.rejected.type,
      error: { message: 'Ошибка загрузки заказов' }
    };
    const nextState = reducer({ ...initialState, loading: true }, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка загрузки заказов');
  });

  it('fetchOrders.rejected без message — пишет "Ошибка"', () => {
    const action = { type: fetchOrders.rejected.type, error: {} };
    const nextState = reducer({ ...initialState, loading: true }, action);

    expect(nextState.error).toBe('Ошибка');
  });
});
