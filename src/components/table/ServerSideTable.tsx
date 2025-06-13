import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  ColumnSort,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ServerSideTablePagination } from "./TablePaginate";
import FallbackLoader from "../fallback/FallbackLoader";

interface ServerSideTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  tableData: TData[];
  columnFilters?: ColumnFiltersState;
  globalFilter?: any;
  emptyState?: ReactNode;
  isLoading?: boolean;
  containerStyles?: string;
  paginationMeta: {
    last_page: number;
    current_page: number;
    pageSize: number;
    total: number;
    onPageChange: (value: number) => void;
    onPageSizeChange?: (value: number) => void;
  };
}

export default function ServerSideTable<TData, TValue>({
  columns,
  tableData,
  columnFilters,
  globalFilter,
  emptyState,
  isLoading,
  paginationMeta,
}: ServerSideTableProps<TData, TValue>) {
  const [data, setData] = useState(tableData);
  const [sorting, setSorting] = useState<ColumnSort[]>([]);

  const [_pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  });

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination: {
        pageIndex: paginationMeta.current_page - 1, // Convert to 0-based
        pageSize: paginationMeta.pageSize,
      },
    },
    pageCount: paginationMeta?.last_page, //Total pages from server
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    manualPagination: true,
    onPaginationChange: setPagination,
  });

  return (
    <div className="flex-column gap-4 pb-6">
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

      <ServerSideTablePagination
        {...{
          onPageChange: paginationMeta.onPageChange,
          onPageSizeChange: paginationMeta.onPageSizeChange,
          last_page: paginationMeta.last_page,
          current_page: paginationMeta.current_page,
          total: paginationMeta.total,
        }}
        table={table}
      />
    </div>
  );
}
