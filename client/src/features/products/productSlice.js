import {
  createSlice,
  createSelector,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { axiosPrivate } from "../../app/api/axios";
import { authRefresh } from "../auth/authSlice";

const productAdapter = createEntityAdapter({});

const initialState = productAdapter.getInitialState({
  status: "idle", // idle | loading | succeeded | failed
  error: null,
});

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    let state = thunkAPI.getState();
    let token = state.auth.token;

    try {
      const response = await axiosPrivate(token).get("/api/inventory");
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        await thunkAPI.dispatch(authRefresh());

        state = thunkAPI.getState();
        token = state.auth.token;

        const retryResponse = await axiosPrivate(token).get("/api/inventory");
        return retryResponse.data;
      } else {
        throw error;
      }
    }
  }
);

export const addNewProduct = createAsyncThunk(
  "products/addProducts",
  async (data, thunkAPI) => {
    let state = thunkAPI.getState();
    let token = state.auth.token;

    try {
      const response = await axiosPrivate(token).post("/api/inventory", {
        ...data,
        name: data.name.trim().toLowerCase(),
        price: Number(data.price),
        itemCount: Number(data.itemCount),
        isSeasonal: Boolean(data.isSeasonal),
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        await thunkAPI.dispatch(authRefresh());

        state = thunkAPI.getState();
        token = state.auth.token;

        const retryResponse = await axiosPrivate(token).post("/api/inventory", {
          ...data,
          name: data.name.trim().toLowerCase(),
          price: Number(data.price),
          itemCount: Number(data.itemCount),
          isSeasonal: Boolean(data.isSeasonal),
        });
        return retryResponse.data;
      } else {
        throw error;
      }
    }
  }
);

export const sellProducts = createAsyncThunk(
  "products/sellProducts",
  async (data, thunkAPI) => {
    let state = thunkAPI.getState();
    let token = state.auth.token;

    try {
      const response = await axiosPrivate(token).patch("/api/inventory", {
        ...data,
        name: data.name.trim().toLowerCase(),
        price: Number(data.price),
        itemCount: Number(data.itemCount),
        isSeasonal: Boolean(data.isSeasonal),
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        await thunkAPI.dispatch(authRefresh());

        state = thunkAPI.getState();
        token = state.auth.token;

        const retryResponse = await axiosPrivate(token).patch(
          "/api/inventory",
          {
            ...data,
            name: data.name.trim().toLowerCase(),
            price: Number(data.price),
            itemCount: Number(data.itemCount),
            isSeasonal: Boolean(data.isSeasonal),
          }
        );

        return retryResponse.data;
      } else {
        throw error;
      }
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, thunkAPI) => {
    let state = thunkAPI.getState();
    let token = state.auth.token;

    try {
      const response = await axiosPrivate(token).delete(`/api/inventory`, {
        data: {
          id: productId,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        await thunkAPI.dispatch(authRefresh());

        state = thunkAPI.getState();
        token = state.auth.token;

        const retryResponse = await axiosPrivate(token).delete(
          "/api/inventory",
          {
            data: {
              id: productId,
            },
          }
        );
        return retryResponse.data;
      } else {
        throw error;
      }
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (updatedData, thunkAPI) => {
    let state = thunkAPI.getState();
    let token = state.auth.token;

    try {
      const response = await axiosPrivate(token).put("/api/inventory", {
        ...updatedData,
        name: updatedData.name.trim().toLowerCase(),
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        await thunkAPI.dispatch(authRefresh());

        state = thunkAPI.getState();
        token = state.auth.token;

        const retryResponse = await axiosPrivate(token).put("/api/inventory", {
          ...updatedData,
          name: updatedData.name.trim().toLowerCase(),
        });

        return retryResponse.data;
      } else {
        throw error;
      }
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
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
        state.status = "idle";
      })
      .addCase(sellProducts.fulfilled, (state, action) => {
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
        state.status = "idle";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const { _id: id } = action.payload;

        productAdapter.removeOne(state, id);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "idle";
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
