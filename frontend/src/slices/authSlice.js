import { createSlice } from '@reduxjs/toolkit';

let logoutTimer = null;

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));

      logoutTimer = setTimeout(() => {
        authSlice.actions.logout();
      }, 60 * 60 * 24 * 1000);
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');

      if (logoutTimer) {
        clearTimeout(logoutTimer);
        logoutTimer = null;
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
