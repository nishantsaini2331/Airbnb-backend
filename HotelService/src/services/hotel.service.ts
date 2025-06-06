import { createHotelDTO } from "../dto/hotel.dto";
import { hotelRepo } from "../repositories";

export async function createHotelService(hotelData: createHotelDTO) {
  const hotel = await hotelRepo.createHotel(hotelData);
  return hotel;
}

export async function getHotelByIdService(id: number) {
  const hotel = await hotelRepo.getHotelById(id);
  return hotel;
}

export async function getAllHotelsService() {
  const hotels = await hotelRepo.getAllHotels();

  return hotels;
}

export async function deleteHotelService(id: number) {
  const hotel = await hotelRepo.softDeleteHotel(id);
  return hotel;
}

export async function updateHotelService(
  id: number,
  updateHotelData: createHotelDTO
) {
  const updatedData = await hotelRepo.udpateHotel(id, updateHotelData);
  return updatedData;
}

export async function getAllSoftDeletedHotelsService() {
  const response = await hotelRepo.getAllSoftDeletedHotels();
  return response;
}
