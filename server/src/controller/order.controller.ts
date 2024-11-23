import { Types } from "mongoose";
import Asynchandler from "../lib/AsyncHandler";
import ErrorApi from "../lib/CustomError";
import paypal from "../lib/paypal";
import ResponseApi from "../lib/ResponseHandler";
import CartModel from "../model/cart.model";
import OrderModel from "../model/order.model";
import ProductModel, { Product } from "../model/Product.model";
import { OrderCaptureSchema, OrderSchema } from "../schema/order.schema";

const createOrder = Asynchandler(async (req, res) => {
  let amount = 0;
  try {
    req.body.userId = req.user._id.toString();

    const { products, userId, addressId, paymentMethod } = OrderSchema.parse(
      req.body
    );

    const cart = await CartModel.findOne({ userId }).populate<{
      item: {
        productId: Product;
        quantity: number;
      }[];
    }>("items.productId");

    if (!cart) throw new ErrorApi(404, "Cart not found");

    cart.items.forEach((item) => {
      const product = item.productId as Product;
      amount += product.price * item.quantity;
    });

    const create_payment_jason = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shopping/paypal-return",
        cancel_url: "http://localhost:5173/shopping/paypal-cancel",
      },
      transactions: [
        {
          amount: {
            currency: "USD",
            total: String(amount),
          },
          description: "Create the payment",
        },
      ],
    };

    paypal.payment.create(create_payment_jason, async (error, paymentInfo) => {
      if (error) throw new ErrorApi(401, "Error creating payment");

      const order = await OrderModel.create({
        userId,
        products,
        addressId,
        cart: cart.id,
        orderStatus: "pending",
        paymentMethod: paymentMethod,
        paymentStatus: "pending",
        totalAmount: amount + 100,
        paymentId: "",
        payerId: "",
      });

      const approvalURL = paymentInfo.links?.find(
        (link) => link.rel === "approval_url"
      )?.href;

      return ResponseApi(res, 200, "Payment successfully", {
        orderId: order.id,
        approvalURL,
      });
    });
  } catch (error) {
    throw error;
  }
});

const capturePayment = Asynchandler(async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = OrderCaptureSchema.parse(req.body);

    const order = await OrderModel.findById(orderId).populate<{
      cart: {
        _id: Types.ObjectId;
        items: {
          productId: Types.ObjectId;
          quantity: number;
          _id: Types.ObjectId;
        }[];
      };
    }>("cart");
    if (!order) throw new ErrorApi(404, "Order not found.");

    order.paymentId = paymentId;
    order.payerId = payerId;
    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";

    await order.save();

    const decrementProduct = async (item: {
      productId: Types.ObjectId;
      quantity: number;
      _id: Types.ObjectId;
    }) => {
      const product = await ProductModel.findById(item.productId);
      if (!product) return;

      await ProductModel.findByIdAndUpdate(
        item.productId,
        {
          totalStack: product.totalStack - item.quantity,
        },
        { new: true }
      );
    };

    (async () => {
      for (const item of order.cart.items) {
        if (!item) return;
        await decrementProduct(item);
      }
    })();

    await CartModel.findByIdAndDelete(order.cart);

    return ResponseApi(res, 200, "Payment captured successfully.", order);
  } catch (error) {
    throw error;
  }
});

const getAllOrderByUser = Asynchandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await OrderModel.find({ userId }).populate<{
      products: Product[];
    }>("products");

    return ResponseApi(res, 200, "Orders fetched successfully.", orders);
  } catch (error) {
    throw error;
  }
});

const getOrderDetailsByUser = Asynchandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;
    const order = await OrderModel.findOne({ _id: orderId, userId }).populate(
      "addressId products._id"
    );
    if (!order) throw new ErrorApi(404, "Order not found.");
    return ResponseApi(res, 200, "Order fetched successfully.", order);
  } catch (error) {
    throw error;
  }
});

const getOrderDetailsByAdmin = Asynchandler(async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const userId = req.user._id;
    if (!userId && req.user.role !== "ADMIN")
      throw new ErrorApi(401, "User not authenticated.");

    const order = await OrderModel.findOne({ _id: orderId }).populate(
      "addressId products._id"
    );

    return ResponseApi(res, 200, "Order fetched successfully.", order);
  } catch (error) {
    throw error;
  }
});

const getAllOrderByAdmin = Asynchandler(async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId && req.user.role !== "ADMIN")
      throw new ErrorApi(401, "User not authenticated.");

    const order = await OrderModel.find();

    return ResponseApi(res, 200, "Order fetched successfully.", order);
  } catch (error) {
    throw error;
  }
});

const updateOrderStatus = Asynchandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { status } = req.body;
    if (
      status !== "pending" ||
      "inprocess" ||
      "inshipping" ||
      "delivered" ||
      "rejected"
    )
      if (!userId && req.user.role !== "ADMIN")
        throw new ErrorApi(401, "User not authenticated.");

    const order = await OrderModel.findByIdAndUpdate(
      id,
      { orderStatus: status },
      { new: true }
    );

    return ResponseApi(res, 200, "Order fetched successfully.", order);
  } catch (error) {
    throw error;
  }
});

export {
  createOrder,
  capturePayment,
  getOrderDetailsByUser,
  getAllOrderByUser,
  getAllOrderByAdmin,
  getOrderDetailsByAdmin,
  updateOrderStatus,
};
