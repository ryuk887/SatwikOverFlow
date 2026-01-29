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

export const getSingleQuestion = (questionId) =>
  api.get(`/questions/${questionId}`);

export const createQuestion = (data) =>
  api.post("/questions", data);


// auth
export const registerUser = (data) =>
  api.post("/users/register", data);

export const loginUser = (data) =>
  api.post("/users/login", data);

export const logoutUser = () =>
  api.post("/users/logout");

export const getCurrentUser = () =>
  api.get("/users/me");



export default api;
