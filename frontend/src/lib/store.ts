import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from '@/features/counter/counterSlice';
import { userReducer } from '@/features/user/userSlice'; // ← импорт userReducer
import { api } from './api';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer, // ← добавили userReducer
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
