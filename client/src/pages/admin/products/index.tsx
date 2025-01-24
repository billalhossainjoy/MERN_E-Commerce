import AdminProductTile from "@/components/admin/product-tile";
import CustomButton from "@/components/common/CustomButton";
import {
  deleteProduct,
  fetchAllProducts,
} from "@/store/features/admin/product.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductForm from "./../../../components/admin/productForm";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@/components/ui/dialog";
import CustomDialog from "@/components/common/Dialog";
import { useToast } from "@/hooks/use-toast";

const AdminProducts: React.FC = () => {
  const { toast } = useToast();
  const { isLoading } = useAppSelector((state) => state.adminProduct);
  const [params] = useSearchParams();
  const updateProductParam = params.get("update-product");
  const deleteProductParam = params.get("delete-product");
  const { ProductLists } = useAppSelector((state) => state.adminProduct);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const searchProduct = (id: string) => {
    const product = ProductLists.filter((product) => product._id === id);
    return product[0];
  };

  const deleteHandler = (deleteProductParam: string) => {
    dispatch(deleteProduct(deleteProductParam)).then((res) => {
      console.log(res.payload);
      if (res.payload.success) {
        toast({
          title: res.payload.message,
          className:
            "bg-transparent border-primary border text-primary shadow-md shadow-primary",
        });
        navigate("/admin/products");
      } else {
        toast({
          title: "Delete faild.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className=" relative h-full p-5 2xl:p-0 mb-5">
      <div
        className={cn("flex flex-col gap-5", {
          "blur-sm": updateProductParam || deleteProductParam,
        })}
      >
        <div className="flex w-full justify-end max-w-7xl m-auto my-5">
          <CustomButton
            type="button"
            onClick={() => navigate("/admin/newproduct")}
          >
            Add new product
          </CustomButton>
        </div>
        <div className="mx-10 lg:mx-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 max-w-7xl m-auto">
            {ProductLists?.map((product) => (
              <AdminProductTile product={product} key={product._id} />
            ))}
          </div>
        </div>
      </div>

      {deleteProductParam && (
        <CustomDialog
          className="flex flex-col gap-10"
          open={deleteProductParam ? true : false}
          setOpen={(e: any) => e === false && navigate("/admin/products")}
        >
          <DialogTitle>Are you sure to delete the product?</DialogTitle>
          <div className="w-full flex justify-end gap-3">
            <CustomButton
              variant="outline"
              className="w-1/4"
              onClick={() => {
                navigate(`/admin/products`);
              }}
            >
              Cancel
            </CustomButton>
            <CustomButton
              disabled={isLoading}
              variant="outline"
              className={cn(
                "w-1/4 border border-destructive text-destructive hover:text-red-600 hover:bg-red-50"
              )}
              onClick={() => deleteHandler(deleteProductParam)}
            >
              {isLoading ? "loading..." : "Delete"}
            </CustomButton>
          </div>
        </CustomDialog>
      )}

      {updateProductParam && (
        <CustomDialog
          className="max-w-4xl"
          open
          setOpen={() => navigate("/admin/products")}
        >
          <div
            className={cn(
              "h-[500px] flex-1 flex-grow-0 overflow-y-scroll remove-scrollbar pt-3",
              { "h-[700px] ": window.innerHeight > 700 }
            )}
          >
            <ProductForm
              newForm={false}
              product={searchProduct(updateProductParam)}
            />
          </div>
        </CustomDialog>
      )}
    </div>
  );
};
export default AdminProducts;
