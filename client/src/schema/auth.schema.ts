import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(4, "username must be at least 4 characters long.");

export const emailSchema = z
  .string()
  .email("Invalid email. please enter a valid email address.");

export const passwordSchema = z
  .string()
  .min(4, "username must be at least 8 characters long."); // TODO: length change before build

export const signUpSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  termsPolicy: z.boolean()
});

export const loginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});
