import { z } from "zod";

export const filterSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  rating: z.string().optional(),
});
export const profileSchema = z.object({
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(500, "Bio too long"),
  hourlyRate: z
    .number()
    .min(10, "Hourly rate must be at least $10")
    .max(500, "Hourly rate too high"),
  experience: z.number().min(0).max(50),
  categoryIds: z.array(z.string()).min(1, "Select at least one category"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

export type FilterForm = z.infer<typeof filterSchema>;
