import axios from "axios";
import { LatLngLiteral } from "leaflet";

const API_BASE_URL = "http://localhost:5000/pins";

export const fetchPins = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching pins:", error);
    throw error;
  }
};

export const addPin = async (newPin: LatLngLiteral) => {
  try {
    const response = await axios.post(API_BASE_URL, newPin);
    return response.data;
  } catch (error) {
    console.error("Error adding pin:", error);
    throw error;
  }
};

export const deletePin = async (pinId: number) => {
  try {
    await axios.delete(`${API_BASE_URL}/${pinId}`);
  } catch (error) {
    console.error("Error deleting pin:", error);
    throw error;
  }
};
