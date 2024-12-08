import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { VerticalDots } from "@/constants/icons";
import { PopoverWrapper } from "@/components/ui/components/PopoverWrapper";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { Modal } from "@/components/ui/components/Modal";
import { useDeleteUser, useUpdateUserStatus } from "@/hooks/useUser";

import ActivityHistory from "./activity";
import UserDetails from "./user-details";

const dropdownList = [
  { icon: "", label: "View details", showLoader: false },
  { icon: "", label: "Activate", showLoader: true },
  { icon: "", label: "Deactivate", showLoader: true },
  { icon: "", label: "Delete", showLoader: true },
];

function UserActions({ data }: { data?: any }) {
  const [openModal, setOpenModal] = useState<false | "activity" | "details">(false);

  const [loadingStates, setLoadingStates] = useState<boolean[]>(dropdownList!?.map(() => false));
  const deleteUserMutation = useDeleteUser();
  const updateUserStatusMutation = useUpdateUserStatus();

  const onClickHandlers: { [index: number]: () => any } = {
    0: () => setOpenModal("details"),
    1: async () => {
      const { id: user_id } = data;

      await updateUserStatusMutation.mutateAsync({ user_id, action: "activate" });
      toast.success("User activated successfully");
    },
    2: async () => {
      const { id: user_id } = data;

      await updateUserStatusMutation.mutateAsync({ user_id, action: "deactivate" });

      toast.success("User deactivated successfully");
    },
    3: async () => {
      const { id: user_id } = data;

      await deleteUserMutation.mutateAsync(user_id);

      toast.success("User deleted successfully");
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
      const message = error?.response?.data?.message || error?.message || "An error occurred";
      toast.error(message);
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
          title={data?.name || "Details"}
        >
          <div className="mt-6 px-0.5">
            <UserDetails data={data} closeModal={() => setOpenModal(false)} />
          </div>
        </Modal>
      )}

      {openModal === "activity" && (
        <Modal
          openModal={openModal === "activity"}
          setOpenModal={() => setOpenModal(false)}
          modalStyles="max-w-xl max-h-[580px]"
          title={"Activity History"}
        >
          <div className="mt-4 px-0.5">
            <ActivityHistory data={data} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default UserActions;

const options = [
  { icon: "", label: "Suspend Account", showLoader: true },
  { icon: "", label: "Reinstate Account", showLoader: true },
  { icon: "", label: "Message", showLoader: false },
  { icon: "", label: "Delete", showLoader: true },
];

// @ts-ignore
const Options = ({
  setOpenModal,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<false | "activity" | "details">>;
}) => {
  const [loadingStates, setLoadingStates] = useState<boolean[]>(options!?.map(() => false));

  const onClickHandlers: { [index: number]: () => any } = {
    0: () => null,
    1: () => null,
    2: () => null,
    3: () => null,
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
    <div className="row-flex gap-3.5 mt-1.5">
      <p
        onClick={() => setOpenModal("activity")}
        className="text-sm text-secondary font-semibold cursor-pointer"
      >
        Activity History
      </p>

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
                className={cn("flex-1 leading-4 font-normal text-sm", isDelete && "text-red-600")}
              >
                {item?.label}
              </span>

              <BtnLoader isLoading={loadingStates[index]} />
            </div>
          );
        }}
      />
    </div>
  );
};
