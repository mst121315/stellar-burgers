import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/ingredients/ingredientsSlice';
import constructorReducer from '../features/constructor/constructorSlice';
import feedReducer from '../features/feed/feedSlice';
import orderReducer from '../features/order/orderSlice';
import ordersReducer from '../features/order/ordersSlice';
import authReducer from '../features/auth/authSlice';
import CreateOrderSlice from '../features/order/createOrderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  feed: feedReducer,
  order: orderReducer,
  orders: ordersReducer,
  createOrder: CreateOrderSlice,
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
