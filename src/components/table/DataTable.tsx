import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnSort,
  ColumnFiltersState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp } from "@/constants/icons";
import { useEffect, useState } from "react";
import TablePaginate from "./TablePaginate";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  tableData: TData[];
  columnFilters?: ColumnFiltersState;
  globalFilter?: any;
  setSelectedRows?: (rows: TData[]) => void;
  headerRowStyles?: string;
  cellStyles?: string;
  hidePageCountDropdown?: boolean;
  pageSize?: number;
}

export function DataTable<TData, TValue>({
  columns,
  tableData,
  columnFilters,
  globalFilter,
  setSelectedRows,
  headerRowStyles,
  hidePageCountDropdown,
  cellStyles,
  pageSize = 10,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState(tableData);
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: { pageSize },
    },
    meta: {
      updateData: (rowIndex: string | number, columnId: string, value: string | number) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex ? { ...prev[rowIndex], [columnId]: value } : row
          )
        ),
    },
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
  });

  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
    setSelectedRows && setSelectedRows(selectedRows);
  }, [table.getSelectedRowModel().rows, setSelectedRows]);

  return (
    <div className="flex-column gap-4">
      <div className="data-table remove-scrollbar">
        <Table className="remove-scrollbar small-text min-h-[100px] overflow-x-auto rounded-sm">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => {
                  const sortStatus = header.column.getIsSorted();
                  const sortIcons = {
                    asc: <ArrowUp className="size-4 w-auto" />,
                    desc: <ArrowDown className="size-4 w-auto" />,
                  };
                  const sortIcon = sortStatus ? sortIcons[sortStatus] : "";

                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        "shad-table-row-header border-r !w-[10px] border-border-100",
                        headerRowStyles
                      )}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className="row-flex-btwn gap-3 relative cursor-default font-semibold"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() && sortIcon}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row?.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="shad-table-row"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "border border-border-100 max-sm:py-3 max-sm:px-4 last:border-0 first:border-0",
                        cellStyles
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TablePaginate table={table} hidePageCountDropdown={hidePageCountDropdown} />
    </div>
  );
}
