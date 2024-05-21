import {
  createEntityAdapter,
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { axiosPrivate } from "../../app/api/axios";
import { authRefresh } from "../auth/authSlice";

const transactionAdapter = createEntityAdapter({});

const initialState = transactionAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (userId, thunkAPI) => {
    let state = thunkAPI.getState();
    let token = state.auth.token;

    try {
      const response = await axiosPrivate(token).get("/api/transactions", {
        params: {
          userId,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        await thunkAPI.dispatch(authRefresh());
        state = thunkAPI.getState();
        token = state.auth.token;

        const retryResponse = await axiosPrivate(token).get(
          "/api/transactions"
        );
        return retryResponse.data;
      } else {
        throw error;
      }
    }
  }
);

export const addNewTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transactionData, thunkAPI) => {
    let state = thunkAPI.getState();
    let token = state.auth.token;

    try {
      const response = await axiosPrivate(token).post(
        "/api/transactions",
        transactionData
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        await thunkAPI.dispatch(authRefresh());

        state = thunkAPI.getState();
        token = state.auth.token;

        const retryResponse = await axiosPrivate(token).post(
          "/api/transactions",
          transactionData
        );

        return retryResponse.data;
      } else {
        throw error;
      }
    }
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    resetTransactions(state) {
      transactionAdapter.removeAll(state);
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (!action.payload) {
          transactionAdapter.upsertMany(state, []);
          return;
        }

        const loadedTransactions = action.payload.map((transaction) => {
          transaction.id = transaction._id;
          delete transaction._id;
          delete transaction.__v;

          return transaction;
        });

        transactionAdapter.upsertMany(state, loadedTransactions);
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewTransaction.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }

        action.payload.id = action.payload._id;
        delete action.payload.__v;
        delete action.payload._id;

        transactionAdapter.addOne(state, action.payload);
        state.status = "idle";
      });
  },
});

export const { resetTransactions } = transactionSlice.actions;

export const { selectAll: selectAllTransactions } =
  transactionAdapter.getSelectors((state) => state.transactions);

export const selectTotalTransactions = createSelector(
  [selectAllTransactions],
  (transactions) => transactions.length
);

export const selectBuyTransactions = createSelector(
  [selectAllTransactions],
  (transactions) =>
    transactions.filter((transaction) => transaction.transactionType === "buy")
      .length
);
export const selectSellTransactions = createSelector(
  [selectAllTransactions],
  (transactions) =>
    transactions.filter((transaction) => transaction.transactionType === "sell")
      .length
);

export const selectTransactionStatus = (state) => state.transactions.status;
export const selectTransactionError = (state) => state.transactions.error;

export default transactionSlice.reducer;
