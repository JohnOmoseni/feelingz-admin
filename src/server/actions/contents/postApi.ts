import { AxiosResponse } from "axios";
import api from "@/server/axios";
import { handleApiError } from "@/lib";

//QUERIES
const getAllArticles = async ({
  page,
  perPage,
  query,
}: {
  page?: number;
  perPage?: number;
  query?: string;
}): Promise<PaginatedResponse> => {
  try {
    const endpoint = query ? "/explore/search" : "/explore";
    const params = query ? { page, query } : { page, pageSize: perPage };

    const response: AxiosResponse<PaginatedResponse> = await api.get(endpoint, {
      params,
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
const getArticleById = async ({
  article_id,
}: {
  article_id: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`/explore/${article_id}`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//MUTATIONS
const createArticle = async (data: FormData): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.post(`/explore`, data);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const updateArticle = async (data: {
  article_id: string;
  formData: FormData;
}): Promise<AxiosResponse["data"]> => {
  const { article_id, formData } = data;
  try {
    const response = await api.post(`/explore/${article_id}`, formData);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const deleteArticle = async ({
  article_id,
}: {
  article_id: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.delete(`/explore/${article_id}`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const postsApi = {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
