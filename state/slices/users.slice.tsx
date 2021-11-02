import { createSlice } from "@reduxjs/toolkit";

interface User {
  uid: string
  name: string
  email: string
}

interface UserState {
  me: User
  loggedIn: boolean
}


const initialState: UserState = {
  me: { uid: 'e5Qm9sr3qaRv9c1nlGPOnnRUAht1', name: 'ana', email: "aaaa@gmail.com" },
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
      // state.me = {};
      state.loggedIn = false;
    }
  }
});

export default users_slice.reducer;
export const { loggedIn, loggedOut } = users_slice.actions;





