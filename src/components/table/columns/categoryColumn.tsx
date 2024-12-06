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
    accessorKey: "sub_category_count",
    header: () => <p className="font-semibold">Number of Subcategories</p>,
    cell: ({ row }) => <p className="table-data-sm">{row.original?.sub_category_count}</p>,
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
    size: 400,
    cell: ({ row }) => (
      <p className="table-data-sm line-clamp-2 sm:w-[400px]">{row.original?.name}</p>
    ),
  },

  {
    id: "actions",
    header: "Action",

    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="w-[10px] text-center">
          <CategoryActions data={category} />
        </div>
      );
    },
  },
];
