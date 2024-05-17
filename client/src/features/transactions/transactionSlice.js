import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "../../app/api/axios";

const transactionAdapter = createEntityAdapter({});

const initialState = transactionAdapter.getInitialState({
  status: "idle", // idle | loading | succeeded | failed
  error: null,
});

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async () => {
    const response = await axios.get("/api/transactions");
    return response.data;
  }
);

export const addNewTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transactionData) => {
    const response = await axios.post("/api/transactions", transactionData);

    return response.data;
  }
);

const transactionReducer = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
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

export const { selectAll: selectAllTransactions } =
  transactionAdapter.getSelectors((state) => state.transactions);

export const selectTransactionStatus = (state) => state.transactions.status;
export const selectTransactionError = (state) => state.transactions.error;

export default transactionReducer.reducer;
