import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  {
    id: nanoid(6),
    date: new Date().toISOString(),
    transactionType: "buy",
    customer_details: {
      name: "Mintu Das",
      phone: 8453299451,
      address: "Garwanpatty, L.D.S road",
    },

    product_details: {
      name: "Fans",
      price: 300,
      count: 20,
    },
  },
];

const transactionReducer = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addNewTransaction: {
      reducer(state, action) {
        if (!action.payload) {
          return;
        }

        state.push(action.payload);
      },
      prepare(customerDetails, productDetails, transactionType) {
        return {
          payload: {
            id: nanoid(6),
            date: new Date().toISOString(),
            transactionType,
            customer_details: {
              name: customerDetails.name,
              phone: customerDetails.phone,
              address: customerDetails.address,
            },
            product_details: {
              name: productDetails.name,
              price: productDetails.price,
              count: productDetails.count,
            },
          },
        };
      },
    },
  },
});

export const { addNewTransaction } = transactionReducer.actions;

export default transactionReducer.reducer;
