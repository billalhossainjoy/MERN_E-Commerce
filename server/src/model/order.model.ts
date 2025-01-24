import { Document, model, Schema } from "mongoose";

interface Products {
  _id: Schema.Types.ObjectId;
  quantity: number;
}

interface Order extends Document {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  cart: Schema.Types.ObjectId;
  products: Products[];
  addressId: Schema.Types.ObjectId;
  orderStatus:
    | "pending"
    | "confirmed"
    | "inprocess"
    | "inshipping"
    | "delivered"
    | "rejected";
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  orderDate: Date;
  orderUpdateDate: Date;
  paymentId: string;
  payerId: string;
}

const OrderSchema: Schema = new Schema<Order>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: Number,
      },
    ],
    addressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "inprocess",
        "inshipping",
        "delivered",
        "rejected",
      ],
      required: true,
    },
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    orderDate: {
      type: Date,
      default: Date.now,
    },
    orderUpdateDate: {
      type: Date,
      default: Date.now,
    },
    paymentId: String,
    payerId: String,
  },
  {
    timestamps: true,
  }
);

const OrderModel = model<Order>("Order", OrderSchema);

export default OrderModel;
