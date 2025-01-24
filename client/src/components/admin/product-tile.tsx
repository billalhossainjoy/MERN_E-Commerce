import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { ProductSchemaType } from "@/schema/product.schema";
import CustomButton from "./../common/CustomButton";
import { useNavigate } from "react-router-dom";

interface Props {
  product: ProductSchemaType;
}

const AdminProductTile: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card className="w-full overflow-hidden rounded-lg shadow-sm h-[24rem] flex flex-col gap-4 relative group duration-300 border-gray-300">
        <div className="h-3/4 rounded-b-xl overflow-hidden border-b border-gray-300">
          <div className="w-full overflow-hidden flex justify-center items-center bg-gray-200 rounded-lg group-hover:scale-110 duration-300">
            <div className="relative">
              <img
                src={product.images[0]}
                alt=""
                className="w-full h-80 object-cover "
              />
            </div>
          </div>
        </div>
        <div>
          <CardContent className="">
            <CardTitle className="font-bold text-lg">{product.title}</CardTitle>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className={`font-semibold text-destructive ${product.salePrice && "line-through"}`}>${product.salePrice}</p>
            <p className="font-semibold">${product.price}</p>
          </CardFooter>
        </div>
        <div className=" absolute m-2 right-0 group-hover:opacity-100 opacity-0">
          <CustomButton
            variant="outline"
            className="border-destructive text-destructive hover:text-destructive"
            onClick={() =>
              navigate(`/admin/products?delete-product=${product._id}`)
            }
          >
            Delete
          </CustomButton>
        </div>
        <div className="absolute bottom-0 w-full ">
          <button
            className="bg-primary text-white w-full flex p-1 justify-center opacity-0 group-hover:opacity-100 hover:bg-gray-700 duration-300 transition-all"
            onClick={() =>
              navigate(`/admin/products?update-product=${product._id}`)
            }
          >
            Edit
          </button>
        </div>
      </Card>
    </>
  );
};
export default AdminProductTile;
