import { useState } from "react";
import { cn } from "@/lib/utils";
import { VerticalDots } from "@/constants/icons";
import { PopoverWrapper } from "@/components/ui/components/PopoverWrapper";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { Modal } from "@/components/ui/components/Modal";

import ComplaintDetails from "./complaint-details";

const dropdownList = [
  { icon: "", label: "View details", showLoader: false },
  { icon: "", label: "Resolve", showLoader: true },
];

function ComplaintActions({ data }: { data?: any }) {
  const [openModal, setOpenModal] = useState<false | "details">(false);

  const [loadingStates, setLoadingStates] = useState<boolean[]>(dropdownList!?.map(() => false));

  const onClickHandlers: { [index: number]: () => any } = {
    0: () => setOpenModal("details"),
    1: () => null,
    2: () => null,
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
          title={data?.name}
          topContent={<Options />}
        >
          <div className="mt-6 px-0.5">
            <ComplaintDetails data={data} closeModal={() => setOpenModal(false)} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default ComplaintActions;

const options = [
  { icon: "", label: "Respond to User", showLoader: false },
  { icon: "", label: "Flag Listing", showLoader: true },
  { icon: "", label: "Mark as resolved", showLoader: true },
];

const Options = ({}: {}) => {
  const [loadingStates, setLoadingStates] = useState<boolean[]>(options!?.map(() => false));

  const onClickHandlers: { [index: number]: () => any } = {
    0: () => null,
    1: () => null,
    2: () => null,
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
    <PopoverWrapper
      trigger={
        <div className="icon-div w-full !size-8">
          <VerticalDots className="size-5" />
        </div>
      }
      containerStyles="z-[999] modal-popover-content"
      list={options}
      renderItem={(item, index) => {
        const isDelete = item?.label.includes("Delete");
        return (
          <div
            key={index}
            className="row-flex-start w-full gap-2 cursor-pointer"
            onClick={() => handleItemClick(index, item?.showLoader)}
          >
            {item?.icon && (
              <item.icon className={cn("size-4 font-medium", isDelete && "text-red-600")} />
            )}
            <span
              className={cn("flex-1 leading-4 font-medium text-sm", isDelete && "text-red-600")}
            >
              {item?.label}
            </span>

            <BtnLoader isLoading={loadingStates[index]} />
          </div>
        );
      }}
    />
  );
};
