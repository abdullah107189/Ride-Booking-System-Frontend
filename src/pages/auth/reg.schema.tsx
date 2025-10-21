/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod/v3";

// best-schema.ts
const commonSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  password: z.string().min(8),
  confirmPassword: z.string(),
});

const driverSchema = commonSchema.extend({
  role: z.literal("driver"),
  licensePlate: z.string().min(3),
  model: z.string().min(2),
  carType: z.string().min(2),
  address: z.string().min(5),
});

const riderSchema = commonSchema.extend({
  role: z.literal("rider"),
});

// Conditional schema based on role
export const formSchema = z
  .discriminatedUnion("role", [riderSchema, driverSchema])
  .refine(
    (data: { password: any; confirmPassword: any }) =>
      data.password === data.confirmPassword,
    {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }
  );
