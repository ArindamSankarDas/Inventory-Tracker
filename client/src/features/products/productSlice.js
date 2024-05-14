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
    const response = await axios.post("/api/inventory", {
      ...data,
      name: data.name.trim().toLowerCase(),
      price: Number(data.price),
      itemCount: Number(data.itemCount),
      isSeasonal: Boolean(data.isSeasonal),
    });

    return response.data;
  }
);

export const sellProducts = createAsyncThunk(
  "products/sellProducts",
  async (data) => {
    const response = await axios.patch("/api/inventory", {
      ...data,
      name: data.name.trim().toLowerCase(),
      price: Number(data.price),
      itemCount: Number(data.itemCount),
      isSeasonal: Boolean(data.isSeasonal),
    });

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

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (updatedData) => {
    const response = await axios.put("/api/inventory", {
      ...updatedData,
      name: updatedData.name.trim().toLowerCase(),
    });

    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";

        if (!action.payload) {
          productAdapter.upsertMany(state, []);
          return;
        }

        const loadedProducts = action.payload.map((product) => {
          product.id = product._id;
          delete product._id;
          delete product.__v;

          return product;
        });

        productAdapter.upsertMany(state, loadedProducts);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.status = "idle";
        action.payload.id = action.payload._id;
        delete action.payload.__v;
        delete action.payload._id;

        if (action.payload.id in state.entities) {
          productAdapter.updateOne(state, {
            id: action.payload.id,
            changes: { itemCount: action.payload.itemCount },
          });

          return;
        }

        productAdapter.addOne(state, action.payload);
      })
      .addCase(sellProducts.fulfilled, (state, action) => {
        state.status = "idle";
        const { _id: id, itemCount } = action.payload;

        if (id in state.entities && itemCount !== 0) {
          productAdapter.updateOne(state, {
            id,
            changes: { itemCount },
          });

          return;
        }

        if (id in state.entities && itemCount === 0) {
          productAdapter.removeOne(state, id);
          return;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const { _id: id } = action.payload;

        productAdapter.removeOne(state, id);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { _id: id, name, price, itemCount } = action.payload;

        productAdapter.updateOne(state, {
          id,
          changes: { name, price, itemCount },
        });
      });
  },
});

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
