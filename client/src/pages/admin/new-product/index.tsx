import ProductForm from "@/components/admin/productForm";
import { useAppSelector } from "@/store/store";
import { ArrowLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddProduct: React.FC = () => {
  const { isLoading } = useAppSelector((state) => state.adminProduct);
  const navigate = useNavigate();
  return (
    <div className="relative">
      <div className="max-w-7xl m-auto h-full">
        <div className="flex items-center gap-2">
          <ArrowLeft
            className="text-gray-700 md:text-gray-500 hover:text-gray-700 "
            onClick={() => navigate("/admin/products")}
          />
          <h1 className="heading space-y-6 mb-3 mt-2">Add new product</h1>
        </div>
        <div className="">
          <ProductForm />
        </div>
      </div>
      {isLoading && (
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-200/70">
          <div className="flex justify-center items-center w-full h-full">
            <Loader className=" text-primary animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
};
export default AddProduct;
