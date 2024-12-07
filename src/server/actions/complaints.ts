import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/lib";

const getAllComplaints = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`${APIURLS.COMPLAINTS}`);

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

const deleteUser = async (user_id: string): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.delete(`${APIURLS.USERS}/${user_id}`);
    console.log("[DELETE USER BY ID RESPONSE]", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const userApi = {};
