import { Separator } from "@/components/ui/separator";
import { DialogContent } from "../../ui/dialog";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  getDashboardorderDetails,
  resetOrderDetails,
} from "@/store/features/shopping/order.slice";
import { useSearchParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { AddressSchemaType } from "@/schema/address.schema";
import { ViewProducts } from "@/types/order";

const UserOrderDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { orderDetails } = useAppSelector((state) => state.shoppingOrder);

  useEffect(() => {
    dispatch(getDashboardorderDetails(searchParams.get("details") || ""));

    return () => {
      dispatch(resetOrderDetails());
    };
  }, [dispatch, searchParams]);
  console.log(orderDetails);

  if (!orderDetails)
    return (
      <DialogContent>
        <div className="flex w-full h-40 justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      </DialogContent>
    );

  const address = orderDetails.addressId as AddressSchemaType;
  const products = orderDetails.products as ViewProducts[];

  return (
    <DialogContent>
      <div className="pt-5">
        <div className="font-semibold space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <h1>Order ID</h1>{" "}
            <span className="text-end">{orderDetails?._id}</span>
            <h1>Date</h1>{" "}
            <span className="text-end">
              {new Date(orderDetails.createdAt).toDateString()}
            </span>
            <h1>Status</h1>{" "}
            <span className="text-end">{orderDetails?.orderStatus}</span>
            <h1>Price</h1>{" "}
            <span className="text-end">{orderDetails?.totalAmount}</span>
          </div>
          <Separator />
          <h1>Order Details</h1>
          <div>
            {products.map((product) => (
              <div
                className="grid grid-cols-2 gap-4 font-thin "
                key={product._id._id}
              >
                <h1>{product._id.title}</h1>{" "}
                <span className="text-end">
                  {product.quantity} x {product._id.price} =
                  {product.quantity * product._id.price}
                </span>
              </div>
            ))}
            <Separator />
          </div>
          <div className="grid grid-cols-2 gap-4 font-thin ">
            <h1 className="text-sm font-semibold">Sub total</h1>{" "}
            <span className="text-end font-semibold text-sm">
              {orderDetails.totalAmount - 100}
            </span>
            <h1 className="text-sm font-semibold">Shopping Cost</h1>{" "}
            <span className="text-end font-semibold text-sm">100</span>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4 font-thin ">
            <h1 className="font-bold">Total</h1>{" "}
            <span className="text-end font-bold">
              {orderDetails.totalAmount}
            </span>
          </div>
          <Separator />
          <h1>Shipping Info</h1>
          <div className="grid grid-cols-2 gap-4 font-thin">
            <h1>Name</h1> <span className="text-end">{address.name}</span>
            <h1>Address</h1> <span className="text-end">{address.address}</span>
            <h1>City</h1> <span className="text-end">{address.city}</span>
            <h1>Post code</h1>{" "}
            <span className="text-end">{address.pincode}</span>
            <h1>Phone</h1> <span className="text-end">{address.phone}</span>
            <h1>Notes</h1> <span className="text-end">{address.notes}</span>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
export default UserOrderDetails;
