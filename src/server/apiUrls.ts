export const API_DOMAIN = import.meta.env.VITE_API_ENDPOINT || "http://localhost:5173";
export const BASE_API_DOMAIN = import.meta.env.VITE_BASE_API_ENDPOINT || "http://localhost:5173";

if (!API_DOMAIN) {
  throw new Error("API_DOMAIN is not defined in the environment variables.");
}

export default {
  // Auth Requests
  INDEX: "/",
  LOGIN: `/login`,
  LOGOUT: `/logout`,
  VERIFY_OTP: `/verify-token`,
  RESEND_OTP: `/resend-otp`,
  REFRESH_TOKEN: `/refresh-token`,
  GET_AUTH_USER: `/user`,
  FORGOT_PASSWORD: `/passwords/request`,
  RESET_PASSWORD: `/passwords/reset`,

  // REQUESTS
  PROPERTIES: `/properties`,
  DISTRICTS: `/districts`,

  CATEGORIES: `/categories`,
  MAIN_CATEGORIES: `/main-categories`,

  COMPLAINTS: `/complaints`,

  USERS: `/users`,
};
