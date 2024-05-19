import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import transactionReducer from "../features/transactions/transactionSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    transactions: transactionReducer,
  },
  devTools: true,
});
