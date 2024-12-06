import UserActions from "@/app/dashboard/users/user-actions";
import { StatusBadge } from "@/components/reuseables/StatusBadge";
import { ColumnDef } from "@tanstack/react-table";

export const usersColumn: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Username",
    cell: ({ row }) => <p className="table-data-sm sm:min-w-[20ch]">{row.original?.name}</p>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <p className="table-data-sm !lowercase">{row.original?.email}</p>,
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
    enableSorting: false,
    filterFn: (row, columnId, filterValue) => {
      const status = row.getValue(columnId) as string;
      if (filterValue.toLowerCase() === "all") return true;

      return status?.toLowerCase() === filterValue.toLowerCase();
    },
  },
  {
    accessorKey: "created_at",
    header: "Date Registered",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.created_at}</p>,
    enableColumnFilter: false,
  },
  {
    accessorKey: "last_seen",
    header: "Last Active",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.last_seen}</p>,
    enableColumnFilter: false,
  },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="w-full text-center">
          <UserActions data={user} />
        </div>
      );
    },
  },
];
