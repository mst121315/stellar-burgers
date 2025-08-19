import reducer, { fetchFeeds } from './feedSlice';

describe('feedSlice reducer', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    success: false,
    loading: false,
    error: null
  };

  it('fetchFeeds.pending — включает загрузку и очищает ошибку', () => {
    const action = { type: fetchFeeds.pending.type };
    const nextState = reducer(initialState, action);

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('fetchFeeds.fulfilled — сохраняет заказы, total, totalToday, success и выключает загрузку', () => {
    const payload = {
      orders: [{ id: 1, name: 'Order 1' }],
      total: 100,
      totalToday: 10,
      success: true
    };
    const action = { type: fetchFeeds.fulfilled.type, payload };
    const nextState = reducer({ ...initialState, loading: true }, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.orders).toEqual(payload.orders);
    expect(nextState.total).toBe(payload.total);
    expect(nextState.totalToday).toBe(payload.totalToday);
    expect(nextState.success).toBe(payload.success);
  });

  it('fetchFeeds.rejected — сохраняет ошибку и выключает загрузку', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка загрузки фида' }
    };
    const nextState = reducer({ ...initialState, loading: true }, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка загрузки фида');
  });

  it('fetchFeeds.rejected без message — пишет "Ошибка"', () => {
    const action = { type: fetchFeeds.rejected.type, error: {} };
    const nextState = reducer({ ...initialState, loading: true }, action);

    expect(nextState.error).toBe('Ошибка');
  });
});
