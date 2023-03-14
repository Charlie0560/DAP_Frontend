import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  user: JSON.parse(localStorage.getItem("user")) || null,
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem("user",true);
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.setItem("user",null);
    },
  },
});

export const authActions = authSlice.actions;
export const selectUser = (state)=> state.user;

export const store = configureStore({
  reducer: authSlice.reducer,
});