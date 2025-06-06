import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { createHotelDTO } from "../dto/hotel.dto";
import { NotFoundError } from "../utils/errors/app.error";

async function createHotel(hotelData: createHotelDTO) {
  const hotel = await Hotel.create(hotelData);

  logger.info(`Hotel created : ${hotel.id}`);
  return hotel;
}

async function getHotelById(id: number) {
  const hotel = await Hotel.findByPk(id);
  if (!hotel) {
    logger.error(`hotel not found : ${id}`);
    throw new NotFoundError(`Hotel with id ${id} not found`);
  }

  logger.info(`Hotel found : ${hotel.id}`);
  return hotel;
}

export default {
  createHotel,
  getHotelById,
};
