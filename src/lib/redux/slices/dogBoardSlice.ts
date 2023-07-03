import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Dog, SortBy } from '../../../app/common/types';

interface DogState {
  breeds: string[];
  dogs: Dog[];
  selectedBreeds: string[];
  selectedZipCodes: string[];
  ageMin: number;
  ageMax: number;
  sortBy: SortBy;
  from: number;
  size: number;
  totalDogs: number;
}

const initialState: DogState = {
  breeds: [],
  dogs: [],
  selectedBreeds: [],
  selectedZipCodes: [],
  ageMin: 0,
  ageMax: 100,
  sortBy: 'breed:asc',
  from: 0,
  size: 25,
  totalDogs: 0,
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
    updateSelectedBreeds: (state, action: PayloadAction<string[]>) => {
      state.selectedBreeds = action.payload;
    },
    updateSelectedZipCodes: (state, action: PayloadAction<string[]>) => {
      state.selectedZipCodes = action.payload;
    },
    updateAgeMin: (state, action: PayloadAction<number>) => {
      state.ageMin = action.payload;
    },
    updateAgeMax: (state, action: PayloadAction<number>) => {
      state.ageMax = action.payload;
    },
    updateSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    updateFrom: (state, action: PayloadAction<number>) => {
      state.from = action.payload;
    },
    updateSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
    updateTotalDogs: (state, action: PayloadAction<number>) => {
      state.totalDogs = action.payload;
    },
  },
});

export const {
  updateBreeds,
  updateDogs,
  updateSelectedBreeds,
  updateSelectedZipCodes,
  updateAgeMin,
  updateAgeMax,
  updateSortBy,
  updateFrom,
  updateSize,
  updateTotalDogs,
} = dogBoardSlice.actions;

export default dogBoardSlice.reducer;
