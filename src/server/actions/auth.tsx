import api from "../axios";
import APIURLS from "../apiUrls";
import axios, { AxiosResponse } from "axios";
import { handleApiError } from "@/lib/index";

const login = async (params: {
  email: string;
  password: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await axios.post(
      "https://staging-api.luxurywithlan.com/api/v1/admin/login",
      params
    );
    console.log("LOGIN RESPONSE", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const getAuthUser = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(APIURLS.GET_AUTH_USER);
    console.log("AUTH USER RESPONSE", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const verifyOtp = async (params: {
  otp: number;
  email: string;
}): Promise<AxiosResponse["data"]> => {
  const payload = {
    token: String(params.otp),
    email: params.email,
  };

  try {
    const response = await api.post(APIURLS.VERIFY_OTP, payload);
    console.log("VERIFY OTP RESPONSE", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const resendOtp = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(APIURLS.RESEND_OTP);
    console.log("RESEND OTP RESPONSE", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const forgotPassword = async (params: { email: string }): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.post(APIURLS.FORGOT_PASSWORD, params);
    console.log("FORGOT PASSWORD RESPONSE", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const resetPassword = async (params: {
  email: string;
  password: string;
  otp: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.post(APIURLS.RESET_PASSWORD, params);
    console.log("RESET PASSWORD RESPONSE", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const logout = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.post(APIURLS.LOGOUT);
    console.log("LOGOUT RESPONSE", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const refreshAccessToken = async (params?: {
  refresh_token: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.post(APIURLS.REFRESH_TOKEN, params);
    console.log("REFRESH TOKEN RESPONSE", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const authApi = {
  login,
  logout,
  getAuthUser,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
};
