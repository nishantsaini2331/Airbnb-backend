import express from "express";
import { validRequestBody } from "../../validators";
import { createBookingSchema } from "../../validators/booking.validator";
import { confirmBookingHandler, createBookingHandler } from "../../controllers/booking.controller";

const router = express.Router();

router.post("/", validRequestBody(createBookingSchema), createBookingHandler);
router.post("/confirm/:idempotencyKey", confirmBookingHandler);

export default router;
