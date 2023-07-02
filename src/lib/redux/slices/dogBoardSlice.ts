import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Dog } from '../../../app/common/types';

interface DogState {
  breeds: string[];
  dogs: Dog[];
}

const initialState: DogState = {
  breeds: [],
  dogs: [],
};

export const dogBoardSlice = createSlice({
  name: 'dogBoard',
  initialState,
  reducers: {
    updateBreeds: (state, action: PayloadAction<string[]>) => {
      state.breeds = action.payload;
    },
    updateDogs: (state, action: PayloadAction<Dog[]>) => {
      state.dogs = action.payload;
    },
  },
});

export const { updateBreeds, updateDogs } = dogBoardSlice.actions;

export default dogBoardSlice.reducer;
