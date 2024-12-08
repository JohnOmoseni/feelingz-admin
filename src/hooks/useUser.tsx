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
        is_verified: user.is_verified ? "Verified" : "Unverified",
        status: user.status === "active" ? "Active" : "Inactive",
        profile_picture: user.profile_picture,
        created_at: user.created_at ? dayjs(user.created_at).format("DD-MM-YYYY h:mmA") : null,
        last_seen: user.last_seen ? dayjs(user.last_seen).format("DD-MM-YYYY h:mmA") : null,
      }));

      return users;
    },
  });
};

export const useGetUserActivity = (user_id: string) => {
  return useQuery({
    queryKey: ["getUserActivity", user_id],
    queryFn: () => userApi.getUserActivity(user_id),

    select: (data) => {
      const response = data.data?.data;

      const userActivity = response.map((userActivity: any) => ({
        id: String(userActivity.id),
        description: userActivity.description,
        event: userActivity.event,
        userId: String(userActivity?.causer?.id),
        name: userActivity?.causer?.name,
        state: userActivity?.causer?.state,
        lga: userActivity?.causer?.lga,
        status: userActivity?.causer?.active ? "Active" : "Inactive",
        created_at: userActivity.created_at
          ? dayjs(userActivity.created_at).format("DD-MM-YYYY h:mmA")
          : null,
      }));

      return userActivity;
    },
  });
};

export const useGetUserDetails = (user_id: string) => {
  return useQuery({
    queryKey: ["getUserDetails", user_id],
    queryFn: () => userApi.getUserByID(user_id),

    select: (data) => {
      const user = data.data;

      const details = {
        id: String(user.id),
        name: user.name,
        email: user.email,
        phone: user.phone,
        state_id: user.state_id,
        state_name: user.state_name,
        lga_id: user.lga_id,
        lga_name: user.lga_name,
        status: user.status === "active" ? "Active" : "Inactive",
        profile_picture: user.profile_picture,
        created_at: user.created_at ? dayjs(user.created_at).format("DD-MM-YYYY h:mmA") : null,
      };

      return details;
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

// ACTIVATE/DEACTIVATE USER
export const useUpdateUserStatus = (): UseMutationResult<
  any,
  unknown,
  { user_id: string; action: "activate" | "deactivate" }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ user_id, action }) => userApi.updateUserStatus({ user_id, action }),
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
