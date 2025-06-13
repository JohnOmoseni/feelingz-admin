import api, { baseApi } from "../axios";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/lib/index";

const login = async (params: {
  email: string;
  password: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await baseApi.post(`/auth/login`, params);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const getAuthUser = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get("/user");

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const verifyOtp = async (params: {
  user_id: string;
  token: number;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await baseApi.post(`/auth/email/verify`, params);

    return response?.data;
  } catch (error) {
    handleApiError(error);
  }
};

const verifyResetPasswordOtp = async (params: {
  token: number;
  email: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await baseApi.post(`/auth/password/verify`, params);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const resendOtp = async (
  params: {
    email: string;
    user_id: string;
  },
  signal?: AbortSignal
): Promise<AxiosResponse["data"]> => {
  try {
    const response = await baseApi.post(`/auth/email/resend`, params, {
      signal,
    });
    return response.data;
  } catch (error: any) {
    handleApiError(error);
  }
};

const forgotPassword = async (params: { email: string }): Promise<AxiosResponse["data"]> => {
  try {
    const response = await baseApi.post("/auth/password/forgot", params);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const resetPassword = async (params: {
  password: string;
  password_confirmation: string;
  reset_token: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await baseApi.put(
      "/auth/password/reset",
      {
        password: params.password,
        password_confirmation: params.password_confirmation,
      },
      {
        headers: {
          Authorization: `Bearer ${params.reset_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const logout = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.post("/logout");

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
  verifyResetPasswordOtp,
  forgotPassword,
  resetPassword,
};
