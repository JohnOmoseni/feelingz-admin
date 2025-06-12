import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { contentApi } from ".";
import { showToast } from "@/lib/utils";

export const useGetFileManagerReport = () => {
  return useQuery({
    queryKey: ["getFileManagerReport"],
    queryFn: () => null,
  });
};

// QUERIES ----------------------------------------------------------------
export const useGetAllChannels = ({ searchValue }: { searchValue: string }) => {
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
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
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
    mutationFn: (data: any) => contentApi.createChannel(data),
    onError: (error) => {
      const message = error?.message || `Error creating channel`;
      console.error("[Create Channel error]", error, message);
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
    mutationFn: (data: any) => contentApi.updateChannel(data),
    onError: (error) => {
      const message = error?.message || `Error updating channel`;
      console.error("[Update Channel error]", error, message);
    },
    onSuccess: (data, variables) => {
      const message = data?.message || "";
      queryClient.invalidateQueries({
        queryKey: ["channels", variables.channel_id],
      });
      showToast("success", message);
    },
  });
};

export const useDeleteArticle = () => {
  return useMutation({
    mutationFn: ({ channel_id }: { channel_id: string }) =>
      contentApi.deleteChannel({ channel_id }),
    onError: (error) => {
      console.error("[Delete channel error]", error);
      const message = error?.message || "Something went wrong";
      showToast("error", message);
    },
    onSuccess: (data) => {
      const queryClient = useQueryClient();
      console.log("[Delete channel data]", data);
      queryClient.invalidateQueries({ queryKey: ["channels"] });
    },
  });
};
