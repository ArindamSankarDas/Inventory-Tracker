import {
  createSlice,
  nanoid,
  createSelector,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axios from "axios";

const productAdapter = createEntityAdapter({});

const initialState = productAdapter.getInitialState({
  status: "idle", // idle | loading | succeeded | failed
  error: null,
});

export const fetchData = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("/api/inventory");

    console.log(response.data);

    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: {
      reducer(state, action) {
        if (!action.payload) {
          return;
        }

        productAdapter.addOne(state, action.payload);
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

      productAdapter.removeOne(state, action.payload);
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

        productAdapter.updateOne(state, {
          id,
          changes: { name, count, price },
        });
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

export const { selectAll: selectAllProducts } = productAdapter.getSelectors(
  (state) => state.products
);

export const selectSeasonalProducts = createSelector(
  [selectAllProducts],
  (products) => products.filter((product) => product.isSeasonal !== false)
);

export default productSlice.reducer;
