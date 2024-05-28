import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import todoReducer from './todoSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  todos: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;