import mongoose, { Document, Schema, Types } from "mongoose";

interface Address extends Document {
  userId: Types.ObjectId;
  name: string;
  address: string;
  city: string;
  pincode: string;
  phone: string;
  notes: string;
  addressType: "HOME" | "OFFICE" | "OTHER";
}

const AddressSchema: Schema = new mongoose.Schema<Address>(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    addressType: {
      type: String,
      enum: ["HOME", "OFFICE", "OTHER"],
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const AddressModel = mongoose.model<Address>("Address", AddressSchema);

export default AddressModel;
