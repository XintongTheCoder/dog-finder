import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Dog, SortBy } from '../../../app/common/types';

interface DogState {
  breeds: string[];
  dogs: Dog[];
  isLoading: boolean;
  selectedBreeds: string[];
  selectedZipCodes: string[];
  ageMin: number;
  ageMax: number;
  sortBy: SortBy;
  from: number;
  pageSize: number;
  totalDogs: number;
  favoriteDogIds: string[];
}

const initialState: DogState = {
  breeds: [],
  dogs: [],
  isLoading: true,
  selectedBreeds: [],
  selectedZipCodes: [],
  ageMin: 0,
  ageMax: 100,
  sortBy: 'breed:asc',
  from: 0,
  pageSize: 25,
  totalDogs: 0,
  favoriteDogIds: [],
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
    updateIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updateSelectedBreeds: (state, action: PayloadAction<string[]>) => {
      state.selectedBreeds = action.payload;
      state.from = 0;
    },
    updateSelectedZipCodes: (state, action: PayloadAction<string[]>) => {
      state.selectedZipCodes = action.payload;
      state.from = 0;
    },
    updateAgeMin: (state, action: PayloadAction<number>) => {
      state.ageMin = action.payload;
      state.from = 0;
    },
    updateAgeMax: (state, action: PayloadAction<number>) => {
      state.ageMax = action.payload;
      state.from = 0;
    },
    updateSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
      state.from = 0;
    },
    updateFrom: (state, action: PayloadAction<number>) => {
      state.from = action.payload;
    },
    updatePageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    updateTotalDogs: (state, action: PayloadAction<number>) => {
      state.totalDogs = action.payload;
    },
    updateFavoriteDogIds: (state, action: PayloadAction<string[]>) => {
      state.favoriteDogIds = action.payload;
    },
  },
});

export const {
  updateBreeds,
  updateDogs,
  updateIsLoading,
  updateSelectedBreeds,
  updateSelectedZipCodes,
  updateAgeMin,
  updateAgeMax,
  updateSortBy,
  updateFrom,
  updatePageSize,
  updateTotalDogs,
  updateFavoriteDogIds,
} = dogBoardSlice.actions;

export default dogBoardSlice.reducer;
