import {  createSlice } from "@reduxjs/toolkit";

const users_slice = createSlice({
  name: "profile",
  initialState: {
    me: {},
    loggedIn: false
  },
  reducers: {
    loggedIn: (state, action) => {
      state.me = action.payload;
      state.loggedIn = true;
    },
    loggedOut: (state) => {
      state.me = {};
      state.loggedIn = false;
    }
  }
});

export default users_slice.reducer;
export const {loggedIn, loggedOut} = users_slice.actions;





