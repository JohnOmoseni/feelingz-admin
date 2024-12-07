import { useState } from "react";
import { cn } from "@/lib/utils";
import { VerticalDots } from "@/constants/icons";
import { PopoverWrapper } from "@/components/ui/components/PopoverWrapper";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { Modal } from "@/components/ui/components/Modal";
import { toast } from "sonner";
import {
  useApproveListing,
  useGetPropertyDetails,
  useUpdatePropertyPublishStatus,
} from "@/hooks/useListing";

import Details from "./_sections/Details";
import PostProperty from "@/components/forms/PostProperty";

const dropdownList = [
  { icon: "", label: "Approve", showLoader: true },
  { icon: "", label: "Reject", showLoader: true },
  { icon: "", label: "View details", showLoader: false },
];

function DashboardTableActions({ data }: { data?: any }) {
  const [openModal, setOpenModal] = useState<false | "edit" | "details">(false);
  const approveListingMutation = useApproveListing();
  const publishUnpublishMutation = useUpdatePropertyPublishStatus();
  const { data: listingInfo } = useGetPropertyDetails(data?.id || "", {
    enabled: !!data?.id && openModal === "details",
  });

  const [loadingStates, setLoadingStates] = useState<boolean[]>(dropdownList!?.map(() => false));

  const onClickHandlers: { [index: number]: () => any } = {
    0: async () => {
      const { id } = data;

      await approveListingMutation.mutateAsync(id);
      toast.success("Property approved successfully");
    },
    1: async () => {
      const { id } = data;

      await publishUnpublishMutation.mutateAsync({
        propertyId: id,
        type: "unpublish",
      });
      toast.success("Property unpublished successfully");
    },
    2: () => setOpenModal("details"),
  };

  const handleItemClick = async (idx: number, showLoader?: boolean) => {
    if (!onClickHandlers || typeof onClickHandlers[idx] !== "function") return;

    if (showLoader) {
      setLoadingStates((prev) => {
        const newStates = [...prev];
        newStates[idx] = true;
        return newStates;
      });
    }

    try {
      await onClickHandlers[idx]();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    } finally {
      if (showLoader) {
        setLoadingStates((prev) => {
          const newStates = [...prev];
          newStates[idx] = false;
          return newStates;
        });
      }
    }
  };

  return (
    <>
      <PopoverWrapper
        trigger={
          <div className="icon-div w-full !size-8">
            <VerticalDots className="size-5" />
          </div>
        }
        containerStyles=""
        list={dropdownList}
        renderItem={(item, index) => {
          return (
            <>
              <div key={index} onClick={() => handleItemClick(index, item?.showLoader)}>
                <div className="row-flex-start w-full gap-2 cursor-pointer">
                  {item?.icon && <item.icon className={cn("size-4")} />}
                  <span className={cn("flex-1 leading-4 text-sm")}>{item?.label}</span>
                  <BtnLoader isLoading={loadingStates[index]} />
                </div>
              </div>
            </>
          );
        }}
      />

      {openModal === "details" && (
        <Modal
          openModal={openModal === "details"}
          setOpenModal={() => setOpenModal(false)}
          modalStyles="max-w-xl max-h-[550px]"
          title={"3 Bedroom Apartment in Lekki"}
        >
          <div className="mt-6 px-0.5">
            <Details
              data={listingInfo || data}
              type="details"
              closeModal={() => setOpenModal(false)}
            />
          </div>
        </Modal>
      )}

      {openModal === "edit" && (
        <Modal
          openModal={openModal === "edit"}
          setOpenModal={() => setOpenModal(false)}
          modalStyles="max-w-xl max-h-[550px]"
          title="Edit Property"
        >
          <div className="mt-6 px-0.5">
            <PostProperty data={data} type="edit" closeModal={() => setOpenModal(false)} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default DashboardTableActions;
