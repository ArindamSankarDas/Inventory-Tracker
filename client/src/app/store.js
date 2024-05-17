import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import transactionReducer from "../features/transactions/transactionSlice";
import userReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    transactions: transactionReducer,
  },
  devTools: true,
});
