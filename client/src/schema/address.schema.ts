import { z } from "zod";

export const AddressSchema = z.object({
  _id: z.string().optional(),
  name: z.string().optional(),
  userId: z.string().optional(),
  address: z.string(),
  city: z.string(),
  pincode: z.string(),
  phone: z.string(),
  notes: z.string().optional(),
  addressType: z.enum(["HOME", "OFFICE", "OTHER"]),
});

export type AddressSchemaType = z.infer<typeof AddressSchema>;