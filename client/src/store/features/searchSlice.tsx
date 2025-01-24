import ApiClient from "@/lib/ApiClient";
import { ProductSchemaType } from "@/schema/product.schema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isLoading: boolean;
  searchResults: ProductSchemaType[];
}

const initialState: InitialState = {
  isLoading: false,
  searchResults: [],
};

export const searchProduct = createAsyncThunk(
  "/shopping/search",
  async (key: string, { rejectWithValue }) => {
    try {
      const res = await ApiClient.get(`/shopping/search/${key}`);
      return res.data;
    } catch (error: any) {
      rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: "searchProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload.data;
      })
      .addCase(searchProduct.rejected, (state) => {
        state.isLoading = false;
        state.searchResults = [];
      });
  },
});

export default searchSlice.reducer;
