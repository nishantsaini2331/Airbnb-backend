import { NextFunction, Request, Response } from "express";
import { createHotelDTO } from "../dto/hotel.dto";
import {
  createHotelService,
  getHotelByIdService,
} from "../services/hotel.service";

async function createHotelHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const hotelData: createHotelDTO = req.body;

    const hotel = await createHotelService(hotelData);
    res.status(201).json({
      success: true,
      message: "Hotel created successfully",
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
}

async function getHotelByIdHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const hotelId = Number(req.params.id);

    const hotel = await getHotelByIdService(hotelId);
    res.status(201).json({
      success: true,
      message: "Hotel found successfully",
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  createHotelHandler,
  getHotelByIdHandler,
};
