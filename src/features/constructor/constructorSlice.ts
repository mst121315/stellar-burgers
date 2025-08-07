import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConstructorState {
  bun: any | null;
  items: any[];
}

const initialState: ConstructorState = {
  bun: null,
  items: []
};

const swap = (arr: any[], from: number, to: number) => {
  const item = arr[from];
  arr.splice(from, 1);
  arr.splice(to, 0, item);
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<any>) {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.bun = ingredient;
      } else {
        state.items.push(ingredient);
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
