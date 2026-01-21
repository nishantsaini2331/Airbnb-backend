import { Prisma, IdempotencyKey } from "../generated/prisma/browser";

import { prisma } from "../prisma/client";

import { validate as isValidUUID } from "uuid";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
export async function createBooking(bookingInput: Prisma.BookingCreateInput) {
  const booking = await prisma.booking.create({
    data: bookingInput,
  });

  return booking;
}

export async function createIdempotencyKey(key: string, bookingId: string) {
  const idempotencyKey = await prisma.idempotencyKey.create({
    data: {
      idemKey: key,
      booking: {
        connect: {
          id: bookingId,
        },
      },
    },
  });

  return idempotencyKey;
}

export async function getIdempotencyKeyWithLock(tx: Prisma.TransactionClient, key: string) {
  if (!isValidUUID(key)) {
    throw new BadRequestError("Invalid idempotency key format");
  }
  const idempotencyKey: Array<IdempotencyKey> = await tx.$queryRaw`
    SELECT * FROM IdempotencyKey WHERE idemKey = ${key} FOR UPDATE
  `;

  if (!idempotencyKey || idempotencyKey.length === 0) {
    throw new NotFoundError("Idempotency key not found");
  }

  return idempotencyKey[0];
}

export async function getBookingById(bookingId: string) {
  const booking = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });
  return booking;
}

export async function confirmBooking(tx: Prisma.TransactionClient, bookingId: string) {
  const booking = await tx.booking.update({
    where: { id: bookingId },
    data: { status: "CONFIRMED" },
  });
  return booking;
}

export async function cancelBooking(bookingId: string) {
  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });
  return booking;
}

export async function finalizeIdempotencyKey(tx: Prisma.TransactionClient, key: string) {
  const idempotencyKey = await tx.idempotencyKey.update({
    where: { idemKey: key },
    data: { finalized: true },
  });
  return idempotencyKey;
}
