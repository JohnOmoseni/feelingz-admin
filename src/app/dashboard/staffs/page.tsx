import { useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import { cn, showToast } from "@/lib/utils";
import { Modal } from "@/components/ui/components/Modal";
import { ColumnFiltersState } from "@tanstack/react-table";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import {
  useActivateStaff,
  useDeactivateStaff,
  useDeleteStaff,
  useGetAllStaff,
} from "@/server/actions/staffs/useStaff";
import { TableSearch } from "@/components/table/TableGlobalSearch";
import { staffColumn } from "@/components/table/columns/staffColumn";

import SectionWrapper from "@/layouts/SectionWrapper";
import Filters from "@/components/table/filters";
import SkeletonLoader from "@/components/fallback/SkeletonLoader";
import AddStaffForm from "@/components/forms/staff/AddStaffForm";
import useEmptyState from "@/hooks/useEmptyState";

const options = [
  { label: "All", value: "all" },
  { label: "Admin", value: "ADMIN" },
  { label: "Staff", value: "STAFF" },
];

function Staffs() {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [openModal, setOpenModal] = useState<false | "create-staff">(false);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { data: staff, isError, error, isLoading, refetch } = useGetAllStaff();

  const activateMutation = useActivateStaff();
  const deactivateMutation = useDeactivateStaff();
  const deleteStaffMutation = useDeleteStaff();

  const {} = useEmptyState({
    data: staff,
    isError,
    error,
  });

  const handleAction = async (id: "activate" | "deactivate" | "delete") => {
    const selectedIds = selectedRows.map((row) => row.userId);

    if (selectedIds.length === 0) {
      showToast("info", "No staffs selected!");
      return;
    }

    try {
      if (id === "activate") {
        await activateMutation.mutateAsync(selectedIds);
      } else if (id === "deactivate") {
        await deactivateMutation.mutateAsync(selectedIds);
      } else if (id === "delete") {
        await deleteStaffMutation.mutateAsync(selectedIds);
      }

      refetch();
    } catch (error: any) {}
  };

  return (
    <SectionWrapper headerTitle="Staffs">
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          <div className="flex-column gap-4">
            <div className="row-flex-btwn gap-3.5">
              <TableSearch
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                placeholder="Search by email"
                filterBy="email"
              />

              <Filters
                setColumnFilters={setColumnFilters}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                options={options}
                columnId="roleName"
                placeholder={"Filter by role"}
              />
            </div>

            {selectedRows.length > 0 && (
              <div className="row-flex-btwn gap-3 max-sm:!flex-wrap rounded-sm bg-background-200 px-2.5 py-2 brightness-105 sm:gap-4">
                <p className="text-xs font-semibold max-sm:text-center w-full">
                  {selectedRows.length} row(s) selected
                </p>

                <div className="row-flex gap-2.5 w-full">
                  <div
                    className={cn(
                      "badge-long !bg-background-100 !w-full",
                      activateMutation.isPending && "!grid grid-cols-[1fr_auto] !gap-2.5"
                    )}
                    onClick={() => handleAction("activate")}
                  >
                    Activate
                    {activateMutation.isPending && (
                      <BtnLoader isLoading={activateMutation.isPending} color="#16a34a " />
                    )}
                  </div>
                  <div
                    className={cn(
                      "badge-long !bg-foreground !text-secondary-foreground !w-full",
                      deactivateMutation.isPending && "!grid grid-cols-[1fr_auto] !gap-2.5 !px-8"
                    )}
                    onClick={() => handleAction("deactivate")}
                  >
                    Deactivate
                    {deactivateMutation.isPending && (
                      <BtnLoader isLoading={deactivateMutation.isPending} />
                    )}
                  </div>

                  <div
                    className={cn(
                      "badge-long  !bg-red-700 !text-secondary-foreground !w-full",
                      deleteStaffMutation.isPending && "!grid grid-cols-[1fr_auto] !gap-2.5"
                    )}
                    onClick={() => handleAction("delete")}
                  >
                    Delete
                    {deleteStaffMutation.isPending && (
                      <BtnLoader isLoading={deleteStaffMutation.isPending} />
                    )}
                  </div>
                </div>
              </div>
            )}

            <DataTable
              columnFilters={columnFilters}
              columns={staffColumn}
              tableData={staff || []}
              setSelectedRows={setSelectedRows}
            />
          </div>
        </>
      )}

      <Modal
        openModal={openModal === "create-staff"}
        setOpenModal={() => setOpenModal(false)}
        title="Create New Staff"
      >
        <div className="px-0.5">
          <AddStaffForm closeModal={() => setOpenModal(false)} />
        </div>
      </Modal>
    </SectionWrapper>
  );
}

export default Staffs;
