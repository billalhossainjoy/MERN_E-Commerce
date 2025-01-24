import { startSession } from "mongoose";
import Asynchandler from "../../lib/AsyncHandler";
import ErrorApi from "../../lib/CustomError";
import ProductModel, { Product } from "../../model/Product.model";
import CartModel from "../../model/cart.model";
import ResponseApi from "../../lib/ResponseHandler";

export const addToCart = Asynchandler(async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    if (!userId || !productId || quantity <= 0)
      throw new ErrorApi(401, " user, product id and quantity required");

    const product = await ProductModel.findById(productId).session(session);
    if (!product) throw new ErrorApi(401, " Product not found ");

    let cart = await CartModel.findOne({ userId });

    if (!cart) cart = new CartModel({ userId, items: [] });

    const findProductIndex = cart.items.findIndex(
      (value) => value.productId.toString() === productId
    );

    if (findProductIndex === -1) cart.items.push({ productId, quantity });
    else cart.items[findProductIndex].quantity += quantity;

    const updatedCart = await cart.save();
    if (!updatedCart) throw new ErrorApi(401, " server side error");

    const payload = {
      productId: productId,
      image: product.images[0],
      title: product.title,
      price: product.price,
      salePrice: product.salePrice,
      quantity: updatedCart.items.find(
        (item) => item.productId.toString() === productId
      )?.quantity,
    };
    return ResponseApi(res, 200, `${product.title} added in cart successfully`, payload);
  } catch (error) {
    throw error;
  }
});

export const fetchCart = Asynchandler(async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new ErrorApi(401, "User id required");
    const cart = await CartModel.findOne({ userId }).populate({
      path: "items.productId",
      select: "images title price salePrice ",
    });

    if (!cart) throw new ErrorApi(404, "Cart not found");

    cart.items[0].productId;
    const validItems = cart.items.filter(
      (productItem) => productItem.productId
    );

    if (validItems.length < cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => {
      const product = item.productId as Product;
      return {
        productId: product.id,
        image: product.images[0],
        title: product.title,
        price: product.price,
        salePrice: product.salePrice,
        quantity: item.quantity,
      };
    });

    return ResponseApi(
      res,
      200,
      "Cart fetched successfully",
      populateCartItems
    );
  } catch (error) {
    throw error;
  }
});

export const updateCart = Asynchandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      throw new ErrorApi(400, "Product id and quantity required");
    }
    const cart = await CartModel.findOne({ userId });
    if (!cart) throw new ErrorApi(404, "Cart not found");

    const updatedData = cart.items.find((item) => {
      if (item.productId.toString() === productId) {
        item.quantity = quantity;
        return item;
      }
      return;
    });

    await cart.save();
    return ResponseApi(res, 200, "Cart updated successfully", updatedData);
  } catch (error) {
    throw error;
  }
});

export const deleteCart = Asynchandler(async (req, res) => {
  try {
    const { id: productId } = req.params;

    const userId = req.user._id;
    if (!productId || !userId)
      throw new ErrorApi(401, "Product id and user id required");

    const cart = await CartModel.findOne({
      userId,
    });

    if (!cart) throw new ErrorApi(404, "Cart not found");

    const findCartProductIndex = cart.items.findIndex((item) => {
      return item.productId.toString() === productId;
    });

    if (findCartProductIndex === -1)
      throw new ErrorApi(404, "Product not found in cart");

    const removedCart = cart.items.splice(findCartProductIndex, 1);

    await cart.save();

    if (!userId) throw new ErrorApi(401, "User id required");

    return ResponseApi(res, 200, "Cart deleted successfully", removedCart[0]);
  } catch (error) {
    throw error;
  }
});
