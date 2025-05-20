import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email().min(2).max(100),
  dateOfBirth: z.string().date(),
  password: z.string().min(8).max(100),
});

export { signupSchema };
