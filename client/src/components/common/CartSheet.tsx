import { useAppDispatch, useAppSelector } from "@/store/store";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";
import { setCartOpen } from "@/store/features/template/slice";
import { fetchCarts } from "@/store/features/cart/cart.slice";
import CartItems from "../shopping/cartItems";
import { useNavigate } from "react-router-dom";

const CartSheet: React.FC = () => {
  const navigate = useNavigate()
  const [total, setTotal] = useState(0);
  const { cart } = useAppSelector((state) => state.template);
  const { cartItems } = useAppSelector((state) => state.productCart);
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) dispatch(fetchCarts(user.data._id));
  }, [dispatch, user]);

  useEffect(() => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum = sum + Number(item.quantity) * Number(item.price);
    });
    setTotal(sum);
    console.log();
  }, [total, setTotal, cartItems]);

  const checkOutHandler = () => {
    dispatch(setCartOpen(false));
    navigate('/shopping/checkout');
  };

  return (
    <>
      <Sheet open={cart} onOpenChange={() => dispatch(setCartOpen(false))}>
        <SheetContent>
          <SheetHeader className="mb-6">
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>
          {cartItems && cartItems.length > 0 ? (
            <div className="space-y-3">
              <CartItems items={cartItems} />
              <div className="flex justify-between w-full font-bold">
                <span>Total:</span>
                <span>${total}</span>
              </div>
              <CustomButton
                className="w-full"
                onClick={() => checkOutHandler()}
              >
                Checkout
              </CustomButton>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <span>Empty</span>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
export default CartSheet;
