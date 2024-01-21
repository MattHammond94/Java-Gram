import { createSlice } from '@reduxjs/toolkit';

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

      // Use the below to store an expiry date in local storage 1hr future dated from when user initially logs in.
      // This can then be checked in our private route component.

      // const currentTime = new Date();
      // const expiryTime = new Date(currentTime.getTime() + 60 * 60000);
      // localStorage.setItem('tokenExpiry', expiryTime);
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      // localStorage.removeItem('tokenExpiry');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
