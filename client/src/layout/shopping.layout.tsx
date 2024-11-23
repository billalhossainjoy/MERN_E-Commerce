import { Outlet } from "react-router-dom";
import ShoppingHeader from "./../components/shopping/header";
import CartSheet from "@/components/common/CartSheet";

const ShoppingLayout: React.FC = () => {
  return (
    <div className="flex flex-col bg-secondary overflow-hidden h-screen">
      <ShoppingHeader />
      <main className="overflow-auto remove-scrollbar h-full">
        <Outlet />
        <CartSheet />
      </main>
    </div>
  );
};
export default ShoppingLayout;
