import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/slice";
import templateReducer from "./features/template/slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AdminProductsSlice from "./features/admin/product.slice";
import shoppingProductSlice from "./features/shopping/product.slice";
import cartSlice from './features/cart/cart.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    template: templateReducer,
    adminProduct: AdminProductsSlice,
    shoppingProduct: shoppingProductSlice,
    productCart: cartSlice
  },
});

type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = (selector) =>
  useSelector(selector);

export default store;
