import mongoose from "mongoose";
import { MONGODB_URI } from "./config/env.config";
import AppConfig from "./config/config";
import ErrorApi from "./lib/CustomError";

const ConnectDB = async () => {
  try {
    if (!MONGODB_URI) throw new ErrorApi(500, "Please give mongodb url.");
    const con = await mongoose.connect(MONGODB_URI);
    if (AppConfig.NODE_ENV === "development")
      console.log("Mongodb connect on", con.connection.host);
    return con;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default ConnectDB;
