import { useState } from "react";
import { cn } from "@/lib/utils";
import { VerticalDots } from "@/constants/icons";
import { PopoverWrapper } from "@/components/ui/components/PopoverWrapper";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { Modal } from "@/components/ui/components/Modal";
import { toast } from "sonner";
import { useDeleteCategory } from "@/hooks/useCategory";

import CategoryDetails from "./category-details";
import CategoryForm from "@/components/forms/CategoryForm";

const dropdownList = [
  { icon: "", label: "View details", showLoader: false },
  { icon: "", label: "Edit", showLoader: false },
  { icon: "", label: "Delete", showLoader: true },
];

function CategoryActions({ data }: { data?: any }) {
  const [openModal, setOpenModal] = useState<false | "add" | "edit" | "view_subcategory">(false);

  const [loadingStates, setLoadingStates] = useState<boolean[]>(dropdownList!?.map(() => false));
  const deleteCategoryMutation = useDeleteCategory();

  const onClickHandlers: { [index: number]: () => any } = {
    0: () => setOpenModal("view_subcategory"),
    1: () => setOpenModal("edit"),
    2: async () => {
      const { id: category_id } = data;

      try {
        await deleteCategoryMutation.mutateAsync(category_id);

        toast.success("Category deleted successfully");
      } catch {
        toast.error("Error deleting category");
      }
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

      {openModal === "view_subcategory" && (
        <Modal
          openModal={openModal === "view_subcategory"}
          setOpenModal={() => setOpenModal(false)}
          modalStyles="max-w-xl max-h-[550px]"
          title={data?.name}
          description={data?.description}
        >
          <div className="mt-6 px-0.5">
            <CategoryDetails data={data} setOpenModal={setOpenModal} />
          </div>
        </Modal>
      )}

      {openModal === "edit" && (
        <Modal
          openModal={openModal === "edit"}
          setOpenModal={() => setOpenModal(false)}
          modalStyles="max-w-[38rem] max-h-[580px]"
          title={"Edit Category"}
        >
          <div className="mt-4 px-0.5">
            <CategoryForm type="edit" data={data} closeModal={() => setOpenModal(false)} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default CategoryActions;
