import { complaintApi } from "@/server/actions/complaints";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

// USERS REQUESTS----------------------------------------------------------------

export const useGetAllComplaints = () => {
  return useQuery({
    queryKey: ["getAllComplaints"],
    queryFn: () => complaintApi.getAllComplaints(),
    select: (data) => {
      const response = data.data?.data;

      const complaints = {
        complaints: response.map((complaint: any) => ({
          id: String(complaint.id),
          name: complaint.name,
          email: complaint.email,
          phone: complaint.phone,
          created_at: complaint.created_at
            ? dayjs(complaint.created_at).format("DD-MM-YYYY h:mmA")
            : null,
        })),
        tableData: response.map((complaint: any) => ({
          id: String(complaint.id),
          name: complaint.name,
          email: complaint.email,
          phone: complaint.phone,
          created_at: complaint.created_at
            ? dayjs(complaint.created_at).format("DD-MM-YYYY h:mmA")
            : null,
        })),
      };

      return complaints;
    },
  });
};

// POST REQUESTS
export const useCreateComplaint = (): UseMutationResult<any, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (complaint) => complaintApi.createComplaint(complaint),
    onError: (error) => console.error("[Create Complaint Error]", error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllComplaints"] });
    },
  });
};

export const useEditComplaint = (): UseMutationResult<any, unknown, any> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => complaintApi.editComplaint(data),
    onError: (error) => console.error("[Edit Complaint Error]", error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllComplaints"] });
    },
  });
};

export const useDeleteComplaint = (): UseMutationResult<any, unknown, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (complaint_id: string) => complaintApi.deleteComplaint({ complaint_id }),
    onError: (error) => console.error("[Delete Complaint Error]", error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllComplaints"] });
    },
  });
};
