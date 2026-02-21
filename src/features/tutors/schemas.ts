import { z } from "zod";

export const filterSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  rating: z.string().optional(),
});

export type FilterForm = z.infer<typeof filterSchema>;
