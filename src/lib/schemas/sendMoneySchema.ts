import { z } from "zod";

const sendMoneySchema = z.object({
  amount: z.number().positive(),
  email: z.string().email("Invalid email address").max(255),
  note: z.string().max(255).optional(),
});

export { sendMoneySchema };
