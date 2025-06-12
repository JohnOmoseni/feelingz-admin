import { showToast } from "@/lib/utils";
import { userApi } from "@/server/actions/users";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";

// USERS REQUESTS----------------------------------------------------------------

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["getAllUsers"],
    queryFn: () => userApi.getAllUsers(),
    select: (data) => data.data,
  });
};

export const useGetUserDetails = (user_id: string) => {
  return useQuery({
    queryKey: ["getUserDetails", user_id],
    queryFn: () => userApi.getUserByID(user_id),
    enabled: !!user_id,
    retry: false,
  });
};

// POST REQUESTS

export const useMutateUser = (): UseMutationResult<any, any, MutateUserParams> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: MutateUserParams) => userApi.mutateUser(data),
    onError: (error, variables) => {
      const message = error?.message || `Failed to ${variables.type.toLowerCase()} user`;
      showToast("error", message);
      console.error("Mutation Error:", error);
    },
    onSuccess: (data, variables) => {
      const message = data?.message || `${variables.type} action completed successfully`;
      queryClient.invalidateQueries({
        queryKey: ["getAllUsers"],
      });
      showToast("success", message);
    },
  });
};

export const useDeleteUser = (): UseMutationResult<any, unknown, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user_id: string) => userApi.deleteUser(user_id),
    onError: (error) => console.error("[Delete User Error]", error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    },
  });
};
