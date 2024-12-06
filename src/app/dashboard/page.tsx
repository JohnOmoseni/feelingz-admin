import { DataTable } from "@/components/table/DataTable";
import { useState } from "react";
import { Modal } from "@/components/ui/components/Modal";
import { listingColumn } from "@/components/table/columns/listingColumn";
import { defaultStats } from "@/constants";
import { Plus } from "@/constants/icons";
import { listingData } from "@/components/table/columns/tableData";

import Card from "./_sections/Card";
import TableGlobalSearch from "@/components/table/TableGlobalSearch";
import Filters from "@/components/table/filters";
import SectionWrapper from "@/layouts/SectionWrapper";
import PostProperty from "@/components/forms/PostProperty";
import Button from "@/components/reuseables/CustomButton";
import SkeletonLoader from "@/components/fallback/SkeletonLoader";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Requested", value: "requested" },
  { label: "Pending", value: "pending" },
];

function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [openModal, setOpenModal] = useState<false | "post" | "edit">(false);

  const tableData: any = listingData;
  const isFetching = false;

  return (
    <>
      <SectionWrapper
        headerTitle={"File Manager"}
        customHeaderContent={
          <Button icon={Plus} title="Post" onClick={() => setOpenModal("post")} />
        }
      >
        {isFetching ? (
          <SkeletonLoader hideChartLoading={true} />
        ) : (
          <>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
              {defaultStats?.length &&
                defaultStats.map(({ label, value }, idx) => (
                  <Card key={idx} label={label} value={value} idx={idx} />
                ))}{" "}
            </div>

            <div className="mt-10 row-flex-btwn bg-background py-3 px-4 rounded-xl gap-4">
              <TableGlobalSearch
                globalValue={globalFilter || ""}
                onChange={(value: string) => setGlobalFilter(value)}
              />

              <Filters
                placeholder="Filter by Status"
                columnId="status"
                showAsDropdown={true}
                options={statusOptions}
                isArrowDown={true}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                setColumnFilters={setColumnFilters}
              />
            </div>

            <div className="mt-6">
              <DataTable
                columns={listingColumn}
                tableData={tableData || []}
                globalFilter={globalFilter}
                columnFilters={columnFilters}
              />
            </div>
          </>
        )}
      </SectionWrapper>

      {openModal === "post" && (
        <Modal
          openModal={openModal === "post"}
          setOpenModal={() => setOpenModal(false)}
          modalStyles="max-w-xl max-h-[550px]"
          title="Post Property"
        >
          <div className="mt-6 px-0.5">
            <PostProperty type="post" closeModal={() => setOpenModal(false)} />
          </div>
        </Modal>
      )}
    </>
  );
}

export default Dashboard;
