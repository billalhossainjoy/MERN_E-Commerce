import { z } from "zod";

export const ProductSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  brand: z.string(),
  price: z.string(),
  salePrice: z.string(),
  totalStack: z.string(),
  status: z.string(),
  isPhysical: z.boolean().optional(),
  weight: z.string().optional(),
  unit: z.string().optional()
});

export type ProductSchemaType = z.infer<typeof ProductSchema>