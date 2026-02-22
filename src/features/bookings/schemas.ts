import { z } from "zod";

export const bookingSchema = z.object({
  availabilityId: z.string().min(1, "Please select a time slot"),
});

export type BookingForm = z.infer<typeof bookingSchema>;
