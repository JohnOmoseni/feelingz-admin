import { DataTable } from "@/components/table/DataTable";
import { useState } from "react";
import { Modal } from "@/components/ui/components/Modal";
import { defaultStats } from "@/constants";
import Button from "@/components/reuseables/CustomButton";
import { listingData, topPerformers } from "@/components/table/columns/tableData";
import {
  propertyColumn,
  topPerformingPropertyColumn,
} from "@/components/table/columns/propertyColumn";
import { DonutChart } from "@/components/charts/Donut";

import TableGlobalSearch from "@/components/table/TableGlobalSearch";
import Filters from "@/components/table/filters";
import SectionWrapper from "@/layouts/SectionWrapper";
import PostProperty from "@/components/forms/PostProperty";
import Card from "../_sections/Card";
import ConfirmDelete from "@/components/reuseables/ConfirmDelete";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Pending Approval", value: "pending" },
  { label: "Rejected", value: "rejected" },
];

function VehicleListing() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [openModal, setOpenModal] = useState<false | "post" | "edit" | "details">(false);

  const tableData: any = topPerformers;

  return (
    <>
      <SectionWrapper
        headerTitle={"File Manager"}
        customHeaderContent={
          <div className="row-flex gap-4">
            <ConfirmDelete
              onDeleteClick={() => null}
              title="reject all flagged listings"
              actionTitle="Reject All"
              trigger={<Button title="Reject all Flagged" variant="outline" size="sm" />}
            />

            <ConfirmDelete
              onDeleteClick={() => null}
              title="approve all flagged listings"
              actionTitle="Approve All"
              actionStyles="!bg-green-500"
              trigger={<Button title="Approve all Pending" variant="outline" size="sm" />}
            />

            <Button title="Post" onClick={() => setOpenModal("post")} />
          </div>
        }
      >
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          {defaultStats?.length &&
            defaultStats.map(({ label, value }, idx) => (
              <Card key={idx} label={label} value={value} idx={idx} />
            ))}{" "}
        </div>

        <div className="mt-8 flex-column sm:grid grid-cols-2 gap-7">
          <div className="flex-column gap-6 card">
            <h3>Top Performing Properties</h3>

            <DataTable
              columns={topPerformingPropertyColumn}
              tableData={tableData || []}
              headerRowStyles="!bg-background-100"
              hidePageCountDropdown={true}
              pageSize={7}
            />
          </div>

          <div className="flex-column gap-3 card ">
            <h3>Property Status</h3>

            <DonutChart />
          </div>
        </div>

        <div className="mt-10 row-flex-btwn card !p-3">
          <TableGlobalSearch
            globalValue={globalFilter || ""}
            onChange={(value: string) => setGlobalFilter(value)}
          />

          <div className="row-flex">
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
        </div>

        <div className="mt-6">
          <DataTable
            columns={propertyColumn}
            tableData={listingData || []}
            globalFilter={globalFilter}
            columnFilters={columnFilters}
          />
        </div>
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

export default VehicleListing;
