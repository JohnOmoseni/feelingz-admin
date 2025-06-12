import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from ".";

export const useGetDashboardOveriew = () => {
  return useQuery({
    queryKey: ["overview"],
    queryFn: () => dashboardApi.getDashboardOverview(),
    select: (data) => data.data as DashboardOverviewResponse,
  });
};
