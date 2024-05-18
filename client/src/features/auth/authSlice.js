import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosPrivate } from "../../app/api/axios";

const initialState = {
  currentUser: null,
  token: null,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (data) => {
    const response = await axiosPrivate.post("/api/auth/register", data);

    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        action.payload.id = action.payload._id;
        delete action.payload._id;
        delete action.payload.__v;

        state.currentUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.user.currentUser;
export const selectUserStatus = (state) => state.user.status;
export const selectUserToken = (state) => state.user.token;

export default userSlice.reducer;
