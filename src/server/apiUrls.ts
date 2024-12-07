export const API_DOMAIN = import.meta.env.VITE_API_ENDPOINT || "http://localhost:5173";

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
  GET_APPROVAL_REPORT: `/properties/approval-report`,
  GET_REPORT: `/properties/report`,
  GET_FILE_REPORT: `/reports/file-manager`,

  PROPERTIES: `/properties`,
  DISTRICTS: `/districts`,

  CATEGORIES: `/categories`,
  MAIN_CATEGORIES: `/main-categories`,

  COMPLAINTS: `/complaints`,

  USERS: `/users`,
};
