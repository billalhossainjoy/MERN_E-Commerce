import ApiClient from "@/lib/ApiClient";
import { OrderSchemaType } from "@/schema/order.schema";
import { CaptureOrder, Order } from "@/types/order";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  approvalUrl: string | null;
  isLoading: boolean;
  order: string | null;
  orderLists: Order[];
  orderDetails: Order | null;
}

const initialState: InitialState = {
  approvalUrl: null,
  isLoading: false,
  order: null,
  orderLists: [],
  orderDetails: null,
};

export const createOrder = createAsyncThunk(
  "/order/create-order",
  async (data: OrderSchemaType, { rejectWithValue }) => {
    try {
      const responce = await ApiClient.post("/order/create-order", data);

      return responce.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const captureOrder = createAsyncThunk(
  "/order/capture-order",
  async (data: CaptureOrder, { rejectWithValue }) => {
    try {
      const responce = await ApiClient.post("/order/capture-order", data);

      return responce.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getDashboardOrders = createAsyncThunk(
  "/order/list",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await ApiClient.get("/order/list");

      return responce.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getDashboardorderDetails = createAsyncThunk(
  "/order/details",
  async (id: string, { rejectWithValue }) => {
    try {
      const responce = await ApiClient.get("/order/details/" + id);

      return responce.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAdminOrders = createAsyncThunk(
  "/order/admin-list",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await ApiClient.get("/order/admin-list");

      return responce.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAdminOrderDetails = createAsyncThunk(
  "/order/admin-details",
  async (id: string, { rejectWithValue }) => {
    try {
      const responce = await ApiClient.get("/order/admin-details/" + id);
      return responce.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "/order/update-order-status",
  async (
    { id, status }: { id: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const responce = await ApiClient.post(
        "/order/update-order-status/" + id,
        {
          status,
        }
      );
      return responce.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const shoppingOrderSlice = createSlice({
  name: "shoppingOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload.data.orderId;
        state.approvalUrl = action.payload.data.approvalURL;
        localStorage.setItem("paymentOrderId", JSON.stringify(state.order));
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.order = null;
        state.approvalUrl = null;
      });

    builder
      .addCase(captureOrder.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(captureOrder.fulfilled, (state) => {
        state.approvalUrl = null;
        state.isLoading = false;
        state.order = null;
        state.orderDetails = null;
        state.orderLists = [];
      })
      .addCase(captureOrder.rejected, (state) => {
        state.approvalUrl = null;
        state.isLoading = false;
        state.order = null;
        state.orderDetails = null;
        state.orderLists = [];
      });

    builder
      .addCase(getDashboardOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderLists = action.payload.data;
      })
      .addCase(getDashboardOrders.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(getDashboardorderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardorderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getDashboardorderDetails.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(getAdminOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderLists = action.payload.data;
      })
      .addCase(getAdminOrders.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(getAdminOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getAdminOrderDetails.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.orderLists.findIndex(
          (order) => order._id === action.payload.data._id
        );
        if (index !== -1) state.orderLists[index] = action.payload.data;
      })
      .addCase(updateOrderStatus.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetOrderDetails } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;
