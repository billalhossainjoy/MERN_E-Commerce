import ApiClient from "@/lib/ApiClient";
import { AddressSchemaType } from "@/schema/address.schema";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  isLoading: boolean;
  addressList: AddressSchemaType[];
}

const initialState: InitialState = {
  isLoading: false,
  addressList: [],
};

export const addAddress = createAsyncThunk(
  "/address/add-address",
  async (data: AddressSchemaType, thunkApi) => {
    try {
      const response = await ApiClient.post("/address/add-address", data);
      return response.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editAddress = createAsyncThunk(
  "/address/edit-address",
  async (data: AddressSchemaType , thunkApi) => {
    try {
      const response = await ApiClient.put("/address/edit-address/" + data._id , data);
      return response.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchAllAddress = createAsyncThunk(
  "/address/fetch-all-address",
  async (_, thunkApi) => {
    try {
      const response = await ApiClient.get("/address/fetch-all-address");
      return response.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "/address/delete-address",
  async (id:string , thunkApi) => {
    try {
      console.log(id)
      const response = await ApiClient.delete("/address/delete-address/" + id);
      return response.data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList.push(action.payload);
      })
      .addCase(addAddress.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        const index = state.addressList.findIndex(
          (address) => address._id === action.payload._id
        );
        console.log(index)
        if (index !== -1) state.addressList[index] = action.payload;
      })
      .addCase(editAddress.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchAllAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload;
      })
      .addCase(fetchAllAddress.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = state.addressList.filter(
          (address) => address._id !== action.payload._id
        );
      })
      .addCase(deleteAddress.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default addressSlice.reducer;
