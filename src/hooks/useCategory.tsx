import { categoryApi } from "@/server/actions/category";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

// USERS REQUESTS----------------------------------------------------------------

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["getAllCategories"],
    queryFn: () => categoryApi.getAllCategories(),
    select: (data) => {
      const response = data.data?.data;

      const categories = response.map((category: any) => ({
        id: String(category.id),
        name: category.name,
        key: category.key,
        description: category.description,
        avatar: category.avatar_url,
        is_published: category.is_published === 1 ? true : false,
        created_at: category.created_at
          ? dayjs(category.created_at).format("DD-MM-YYYY h:mmA")
          : null,
      }));

      return categories;
    },
  });
};

// POST REQUESTS
export const useCreateCategory = (): UseMutationResult<any, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category) => categoryApi.createCategory(category),
    onError: (error) => console.error("[Create Category Error]", error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
    },
  });
};

export const useEditCategory = (): UseMutationResult<any, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category) => categoryApi.editCategory(category),
    onError: (error) => console.error("[Edit Category Error]", error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
    },
  });
};

export const useDeleteCategory = (): UseMutationResult<any, unknown, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category_id: string) => categoryApi.deleteCategory(category_id),
    onError: (error) => console.error("[Delete Category Error]", error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
    },
  });
};
