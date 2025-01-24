import CustomButton from "@/components/common/CustomButton";
import {
  productDetails,
  productDetailsType,
} from "@/components/shopping/constants";
import ImageSlider from "@/components/shopping/ImageSlider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { EMI } from "@/lib/utils";
import { ProductSchemaType } from "@/schema/product.schema";
import { addToCart } from "@/store/features/cart/cart.slice";
import { fetchProduct } from "@/store/features/shopping/product.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewSingleProduct: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const [data, setData] = useState<ProductSchemaType | null>();
  const [quantity, setQuantity] = useState(1);

  const dispatch = useAppDispatch();
  const { id } = useParams();

  const addCartHandler = () => {
    if (!isAuthenticated) navigate("/auth?productId=" + id);
    const productId = data?._id;
    if (productId)
      dispatch(addToCart({ productId, quantity })).then((res) => {
        toast({
          title: "Success",
          description: res.payload.message,
        });
      });
  };

  useEffect(() => {
    dispatch(fetchProduct(id!)).then((res) => {
      setData(res.payload.data);
    });
  }, [dispatch, id]);

  if (!data)
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="w-full h-full flex justify-center">
      <div className="max-w-7xl w-full p-3 flex flex-col gap-3">
        {/* main Product info */}
        <div className="bg-white rounded-lg p-3 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className=" col-span-4 relative h-full overflow-hidden">
            <ImageSlider images={data.images} />
          </div>
          <div className=" col-span-6 space-y-3 flex flex-col justify-between ">
            <div className="mb-6">
              <h1 className="font-bold text-2xl leading-tight ">
                {data.title}
              </h1>
              <p className="text-sm">{data.description}</p>
              <div className="my-3">
                {Object.keys(productDetails).map((key) => {
                  const field = productDetails[key as productDetailsType];
                  const value =
                    (field === "_id" && data._id?.slice(18)) ||
                    data[field as "price" | "totalStack" | "salePrice"];
                  return (
                    <span
                      className="border-t border-gray-200 grid grid-cols-2"
                      key={key}
                    >
                      <p>{key}</p>
                      <p>
                        {value
                          ? value
                          : productDetails[key as productDetailsType]}
                      </p>
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="space-y-6 pb-6">
              {/* price section */}
              {data.price > 3000 && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="border-2 border-primary p-2 space-y-2 hover:border-destructive">
                    <div className=" leading-tight">
                      <h1 className="text-2xl font-bold leading-tight tracking-tight">
                        ${data.price}
                      </h1>
                      <p className="text-sm font-bold">Cash Discount Price</p>
                    </div>
                    <div className="text-sm text-[13px]">
                      <p className="hover:text-destructive cursor-pointer">
                        Check available payment method
                      </p>
                      <p className="text-destructive">
                        Contact for bulk quantity:{" "}
                        <span className="text-black">0151652750</span>
                      </p>
                    </div>
                  </div>
                  <div className="border-2 border-primary p-2 space-y-2 hover:border-destructive">
                    <div>
                      <h1 className="text-2xl font-bold leading-tight tracking-tight text-destructive">
                        ${EMI(data.price)}
                      </h1>
                      <p className="text-sm font-bold">EMI Price*</p>
                    </div>
                    <div className="text-sm text-[13px]">
                      <p>Starting from 7,609৳/month. For Discount Price</p>
                      <p className="text-black">
                        Click here to view 27 banks EMI Plans
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <span className="underline font-semibold text-sm">
                  View Details
                </span>
              </div>
              {data.price < 3000 && (
                <div className="flex gap-2 items-end">
                  <span className="text-2xl font-bold">${data.price}</span>
                  <span className="font-bold line-through">
                    ${data.salePrice}
                  </span>
                </div>
              )}
              {/* add card and qantity  */}
              <div className="flex gap-3">
                <div className="flex gap-2">
                  <Button
                    onClick={() =>
                      setQuantity((prev) => (prev > 0 ? prev - 1 : 0))
                    }
                  >
                    -
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-20"
                    min="0"
                  />
                  <Button
                    onClick={() =>
                      setQuantity((prev) =>
                        prev >= data.totalStack ? prev : prev + 1
                      )
                    }
                  >
                    +
                  </Button>
                </div>
                <CustomButton onClick={() => addCartHandler()}>
                  Add to Cart
                </CustomButton>
                <CustomButton>Buy Now</CustomButton>
              </div>
              {data.totalStack == quantity && (
                <p className="text-red-500 text-sm">No more available product</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewSingleProduct;
