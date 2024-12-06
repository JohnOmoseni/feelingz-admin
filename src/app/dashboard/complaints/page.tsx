import { DataTable } from "@/components/table/DataTable";
import { useState } from "react";
import { defaultUserStats } from "@/constants";
import { complaintData } from "@/components/table/columns/tableData";
import { complaintsColumn } from "@/components/table/columns/complaintsColumn";

import TableGlobalSearch from "@/components/table/TableGlobalSearch";
import Filters from "@/components/table/filters";
import SectionWrapper from "@/layouts/SectionWrapper";
import Card from "../_sections/Card";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Banned", value: "banned" },
  { label: "Suspended", value: "suspended" },
];

function Complaints() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  const tableData: any = complaintData;

  return (
    <>
      <SectionWrapper headerTitle={"Complaints"}>
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
          {defaultUserStats?.length &&
            defaultUserStats.map(({ label, value, status }, idx) => (
              <Card
                key={idx}
                label={label}
                value={value}
                idx={idx}
                status={status as "high" | "low"}
                labelStyles="sm:max-md:w-[8ch]"
              />
            ))}{" "}
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
            columns={complaintsColumn}
            tableData={tableData || []}
            globalFilter={globalFilter}
            columnFilters={columnFilters}
          />
        </div>
      </SectionWrapper>
    </>
  );
}

export default Complaints;
