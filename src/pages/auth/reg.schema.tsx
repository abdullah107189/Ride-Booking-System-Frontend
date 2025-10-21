/* eslint-disable @typescript-eslint/no-explicit-any */
import z from "zod/v3";

// best-schema.ts
const commonSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z
    .string()
    .min(11, { message: "Phone number must be at least 11 digits" })
    .refine(
      (value) => {
        // eslint-disable-next-line no-useless-escape
        const cleanNumber = value.replace(/[\s+\-]/g, "");

        if (cleanNumber.startsWith("880") && cleanNumber.length === 13) {
          return /^8801[3-9]\d{8}$/.test(cleanNumber);
        }

        if (cleanNumber.startsWith("01") && cleanNumber.length === 11) {
          return /^01[3-9]\d{8}$/.test(cleanNumber);
        }

        return false;
      },
      {
        message:
          "Must be a valid Bangladeshi number like 017XXXXXXX or +88017XXXXXXX",
      }
    ),
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
