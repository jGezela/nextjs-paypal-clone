import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email().min(2).max(100),
  password: z.string().min(8).max(100),
});

export { loginSchema };
