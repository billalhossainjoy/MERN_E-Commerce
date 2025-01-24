import UserorderLists from "@/components/shopping/Dashboard/order-details";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getDashboardOrders } from "@/store/features/shopping/order.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardOrder: React.FC = () => {
  const [orderView, setOrderView] = useState(false);
  const { orderLists } = useAppSelector((state) => state.shoppingOrder);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDashboardOrders());
  }, [dispatch]);

  const handleDetails = (id: string) => {
    setOrderView(true);
    navigate("/shopping/dashboard/order?details=" + id);
  };

  useEffect(() => {
    if (!orderView) {
      navigate("/shopping/dashboard/order");
    }
  }, [orderView, navigate]);

  return (
    <div>
      <div className="container m-auto p-5">
        <h1 className="font-bold text-2xl">Order history</h1>
        <Separator className="my-6" />
        <div className="p-6 border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-white">
                <TableHead>Order Id</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>status</TableHead>
                <TableHead>price</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderLists.map((order) => (
                <TableRow>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toDateString()}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "rounded-full py-1 px-3 text-white flex xl:w-1/2 justify-center w-full font-bold capitalize",
                        {
                          "bg-yellow-500": order.orderStatus == "confirmed",
                          "bg-black": order.orderStatus == "pending",
                          "bg-sky-500": order.orderStatus == "inprocess",
                          "bg-orange-500": order.orderStatus == "inshipping",
                          "bg-green-500": order.orderStatus == "delivered",
                          "bg-red-500": order.orderStatus == "rejected",
                        }
                      )}
                    >
                      {order.orderStatus}
                    </span>
                  </TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDetails(order._id)}>
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Dialog open={orderView} onOpenChange={setOrderView}>
            <UserorderLists />
          </Dialog>
        </div>
      </div>
    </div>
  );
};
export default DashboardOrder;
