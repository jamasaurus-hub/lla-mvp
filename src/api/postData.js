import axios from "./axios";

export const postData = async (endpoint, payload) => {
  try {
    if (payload.id) {
      const response = await axios.patch(`${endpoint}`, payload);
      return response.data;
    } else {
      const response = await axios.post(endpoint, payload);
      return response.data;
    }
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
