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
