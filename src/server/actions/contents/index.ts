import { AxiosResponse } from "axios";
import { handleApiError } from "@/lib";
import api from "@/server/axios";
import dayjs from "dayjs";

//QUERIES
const getAllChannels = async ({
  page = 1,
  query,
}: {
  page?: number;
  query?: string;
}): Promise<AxiosResponse["data"]> => {
  try {
    const endpoint = query ? "/channel/channels/search" : "/channel/channels";
    const params = query ? { page, query } : { page, pageSize: 15 };

    const response: AxiosResponse<any> = await api.get(endpoint, {
      params,
    });

    const sortedData = [...response.data?.data].sort((a, b) =>
      dayjs(b.created_at).diff(dayjs(a.created_at))
    );

    return { ...response.data, data: sortedData };
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

const updateChannel = async (params: UpdateChannelParams): Promise<AxiosResponse["data"]> => {
  const { channel_id, ...payload } = params;

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
  getFavoriteChannels,

  createChannel,
  updateChannel,
  deleteChannel,
};
