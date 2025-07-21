import { useQuery } from "@tanstack/react-query";
import { staffApi } from "@/server/actions/staffs";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/lib/utils";
import { extractErrorMessage } from "@/lib/errorUtils";

// STAFFS ----------------------------------------------------------------
export const useGetAllStaff = () => {
  return useQuery({
    queryKey: ["staffs"],
    queryFn: () => staffApi.getAllStaff(),
    retry: false,
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
    onError: (error) => {
      const message = extractErrorMessage(error, "Error creating admin");
      showToast("error", message);
      throw error;
    },
    onSuccess: (data) => {
      const message = data?.message || "";
      showToast("success", message);
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
    },
  });
};

// UPDATE ROLE
export const useUpdateAccess = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateAccessParams) => staffApi.updateAccessLevel(data),
    onError: (error) => {
      const message = error?.message || `Error updating access level`;

      showToast("error", message);
    },
    onSuccess: (data) => {
      const message = data?.message || "";
      showToast("success", message);
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
    },
  });
};
