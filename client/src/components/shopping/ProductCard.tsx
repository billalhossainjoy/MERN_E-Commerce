import { ProductSchemaType } from "@/schema/product.schema";
import { Card, CardFooter, CardTitle } from "../ui/card";
import { CardContent } from "@/components/ui/card";
import { cn, toCapitalize } from "@/lib/utils";
import CustomButton from "../common/CustomButton";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { addToCart } from "@/store/features/cart/cart.slice";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";

interface Props {
  product: ProductSchemaType;
}

const ShoppingProductCard: React.FC<Props> = ({ product }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const cartAndBuyRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const [modal, setModal] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current && modalRef.current.contains(e.target as Node)) {
      const element = e.target as HTMLElement;
      if (element.tagName === "BUTTON" || element.tagName === "INPUT") {
        const tag = e.target as HTMLElement;
        console.log(tag.tagName);
        return;
      } else return navigate("/shopping/listing/product/" + product._id);
    } else setModal(false);
  };

  const handleCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!isAuthenticated) navigate("/auth?productId=" + product._id);

    e.stopPropagation();
    dispatch(addToCart({ productId: product._id!, quantity })).then((res) => {
      toast({
        title: "Success",
        description: res.payload.message,
      });
    });
  };

  return (
    <div
      className={cn("", {
        "fixed z-50 inset-0 rounded-none bg-black/70": modal,
      })}
    >
      <Card
        className={cn(
          "w-full max-w-sm mx-auto group overflow-hidden cursor-pointer z-0 relative h-[480px] block",
          { hidden: modal }
        )}
        onClick={() => setModal(true)}
      >
        <div className="h-[60%] overflow-hidden mb-3 border-b">
          <div className="flex justify-center items-center h-full">
            <img
              src={product.images[0]}
              alt=""
              className="object-cover h-full w-full group-hover:scale-125 transition-all duration-300"
            />
          </div>
        </div>
        <CardContent>
          <CardTitle className="mb-3 font-bold">
            {toCapitalize(product.title)}
          </CardTitle>
          <div className=" clear-start flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span>{toCapitalize(product.category)}</span>
              <span>{toCapitalize(product.brand)}</span>
            </div>
            <div className="flex justify-between font-bold leading-tight">
              {product.salePrice > 0 && (
                <span className="line-through text-destructive">
                  ${product.salePrice}
                </span>
              )}
              <span className="flex w-full justify-end">${product.price}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <CustomButton
            className="z-50 relative cursor-pointer"
            onClick={(e) => handleCart(e)}
          >
            Add To Cart
          </CustomButton>
        </CardFooter>
      </Card>
      <div
        className={cn(
          "hidden rounded-none bg-transparent border-none h-full ",
          {
            block: modal,
          }
        )}
        onClick={(e) => handleClick(e)}
      >
        <div className="flex w-full h-full justify-center items-center">
          <div className="cursor-pointer relative">
            <span className="absolute right-0 text-destructive">
              <X onClick={() => setModal(false)} />
            </span>
            <div
              className="grid grid-cols-2 p-10 bg-secondary rounded-lg m-5 w-[900px] h-[80%] max-h-[80%] gap-6"
              ref={modalRef}
            >
              {/* image parent */}
              <div className="  rounded-lg overflow-hidden">
                <img
                  src={product.images[0]}
                  alt=""
                  className="object-cover h-full w-full group-hover:scale-125 transition-all duration-300"
                />
              </div>
              {/* section parent */}
              <div className="text-primary w-full">
                <div className="">
                  <h1 className="text-4xl mb-3 font-bold">
                    {toCapitalize(product.title)}
                  </h1>
                  <div className=" clear-start flex flex-col gap-2 text-sm mb-6 font-bold">
                    <div className="flex justify-between text-gray-400 font-light">
                      <div>
                        Category:{" "}
                        <span className=" font-bold text-primary">
                          {" "}
                          {toCapitalize(product.category)}
                        </span>
                      </div>
                      <div>
                        Brand:{" "}
                        <span className=" font-bold text-primary">
                          {toCapitalize(product.brand)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between font-bold leading-tight text-lg">
                      {product.salePrice > 0 && (
                        <span className="line-through text-destructive">
                          ${product.salePrice}
                        </span>
                      )}
                      <span className="flex justify-end">${product.price}</span>
                    </div>
                  </div>
                </div>
                <div className="flex overflow-y-scroll" ref={cartAndBuyRef}>
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
                      <Button onClick={() => setQuantity((prev) => prev >= product.totalStack ? prev : prev + 1)}>
                        +
                      </Button>
                    </div>
                    <CustomButton
                      onClick={(e) => handleCart(e)}
                      disabled={product.totalStack == 0}
                    >
                      Add to Cart
                    </CustomButton>
                    <CustomButton>Buy Now</CustomButton>
                  </div>
                </div>
                <div className="flex mt-5 h-[200px] overflow-y-scroll">
                  <p className="leading-tight">{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShoppingProductCard;
