import { z } from "zod";
import { differenceInYears } from "date-fns";

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required.").max(255),
  lastName: z.string().min(1, "Last name is required.").max(255),
  email: z.string().email("Invalid email address.").max(255),
  dateOfBirth: z
    .date({
      required_error: "Date of birth is required.",
      invalid_type_error: "Invalid date.",
    })
    .refine((date) => differenceInYears(new Date(), date) >= 18, {
      message: "You must be at least 18 years old.",
    }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(255),
});
