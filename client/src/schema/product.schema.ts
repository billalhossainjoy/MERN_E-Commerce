import { z } from "zod";

export const newProductSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  brand: z.string(),
  price: z.number(),
  salePrice: z.number(),
  totalStack: z.number(),
  status: z.string(),
  isPhysical: z.boolean().optional(),
  weight: z.string().optional(),
  unit: z.string().optional(),
  productImages: z.custom<File[]>().optional().default([]),
  images: z.string().array().default([]),
});

export type ProductSchemaType = z.infer<typeof newProductSchema>;
