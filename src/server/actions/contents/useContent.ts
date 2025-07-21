import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { contentApi } from ".";
import { showToast } from "@/lib/utils";
import { extractErrorMessage } from "@/lib/errorUtils";

// QUERIES ----------------------------------------------------------------
export const useGetChannels = ({ searchValue }: { searchValue: string }) => {
  return useInfiniteQuery<any, Error, any>({
    queryKey: ["channels", "infinite", searchValue],
    queryFn: ({ pageParam = 1 }) =>
      contentApi.getAllChannels({
        page: pageParam as number,
        query: searchValue,
      }),
    getNextPageParam: (lastPage: PaginatedResponse) => {
      const currentPage = lastPage.data.current_page;
      const lastPageNumber = lastPage.data.last_page;

      if (currentPage < lastPageNumber) {
        return currentPage + 1;
      }
      return undefined;
    },
    getPreviousPageParam: (firstPage: PaginatedResponse) => {
      const currentPage = firstPage.data.current_page;
      if (currentPage > 1) {
        return currentPage - 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
};

export const useGetAllChannels = () => {
  return useQuery({
    queryKey: ["channels"],
    queryFn: () => contentApi.getAllChannels({}),
    select: (data) => data.data as ChannelResponse[],
  });
};

export const useGetChannelById = (channel_id: string) => {
  return useQuery({
    queryKey: ["channels", channel_id],
    queryFn: () => contentApi.getChannelById({ channel_id }),
    enabled: !!channel_id,
  });
};

// MUTATIONS
export const useCreateChannel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MutateChannelParams) => contentApi.createChannel(data),
    onError: (error) => {
      const message = extractErrorMessage(error, "Error creating channel");
      showToast("error", message);
    },
    onSuccess: (data) => {
      const message = data?.message || "";
      queryClient.invalidateQueries({
        queryKey: ["channels"],
      });
      showToast("success", message);
    },
  });
};

export const useEditChannel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateChannelParams) => contentApi.updateChannel(data),

    onError: (error) => {
      const message = extractErrorMessage(error, "Failed to update channel");
      showToast("error", message);

      throw error;
    },
    onSuccess: (data) => {
      const message = data?.message || "";
      queryClient.invalidateQueries({
        queryKey: ["channels", "infinite"],
      });
      showToast("success", message);
    },
  });
};

export const useDeleteChannel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ channel_id }: { channel_id: string }) =>
      contentApi.deleteChannel({ channel_id }),
    onError: (error) => {
      const message = extractErrorMessage(error, "Failed to delete channel");
      showToast("error", message);
    },
    onSuccess: (data) => {
      const message = data?.message || "Deleted successfully";
      showToast("success", message);
      queryClient.invalidateQueries({ queryKey: ["channels"] });
    },
  });
};
