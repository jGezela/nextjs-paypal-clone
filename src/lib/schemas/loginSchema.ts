import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address.").max(255),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(255),
});

export { loginSchema };
