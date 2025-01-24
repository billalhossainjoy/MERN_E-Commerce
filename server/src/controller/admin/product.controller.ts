import { FilterQuery, ProjectionType, SortOrder } from "mongoose";
import { FileType } from "../../../types";
import Asynchandler from "../../lib/AsyncHandler";
import cloudinary from "../../lib/cloudinary";
import ErrorApi from "../../lib/CustomError";
import ResponseApi from "../../lib/ResponseHandler";
import { validUser } from "../../lib/utils";
import ProductModel from "../../model/Product.model";
import { ProductSchema, ProductSchemaType } from "../../schema/product.schema";
import { Product } from "../../model/Product.model";

export const addProduct = Asynchandler(async (req, res) => {
  let uploadedImages: string[] = [];
  try {
    const productImages: FileType[] = req.files as FileType[];
    const body = ProductSchema.parse({
      ...req.body,
      isPhysical: JSON.parse(req.body.isPhysical),
    });

    uploadedImages = await Promise.all(
      productImages.map((img) =>
        cloudinary
          .upload(img.buffer, { folder: "products_img" })
          .then((res) => res.secure_url)
      )
    );
    if (productImages.length !== uploadedImages.length)
      throw new ErrorApi(500, "Images are not uploaded");

    const data = {
      ...body,
      images: uploadedImages,
    };

    const product = await ProductModel.create({
      ...data,
    });

    if (!product) throw new ErrorApi(500, "product is not created.");

    return ResponseApi(res, 200, "Product added successfully.", product);
  } catch (error) {
    if (uploadedImages && uploadedImages.length > 0)
      await cloudinary.destoryFiles(uploadedImages, "products_img");
    throw error;
  }
});

export const allProducts = Asynchandler(async (req, res) => {
  try {
    const products = await ProductModel.find({})
    return ResponseApi(res, 200, "Get all products.", products);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getProduct = Asynchandler(async (req, res) => {
  const { id } = req.params;
  try {
    const products = await ProductModel.findById(id);
    if (!products) throw new ErrorApi(404, "Product not found.");
    return ResponseApi(res, 200, "Get product.", products);
  } catch (error) {
    throw error;
  }
});

export const updateProduct = Asynchandler(async (req, res) => {
  const { id } = req.params;
  try {
    const productImages: FileType[] = req.files as FileType[];
    const body: ProductSchemaType = {
      ...req.body,
      isPhysical: JSON.parse(req.body.isPhysical),
    };

    const product = await ProductModel.findById(id);
    if (!product) throw new ErrorApi(404, "Product not found.");

    const oldImageArray: number[] = JSON.parse(req.body.deleteImages);
    const oldImageList: string[] = [];

    product.images = product.images.filter((img, index) => {
      oldImageArray.includes(index) && oldImageList.push(img);
      return !oldImageArray.includes(index) && img;
    });

    const uploadedImage = await Promise.all(
      productImages.map((img) =>
        cloudinary
          .upload(img.buffer, { folder: "products_img" })
          .then((res) => res.secure_url)
      )
    );
    if (uploadedImage.length > productImages.length)
      throw new ErrorApi(500, "Server side error");

    await cloudinary.destoryFiles(oldImageList, "products_img");

    product.images = [...product.images, ...uploadedImage];
    product.title = body.title;
    product.description = body.description;
    product.category = body.category;
    product.brand = body.brand;
    product.price = +body.price;
    product.salePrice = +body.salePrice;
    product.totalStack = +body.totalStack;
    product.unit = body.unit;
    product.isPhysical = body.isPhysical;
    product.weight = body.weight;
    product.status = body.status as "active" | "draft";

    const updateProducts = await product.save();

    return ResponseApi(
      res,
      200,
      "Product updated successfully.",
      updateProducts
    );
  } catch (error) {
    throw error;
  }
});

export const deleteProduct = Asynchandler(async (req, res) => {
  const { id } = req.params;
  try {
    const existingProducts = await ProductModel.findById(id);
    if (!existingProducts) throw new ErrorApi(404, "Product not found.");

    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    await cloudinary.destoryFiles(existingProducts.images, "products_img");

    return ResponseApi(
      res,
      200,
      "Product deleted successfully.",
      deletedProduct
    );
  } catch (error) {
    throw error;
  }
});
