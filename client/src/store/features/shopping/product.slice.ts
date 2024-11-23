import ApiClient from "@/lib/ApiClient";
import { ProductSchemaType } from "@/schema/product.schema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isLoading: boolean;
  ProductLists: ProductSchemaType[];
  error: any;
}

const initialState: InitialState = {
  isLoading: false,
  ProductLists: [],
  error: null,
};

export const fetchShoppingProducts = createAsyncThunk(
  "/shopping/products",
  async (params: FatchPerameterType) => {
    const query = new URLSearchParams();
    Object.keys(params.filter).forEach((key) =>
      query.append(
        key.toLowerCase(),
        params.filter[key as FilterOptionType].join(",")
      )
    );
    query.append("sortBy", params.sortBy);

    const res = await ApiClient.get(`/shopping/products?${query}`);
    return res.data;
  }
);

export const fetchProduct = createAsyncThunk(
  "/shopping/product",
  async (id: string) => {
    const res = await ApiClient.get(`/shopping/product/${id}`);
    return res.data;
  }
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShoppingProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchShoppingProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ProductLists = action.payload.data;
      })
      .addCase(fetchShoppingProducts.rejected, (state) => {
        state.isLoading = false;
        state.ProductLists = [];
      });
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ProductLists.push(action.payload.data);
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default shoppingProductSlice.reducer;
