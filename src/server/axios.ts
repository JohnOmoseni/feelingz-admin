import axios from "axios";

export const API_DOMAIN = import.meta.env.VITE_API_ENDPOINT || "http://localhost:5173";

const api = axios.create({
  baseURL: API_DOMAIN,
});

export const baseApi = axios.create({
  baseURL: API_DOMAIN,
});

export default api;
