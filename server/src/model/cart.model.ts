import mongoose, { Document, Schema, Types } from "mongoose";
import { Product } from "./Product.model";

interface Cart extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  items: {
    productId: Product | Types.ObjectId;
    quantity: number;
  }[];
}

const cartSchema: Schema = new Schema<Cart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model<Cart>("Cart", cartSchema);

export default CartModel;
