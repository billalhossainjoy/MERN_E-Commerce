import { FilterQuery, isValidObjectId, ProjectionType } from "mongoose";
import ResponseApi from "../../lib/ResponseHandler";
import ProductModel, { Product } from "../../model/Product.model";
import Asynchandler from "../../lib/AsyncHandler";
import ErrorApi from "../../lib/CustomError";

export const FetchAllProducts = Asynchandler(async (req, res) => {
  let projection: ProjectionType<Product> = {
    totalStack: 0,
    status: 0,
    createdAt: 0,
  };

  try {
    const query = req.query;

    Object.keys(query).forEach((key) => {
      const option = query[key];
      if (option && typeof option === "string" && option.length > 0)
        query[key] = option.split(",");
      else query[key] = [];
    });

    const filters: FilterQuery<Product> = {
      category:
        Array.isArray(query.category) && query.category.length > 0
          ? { $in: query.category }
          : { $exists: true },
      brand:
        Array.isArray(query.brand) && query.brand.length > 0
          ? { $in: query.brand }
          : { $exists: true },
    };

    const sort: {
      price?: 1 | -1;
      title?: 1 | -1;
    } = {};

    switch (Array.isArray(query.sortBy) && query.sortBy[0]) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;
      case "title-ztoa":
        sort.title = -1;
        break;
    }

    const products = await ProductModel.find(filters).sort(sort);

    return ResponseApi(res, 200, "Get all products.", products);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const FetchProduct = Asynchandler(async (req, res) => {
  const { id } = req.params;

  try {
    if (!isValidObjectId(id)) throw new ErrorApi(500, "Product not found");

    const product = await ProductModel.findById(id);
    if (!product) throw new ErrorApi(404, "Product not found");

    return ResponseApi(res, 200, "Get all products.", product);
  } catch (error) {
    throw error;
  }
});

export const searchProduct = Asynchandler(async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string")
      throw new ErrorApi(401, "Invalid keyword");

    const regEx = new RegExp(keyword, "i");
    const createSearchQuery = {
      $or: [
        { title: regEx },
        { description: regEx },
        { category: regEx },
        { brand: regEx },
      ],
    };
    const searchResults = await ProductModel.find(createSearchQuery)

    console.log(searchProduct)

    return ResponseApi(res, 200, "Search products.", searchResults);

  } catch (error) {
    console.log(error);
  }
});
