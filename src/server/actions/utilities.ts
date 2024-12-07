import api from "../axios";
import { API_DOMAIN } from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/lib";

const getStates = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`${API_DOMAIN}/state`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const getStateLGAs = async (state_id: string): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`${API_DOMAIN}/state/${state_id}/children`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const getFileManagerReport = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`${API_DOMAIN}/reports/file-manager`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const utilsApi = {
  getStates,
  getStateLGAs,
  getFileManagerReport,
};
