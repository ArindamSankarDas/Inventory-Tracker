import { createEntityAdapter, createSlice, nanoid } from "@reduxjs/toolkit";

const transactionAdapter = createEntityAdapter({
  selectId: (transaction) => transaction.product_details.name,
});

const initialState = transactionAdapter.getInitialState({
  status: "idle",
  error: null,
});

const transactionReducer = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addNewTransaction: {
      reducer(state, action) {
        if (!action.payload) {
          return;
        }

        const { id } = action.payload;

        state.ids.push(id);
        state.entities[id] = action.payload;
      },
      prepare(customerDetails, productDetails, transactionType) {
        return {
          payload: {
            id: nanoid(6),
            date: new Date().toISOString(),
            transactionType,
            customer_details: {
              name: customerDetails.name,
              phone: Number(customerDetails.phone),
              address: customerDetails.address,
            },
            product_details: {
              name: productDetails.name,
              price: Number(productDetails.price),
              count: Number(productDetails.count),
            },
          },
        };
      },
    },
  },
});

export const { addNewTransaction } = transactionReducer.actions;

export const { selectAll: selectAllTransactions } =
  transactionAdapter.getSelectors((state) => state.transactions);

export default transactionReducer.reducer;
