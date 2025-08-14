import { expect, test, describe } from '@jest/globals';

import rootReducer from './rootReducer';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import constructorReducer from '../features/constructor/constructorSlice';
import feedReducer from '../features/feed/feedSlice';
import orderReducer from '../features/order/orderSlice';
import ordersReducer from '../features/order/ordersSlice';
import authReducer from '../features/auth/authSlice';
import createOrderReducer from '../features/order/createOrderSlice';

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
        const prevState = {
            ingredients: { items: [] },
            burgerConstructor: { buns: null, fillings: [] },
            feed: { orders: [] },
            order: { current: null },
            orders: { list: [] },
            createOrder: { status: 'idle' },
            auth: { user: null }
        };

        expect(rootReducer(prevState, { type: 'UNKNOWN' })).toBe(prevState);
    });
});
