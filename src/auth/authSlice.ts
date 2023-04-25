import axios from "@/lib/axios";
import { createSlice } from "@reduxjs/toolkit";

export type ErrorResponse = {
  message: string;
};

export type LoginResponse = {
  accessToken: string;
};

type InitialState = {
  accessToken: string;
};

const initialState: InitialState = {
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;
