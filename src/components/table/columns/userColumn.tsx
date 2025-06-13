import { fallback_profile } from "@/constants/icons";
import { UserTableAction } from "./UserTableActions";
import { ColumnDef } from "@tanstack/react-table";
import { StatusBadge } from "@/components/reuseables/StatusBadge";
import { StatusType } from "@/types";

export const usersColumn: ColumnDef<UserResponse>[] = [
  {
    id: "profile_pic",
    cell: ({ row }) => {
      const userInfo = row.original;
      const profile_pic = userInfo?.cover_pic;
      const selfie_pic = userInfo?.selfie;
      return (
        <div className="grid grid-cols-[1fr_1fr] w-full gap-4">
          <div className="flex-column justify-between gap-1.5 w-full">
            <label className="">Profile Picture</label>
            <img
              src={profile_pic || fallback_profile}
              alt=""
              className="rounded-md min-w-[160px] size-[160px] object-cover"
            />
          </div>
          <div className="flex-column justify-between gap-1.5 w-full">
            <label className="">Selfie Photo</label>
            <img
              src={selfie_pic || fallback_profile}
              alt=""
              className="rounded-md min-w-[160px] size-[160px] object-cover"
            />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    cell: ({ row }) => {
      const userInfo = row.original;

      return <UserTableAction userInfo={userInfo} />;
    },
  },
  {
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status as StatusType;

      return <StatusBadge status={status} />;
    },
    enableColumnFilter: true,
    filterFn: (row, columnId, filterValue) => {
      const status = row.getValue(columnId) as string;
      if (filterValue.toLowerCase() === "all") return true;

      return status?.toLowerCase() === filterValue.toLowerCase();
    },
  },
];
