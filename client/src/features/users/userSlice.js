import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  currentUser: null,
  status: "idle",
  error: null,
};

export const addUser = createAsyncThunk("users/addUser", async (data) => {
  const response = await axios.post("/api/users", data);

  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        action.payload.id = action.payload._id;
        delete action.payload._id;
        delete action.payload.__v;

        state.currentUser = action.payload;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.user.currentUser;
export const selectUserStatus = (state) => state.user.status;

export default userSlice.reducer;
