import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string("Username is required")
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters long.")
    .regex(/^\S+$/, "Username must not contain spaces."),
  email: z.email("Please enter a valid email address."),
  password: z
    .string("Password is required")
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long."),
  confirmPassword: z
    .string("Passwords don't not match")
    .min(8, "Passwords don't not match"),
});

export type SignupFields = z.infer<typeof signupSchema>;
