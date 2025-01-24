import { captureOrder } from "@/store/features/shopping/order.slice";
import { useAppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import successGif from "/success.gif";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaypalReturnPage: React.FC = () => {
  const navigate = useNavigate();
  const [successfull, setSuccessfull] = useState(false);
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const orderId = JSON.parse(localStorage.getItem("paymentOrderId") || "");

  useEffect(() => {
    if (!orderId) return;
    const data = {
      paymentId: searchParams.get("paymentId")!,
      payerId: searchParams.get("PayerID")!, 
      orderId,
    };
    console.log(data);
    if (orderId && !successfull)
      dispatch(captureOrder(data)).then((res) => {
        if (res.payload.success) setSuccessfull(true);
      });
  }, [searchParams, dispatch, orderId, successfull]);

  if (!successfull)
    return (
      <div className="flex justify-center h-full w-full">
        <div className="relative top-80">
          <Loader className=" animate-spin w-10 h-10" />
        </div>
      </div>
    );
  return (
    <div className="bg-white h-full flex flex-col items-center gap-2 pt-36">
      <img src={successGif} alt="" className="w-80 h-80" />
      <div className="flex justify-center flex-col gap-3">
        <h1 className=" text-2xl font-semibold">
          Your order <span className="text-cyan-600">comfirmed</span>{" "}
          successfully.
        </h1>
        <div className="text-center">
          <Button onClick={() => navigate("/shopping")}>Go to Shopping</Button>
        </div>
      </div>
    </div>
  );
};
export default PaypalReturnPage;
