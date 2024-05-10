import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import transactionReducer from "../features/transactions/transactionSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    transactions: transactionReducer,
  },
});
