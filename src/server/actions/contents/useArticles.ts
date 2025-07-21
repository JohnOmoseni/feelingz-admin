import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/lib/utils";
import { postsApi } from "./postApi";
import { extractErrorMessage } from "@/lib/errorUtils";

// QUERIES ----------------------------------------------------------------
export const useGetAllArticles = ({
  searchValue,
  page,
  perPage,
}: {
  searchValue?: string;
  page?: number;
  perPage?: number;
}) => {
  return useQuery<any, Error, any>({
    queryKey: ["articles", searchValue, page, perPage],
    queryFn: () =>
      postsApi.getAllArticles({
        page,
        perPage,
        query: searchValue,
      }),
    select: (data) => data.data,
    refetchOnWindowFocus: false,
  });
};

export const useGetArticleById = (article_id: string) => {
  return useQuery({
    queryKey: ["articles", article_id],
    queryFn: () => postsApi.getArticleById({ article_id }),
    enabled: !!article_id,
  });
};

// MUTATIONS
export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FormData) => postsApi.createArticle(data),
    onError: (error) => {
      const message = extractErrorMessage(error, "Error creating article");
      showToast("error", message);
    },
    onSuccess: (data) => {
      const message = data?.message || "";
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
      showToast("success", message);
    },
  });
};

export const useEditArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { article_id: string; formData: FormData }) => postsApi.updateArticle(data),
    onError: (error) => {
      const message = extractErrorMessage(error, "Failed to update article");
      showToast("error", message);
      throw error;
    },
    onSuccess: (data, variables) => {
      const message = data?.message || "Updated successfully";
      queryClient.invalidateQueries({
        queryKey: ["articles", variables.article_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });
      showToast("success", message);
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ article_id }: { article_id: string }) => postsApi.deleteArticle({ article_id }),
    onError: (error) => {
      const message = error?.message || `Failed to delete article`;
      showToast("error", message);
    },
    onSuccess: (data) => {
      const message = data?.message || "Deleted successfully";
      showToast("success", message);
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};
