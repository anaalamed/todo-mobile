import { createSlice } from "@reduxjs/toolkit";

interface User {
  id?: string
  email?: string
  name?: string
  phoneNumber?: string
  photoURL?: string
  about?: string
  bgColor?: string
}

interface UserState {
  me: User
  loggedIn: boolean,
  // bgColor: string
}


const initialState: UserState = {
  me: {},
  loggedIn: false,
  // bgColor: "navy"
}

const users_slice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    loggedIn: (state, action) => {
      state.me = action.payload;
      state.loggedIn = true;
    },
    loggedOut: (state) => {
      state.me = {};
      state.loggedIn = false;
    },
    updatedProfile: (state, action) => {
      state.me = action.payload;
    },
    bgColorChoosen: (state, action) => {
      state.me.bgColor = action.payload;
    },
  }
});

export default users_slice.reducer;
export const { loggedIn, loggedOut, updatedProfile, bgColorChoosen } = users_slice.actions;





