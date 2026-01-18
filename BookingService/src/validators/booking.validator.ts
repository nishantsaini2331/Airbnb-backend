import { z } from "zod";

export const createBookingSchema = z.object({
  userId: z.string({ message: "User id must be required" }),
  hotelId: z.string({ message: "Hotel id must be required" }),
  totalGuests: z.coerce
    .number({ message: "Total guests must be present" })
    .min(1, { message: "Total guests must be atleast 1" }),
  bookingAmount: z.coerce
    .number({ message: "Booking amount must be present" })
    .min(1, { message: "Booking amount must be greater than 0" }),
});
