import { DataTable } from "@/components/table/DataTable";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useGetAllUsers } from "@/server/actions/users/useUsers";
import { SlidingTabs } from "@/components/tabs/SlidingTabs";
import { TabIDS } from "@/types";
import { usersColumn } from "@/components/table/columns/userColumn";

import TableGlobalSearch from "@/components/table/TableGlobalSearch";
import SectionWrapper from "@/layouts/SectionWrapper";
import useEmptyState from "@/hooks/useEmptyState";

const tabIDs: any = [
  {
    label: "All Users",
    value: "all",
  },
  { label: "Pending Approval", value: "inactive" },
  { label: "Active Users", value: "active" },
  { label: "Suspended Users", value: "banned" },
];

function Users() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [pageIndex, setPageIndex] = useState(() => {
    const savedPage = localStorage.getItem("usersPageIndex");
    return savedPage ? parseInt(savedPage, 10) : 0;
  });

  const { data: users, isError, error, isLoading: isFetchingUsers } = useGetAllUsers();

  const { emptyState } = useEmptyState({
    data: users,
    isError,
    error,
  });

  useEffect(() => {
    localStorage.setItem("usersPageIndex", pageIndex.toString());
  }, [pageIndex]);

  const [activeTab, setActiveTab] = useState<TabIDS>("all");

  const changeTab = useCallback((value: TabIDS) => {
    setActiveTab(value);
    setColumnFilters((prev: any) =>
      prev?.filter((filter: any) => filter.id !== "status")?.concat({ id: "status", value })
    );
    setPageIndex(0);
  }, []);

  const tableData = useMemo(() => {
    const usersArray = Array.isArray(users) ? users : [];
    return usersArray;
  }, [users]);
  // const tableData = useMemo(() => [users, ...test_data], [users, test_data]);

  return (
    <>
      <SectionWrapper headerTitle={"Users"}>
        <TableGlobalSearch
          globalValue={globalFilter}
          placeholder="Search users by email address..."
          onInputChange={(value: string) => setGlobalFilter(value)}
        />

        <div className="row-flex-start mt-3 gap-4 w-fit border-b border-border-100">
          <SlidingTabs activeTab={activeTab} changeTab={changeTab} tabIDs={tabIDs} />
        </div>

        <div className="mt-6">
          <DataTable
            columns={usersColumn}
            tableData={tableData}
            isLoading={isFetchingUsers}
            {...(isError || !tableData.length ? { emptyState } : {})}
            globalFilter={globalFilter}
            columnFilters={columnFilters}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </div>
      </SectionWrapper>
    </>
  );
}

export default Users;
