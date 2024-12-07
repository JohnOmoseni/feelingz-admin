import { DataTable } from "@/components/table/DataTable";
import { useState } from "react";
import { Modal } from "@/components/ui/components/Modal";
import {
  propertyColumn,
  topPerformingPropertyColumn,
} from "@/components/table/columns/propertyColumn";
import { DonutChart } from "@/components/charts/Donut";
import { toast } from "sonner";
import {
  useApproveAllPending,
  useGetAllPropertyListing,
  useGetPropertyReport,
  useRejectAllFlagged,
} from "@/hooks/useListing";

import TableGlobalSearch from "@/components/table/TableGlobalSearch";
import Filters from "@/components/table/filters";
import SectionWrapper from "@/layouts/SectionWrapper";
import PostProperty from "@/components/forms/PostProperty";
import Card from "../_sections/Card";
import Button from "@/components/reuseables/CustomButton";
import ConfirmDelete from "@/components/reuseables/ConfirmDelete";
import SkeletonLoader from "@/components/fallback/SkeletonLoader";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Pending Approval", value: "pending" },
  { label: "Rejected", value: "rejected" },
];

function Listing() {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [openModal, setOpenModal] = useState<false | "post" | "edit" | "details">(false);

  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: propertyListing, isFetching, isError, error } = useGetAllPropertyListing();
  const { data: propertyReport } = useGetPropertyReport();

  const approveAllPendingMutation = useApproveAllPending();
  const rejectAllFlaggedMutation = useRejectAllFlagged();

  const tableData: any = propertyListing?.tableData;

  if (isError) toast.error((error as any)?.response?.data?.message || "Error fetching information");

  const listingStats = [
    {
      label: "Total Listing",
      value: propertyReport?.totalListing || 0,
    },
    {
      label: "Approved Listing",
      value: propertyReport?.approvedListing || 0,
    },
    {
      label: "Rejected Listing",
      value: propertyReport?.rejectedListing || 0,
    },
    {
      label: "Pending Listing",
      value: propertyReport?.pendingListing || 0,
    },
  ];

  const handleBulkAction = async (action: "approve" | "reject") => {
    try {
      if (action === "approve") {
        await approveAllPendingMutation.mutateAsync();
      } else {
        await rejectAllFlaggedMutation.mutateAsync();
      }

      toast.success(`${action} all pending/flagged listings successfully`);
    } catch (error) {
      const message =
        (error as any)?.response?.data?.message || "Error approving/rejecting listings";
      toast.error(message);
    }
  };

  return (
    <>
      <SectionWrapper
        headerTitle={"File Manager"}
        customHeaderContent={
          <div className="row-flex gap-4">
            <ConfirmDelete
              onDeleteClick={() => handleBulkAction("reject")}
              title="reject all flagged listings"
              actionTitle="Reject All"
              isPending={rejectAllFlaggedMutation.isPending}
              trigger={<Button title="Reject all Flagged" variant="outline" size="sm" />}
            />

            <ConfirmDelete
              onDeleteClick={() => handleBulkAction("approve")}
              title="approve all flagged listings"
              actionTitle="Approve All"
              actionStyles="!bg-green-500"
              isPending={rejectAllFlaggedMutation.isPending}
              isPendingLabel="Approving..."
              trigger={<Button title="Approve all Pending" variant="outline" size="sm" />}
            />

            <Button title="Post" onClick={() => setOpenModal("post")} />
          </div>
        }
      >
        {isFetching ? (
          <SkeletonLoader />
        ) : (
          <>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
              {listingStats?.length &&
                listingStats.map(({ label, value }, idx) => (
                  <Card key={idx} label={label} value={value} idx={idx} />
                ))}{" "}
            </div>

            <div className="mt-8 flex-column sm:grid grid-cols-2 gap-7">
              <div className="flex-column gap-6 card">
                <h3>Top Performing Properties</h3>

                <DataTable
                  columns={topPerformingPropertyColumn}
                  tableData={[]}
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
          title={`Post ${selectedCategory || "Property"}`}
        >
          <div className="mt-6 px-0.5">
            <PostProperty
              type="post"
              categoryType="Property"
              closeModal={() => setOpenModal(false)}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
        </Modal>
      )}
    </>
  );
}

export default Listing;
