import { DataTable } from "@/components/table/DataTable";
import { useState } from "react";
import { Modal } from "@/components/ui/components/Modal";
import { Plus } from "@/constants/icons";
import { categoryColumn } from "@/components/table/columns/categoryColumn";
import { toast } from "sonner";
import { useGetAllCategories } from "@/hooks/useCategory";

import TableGlobalSearch from "@/components/table/TableGlobalSearch";
import SectionWrapper from "@/layouts/SectionWrapper";
import CategoryForm from "@/components/forms/CategoryForm";
import Button from "@/components/reuseables/CustomButton";
import SkeletonLoader from "@/components/fallback/SkeletonLoader";

function Category() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [openModal, setOpenModal] = useState<false | "add" | "edit">(false);

  const { data: categories, isFetching, isError, error } = useGetAllCategories();

  if (isError) toast.error((error as any)?.response?.data?.message || "Error fetching information");

  return (
    <>
      <SectionWrapper
        headerTitle={"Category Management"}
        customHeaderContent={
          <Button
            icon={Plus}
            title="Add Category"
            className="!w-max"
            onClick={() => setOpenModal("add")}
          />
        }
      >
        {isFetching ? (
          <SkeletonLoader hideCardLoading={true} hideChartLoading={true} />
        ) : (
          <>
            <div className=" row-flex-btwn card !p-3">
              <TableGlobalSearch
                globalValue={globalFilter || ""}
                onChange={(value: string) => setGlobalFilter(value)}
              />
            </div>

            <div className="mt-6">
              <DataTable
                columns={categoryColumn}
                tableData={categories || []}
                globalFilter={globalFilter}
              />
            </div>
          </>
        )}
      </SectionWrapper>

      {openModal === "add" && (
        <Modal
          openModal={openModal === "add"}
          setOpenModal={() => setOpenModal(false)}
          modalStyles="max-w-[38rem]"
          title="Add Category"
        >
          <div className="mt-6 px-0.5">
            <CategoryForm type="add" closeModal={() => setOpenModal(false)} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default Category;
