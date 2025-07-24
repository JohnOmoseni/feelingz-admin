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
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TablePaginate } from "./TablePaginate";
import FallbackLoader from "../fallback/FallbackLoader";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  tableData: TData[];
  columnFilters?: ColumnFiltersState;
  globalFilter?: any;
  setSelectedRows?: (rows: TData[]) => void;
  hidePageCountDropdown?: boolean;
  emptyState?: ReactNode;
  isLoading?: boolean;
  pageIndex?: number;
  setPageIndex?: (pageIndex: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  tableData,
  columnFilters,
  globalFilter,
  setSelectedRows,
  emptyState,
  isLoading,
  pageIndex = 4,
  setPageIndex,
}: DataTableProps<TData, TValue>) {
  const [data, setData] = useState(tableData);
  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
      pagination: {
        pageIndex,
        pageSize: 10,
      },
    },
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize: table.getState().pagination.pageSize })
          : updater;
      setPageIndex?.(newState.pageIndex); // Update parent state
    },
    autoResetPageIndex: false,
  });

  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
    setSelectedRows && setSelectedRows(selectedRows);
  }, [table.getSelectedRowModel().rows, setSelectedRows]);

  useEffect(() => {
    table.setPageIndex(pageIndex);
  }, [pageIndex, table]);

  return (
    <div className="flex-column gap-4">
      <div className="data-table">
        <Table className="remove-scrollbar min-h-[100px] overflow-x-auto rounded-sm">
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="relative h-44">
                  <FallbackLoader loading />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row?.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="shad-table-row"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cn("last:border-0 first:border-0")}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-44 text-center">
                  {emptyState || "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <TablePaginate table={table} />
    </div>
  );
}
