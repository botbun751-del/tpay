import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Use at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(10),
  password: z.string().min(8, "Use at least 8 characters"),
});

export const referralSchema = z.object({
  email: z.string().email(),
  message: z.string().max(280).optional(),
});

export const payoutSchema = z.object({
  amount: z.number().min(1),
  destination: z.string().min(4),
});


