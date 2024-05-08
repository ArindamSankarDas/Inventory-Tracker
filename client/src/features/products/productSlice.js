import { createSlice, nanoid, createSelector } from "@reduxjs/toolkit";

const initialState = [
  {
    id: nanoid(4),
    name: "Fans",
    count: 30,
    price: 300,
    isSeasonal: true,
  },
  {
    id: nanoid(4),
    name: "Sockets",
    count: 40,
    price: 600,
    isSeasonal: false,
  },
];

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: {
      reducer(state, action) {
        if (!action.payload) {
          return;
        }

        state.push(action.payload);
      },
      prepare(name, count, price, isSeasonal) {
        return {
          payload: {
            id: nanoid(4),
            name,
            count,
            price,
            isSeasonal,
          },
        };
      },
    },

    deleteProduct(state, action) {
      if (!action.payload) {
        return;
      }

      const indexOfElement = state.indexOf(
        state.find((element) => element.id === action.payload)
      );

      state.splice(indexOfElement, 1);
    },

    updateProduct: {
      reducer(state, action) {
        const { id, name, count, price } = action.payload;

        if (!name || !count || !price) {
          alert(
            "None of the fields can be empty || Just delete if you want to clear something"
          );
          return;
        }

        const getProductByIndex = state.indexOf(
          state.find((product) => product.id === id)
        );

        state.splice(getProductByIndex, 1, action.payload);
      },
      prepare(id, name, count, price) {
        return {
          payload: {
            id,
            name,
            count,
            price,
          },
        };
      },
    },
  },
});

export const { addProduct, deleteProduct, updateProduct } =
  productSlice.actions;

export const selectAllProducts = (state) => state.products;

export const selectSeasonalProducts = createSelector(
  [selectAllProducts],
  (products) => products.filter((product) => product.isSeasonal !== false)
);

export default productSlice.reducer;
