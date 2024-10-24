import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminMenuOpen: false,
  cart: false,
};

const templateSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setAdminMenu: (state, action) => {
      console.log(action.payload);
      state.adminMenuOpen = action.payload
        ? action.payload
        : !state.adminMenuOpen;
    },
    setCartOpen: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export default templateSlice.reducer;

export const { setAdminMenu } = templateSlice.actions;
export const {setCartOpen} = templateSlice.actions;
