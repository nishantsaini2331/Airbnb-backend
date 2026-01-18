import express from "express";
import pingRouter from "./ping.router";
import bookingRouter from "./booking.router";

const router = express.Router();

router.use("/ping", pingRouter);
router.use("/bookings", bookingRouter);

export default router;
