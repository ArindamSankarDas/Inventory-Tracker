import {
  createSlice,
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

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("/api/inventory");

    return response.data;
  }
);

export const addNewProduct = createAsyncThunk(
  "products/addProducts",
  async (data) => {
    const response = await axios.post("/api/inventory", data);

    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    const response = await axios.delete(`/api/inventory`, {
      data: {
        id: productId,
      },
    });

    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
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

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";

        const loadedProducts = action.payload.map((product) => {
          product.id = product._id;
          delete product._id;

          return product;
        });

        productAdapter.upsertMany(state, loadedProducts);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        action.payload.id = action.payload._id;
        delete action.payload._id;

        productAdapter.addOne(state, action.payload);
      })
      .addCase(addNewProduct.rejected, (_state, action) => {
        const getStatus = action.error.message.match(/\d+/g);

        if (getStatus === "400") {
          alert(
            "If name already exists and the price is different give it new name as it is a new product altogether due to price difference"
          );
        } else if (getStatus === "406") {
          alert("name, price and count can not be empty");
        } else if (getStatus === "422") {
          alert("Syntax is correct but data is invalid");
        } else {
          alert("Server ERROR " + getStatus);
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const { _id: id } = action.payload;

        productAdapter.removeOne(state, id);
      });
  },
});

export const { updateProduct } = productSlice.actions;

export const { selectAll: selectAllProducts } = productAdapter.getSelectors(
  (state) => state.products
);

export const selectStateStatus = (state) => state.products.status;
export const selectStateError = (state) => state.products.error;

export const selectSeasonalProducts = createSelector(
  [selectAllProducts],
  (products) => products.filter((product) => product.isSeasonal !== false)
);

export default productSlice.reducer;
