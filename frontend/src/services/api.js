import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true, // 🔥 important for cookies
});

// Optional: global response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const getAllQuestions = (page = 1, limit = 10) =>
  api.get(`/questions?page=${page}&limit=${limit}`);

export default api;
