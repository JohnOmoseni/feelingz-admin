import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/lib";

const getFileManagerReport = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`${APIURLS.GET_FILE_REPORT}`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const dashboardApi = {
  getFileManagerReport,
};
