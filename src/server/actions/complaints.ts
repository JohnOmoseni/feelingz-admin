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

const createComplaint = async (payload: any): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.post(`${APIURLS.COMPLAINTS}`, payload);
    console.log("[CREATE COMPLAINT RESPONSE]", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const editComplaint = async ({
  complaint_id,
  ...payload
}: {
  complaint_id: string;
  [key: string]: any;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.put(`${APIURLS.COMPLAINTS}/${complaint_id}`, payload);
    console.log("[EDIT COMPLAINT RESPONSE]", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const deleteComplaint = async ({
  complaint_id,
}: {
  complaint_id: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.delete(`${APIURLS.COMPLAINTS}/${complaint_id}`);
    console.log("[DELETE COMPLAINT RESPONSE]", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const complaintApi = {
  getAllComplaints,
  createComplaint,
  editComplaint,
  deleteComplaint,
};
