import { Request, Response } from "express";
import { confirmBookingService, createBookingService } from "../services/booking.service";

export async function createBookingHandler(req: Request, res: Response) {
  try {
    const booking = await createBookingService(req.body);
    res.status(201).json({
      bookingId: booking.bookingId,
      idempotencyKey: booking.idempotencyKey,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function confirmBookingHandler(req: Request, res: Response) {
  const booking = await confirmBookingService(req.params.idempotencyKey);

  res.status(201).json({
    bookingId: booking.id,
    idempotencyKey: booking.status,
  });
}
