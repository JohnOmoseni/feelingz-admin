import api from "../../axios";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/lib";

const getDashboardOverview = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`/admin/overview`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const dashboardApi = {
  getDashboardOverview,
};
