import { z } from "zod";

const ProductSchema = z.object({
  _id: z.string(),
  quantity: z.number(),
});

export const OrderSchema = z.object({
  userId: z.string(),
  products: z.array(ProductSchema),
  addressId: z.string(),
  paymentMethod: z.string(),
});

export const OrderCaptureSchema = z.object({
  paymentId: z.string(),
  payerId: z.string(),
  orderId: z.string(),
});
