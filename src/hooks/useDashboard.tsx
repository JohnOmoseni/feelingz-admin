import { dashboardApi } from "@/server/actions/dashboard";
import { useQuery } from "@tanstack/react-query";

// LISTINGS ------------------------------------------------------------------------------------------------

// PROPERTY LISTINGS ---------------------------------------------------------------------------------------
// GET ALL LISTINGS

export const useGetFileManagerReport = () => {
  return useQuery({
    queryKey: ["getFileManagerReport"],
    queryFn: () => dashboardApi.getFileManagerReport(),
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
