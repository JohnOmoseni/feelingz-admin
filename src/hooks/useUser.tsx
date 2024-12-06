import { userApi } from "@/server/actions/user";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

// USERS REQUESTS----------------------------------------------------------------

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["getAllUsers"],
    queryFn: () => userApi.getAllUsers(),
    select: (data) => {
      const response = data.data?.data;

      const users = response.map((user: any) => ({
        id: String(user.id),
        name: user.name,
        email: user.email,
        phone: user.phone,
        state_id: user.state_id,
        state_name: user.state_name,
        lga_id: user.lga_id,
        lga_name: user.lga_name,
        status: user.is_verified ? "Verifed" : "Unverified",
        profile_picture: user.profile_picture,
        created_at: user.created_at ? dayjs(user.created_at).format("DD-MM-YYYY h:mmA") : null,
        last_seen: user.last_seen ? dayjs(user.last_seen).format("DD-MM-YYYY h:mmA") : null,
      }));

      return users;
    },
  });
};

// POST REQUESTS
export const useCreateUser = (): UseMutationResult<any, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user) => userApi.createUser(user),
    onError: (error) => console.error("[Create User Error]", error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    },
  });
};

export const useEditUser = (): UseMutationResult<any, unknown, { user: any }> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user) => userApi.editUser(user),
    onError: (error) => console.error("[Edit User Error]", error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
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
