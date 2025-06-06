import express from "express";
import hotelRouter from "./hotel.router";

const router = express.Router();

router.use("/hotels", hotelRouter);

export default router;
