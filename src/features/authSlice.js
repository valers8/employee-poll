import { createSlice } from '@reduxjs/toolkit';
import { Navigate } from 'react-router-dom';

const initialState = {
  authedUser: localStorage.getItem('authedUser') || null,
  previousUser: null, // To track the previously logged-in user
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.authedUser = action.payload;
      localStorage.setItem('authedUser', action.payload); // Save authedUser to localStorage
    },
    logout(state) {
      state.previousUser = state.authedUser; // Store the previous user on logout
      state.authedUser = null;
      localStorage.removeItem('authedUser'); // Remove authedUser from localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;




