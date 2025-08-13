import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { RootState, AppDispatch } from '../../services/store';
import { createOrder } from '../../features/order/createOrderSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const bun = useAppSelector((state: RootState) => state.burgerConstructor.bun);
  const ingredients = useAppSelector(
    (state: RootState) => state.burgerConstructor.items
  );
  const orderRequest = useAppSelector(
    (state: RootState) => state.createOrder.loading
  );
  const user = useAppSelector((state: RootState) => state.auth.user);

  const constructorItems = {
    bun: bun || null,
    ingredients
  };

  const orderModalData = null;
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (
      !constructorItems.bun ||
      !constructorItems.bun._id ||
      constructorItems.ingredients.length === 0 ||
      orderRequest
    ) {
      return;
    }
    if (!user) {
      navigate('/login');
      return;
    }
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientIds));
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
