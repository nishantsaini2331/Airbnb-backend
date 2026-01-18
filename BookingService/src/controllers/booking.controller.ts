import { Request, Response } from "express";
import { confirmBookingService, createBookingService } from "../services/booking.service";
import { prisma } from "../prisma/client";

export async function createBookingHandler(req: Request, res: Response) {
  try {
    console.log("a");
    const c = await prisma.booking.findMany({});
    console.log({ c });
    console.log("b");
    const booking = await createBookingService(req.body);
    console.log("c");
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
