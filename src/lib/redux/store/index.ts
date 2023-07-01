import { configureStore } from '@reduxjs/toolkit';
import dogReducer from '../slices/dogSlice';
import userReducer from '../slices/userSlice';

const store = configureStore({
  reducer: {
    dogs: dogReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
