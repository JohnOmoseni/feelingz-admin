import axios from "axios";
import { API_DOMAIN } from "./apiUrls";

const api = axios.create({
	baseURL: API_DOMAIN,
});

export default api;
