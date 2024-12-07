import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/lib";

const getPropertyListingOverview = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`${APIURLS.PROPERTIES}`);
    console.log("[PROPERTY OVERVIEW RESPONSE]", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const getPropertyReport = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`${APIURLS.GET_APPROVAL_REPORT}`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const getPropertyID = async ({
  property_id,
}: {
  property_id: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`${APIURLS.PROPERTIES}/${property_id}`);
    console.log("[PROPERTY BY ID RESPONSE]", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const postProperty = async (data: any): Promise<AxiosResponse["data"]> => {
  const payload = data;

  try {
    const response = await api.post(`${APIURLS.PROPERTIES}`, payload);
    console.log("[POST PROPERTY RESPONSE]", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const updateProperty = async ({
  property_id,
}: {
  property_id: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.put(`${APIURLS.PROPERTIES}/${property_id}`);
    console.log("[UPDATE PROPERTY BY ID RESPONSE]", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const updatePropertyPublishStatus = async ({
  propertyId,
  type,
}: {
  propertyId: string;
  type: "publish" | "unpublish";
}): Promise<AxiosResponse["data"]> => {
  const payload = { is_published: type === "publish" };

  try {
    const response = await api.put(`${APIURLS.PROPERTIES}/${propertyId}`, payload);
    console.log("[PROPERTY STATUS UPDATE RESPONSE]", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const listingApi = {
  getPropertyListingOverview,
  getPropertyReport,
  getPropertyID,

  postProperty,
  updateProperty,
  updatePropertyPublishStatus,
};
