import { showToast } from "@/lib/utils";
import { userApi } from "@/server/actions/users";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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
    select: (data) => data.data,
    retry: false,
  });
};

export const useGetUserMedia = (user_id: string) => {
  return useQuery({
    queryKey: ["getUserDetails", "media", user_id],
    queryFn: () => userApi.getUserMediaByID(user_id),
    enabled: !!user_id,
    select: (data) => data.data,
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

export const useNotifyUser = (): UseMutationResult<
  any,
  any,
  { email: string; user_id: string }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email }: { email: string; user_id: string }) => userApi.notifyUser({ email }),
    onError: (error) => {
      const message = error?.message || "";
      showToast("error", message);
      console.error("Notify Error:", error);
    },
    onSuccess: (data, variables) => {
      const message = data?.message || "";
      queryClient.invalidateQueries({
        queryKey: ["getAllUsers", variables.user_id],
      });
      showToast("success", message);
    },
  });
};

export const useDeleteUser = (): UseMutationResult<any, unknown, string> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user_id: string) => userApi.deleteUser(user_id),
    onError: (error) => console.error("[Delete User Error]", error),
    onSuccess: (data) => {
      const message = data?.message || "User deleted successfully";
      showToast("success", message);
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
      navigate("/users");
    },
  });
};
