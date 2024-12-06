export const API_DOMAIN = import.meta.env.VITE_API_ENDPOINT || "http://localhost:5173";

if (!API_DOMAIN) {
  throw new Error("API_DOMAIN is not defined in the environment variables.");
}

export default {
  // Auth Requests
  LOGIN: `/admin/login`,
  LOGOUT: `/admin/logout`,
  VERIFY_OTP: `/admin/verify-token`,
  RESEND_OTP: `/admin/resend-otp`,
  REFRESH_TOKEN: `/admin/refresh-token`,
  GET_AUTH_USER: `/admin/user`,
  FORGOT_PASSWORD: `/admin/passwords/request`,
  RESET_PASSWORD: `/admin/passwords/reset`,

  // REQUESTS
  GET_APPROVAL_REPORT: `/admin/properties/approval-report`,
  GET_REPORT: `/admin/properties/report`,

  PROPERTIES: `/admin/properties`,
  DISTRICTS: `/admin/districts`,

  CATEGORIES: `/admin/categories`,
  MAIN_CATEGORIES: `/admin/main-categories`,

  COMPLAINTS: `/admin/complaints`,

  USERS: `/admin/users`,
};
