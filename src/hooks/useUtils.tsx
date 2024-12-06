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
