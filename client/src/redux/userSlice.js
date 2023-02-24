import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    currentUser: {},
    isPending: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isPending = true;
    },
    loginSuccess: (state, action) => {
      state.isPending = false;
      state.currentUser = action.payload;
      state.error = false
    },
    loginFailure: (state, action) => {
      state.isPending = false;
     

      
      state.error =  action.payload
    },
    logOut:(state)=>{
      state.currentUser = null
    }
  },
});

export const { loginFailure, loginStart, loginSuccess,logOut } = userSlice.actions;

export default userSlice.reducer;
