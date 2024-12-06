import api from "../axios";
import APIURLS from "../apiUrls";
import { AxiosResponse } from "axios";
import { handleApiError } from "@/lib";

const getAllCategories = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`${APIURLS.MAIN_CATEGORIES}`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const createCategory = async (category: any): Promise<AxiosResponse["data"]> => {
  const payload = category;

  try {
    const response = await api.post(`${APIURLS.CATEGORIES}`, payload);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const editCategory = async ({ category_id, ...category }: any): Promise<AxiosResponse["data"]> => {
  const payload = category;

  try {
    const response = await api.put(`${APIURLS.CATEGORIES}/${category_id}`, payload);
    console.log("[EDIT USER BY ID RESPONSE]", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const deleteCategory = async (category_id: string): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.delete(`${APIURLS.CATEGORIES}/${category_id}`);
    console.log("[DELETE USER BY ID RESPONSE]", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const categoryApi = {
  getAllCategories,
  createCategory,
  editCategory,
  deleteCategory,
};
