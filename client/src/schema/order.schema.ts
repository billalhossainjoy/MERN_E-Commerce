import { z } from "zod";

const ProductSchema = z.object({
  _id: z.string(),
  quantity: z.number(),
});

const OrderSchema = z.object({
  products: z.any(ProductSchema),
  addressId: z.string().optional(),
  paymentMethod: z.string(),
});

export type OrderSchemaType = z.infer<typeof OrderSchema>;

export default OrderSchema;
