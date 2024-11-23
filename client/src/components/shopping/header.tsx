import { Menu, Orbit, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ShoppingNav from "./nav";
import { Sheet, SheetContent } from "../ui/sheet";
import CustomButton from "../common/CustomButton";
import { useState } from "react";

import ProfileMenu from "./ProfileMenu";
import { useAppDispatch, useAppSelector } from "@/store/store";
import LogoutButton from "./logoutButton";
import { setCartOpen } from "@/store/features/template/slice";
import Search from "../common/search";

const ShoppingHeader: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { cartItems } = useAppSelector((state) => state.productCart);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex gap-2">
          <Menu
            onClick={() => setMenuOpen(true)}
            className="text-primary lg:hidden"
          />
          <Link to="/shopping" className="flex items-center gap-2 ">
            <Orbit />
            <span className="font-bold">Tech Shop</span>
          </Link>
        </div>
        <div className="hidden lg:block">
          <ShoppingNav setMenuOpen={setMenuOpen} />
        </div>

        <div className="flex gap-3">
          {" "}
          <Search />
          <CustomButton
            className="flex items-center gap-2"
            onClick={() => dispatch(setCartOpen(true))}
            variant={isAuthenticated ? "outline" : "default"}
          >
            <span>({cartItems.length})</span>
            <ShoppingCart />
            {!isAuthenticated && <span className="text-white">Cart</span>}
          </CustomButton>
          {isAuthenticated && (
            <div className="hidden lg:block">
              <ProfileMenu setMenuOpen={setMenuOpen} />
            </div>
          )}
          {!isAuthenticated && (
            <CustomButton
              variant="outline"
              className="border-primary"
              onClick={() => navigate("/auth")}
            >
              login
            </CustomButton>
          )}
        </div>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetContent
            side="left"
            className="flex lg:hidden flex-col justify-between"
          >
            <ShoppingNav setMenuOpen={setMenuOpen} />
            {isAuthenticated && (
              <div className="flex gap-3 justify-between">
                <ProfileMenu setMenuOpen={setMenuOpen} />
                <LogoutButton />
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
export default ShoppingHeader;
