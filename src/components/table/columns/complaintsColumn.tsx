import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/reuseables/StatusBadge";
import { truncateString } from "@/lib";
import ComplaintActions from "@/app/dashboard/complaints/complaint-actions";

export const complaintsColumn: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Complaint ID",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.id}</p>,
  },
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.name}</p>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.category}</p>,
  },
  {
    accessorKey: "complaint_details",
    header: "Complaint Details",
    cell: ({ row }) => (
      <p className="table-data-sm" title={row.original?.complaint_details}>
        {truncateString(row.original?.complaint_details || "")}
      </p>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Date Submitted",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.created_at}</p>,
    enableColumnFilter: false,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex min-w-[80px] max-sm:px-2">
        <StatusBadge status={row.original?.status} />
      </div>
    ),
    enableColumnFilter: true,
    enableGlobalFilter: false,
    enableSorting: false,
    filterFn: (row, columnId, filterValue) => {
      const status = row.getValue(columnId) as string;
      if (filterValue.toLowerCase() === "all") return true;

      return status?.toLowerCase() === filterValue.toLowerCase();
    },
  },
  {
    id: "actions",
    header: "Action",
    size: 50,
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="w-full text-center">
          <ComplaintActions data={category} />
        </div>
      );
    },
  },
];
