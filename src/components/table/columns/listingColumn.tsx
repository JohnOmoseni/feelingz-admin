import { StatusBadge } from "@/components/reuseables/StatusBadge";
import { ColumnDef } from "@tanstack/react-table";
import DashboardTableActions from "@/app/dashboard/dashboard-actions";

export const listingColumn: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Listing ID",
    cell: ({ row }) => <p className="table-data-sm !text-left">{row.original?.id}</p>,
  },

  {
    accessorKey: "name",
    header: "Title/Name",
    cell: ({ row }) => (
      <p className="table-data-sm line-clamp-2">{row.original?.name || "Unknown"}</p>
    ),
  },
  {
    accessorKey: "type",
    header: "Listing Type",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.type}</p>,
  },

  {
    accessorKey: "seller_name",
    header: "Seller Name",
    cell: ({ row }) => <p className="table-data-sm !text-center">{row.original?.seller_name}</p>,
  },
  {
    accessorKey: "date",
    header: "Date Submitted",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.date}</p>,
    enableColumnFilter: false,
    enableGlobalFilter: false,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <p className="table-data-sm">&#8358;{row.original?.price}</p>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.location}</p>,
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
      const rowItem = row.original;

      return (
        <div className="w-full text-center">
          <DashboardTableActions data={rowItem} />
        </div>
      );
    },
  },
];
