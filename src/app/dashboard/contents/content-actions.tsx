import { useState } from "react";
import { cn } from "@/lib/utils";
import { VerticalDots } from "@/constants/icons";
import { PopoverWrapper } from "@/components/ui/components/PopoverWrapper";
import FallbackLoader, { BtnLoader } from "@/components/fallback/FallbackLoader";
import { Modal } from "@/components/ui/components/Modal";

import Details from "../users/user-details";
import { useGetAllUsers } from "@/server/actions/users/useUsers";

const dropdownList = [
  { icon: "", label: "Approve", showLoader: true },
  { icon: "", label: "Reject", showLoader: true },
  { icon: "", label: "View details", showLoader: false },
  { icon: "", label: "Delete", showLoader: true },
];

function ContentActions({ data }: { data?: any }) {
  const [openModal, setOpenModal] = useState<false | "edit" | "details">(false);
  const { data: listingInfo, isLoading } = useGetAllUsers();

  const [loadingStates, setLoadingStates] = useState<boolean[]>(dropdownList!?.map(() => false));

  const onClickHandlers: { [index: number]: () => Promise<void> | void } = {
    0: async () => {
      const { id } = data;
    },
    1: async () => {
      const { id } = data;
    },
    2: () => setOpenModal("details"),
    3: async () => {
      const { id } = data;
    },
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
          modalStyles={cn("max-w-xl max-h-[550px]", isLoading && "min-h-min")}
          title={data?.name || "Details"}
          // topContent={<Options data={listingInfo || data} setOpenModal={setOpenModal} />}
        >
          <>
            {isLoading ? (
              <div className="row-flex relative h-[150px] ">
                <FallbackLoader loading={isLoading} />
              </div>
            ) : (
              <div className="px-0.5 mt-6">
                <Details data={listingInfo || data} />
              </div>
            )}
          </>
        </Modal>
      )}

      {openModal === "edit" && (
        <Modal
          openModal={openModal === "edit"}
          setOpenModal={() => setOpenModal(false)}
          title="Edit Property"
        >
          <div className="">
            {isLoading ? (
              <div className="row-flex relative h-[100px]">
                <FallbackLoader loading={isLoading} />
              </div>
            ) : (
              <div className="mt-6 px-0.5"></div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}

export default ContentActions;
