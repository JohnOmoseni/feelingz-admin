import { AxiosResponse } from "axios";
import { handleApiError } from "@/lib";
import api from "@/server/axios";

//QUERIES
const getAllChannels = async ({ page, query }: { page: number; query: string }): Promise<any> => {
  try {
    const endpoint = query ? "/channel/search" : "/channel";
    const params = query ? { page, query } : { page, pageSize: 15 };

    const response: AxiosResponse<any> = await api.get(endpoint, {
      params,
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const getChannelsOverview = async (): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.get("/channel/channels");

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const getChannelById = async ({
  channel_id,
}: {
  channel_id: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`/channel/${channel_id}`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const getFavoriteChannels = async (): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.get(`/channel/favorite`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

//MUTATIONS
const createChannel = async (payload: MutateChannelParams): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.post(`/channel`, payload);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const updateChannel = async (
  payload: MutateChannelParams & { channel_id: string }
): Promise<AxiosResponse["data"]> => {
  const { channel_id } = payload;

  try {
    const response = await api.put(`/channel/${channel_id}`, payload);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

const deleteChannel = async ({
  channel_id,
}: {
  channel_id: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const response = await api.delete(`/channel/${channel_id}`);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const contentApi = {
  getAllChannels,
  getChannelById,
  getChannelsOverview,
  getFavoriteChannels,

  createChannel,
  updateChannel,
  deleteChannel,
};
