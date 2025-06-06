import express from "express";
import { HotelHandler } from "../../controllers";
import { validRequestBody } from "../../validators";
import { hotelSchema } from "../../validators/hotel.validator";

const router = express.Router();

router.post(
  "/",
  validRequestBody(hotelSchema),
  HotelHandler.createHotelHandler
);
router.get("/:id", HotelHandler.getHotelByIdHandler);
export default router;
