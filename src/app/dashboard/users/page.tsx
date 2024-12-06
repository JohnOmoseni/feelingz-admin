import { DataTable } from "@/components/table/DataTable";
import { useState } from "react";
import { Modal } from "@/components/ui/components/Modal";
import { Plus } from "@/constants/icons";
import { usersColumn } from "@/components/table/columns/userColumn";
import { useGetAllUsers } from "@/hooks/useUser";
import { toast } from "sonner";

import TableGlobalSearch from "@/components/table/TableGlobalSearch";
import Button from "@/components/reuseables/CustomButton";
import Filters from "@/components/table/filters";
import SectionWrapper from "@/layouts/SectionWrapper";
import Card from "../_sections/Card";
import AddAminForm from "@/components/forms/AddAdmin";
import DownloadReport from "@/components/reuseables/DownloadReport";
import SkeletonLoader from "@/components/fallback/SkeletonLoader";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Suspended", value: "suspended" },
  { label: "Banned", value: "banned" },
];

function Users() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [openModal, setOpenModal] = useState<false | "add">(false);

  const { data: users, isFetching, isError, error } = useGetAllUsers();

  if (isError) toast.error((error as any)?.response?.data?.message || "Error fetching information");

  const userStats = [
    {
      label: "Total Users Registered",
      value: "75,620",
    },
    {
      label: "Active Users",
      value: "5,620",
    },
    {
      label: "Suspended Accounts",
      value: "6,620",
      status: "high",
    },
    {
      label: "Banned Accounts",
      value: "28",
      status: "low",
    },
    {
      label: "New Users",
      value: "28",
      status: "neutral",
    },
  ];

  const isDownloading = false;
  return (
    <>
      <SectionWrapper
        headerTitle={"Users"}
        customHeaderContent={
          <div className="row-flex gap-3">
            <DownloadReport
              data={users || []}
              filename={"Users.xlsx"}
              trigger={
                <>
                  <Button title={isDownloading ? "downloading" : "Export"} />
                </>
              }
            />

            <Button
              icon={Plus}
              title="Add Admin"
              className="!w-max"
              onClick={() => setOpenModal("add")}
            />
          </div>
        }
      >
        {isFetching ? (
          <SkeletonLoader hideChartLoading={true} />
        ) : (
          <>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
              {userStats?.length &&
                userStats.map(({ label, value, status }, idx) => (
                  <Card
                    key={idx}
                    label={label}
                    value={value}
                    idx={idx}
                    status={status as "high" | "low"}
                  />
                ))}
            </div>

            <div className="mt-10 row-flex-btwn card !p-3">
              <TableGlobalSearch
                globalValue={globalFilter || ""}
                onChange={(value: string) => setGlobalFilter(value)}
              />

              <div className="row-flex">
                <Filters
                  placeholder="Status"
                  columnId="status"
                  showAsDropdown={true}
                  options={statusOptions}
                  isArrowDown={true}
                  selectedFilter={selectedFilter}
                  setSelectedFilter={setSelectedFilter}
                  setColumnFilters={setColumnFilters}
                />
              </div>
            </div>

            <div className="mt-6">
              <DataTable
                columns={usersColumn}
                tableData={users || []}
                globalFilter={globalFilter}
                columnFilters={columnFilters}
              />
            </div>
          </>
        )}
      </SectionWrapper>

      {openModal === "add" && (
        <Modal
          openModal={openModal === "add"}
          setOpenModal={() => setOpenModal(false)}
          modalStyles="max-w-xl max-h-[550px]"
          title="Add Admin"
        >
          <div className="mt-6 px-0.5">
            <AddAminForm closeModal={() => setOpenModal(false)} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default Users;
