import { utilsApi } from "@/server/actions/utilities";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

// UTILITY REQUESTS----------------------------------------------------------------

export const useGetStates = (): UseQueryResult<Array<{ label: string; value: string }>> => {
  return useQuery({
    queryKey: ["getStates"],
    queryFn: () => utilsApi.getStates(),
    select: (data) => {
      const response = data.data?.data;

      const states =
        response?.map((state: any) => ({
          label: state.name.replace(/\s+State$/, ""), // Remove " State" if it's the last word
          value: String(state.id),
        })) ?? [];

      return states;
    },
  });
};

export const useGetStateLGAs = ({
  state_id,
}: {
  state_id?: string;
}): UseQueryResult<Array<{ label: string; value: string }>> => {
  return useQuery({
    queryKey: ["getStateLGAs", state_id],
    queryFn: () => utilsApi.getStateLGAs(state_id!),
    select: (data) => {
      const response = data.data?.data;

      const lgas = response?.map((lga: any) => ({ label: lga.name, value: String(lga.id) }));

      return lgas;
    },
    enabled: !!state_id,
  });
};

export const useGetFileManagerReport = () => {
  return useQuery({
    queryKey: ["getFileManagerReport"],
    queryFn: () => utilsApi.getFileManagerReport(),
    select: (data) => {
      if (!data || !data.data) {
        return {
          totalListing: 0,
          activeUsers: 0,
          approvedListing: 0,
          rejectedListing: 0,
          pendingListing: 0,
        };
      }

      const {
        listings = 0,
        active_users = 0,
        approved_products = 0,
        pending_products = 0,
        rejected_products = 0,
      } = data.data;

      return {
        totalListing: listings,
        activeUsers: active_users,
        approvedListing: approved_products,
        rejectedListing: rejected_products,
        pendingListing: pending_products,
      };
    },
  });
};
