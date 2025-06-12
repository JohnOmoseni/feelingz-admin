import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { StatusBadge } from "@/components/reuseables/StatusBadge";

export const staffColumn: ColumnDef<GetAllStaffType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
        className="input-checkbox h-5 w-5 shrink-0 bg-background-100 border border-input rounded-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
    ),
    cell: ({ row }) => (
      <>
        <Checkbox checked={row.getIsSelected()} onCheckedChange={row.getToggleSelectedHandler()} />
      </>
    ),
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.name}</p>,
    size: 100,
  },

  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <p className="table-data-sm !lowercase">{row.original?.email}</p>,
  },
  {
    accessorKey: "roleName",
    header: "Role",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.roleName}</p>,
    enableColumnFilter: true,
    filterFn: (row, columnId, filterValue) => {
      const role = row.getValue(columnId) as string;
      if (filterValue.toLowerCase() === "all") return true;

      return role?.toLowerCase().includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "created_at",
    header: "Date added",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.dateAdded}</p>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex min-w-[80px] max-sm:px-2">
        <StatusBadge status={row.original?.status} />
      </div>
    ),
  },
];
