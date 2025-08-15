import reducer, {
  loginUser,
  fetchUser,
  registerUser,
  logout,
  noToken,
  setUser
} from './authSlice';

describe('authSlice reducer', () => {
  const initialState = {
    user: null,
    loading: false,
    error: null,
    isAuthChecked: false
  };

  it('loginUser.pending — включает загрузку и очищает ошибку', () => {
    const nextState = reducer(initialState, { type: loginUser.pending.type });
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  it('loginUser.fulfilled — сохраняет пользователя и ставит isAuthChecked=true', () => {
    const user = { email: 'test@test.com', name: 'Test' };
    const nextState = reducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: { user }
    });
    expect(nextState.loading).toBe(false);
    expect(nextState.user).toEqual(user);
    expect(nextState.isAuthChecked).toBe(true);
  });

  it('loginUser.rejected — сохраняет ошибку и выключает загрузку', () => {
    const nextState = reducer(initialState, {
      type: loginUser.rejected.type,
      payload: 'Ошибка входа'
    });
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe('Ошибка входа');
  });

  it('fetchUser.pending — включает загрузку', () => {
    const nextState = reducer(initialState, { type: fetchUser.pending.type });
    expect(nextState.loading).toBe(true);
  });

  it('fetchUser.fulfilled — сохраняет пользователя и ставит isAuthChecked=true', () => {
    const user = { email: 'test@test.com', name: 'Test' };
    const nextState = reducer(initialState, {
      type: fetchUser.fulfilled.type,
      payload: { user }
    });
    expect(nextState.loading).toBe(false);
    expect(nextState.user).toEqual(user);
    expect(nextState.isAuthChecked).toBe(true);
  });

  it('fetchUser.rejected — сбрасывает пользователя и ставит isAuthChecked=true', () => {
    const nextState = reducer(
      { ...initialState, user: { email: 'x', name: 'y' } },
      { type: fetchUser.rejected.type }
    );
    expect(nextState.loading).toBe(false);
    expect(nextState.isAuthChecked).toBe(true);
    expect(nextState.user).toBeNull();
  });

  it('registerUser.fulfilled — сохраняет пользователя и ставит isAuthChecked=true', () => {
    const user = { email: 'new@test.com', name: 'New' };
    const nextState = reducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: { user }
    });
    expect(nextState.loading).toBe(false);
    expect(nextState.user).toEqual(user);
    expect(nextState.isAuthChecked).toBe(true);
  });

  it('logout.fulfilled — сбрасывает пользователя и ставит isAuthChecked=true', () => {
    const nextState = reducer(
      { ...initialState, user: { email: 'x', name: 'y' } },
      { type: logout.fulfilled.type }
    );
    expect(nextState.user).toBeNull();
    expect(nextState.isAuthChecked).toBe(true);
  });

  it('noToken — ставит isAuthChecked=true', () => {
    const nextState = reducer(initialState, noToken());
    expect(nextState.isAuthChecked).toBe(true);
  });

  it('setUser — сохраняет пользователя и ставит isAuthChecked=true', () => {
    const user = { email: 'manual@test.com', name: 'Manual' };
    const nextState = reducer(initialState, setUser(user));
    expect(nextState.user).toEqual(user);
    expect(nextState.isAuthChecked).toBe(true);
  });
});
