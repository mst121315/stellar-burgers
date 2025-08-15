import reducer, { addIngredient, removeIngredient, moveUp, moveDown } from './constructorSlice';
import { TIngredient } from '@utils-types';

jest.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

const bun: TIngredient = {
  _id: 'bun1',
  name: 'Булка',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 20,
  calories: 150,
  price: 50,
  image: 'bun.png',
  image_mobile: 'bun_mob.png',
  image_large: 'bun_large.png'
};

const sauce: TIngredient = {
  _id: 'sauce1',
  name: 'Соус',
  type: 'sauce',
  proteins: 2,
  fat: 1,
  carbohydrates: 3,
  calories: 25,
  price: 10,
  image: 'sauce.png',
  image_mobile: 'sauce_mob.png',
  image_large: 'sauce_large.png'
};

describe('constructorSlice reducer', () => {
  const initialState = { bun: null, items: [] };

  it('добавляет булку в bun', () => {
    const nextState = reducer(initialState, addIngredient(bun));
    expect(nextState.bun).toEqual({ ...bun, id: 'test-uuid' });
    expect(nextState.items).toHaveLength(0);
  });

  it('добавляет ингредиент в items', () => {
    const nextState = reducer(initialState, addIngredient(sauce));
    expect(nextState.items).toEqual([{ ...sauce, id: 'test-uuid' }]);
    expect(nextState.bun).toBeNull();
  });

  it('удаляет ингредиент по индексу', () => {
    const stateWithItems = { bun: null, items: [{ ...sauce, id: 'test-uuid' }] };
    const nextState = reducer(stateWithItems, removeIngredient(0));
    expect(nextState.items).toHaveLength(0);
  });

  it('меняет порядок ингредиентов: moveUp', () => {
    const state = {
      bun: null,
      items: [
        { ...sauce, id: 'id1' },
        { ...sauce, id: 'id2' }
      ]
    };
    const nextState = reducer(state, moveUp(1));
    expect(nextState.items.map(i => i.id)).toEqual(['id2', 'id1']);
  });

  it('меняет порядок ингредиентов: moveDown', () => {
    const state = {
      bun: null,
      items: [
        { ...sauce, id: 'id1' },
        { ...sauce, id: 'id2' }
      ]
    };
    const nextState = reducer(state, moveDown(0));
    expect(nextState.items.map(i => i.id)).toEqual(['id2', 'id1']);
  });
});
