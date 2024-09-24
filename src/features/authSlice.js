import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authedUser: null,
  },
  reducers: {
    login(state, action) {
      state.authedUser = action.payload;
      sessionStorage.setItem('authedUser', action.payload); // Save authedUser in session storage
    },
    logout(state) {
      state.authedUser = null;
      sessionStorage.removeItem('authedUser'); // Remove authedUser from session storage
    },
  },
});

export const { login, logout } = authSlice.actions; // Exporting login and logout

export default authSlice.reducer;


