import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone must be at least 8 characters").optional(),
  bio: z.string().max(300, "Bio must be less than 300 characters").optional(),
  location: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
