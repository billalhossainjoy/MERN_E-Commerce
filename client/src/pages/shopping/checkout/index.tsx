import CartItems from "@/components/shopping/cartItems";
import { paymentMethods } from "@/components/shopping/checkout/constaint";
import CustomAddressForm from "@/components/shopping/checkout/customAddressForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { AddressSchema, AddressSchemaType } from "@/schema/address.schema";
import { fetchAllAddress } from "@/store/features/address/slice";
import { createOrder } from "@/store/features/shopping/order.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ShoppingCheckOut: React.FC = () => {
  const { toast } = useToast();
  const [isPaymentStart, setIsPaymentStart] = useState(false);
  const { isLoading: PaymentLoading, approvalUrl } = useAppSelector(
    (state) => state.shoppingOrder
  );
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [selectedAddress, setSelectedAddress] =
    useState<AddressSchemaType | null>(null);
  const [total, setTotal] = useState(0);
  const { cartItems } = useAppSelector((state) => state.productCart);
  const { isLoading, addressList } = useAppSelector((state) => state.address);
  const dispatch = useAppDispatch();

  const form = useForm<AddressSchemaType>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      addressType: "HOME",
    },
  });

  const submitHandler = () => {
    if (total === 0) {
      toast({
        title: "Please select product first",
        variant: "destructive",
      });
      return;
    }
    const orderDetails = {
      products: cartItems.map((item) => ({
        _id: item.productId,
        quantity: item.quantity,
      })),
      addressId: selectedAddress?._id,
      paymentMethod,
    };
    try {
      dispatch(createOrder(orderDetails)).then((res) => {
        if (res.payload.success) setIsPaymentStart(true);
        else setIsPaymentStart(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(isPaymentStart);

  useEffect(() => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum = sum + Number(item.quantity) * Number(item.price);
    });
    setTotal(sum);
  }, [total, cartItems]);

  useEffect(() => {
    dispatch(fetchAllAddress());
  }, [dispatch]);

  useEffect(() => {
    if (selectedAddress) {
      form.setValue("name", selectedAddress?.name);
      form.setValue("address", selectedAddress.address);
      form.setValue("city", selectedAddress.city);
      form.setValue("pincode", selectedAddress.pincode);
      form.setValue("addressType", selectedAddress.addressType);
      form.setValue("phone", selectedAddress.phone);
      form.setValue("notes", selectedAddress.notes);
    }
  }, [form, selectedAddress]);

  useEffect(() => {
    setSelectedAddress(addressList[0]);
  }, [addressList]);

  if (approvalUrl) window.open(approvalUrl, "Payment with paypal");

  return (
    <div className="flex h-full">
      <div className="container m-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full">
        <div className="col-span-1 lg:col-span-2 border-r h-full md:overflow-y-scroll">
          <div>
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <div className="grid gap-4 p-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {addressList.map((address, index) => (
                  <Card
                    onClick={() => setSelectedAddress(address)}
                    key={index}
                    className={cn(
                      "w-full hover:shadow-lg transition-shadow hover:bg-secondary cursor-pointer relative group",
                      { "border-red-400": selectedAddress?._id === address._id }
                    )}
                  >
                    <div className="rounded-full p-0 absolute right-2 top-2 bg-secondary border-black group-hover:bg-white">
                      <CircleCheck
                        className={cn("w-4 h-4 text-black opacity-0 ", {
                          "opacity-100 text-red-500":
                            selectedAddress?._id === address._id,
                        })}
                      />
                    </div>
                    <CardContent className="space-y-2">
                      <CardTitle className="pt-6 font-bold texg-xl flex justify-between">
                        <h1>
                          Title:{" "}
                          <span className="font-bold">
                            {address.addressType}
                          </span>
                        </h1>
                      </CardTitle>
                      <div className="font-bold">
                        <h1>
                          Address:{" "}
                          <span className="font-light">{address.address}</span>
                        </h1>
                        <h1>
                          city:{" "}
                          <span className="font-light">{address.city}</span>
                        </h1>
                        <h1>
                          Post Code:{" "}
                          <span className="font-light">{address.pincode}</span>
                        </h1>
                        <h1>
                          Phone:{" "}
                          <span className="font-light">{address.phone}</span>
                        </h1>
                        {address.notes && (
                          <h1>
                            Notes:{" "}
                            <span className="font-light">{address.notes}</span>{" "}
                          </h1>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          <div className="p-5">
            <CustomAddressForm form={form} submitHandler={submitHandler} />
          </div>
        </div>
        <div className="p-6">
          <CartItems items={cartItems} />
          <Separator className="my-6" />
          <div className="">
            <div className="flex justify-between w-full items-center">
              <h1>Sub Total</h1>
              <h1 className="mr-3">${total}</h1>
            </div>
            <div className="flex justify-between w-full items-center">
              <h1>Shipping fee</h1>
              <h1 className="mr-3">$100</h1>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between w-full items-center">
              <h1>Sub Total</h1>
              <h1 className="mr-3">${total + total > 0 ? 100 : 0}</h1>
            </div>
          </div>
          <div className="my-3 ">
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="flex"
              disabled
            >
              {paymentMethods.map((method) => (
                <Label
                  key={method.id}
                  className={cn("bg-white p-5 rounded-lg", {
                    "border border-red-400": paymentMethod === method.id,
                    "opacity-70": !method.active,
                  })}
                >
                  <RadioGroupItem value={method.id} className="hidden" />
                  <span className={cn({ "opacity-70": !method.active })}>
                    {method.label}
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </div>
          <div className="my-3">
            <Button onClick={submitHandler} className="w-36">
              {PaymentLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Comform Order"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCheckOut;
