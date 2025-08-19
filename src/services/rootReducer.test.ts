import { expect, test, describe } from '@jest/globals';

import {rootReducer} from './rootReducer';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import constructorReducer from '../features/constructor/constructorSlice';
import feedReducer from '../features/feed/feedSlice';
import orderReducer from '../features/order/orderSlice';
import ordersReducer from '../features/order/ordersSlice';
import authReducer from '../features/auth/authSlice';
import createOrderReducer from '../features/order/createOrderSlice';
import type { RootState } from './rootReducer';

describe('rootReducer', () => {
    test('должен правильно инициализировать состояние', () => {
        const expectedInitialState = {
            ingredients: ingredientsReducer(undefined, { type: '@@INIT' }),
            burgerConstructor: constructorReducer(undefined, { type: '@@INIT' }),
            feed: feedReducer(undefined, { type: '@@INIT' }),
            order: orderReducer(undefined, { type: '@@INIT' }),
            orders: ordersReducer(undefined, { type: '@@INIT' }),
            createOrder: createOrderReducer(undefined, { type: '@@INIT' }),
            auth: authReducer(undefined, { type: '@@INIT' })
        };

        expect(rootReducer(undefined, { type: '@@INIT' })).toEqual(expectedInitialState);
    });

    test('должен вернуть текущее состояние при неизвестном экшене', () => {
        const prevState: RootState = {
            ingredients: { items: [], loading: false, error: null },
            burgerConstructor: { bun: null, items: [] },
            feed: { orders: [], total: 0, totalToday: 0, success: false, loading: false, error: null },
            order: { order: null, loading: false, error: null },
            orders: { items: [], loading: false, error: null },
            createOrder: { order: null, loading: false, error: null },
            auth: { user: null, loading: false, error: null, isAuthChecked: false }
        };

        expect(rootReducer(prevState, { type: 'UNKNOWN' })).toBe(prevState);
    });
});
