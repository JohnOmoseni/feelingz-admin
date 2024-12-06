import ListingActions from "@/app/dashboard/listing/listing-actions";
import { StatusBadge } from "@/components/reuseables/StatusBadge";
import { truncateString } from "@/lib";
import { ColumnDef } from "@tanstack/react-table";

export const topPerformingPropertyColumn: ColumnDef<any>[] = [
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
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.location}</p>,
  },

  {
    accessorKey: "inquiries",
    header: "Inquiries",
    cell: ({ row }) => (
      <p className="table-data-sm" title={row.original?.inquiries}>
        {truncateString(row.original?.inquiries || "")}
      </p>
    ),
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.views}</p>,
    enableColumnFilter: false,
    enableGlobalFilter: false,
  },
];

export const propertyColumn: ColumnDef<any>[] = [
  {
    accessorKey: "unique_id",
    header: "Lisitng ID",
    cell: ({ row }) => <p className="table-data-sm !text-left">{row.original?.unique_id}</p>,
  },

  {
    accessorKey: "name",
    header: "Title/Name",
    cell: ({ row }) => <p className="table-data-sm line-clamp-2">{row.original?.name}</p>,
  },
  {
    accessorKey: "type",
    header: "Listing Type",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.type}</p>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.category}</p>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <p className="table-data-sm" title={row.original?.description}>
        {truncateString(row.original?.description || "")}
      </p>
    ),
  },
  {
    accessorKey: "seller_name",
    header: "Seller Name",
    cell: ({ row }) => <p className="table-data-sm !text-center">{row.original?.seller_name}</p>,
  },
  {
    accessorKey: "created_at",
    header: "Date Submitted",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.created_at}</p>,
  },
  {
    accessorKey: "amount",
    header: "Price",
    cell: ({ row }) => <p className="table-data-sm">&#8358;{row.original?.amount}</p>,
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
          <ListingActions data={rowItem} />
        </div>
      );
    },
  },
];
