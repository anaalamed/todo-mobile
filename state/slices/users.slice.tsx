import { createSlice } from "@reduxjs/toolkit";

interface User {
  uid?: string
  email?: string
  displayName?: string
  phoneNumber?: string
  photoURL?: string
}

interface UserState {
  me: User
  loggedIn: boolean
}


const initialState: UserState = {
  // me: { uid: 'e5Qm9sr3qaRv9c1nlGPOnnRUAht1', name: 'ana', email: "aaaa@gmail.com" },
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
      console.log('loged in new user') // testing
    },
    loggedOut: (state) => {
      state.me = {};
      state.loggedIn = false;
    },
    updatedProfile: (state, action) => {
      console.log('slice', action.payload);
      // state.me = ;
    }
  }
});

export default users_slice.reducer;
export const { loggedIn, loggedOut, updatedProfile } = users_slice.actions;





