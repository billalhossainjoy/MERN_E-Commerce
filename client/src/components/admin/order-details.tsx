import { Separator } from "@/components/ui/separator";
import { DialogContent } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useSearchParams } from "react-router-dom";
import {
  getAdminOrderDetails,
  resetOrderDetails,
  updateOrderStatus,
} from "@/store/features/shopping/order.slice";
import { Loader } from "lucide-react";
import { AddressSchemaType } from "@/schema/address.schema";
import { ViewProducts } from "@/types/order";

interface Props {
  setOrderView: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminOrderDetails: React.FC<Props> = ({setOrderView}) => {
  const [orderStatus, setOrderStatus] = useState("");

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { orderDetails } = useAppSelector((state) => state.shoppingOrder);

  useEffect(() => {
    dispatch(getAdminOrderDetails(searchParams.get("details") || ""));

    return () => {
      dispatch(resetOrderDetails());
    };
  }, [dispatch, searchParams]);

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
          <h1 className="mt-5 mb-1">Shipping Info</h1>{" "}
          <Select value={orderStatus} onValueChange={setOrderStatus}>
            {" "}
            <SelectTrigger>
              <SelectValue placeholder="Order Status" />{" "}
            </SelectTrigger>{" "}
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inprocess">In Process</SelectItem>
              <SelectItem value="inshipping">In Shipping</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>{" "}
            </SelectContent>
          </Select>
          <Button
            className="my-3 w-full"
            onClick={() =>
              dispatch(
                updateOrderStatus({ id: orderDetails._id, status: orderStatus })
              ).then(() => setOrderView(false))
            }
          >
            Update Order Status
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};
export default AdminOrderDetails;
