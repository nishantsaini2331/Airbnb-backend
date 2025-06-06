import { Op } from "sequelize";
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
  const hotel = await Hotel.findOne({
    where: { id, deletedAt: null },
  });
  if (!hotel) {
    logger.error(`hotel not found : ${id}`);
    throw new NotFoundError(`Hotel with id ${id} not found`);
  }

  logger.info(`Hotel found : ${hotel.id}`);
  return hotel;
}

async function getAllHotels() {
  const hotels = await Hotel.findAll({ where: { deletedAt: null } });

  logger.info(`Hotel found`);
  return hotels;
}

async function deleteHotel(id: number) {
  const hotel = await Hotel.destroy({
    where: {
      id,
    },
  });

  if (!hotel) {
    logger.error(`Hotel not found. Unable to delete : ${id}`);
    throw new NotFoundError(`Hotel with id ${id} not found`);
  }

  return hotel;
}

async function udpateHotel(id: number, updatedData: createHotelDTO) {
  const updatedHotel = await Hotel.update(updatedData, { where: { id } });
  console.log(updatedHotel);
  if (!updatedHotel) {
    logger.error(`Hotel not found. Unable to update : ${id}`);
    throw new NotFoundError(`Hotel with id ${id} not found`);
  }

  return getHotelById(id);
}

async function softDeleteHotel(id: number) {
  const softDeletedHotel = await Hotel.update(
    { deletedAt: new Date() },
    { where: { id } }
  );

  if (!softDeletedHotel[0]) {
    logger.error(`Hotel not found. Unable to update : ${id}`);
    throw new NotFoundError(`Hotel with id ${id} not found`);
  }

  return true;
}

async function getAllSoftDeletedHotels() {
  console.log("object");
  const allSoftDeletedHostels = await Hotel.findAll({
    where: { deletedAt: { [Op.ne]: null } },
  });

  return allSoftDeletedHostels;
}

export default {
  createHotel,
  getHotelById,
  getAllHotels,
  deleteHotel,
  udpateHotel,
  softDeleteHotel,
  getAllSoftDeletedHotels,
};
