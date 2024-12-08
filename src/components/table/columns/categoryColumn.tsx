import { ColumnDef } from "@tanstack/react-table";
import { truncateString } from "@/lib";
import CategoryActions from "@/app/dashboard/category/category-actions";

export const categoryColumn: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.name}</p>,
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
    accessorKey: "created_at",
    header: "Date Created",
    cell: ({ row }) => <p className="table-data-sm">{row.original?.created_at}</p>,
  },
  {
    id: "actions",
    header: "Action",
    size: 50,
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="w-full text-center">
          <CategoryActions data={category} />
        </div>
      );
    },
  },
];

export const subCategoryColumn: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Sub Categories",
    cell: ({ row }) => <p className="table-data-sm line-clamp-2 text-left">{row.original?.name}</p>,
  },
];
