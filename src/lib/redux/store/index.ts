import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import dogReducer from '../slices/dogBoardSlice';
import userReducer from '../slices/userSlice';
import themeReducer from '../slices/themeSlice';

const rootReducer = combineReducers({
  dogBoard: dogReducer,
  user: userReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
