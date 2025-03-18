import axios from "axios";
import { API_DOMAIN, BASE_API_DOMAIN } from "./apiUrls";

const api = axios.create({
  baseURL: API_DOMAIN,
});

export const baseApi = axios.create({
  baseURL: BASE_API_DOMAIN,
});

export default api;
