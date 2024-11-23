import ApiClient from "@/lib/ApiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Data {
  productId: string;
  quantity: number;
}

interface InitialState {
  isLoading: boolean;
  cartItems: {
    productId: string;
    image: string;
    title: string;
    price: string;
    salePrice: string;
    quantity: string;
  }[];
}

const initialState: InitialState = {
  isLoading: false,
  cartItems: [],
};

export const addToCart = createAsyncThunk(
  "/cart/addtocart",
  async (data: Data) => {
    const res = await ApiClient.post("/cart/addtocart", data);
    return res.data;
  }
);
export const fetchCarts = createAsyncThunk(
  "/cart/fetchcarts",
  async (id: string) => {
    const res = await ApiClient.get("/cart/fetchcarts/" + id);
    return res.data;
  }
);
export const updateCart = createAsyncThunk(
  "/cart/updatecart",
  async (data: Data) => {
    const res = await ApiClient.post("/cart/updatecart", data);
    return res.data;
  }
);
export const deletecart = createAsyncThunk(
  "/cart/deletecart",
  async (id: string) => {
    const res = await ApiClient.post("/cart/deletecart/" + id);
    return res.data;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const product = action.payload.data;
        state.isLoading = false;
        const existingItem = state.cartItems.find(
          (item) => item.productId === product.productId
        );
        if (existingItem) {
          existingItem.quantity = product.quantity;
        } else {
          state.cartItems.push(product);
        }
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchCarts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCarts.rejected, (state) => {
        state.isLoading = true;
        state.cartItems = [];
      });
    builder
      .addCase(updateCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems.find((item) => {
          if (item.productId === action.payload.data.productId) {
            item.quantity = action.payload.data.quantity;
          }
          return;
        });
      })
      .addCase(updateCart.rejected, (state) => {
        state.isLoading = false;
      });
    builder
      .addCase(deletecart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletecart.fulfilled, (state, action) => {
        const index = state.cartItems.findIndex(
          (item) => item.productId === action.payload.data.productId
        );
        state.isLoading = false;
        console.log(index);
        state.cartItems.splice(index, 1);
      })
      .addCase(deletecart.rejected, (state) => {
        state.isLoading = false;
      });
  },
});


export const {resetCart} = cartSlice.actions;

export default cartSlice.reducer;
