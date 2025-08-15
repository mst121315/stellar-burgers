import reducer, { fetchIngredients } from './ingredientsSlice';

describe('ingredientsSlice reducer', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  it('fetchIngredients.pending — устанавливает loading=true и очищает error', () => {
    const action = { type: fetchIngredients.pending.type };
    const nextState = reducer(initialState, action);

    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('fetchIngredients.fulfilled — сохраняет данные и отключает loading', () => {
    const payload = [{ _id: '1', name: 'Булка' }];
    const action = { type: fetchIngredients.fulfilled.type, payload };
    const nextState = reducer({ ...initialState, loading: true }, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.items).toEqual(payload);
  });

  it('fetchIngredients.rejected — сохраняет ошибку и отключает loading', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка запроса' }
    };
    const nextState = reducer({ ...initialState, loading: true }, action);

    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка запроса');
  });

  it('fetchIngredients.rejected без message — пишет "Ошибка"', () => {
    const action = { type: fetchIngredients.rejected.type, error: {} };
    const nextState = reducer({ ...initialState, loading: true }, action);

    expect(nextState.error).toBe('Ошибка');
  });
});
