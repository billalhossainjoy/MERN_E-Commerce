import paypal from "paypal-rest-sdk";
import { PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } from "../config/env.config";

paypal.configure({
  mode: "sandbox",
  client_id: PAYPAL_CLIENT_ID,
  client_secret: PAYPAL_SECRET_KEY,
});

export default paypal;
