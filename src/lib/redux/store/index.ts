import { configureStore } from '@reduxjs/toolkit';
import dogReducer from '../slices/dogBoardSlice';
import userReducer from '../slices/userSlice';

const store = configureStore({
  reducer: {
    dogBoard: dogReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
