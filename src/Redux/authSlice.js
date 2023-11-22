import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isAdmin: false
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
  },
});

export const { login, logout, setIsAdmin } = authSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsAdmin = (state) => state.auth.isAdmin;

export default authSlice.reducer;
