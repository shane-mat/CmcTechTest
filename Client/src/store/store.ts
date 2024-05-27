import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;