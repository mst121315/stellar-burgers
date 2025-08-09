import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

interface ConstructorState {
  bun: TIngredient | null;
  items: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  items: []
};

const swap = <T>(arr: T[], from: number, to: number) => {
  const item = arr[from];
  arr.splice(from, 1);
  arr.splice(to, 0, item);
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<TConstructorIngredient>) {
        const ingredient = action.payload;
        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.items.push(ingredient);
        }
      },
      prepare(ingredient: TIngredient) {
        return { payload: { ...ingredient, id: uuidv4() } };
      }
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.items.splice(action.payload, 1);
    },
    moveUp(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index > 0) swap(state.items, index, index - 1);
    },
    moveDown(state, action: PayloadAction<number>) {
      const index = action.payload;
      if (index < state.items.length - 1) swap(state.items, index, index + 1);
    }
  }
});

export const { addIngredient, removeIngredient, moveUp, moveDown } =
  constructorSlice.actions;
export default constructorSlice.reducer;
