import express from "express";
import { hotelHandler } from "../../controllers";
import { validRequestBody } from "../../validators";
import { hotelSchema } from "../../validators/hotel.validator";

const router = express.Router();

router.post(
  "/",
  validRequestBody(hotelSchema),
  hotelHandler.createHotelHandler
);
router.get("/:id", hotelHandler.getHotelByIdHandler);
router.get("/", hotelHandler.getAllHotelHandler);
router.delete("/:id", hotelHandler.deleteHotelHandler);
router.patch("/:id", hotelHandler.updateHotelHandler);

export default router;
