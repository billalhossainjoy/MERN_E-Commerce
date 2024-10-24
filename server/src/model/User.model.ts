import { model, Schema, Types } from "mongoose";

export interface User extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
  accessToken?: string;
  refreshToken?: string;
}

const UserSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    accessToken: String,
    refreshToken: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = model<User>("User", UserSchema);

export default UserModel;
