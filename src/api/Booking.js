import axios from "axios";
import { BaseUrl } from "../config/Config";

export const my_room_bookings = async (headers) => {
    try {
        const response = await axios.get(`${BaseUrl}my-room-bookings`, { headers: headers });
        return response;
    } catch (error) {
        console.error("Error during API call:", error);
        throw error;
    }
};

export const my_transport_bookings = async (headers) => {
    try {
      const response = await axios.get(`${BaseUrl}my-transport-bookings`, { headers: headers });
      return response;
    } catch (error) {
      console.error("Error during API call:", error);
      return error; // Let the component handle errors
    }
  };