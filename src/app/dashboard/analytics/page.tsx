import { DataTable } from "@/components/table/DataTable";
import { useState } from "react";
import { Modal } from "@/components/ui/components/Modal";
import { defaultStats } from "@/constants";
import { listingData, topPerformers } from "@/components/table/columns/tableData";
import {
  propertyColumn,
  topPerformingPropertyColumn,
} from "@/components/table/columns/propertyColumn";
import { DonutChart } from "@/components/charts/Donut";
import { BarChartComponent } from "@/components/charts/BarChart";
import { HorizontalBarChart } from "@/components/charts/HorizontalBarChart";

import TableGlobalSearch from "@/components/table/TableGlobalSearch";
import Filters from "@/components/table/filters";
import SectionWrapper from "@/layouts/SectionWrapper";
import PostProperty from "@/components/forms/PostProperty";
import Card from "../_sections/Card";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Requested", value: "requested" },
  { label: "In-progress", value: "in_progress" },
  { label: "Cancelled", value: "cancelled" },
];

function Analytics() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [openModal, setOpenModal] = useState<false | "post" | "edit" | "details">(false);

  const tableData: any = listingData;

  return (
    <>
      <SectionWrapper headerTitle={"Admin"}>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          {defaultStats?.length &&
            defaultStats.map(({ label, value }, idx) => (
              <Card key={idx} label={label} value={value} idx={idx} />
            ))}{" "}
        </div>

        <div className="mt-8 flex-column sm:grid grid-cols-2 gap-7">
          <div className="flex-column gap-3 card">
            <h3>User Activity</h3>

            <BarChartComponent />
          </div>

          <div className="flex-column gap-6 card">
            <h3>Top Performing Listings</h3>

            <DataTable
              columns={topPerformingPropertyColumn}
              tableData={topPerformers || []}
              headerRowStyles="!bg-background-100"
              hidePageCountDropdown={true}
              pageSize={7}
            />
          </div>
        </div>

        <div className="mt-8 flex-column sm:grid grid-cols-2 gap-7">
          <div className="flex-column gap-3 card">
            <h3>Top Searches</h3>

            <HorizontalBarChart />
          </div>

          <div className="flex-column gap-3 card">
            <h3>User Device Distribution</h3>

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
            tableData={tableData || []}
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

export default Analytics;
