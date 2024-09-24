import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/userSlice';
import questionsReducer from './features/questionSlice';
import authReducer from './features/authSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    questions: questionsReducer,
    auth: authReducer,
  },
});