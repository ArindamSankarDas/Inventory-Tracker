import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axiosAuth } from "../../app/api/axios";

const initialState = {
  currentUser: null,
  token: null,
  status: "idle",
  error: null,
};

export const authRegister = createAsyncThunk(
  "auth/authRegister",
  async (data) => {
    const response = await axiosAuth.post("/api/auth/register", data);

    return response.data;
  }
);

export const authLogin = createAsyncThunk("auth/authLogin", async (data) => {
  const response = await axiosAuth.post("/api/auth/login", data);

  return response.data;
});

export const authLogout = createAsyncThunk("auth/authLogout", async () => {
  const response = await axiosAuth.post("/api/auth/logout");

  return response.data;
});

export const authRefresh = createAsyncThunk("auth/authRefresh", async () => {
  const response = await axiosAuth.get("/api/auth/refresh");

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(authRegister.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(authRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { userDetails, accessToken } = action.payload;

        userDetails.id = userDetails._id;
        delete userDetails._id;
        delete userDetails.__v;

        state.token = accessToken;
        state.currentUser = userDetails;
      })
      .addCase(authRegister.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.error.message;
      })
      .addCase(authLogin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(authLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { userDetails, accessToken } = action.payload;

        userDetails.id = userDetails._id;
        delete userDetails._id;
        delete userDetails.__v;

        state.token = accessToken;
        state.currentUser = userDetails;
      })
      .addCase(authLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(authLogout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(authLogout.fulfilled, (state) => {
        state.token = null;
        state.currentUser = null;
        state.status = "idle";
        return;
      })
      .addCase(authLogout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(authRefresh.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(authRefresh.fulfilled, (state, action) => {
        state.status = "idle";
        state.token = action.payload.accessToken;
      })
      .addCase(authRefresh.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectUser = (state) => state.auth.currentUser;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthToken = (state) => state.auth.token;

export default authSlice.reducer;
