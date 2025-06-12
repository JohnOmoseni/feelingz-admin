import { useQuery } from "@tanstack/react-query";
import { staffApi } from "@/server/actions/staffs";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";

// STAFFS ----------------------------------------------------------------
export const useGetAllStaff = () => {
  return useQuery({
    queryKey: ["staffs"],
    queryFn: () => staffApi.getAllStaff(),
  });
};

// STAFFS MUTATION
// ACTIVATE STAFF
export const useActivateStaff = (): UseMutationResult<any, unknown, SELECTEDTYPE, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (selectedIds: SELECTEDTYPE) => staffApi.activateStaff(selectedIds),
    onError: (error) => console.error("[Activate Staff Error]", error),
    onSuccess: (_values) => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
    },
  });
};

// DEACTIVATE STAFF
export const useDeactivateStaff = (): UseMutationResult<any, unknown, SELECTEDTYPE, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (selectedIds: SELECTEDTYPE) => staffApi.deactivateStaff(selectedIds),
    onError: (error) => console.error("[Deactivate Staff Error]", error),
    onSuccess: (_values) => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
    },
  });
};

// DELETE STAFF
export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (selectedIds: SELECTEDTYPE) => staffApi.deleteStaff(selectedIds),
    onError: (error) => console.error("[Error deleting Staff]", error),
    onSuccess: (_values) => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
    },
  });
};

// CREATE STAFF
export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAdminParams) => staffApi.createAdmin(data),
    onError: (error) => console.error("[Adding Staff Error]", error),
    onSuccess: (_values) => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
    },
  });
};

// UPDATE ROLE
export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateRoleParams) => staffApi.updateRole(data),
    onError: (error) => console.error("[Updating User Role Error]", error),
    onSuccess: (_values) => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
    },
  });
};
