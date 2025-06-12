import api from "../../axios";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/lib";

const getAllUsers = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`/admin`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const getUserByID = async (user_id: string): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`/admin/${user_id}`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const getUserMediaByID = async (user_id: string): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`/admin/media/${user_id}`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const mutateUser = async ({
  email,
  type,
  user_id,
}: MutateUserParams): Promise<AxiosResponse["data"]> => {
  const payload = { email, type, user_id };

  try {
    const response = await api.put(`/admin/action/${user_id}`, payload);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const notifyUser = async (user: any): Promise<AxiosResponse["data"]> => {
  const payload = user;

  try {
    const response = await api.post(`/admin/notify`, payload);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const deleteUser = async (user_id: string): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.delete(`/admin/${user_id}`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// @ts-ignore
const getUserActivity = async (user_id: string): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`/admin/${user_id}/activities`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const userApi = {
  getAllUsers,
  getUserByID,
  getUserMediaByID,
  mutateUser,
  notifyUser,
  deleteUser,
};
