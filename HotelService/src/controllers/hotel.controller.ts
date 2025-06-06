import { NextFunction, Request, Response } from "express";
import { createHotelDTO } from "../dto/hotel.dto";
import {
  createHotelService,
  deleteHotelService,
  getAllHotelsService,
  getAllSoftDeletedHotelsService,
  getHotelByIdService,
  updateHotelService,
} from "../services/hotel.service";
import { StatusCodes } from "http-status-codes";

async function createHotelHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const hotelData: createHotelDTO = req.body;

    const hotel = await createHotelService(hotelData);
    res.status(StatusCodes.CREATED).json({
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
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Hotel found successfully",
      data: hotel,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllHotelHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const hotels = await getAllHotelsService();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Hotels found successfully",
      data: hotels,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteHotelHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const hotelId = Number(req.params.id);

    await deleteHotelService(hotelId);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Hotel deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function updateHotelHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const hotelId = Number(req.params.id);
    const updatedHotelData: createHotelDTO = req.body;

    const updatedHotel = await updateHotelService(hotelId, updatedHotelData);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Hotel updated successfully",
      data: updatedHotel,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllSoftDeletedHotelHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const hotels = await getAllSoftDeletedHotelsService();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "All soft deleted hotels are fetched successfully",
      data: hotels,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  createHotelHandler,
  getHotelByIdHandler,
  deleteHotelHandler,
  updateHotelHandler,
  getAllHotelHandler,
  getAllSoftDeletedHotelHandler,
};
