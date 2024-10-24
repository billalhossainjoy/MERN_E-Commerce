import { deletecart, updateCart } from "@/store/features/cart/cart.slice";
import { useAppDispatch } from "@/store/store";
import { Trash2 } from "lucide-react";

interface Props {
  items: CartitemType[];
}

const CartItems: React.FC<Props> = ({ items }) => {
  const dispatch = useAppDispatch();
  const removeCart = (productId: string) => {
    dispatch(deletecart(productId));
  };
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div className="flex gap3" key={item.productId}>
          <div className="w-24 h-20 rounded-lg border border-gray-300 overflow-hidden">
            <img
              className=" object-cover h-full w-full"
              src={item.image}
              alt={item.title}
            />
          </div>
          <div className="w-full flex justify-between items-center px-3 ">
            <div>
              <div className=" space-y-2">
                <h1>{item.title}</h1>
                <span className="text-sm">${item.price}</span>
                <div className="flex w-full gap-3 items-center">
                  <span
                    className="rounded-full w-5 h-5 flex justify-center items-center p-3 text-lg border font-bold cursor-pointer"
                    onClick={() =>
                      dispatch(
                        updateCart({
                          productId: item.productId,
                          quantity: Number(item.quantity) - 1,
                        })
                      )
                    }
                  >
                    -
                  </span>
                  <span className="text-xl">{item.quantity}</span>
                  <span
                    className="rounded-full w-5 h-5 flex justify-center items-center p-3 text-lg border font-bold cursor-pointer"
                    onClick={() =>
                      dispatch(
                        updateCart({
                          productId: item.productId,
                          quantity: Number(item.quantity) + 1,
                        })
                      )
                    }
                  >
                    +
                  </span>
                </div>
              </div>
            </div>
            <div className=" flex flex-col items-center gap-2">
              <div>${Number(item.price) * Number(item.quantity)}</div>
              <div className="text-red-500 cursor-pointer">
                <Trash2 onClick={() => removeCart(item.productId)} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default CartItems;
