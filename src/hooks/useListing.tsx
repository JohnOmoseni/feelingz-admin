import { listingApi } from "@/server/actions/listing";
import { useMutation, UseMutationResult, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

// PROPERTY LISTINGS ---------------------------------------------------------------------------------------
// GET ALL LISTINGS

export const useGetAllPropertyListing = () => {
  return useQuery({
    queryKey: ["getAllPropertyListing"],
    queryFn: () => listingApi.getPropertyListingOverview(),
    select: (data) => {
      if (!data || !data.data) {
        return {
          listings: [],
          tableData: [],
        };
      }

      const response = data.data.data;

      const propertyListing = {
        listings: response.map((property: any) => ({
          ...property,
          created_at: property.created_at
            ? dayjs(property.created_at).format("DD-MM-YYYY h:mmA")
            : null,
        })),
        tableData: response.map((property: any) => ({
          id: property.id,
          created_at: property.created_at
            ? dayjs(property.created_at).format("DD-MM-YYYY h:mmA")
            : null,
          name: property.name,
          type: property.type,
          address: property.address,
          unique_id: property.unique_id,
          description: property.description,
          condition: property.condition,
          currency: property.currency,
          location:
            property.lga_name || property.district
              ? `${property.state_name} - ${property.lga_name || property.district}`
              : property.state_name,
          lga_name: property.lga_name,
          state: String(property.state_id),
          lga: String(property.lga_id),
          district: property.district,
          images: [
            property.main_thumbnail,
            ...(property?.media?.map((media: any) => media?.file_url) || []),
          ],
          category: property.main_category_name,
          category_id: property.main_category_id,
          seller_name: property.seller_name,
          amount: property.amount,
          actual_amount: property.actual_amount,
          is_negotiable: property.is_negotiatable,
          is_published: property.is_published,
          status:
            property.is_approved === true
              ? "Approved"
              : property.is_approved === false && property.approved_on
              ? "Rejected"
              : "Pending",
        })),
      };

      return propertyListing;
    },
  });
};

export const useGetPropertyDetails = (propertyId: string, options?: any) => {
  return useQuery({
    queryKey: ["getPropertyDetails", propertyId],
    queryFn: () => listingApi.getPropertyByID({ property_id: propertyId }),
    enabled: options?.enabled,
    select: (data) => {
      if (!data || !data.data) {
        return {
          listings: [],
          tableData: [],
        };
      }

      const property = data.data.data;

      const info = {
        id: property.id,
        created_at: property.created_at
          ? dayjs(property.created_at).format("DD-MM-YYYY h:mmA")
          : null,
        name: property.name,
        type: property.type,
        address: property.address,
        unique_id: property.unique_id,
        description: property.description,
        condition: property.condition,
        currency: property.currency,
        location:
          property.lga_name || property.district
            ? `${property.state_name} - ${property.lga_name || property.district}`
            : property.state_name,
        lga_name: property.lga_name,
        state: String(property.state_id),
        lga: String(property.lga_id),
        district: property.district,
        images: [
          property.main_thumbnail,
          ...(property?.media?.map((media: any) => media?.file_url) || []),
        ],
        category: property.main_category_name,
        category_id: property.main_category_id,
        seller_name: property.seller_name,
        amount: property.amount,
        actual_amount: property.actual_amount,
        is_negotiable: property.is_negotiatable,
        is_published: property.is_published,
        status:
          property.is_approved === true
            ? "Approved"
            : property.is_approved === false && property.approved_on
            ? "Rejected"
            : "Pending",
      };

      return info;
    },
  });
};

export const useGetPropertyReport = () => {
  return useQuery({
    queryKey: ["getPropertyReport"],
    queryFn: () => listingApi.getPropertyReport(),
    select: (data) => {
      if (!data || !data.data) {
        return {
          totalListing: 0,
          approvedListing: 0,
          rejectedListing: 0,
          pendingListing: 0,
        };
      }

      const { approved_products = 0, pending_products = 0, rejected_products = 0 } = data.data;

      return {
        totalListing: approved_products + pending_products + rejected_products,
        approvedListing: approved_products,
        rejectedListing: rejected_products,
        pendingListing: pending_products,
      };
    },
  });
};

// PROPERTY LISTING MUTATION ----------------------------------------------------------------
// PUBLISH/UNPUBLISH PROPERTY
export const usePostListing = (): any => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => listingApi.postProperty(data),
    onError: (error) => console.error("[POST Property Error]", error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPropertyListing"] });
    },
  });
};

// PUBLISH/UNPUBLISH PROPERTY
export const useUpdatePropertyPublishStatus = (): UseMutationResult<
  any,
  unknown,
  { propertyId: string; type: "publish" | "unpublish" }
> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ propertyId, type }) =>
      listingApi.updatePropertyPublishStatus({ propertyId, type }),
    onError: (error) => console.error("[Property Publish/Unpublish Error]", error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPropertyListing"] });
    },
  });
};

// APPROVE ALL PENDING LISTINGS
export const useApproveListing = (): UseMutationResult<any, unknown, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (property_id: string) => listingApi.approveListing({ property_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPropertyListing"] });
    },
  });
};

export const useDeleteListing = (): UseMutationResult<any, unknown, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (property_id: string) => listingApi.deleteListing({ property_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPropertyListing"] });
    },
  });
};

export const useApproveAllPending = (): UseMutationResult<any, unknown, void> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => listingApi.approveAllPending(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPropertyListing"] });
    },
  });
};

// DECLINE ALL FLAGGED LISTINGS
export const useRejectAllFlagged = (): UseMutationResult<any, unknown, void> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => listingApi.declineAllFlagged(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPropertyListing"] });
    },
  });
};
