import { model, Schema, Types, Document } from "mongoose";

export interface Product extends Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  salePrice: number;
  totalStack: number;
  status: "draft" | "active";
  isPhysical?: boolean;
  weight?: string;
  unit?: string;
  images: string[];
  createdAt: Date;
}

const ProductSchema: Schema = new Schema<Product>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: { type: Number },
    totalStack: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "active",
      required: true,
    },
    isPhysical: {
      type: Boolean,
    },
    weight: { type: String },
    unit: { type: String },
    images: [{ type: String }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model<Product>("Product", ProductSchema);

export default ProductModel;
