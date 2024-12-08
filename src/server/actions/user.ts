import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/lib";

const getAllUsers = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`${APIURLS.USERS}`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const getUserByID = async (user_id: string): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`${APIURLS.USERS}/${user_id}`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const createUser = async (user: any): Promise<AxiosResponse["data"]> => {
  const payload = user;

  try {
    const response = await api.post(`${APIURLS.USERS}`, payload);
    console.log("[CREATE USER RESPONSE]", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const updateUserStatus = async ({
  user_id,
  action,
}: {
  user_id: string;
  action: "activate" | "deactivate";
}): Promise<AxiosResponse["data"]> => {
  const payload = { status: action === "activate" ? "active" : "false" };

  try {
    const response = await api.put(`${APIURLS.USERS}/${user_id}`, payload);

    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

const deleteUser = async (user_id: string): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.delete(`${APIURLS.USERS}/${user_id}`);
    console.log("[DELETE USER BY ID RESPONSE]", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const getUserActivity = async (user_id: string): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`${APIURLS.USERS}/${user_id}/activities`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const userApi = {
  getAllUsers,
  createUser,
  updateUserStatus,
  deleteUser,
  getUserActivity,
  getUserByID,
};
