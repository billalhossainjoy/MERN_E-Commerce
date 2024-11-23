import CustomButton from "@/components/common/CustomButton";
import CustomForm from "@/components/common/FormField";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { newProductSchema, ProductSchemaType } from "@/schema/product.schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldType } from "@/constant";
import { useNavigate } from "react-router-dom";
import {
  productBrands,
  productCategories,
  productStatus,
  productWeightUnit,
} from "@/components/admin/constants";
import ProductUploader from "./productUploader";
import {
  addNewProduct,
  updateProduct,
} from "@/store/features/admin/product.slice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Trash2, Undo } from "lucide-react";
import { useState } from "react";

interface Props {
  product?: z.infer<typeof newProductSchema>;
  newForm?: boolean;
}

const ProductForm: React.FC<Props> = ({ product, newForm = true }) => {
  const { isLoading } = useAppSelector((state) => state.adminProduct);
  const [deleteImages, setDeleteImages] = useState<number[]>([]);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      title: product?.title || undefined,
      description: product?.description || undefined,
      category: product?.category || undefined,
      brand: product?.brand || undefined,
      price: product?.price || undefined,
      salePrice: product?.salePrice || undefined,
      totalStack: product?.totalStack || undefined,
      status: product?.status || "active",
      isPhysical: product?.isPhysical || false,
      weight: product?.weight || "0.0",
      unit: product?.unit || "g",
      productImages: [],
    },
  });

  const onSubmit = async (data: ProductSchemaType) => {
    const formData = new FormData();

    try {
      if (data.productImages && data.productImages.length > 0) {
        for (let i = 0; i < data.productImages.length; i++) {
          formData.append("products", data.productImages[i]);
        }
      }

      for (const key in data) {
        const element = data[key as keyof ProductSchemaType];
        if (
          key !== "productImages" &&
          Object.prototype.hasOwnProperty.call(data, key)
        ) {
          formData.append(key, element as keyof ProductSchemaType);
        }
      }

      dispatch(addNewProduct(formData)).then((res) => {
        console.log(res.payload.success);
        if (res.payload.success) {
          toast({
            title: res.payload.message,
            className:
              "bg-transparent border-primary border text-primary shadow-md shadow-primary",
          });
          navigate("/admin/products");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async (data: ProductSchemaType) => {
    const formData = new FormData();
    try {
      if (data.productImages && data.productImages.length > 0) {
        for (let i = 0; i < data.productImages.length; i++) {
          formData.append("products", data.productImages[i]);
        }
      }

      formData.append("deleteImages", JSON.stringify(deleteImages));

      for (const key in data) {
        const element = data[key as keyof ProductSchemaType];
        if (
          key !== "productImages" &&
          Object.prototype.hasOwnProperty.call(data, key)
        ) {
          formData.append(key, element as keyof ProductSchemaType);
        }
      }

      if (product)
        dispatch(updateProduct({ id: product._id!, formData })).then((res) => {
          console.log(res.payload);
          if (res.payload.success) {
            toast({
              title: res.payload.message,
              className:
                "bg-transparent border-primary border text-primary shadow-md shadow-primary",
            });
            setDeleteImages([]);
            navigate("/admin/products");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const imageDeleteHandler = (index: number) => {
    if (!deleteImages.includes(index))
      setDeleteImages((prev) => [...prev, index]);
    else setDeleteImages((prev) => prev.filter((i) => i !== index));
  };

  return (
    <>
      <div className="max-w-full w-full">
        <form
          className="flex flex-col gap-3"
          onSubmit={form.handleSubmit(!product ? onSubmit : updateHandler)}
        >
          <Form {...form}>
            <div
              className={cn(" grid grid-cols-1 lg:grid-cols-3 gap-3", {
                "lg:grid-cols-1 gap-x-0": !newForm,
              })}
            >
              <div className="flex flex-col gap-3 col-span-2">
                <div className="border p-5 rounded-xl shadow-sm bg-white flex flex-col gap-3">
                  {
                    <CustomForm<ProductSchemaType>
                      name="title"
                      control={form.control}
                      inputType={FormFieldType.INPUT}
                      label="Title"
                    />
                  }
                  {
                    <CustomForm<ProductSchemaType>
                      name="description"
                      control={form.control}
                      inputType={FormFieldType.TEXTAREA}
                      label="Description"
                    />
                  }

                  {product?.images && product.images.length > 0 && (
                    <div className="w-full">
                      <div className="grid grid-cols-5 gap-2 w-full h-40 overflow-hidden ">
                        {product.images.map((image, index) => (
                          <div
                            className="relative w-full h-full rounded-lg overflow-hidden flex justify-center items-center p-1 border border-gray-400 group "
                            key={index}
                            onClick={() => imageDeleteHandler(index)}
                          >
                            <div>
                              <img
                                src={image}
                                alt=""
                                className="object-contain rounded-lg"
                              />
                              <div
                                className={cn(
                                  "absolute top-0 left-0 right-0 bottom-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer",
                                  {
                                    "opacity-100": deleteImages.includes(index),
                                  }
                                )}
                              >
                                <div className="flex justify-center items-center w-full h-full">
                                  {!deleteImages.includes(index) && (
                                    <Trash2 className="text-destructive" />
                                  )}
                                  {deleteImages.includes(index) && (
                                    <Undo className="text-white w-10" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {
                    <CustomForm<ProductSchemaType>
                      name="productImages"
                      control={form.control}
                      inputType={FormFieldType.SKELETON}
                      label="Product Images. (Max 5 photo.)"
                      renderSkeleton={(field) => (
                        <>
                          <ProductUploader
                            field={field}
                            images={{
                              totalImage: product?.images.length ?? 0,
                              deleteImages: deleteImages.length,
                            }}
                          />
                        </>
                      )}
                    />
                  }
                </div>
                <div className="border p-5 rounded-xl shadow-sm bg-white flex flex-col gap-3">
                  {
                    <CustomForm<ProductSchemaType>
                      name="category"
                      control={form.control}
                      inputType={FormFieldType.SELECT}
                      label="Category"
                      placeholder="Select category type."
                      options={productCategories}
                    />
                  }
                  {
                    <CustomForm<ProductSchemaType>
                      name="brand"
                      control={form.control}
                      inputType={FormFieldType.SELECT}
                      label="Brand"
                      placeholder="Select brand type."
                      options={productBrands}
                    />
                  }
                </div>
                <div className="border p-5 rounded-xl shadow-sm bg-white flex flex-col gap-3">
                  <h1 className="sub-heading">Pricing</h1>
                  {
                    <CustomForm<ProductSchemaType>
                      name="price"
                      control={form.control}
                      inputType={FormFieldType.NUMBER}
                      label="Price"
                      placeholder="0.0"
                    />
                  }
                  {
                    <CustomForm<ProductSchemaType>
                      name="salePrice"
                      control={form.control}
                      inputType={FormFieldType.NUMBER}
                      label="Sale Price"
                      placeholder="0.0"
                    />
                  }
                  {
                    <CustomForm<ProductSchemaType>
                      name="totalStack"
                      control={form.control}
                      inputType={FormFieldType.NUMBER}
                      label="Total stack"
                      placeholder="0"
                    />
                  }
                </div>
                <div className="border p-5 rounded-xl shadow-sm bg-white flex flex-col gap-3">
                  <h1 className="sub-heading">Shipping</h1>
                  {
                    <CustomForm<ProductSchemaType>
                      name="isPhysical"
                      control={form.control}
                      inputType={FormFieldType.CHECKBOX}
                      label="Physical product."
                    />
                  }
                  <div className="flex gap-2 items-end">
                    {form.getValues("isPhysical") && (
                      <CustomForm<ProductSchemaType>
                        name="weight"
                        control={form.control}
                        inputType={FormFieldType.INPUT}
                        label="Weight"
                        placeholder="0.0"
                      />
                    )}
                    {form.getValues("isPhysical") && (
                      <CustomForm<ProductSchemaType>
                        name="unit"
                        control={form.control}
                        inputType={FormFieldType.SELECT}
                        placeholder="kg"
                        options={productWeightUnit}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="border p-5 rounded-xl shadow-sm bg-white">
                  {
                    <CustomForm<ProductSchemaType>
                      name="status"
                      control={form.control}
                      inputType={FormFieldType.SELECT}
                      label="Status"
                      placeholder="Select type."
                      options={productStatus}
                    />
                  }
                </div>
              </div>
            </div>
            <div className="flex w-full justify-start mb-4 gap-3">
              <CustomButton disabled={isLoading}>
                {product ? "Update" : "Add product"}
              </CustomButton>
              <CustomButton
                type={"button"}
                variant={"outline"}
                onClick={() => navigate("/admin/products")}
              >
                Cancel
              </CustomButton>
            </div>
          </Form>
        </form>
      </div>
    </>
  );
};
export default ProductForm;
