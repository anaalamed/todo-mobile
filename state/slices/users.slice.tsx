import { createSlice } from "@reduxjs/toolkit";

interface User {
  id?: string
  email?: string
  name?: string
  phoneNumber?: string
  photoURL?: string
}

interface UserState {
  me: User
  loggedIn: boolean
}


const initialState: UserState = {
  me: {},
  loggedIn: false
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
    }
  }
});

export default users_slice.reducer;
export const { loggedIn, loggedOut, updatedProfile } = users_slice.actions;





