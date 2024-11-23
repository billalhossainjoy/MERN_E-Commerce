import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/slice";
import templateReducer from "./features/template/slice";
import AdminProductsSlice from "./features/admin/product.slice";
import shoppingProductSlice from "./features/shopping/product.slice";
import cartSlice from "./features/cart/cart.slice";
import addressSlice from "./features/address/slice";
import shoppingOrderSlice from "./features/shopping/order.slice";
import searchSlice from "./features/searchSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    template: templateReducer,
    adminProduct: AdminProductsSlice,
    shoppingProduct: shoppingProductSlice,
    productCart: cartSlice,
    address: addressSlice,
    shoppingOrder: shoppingOrderSlice,
    searchProduct: searchSlice,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = (selector) =>
  useSelector(selector);

export default store;
