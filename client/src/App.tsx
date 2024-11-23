import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layout/auth.layout";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import AdminLayout from "./layout/admin.layout";
import AdminDashboard from "./pages/admin/dashboard";
import AdminFeatures from "./pages/admin/features";
import AdminOrders from "./pages/admin/orders";
import ShoppingLayout from "./layout/shopping.layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping/home";
import ShoppingListing from "./pages/shopping/listing";
import ShoppingCheckOut from "./pages/shopping/checkout";
import Protected from "./components/common/Protected";
import { Toaster } from "./components/ui/toaster";
import { useAppDispatch, useAppSelector } from "./store/store";
import { useEffect } from "react";
import { getUser, refreshUserToken } from "./store/features/auth/slice";
import { Loader } from "lucide-react";
import AdminProducts from "./pages/admin/products";
import AddProduct from "./pages/admin/new-product";
import ViewSingleProduct from "./pages/shopping/viewProduct";
import DashboardLayout from "./layout/dashboard.layout";
import DashboardOrder from "./pages/dashboard/order";
import DashboardSettings from "./pages/dashboard/profile";
import DashboardAccount from "./pages/dashboard/account";
import DashboardAddress from "./pages/dashboard/address";
import PaypalReturnPage from "./pages/shopping/checkout/paypal-return";
import SearchPage from "./pages/shopping/search";
import AppHomePage from "./pages";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, user } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getUser()).then((res: any) => {
      if (res.payload === "Session Expired.")
        dispatch(refreshUserToken()).then((res) => {
          if (res.payload.success) {
            dispatch(getUser());
          }
        });
    });
  }, [dispatch]);

  if (isLoading)
    return (
      <div className="flex flex-1 justify-center items-center h-screen">
        <Loader className=" animate-spin text-primary" />
      </div>
    );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Routes>
        <Route index element={<AppHomePage />} />
        <Route
          path="/auth"
          element={
            <Protected auth={isAuthenticated} user={user}>
              <AuthLayout />
            </Protected>
          }
        >
          <Route index element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route
          path="/admin"
          element={
            <Protected auth={isAuthenticated} user={user}>
              <AdminLayout />
            </Protected>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="newproduct" element={<AddProduct />} />
        </Route>

        <Route path="/shopping" element={<ShoppingLayout />}>
          <Route index element={<ShoppingHome />} />
          <Route
            path="dashboard"
            element={
              <Protected auth={isAuthenticated} user={user}>
                <DashboardLayout />
              </Protected>
            }
          >
            <Route path="order" element={<DashboardOrder />} />
            <Route path="settings" element={<DashboardSettings />} />
            <Route path="account" element={<DashboardAccount />} />
            <Route path="address" element={<DashboardAddress />} />
          </Route>
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="listing/product/:id" element={<ViewSingleProduct />} />
          <Route
            path="checkout"
            element={
              <Protected auth={isAuthenticated} user={user}>
                <ShoppingCheckOut />
              </Protected>
            }
          />
          <Route
            path="paypal-return"
            element={
              <Protected auth={isAuthenticated} user={user}>
                <PaypalReturnPage />
              </Protected>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
};
export default App;
