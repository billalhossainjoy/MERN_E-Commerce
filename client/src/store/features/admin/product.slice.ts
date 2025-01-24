import ApiClient from "@/lib/ApiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductSchemaType } from "@/schema/product.schema";

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

export const addNewProduct = createAsyncThunk(
  "/admin/product/new-product",
  async (formData: FormData) => {
    const res = await ApiClient.post("/admin/product/new-product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/admin/product/all-products",
  async () => {
    const res = await ApiClient.get(`/admin/product/all-products`);
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "/admin/product/update",
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const res = await ApiClient.put("/admin/product/update/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "/admin/product/delete",
  async (id: string) => {
    const res = await ApiClient.delete("/admin/product/delete/" + id);
    return res.data;
  }
);

const AdminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ProductLists = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.ProductLists = [];
      });
    builder
      .addCase(addNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        // state.ProductLists.push(action.payload)
      })
      .addCase(addNewProduct.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        console.log(action.payload.data._id);
        state.isLoading = false;
        state.ProductLists = state.ProductLists.filter(
          (product) => product._id !== action.payload.data._id
        );
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedData = action.payload.data;
        state.isLoading = false;
        state.ProductLists = state.ProductLists.map((data) =>
          data._id === updatedData._id ? updatedData : data
        );
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default AdminProductsSlice.reducer
