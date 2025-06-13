import SelectDropdown from "../ui/components/SelectDropdown";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@/constants/icons";
import { Table } from "@tanstack/react-table";

type Props = {
  table: Table<any>;
  hidePageCountDropdown?: boolean;
};

const pageSizeOptions = [
  {
    label: "10",
    value: "10",
  },
  {
    label: "20",
    value: "20",
  },
  {
    label: "30",
    value: "30",
  },
  {
    label: "40",
    value: "40",
  },
  {
    label: "50",
    value: "50",
  },
];

export function TablePaginate({ table, hidePageCountDropdown }: Props) {
  return (
    <div className="row-flex !justify-end mt-3 gap-2 text-sm ">
      {!hidePageCountDropdown && (
        <>
          <div className="row-flex-start gap-2">
            <span className="text-base">Show</span>

            <SelectDropdown
              options={pageSizeOptions}
              defaultValue={pageSizeOptions[0]}
              triggerStyles="!w-22 !min-w-[0px] border !bg-background !border-border !h-7"
              placeholder=""
              onChangeHandler={(value) => {
                table.setPageSize(Number(value));
              }}
            />
          </div>

          <span className="pl-1">|</span>
        </>
      )}

      <div className="row-flex-start leading-3 gap-2 font-medium foreground-100">
        <button
          className="disabled:opacity-60 disabled:hidden"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <KeyboardArrowLeft className="size-4" />
        </button>
        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount() || 1}
        <button
          className=" disabled:opacity-60 disabled:hidden"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          <KeyboardArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

interface ServerSideTableProps {
  table: Table<any>;
  last_page: number; // Total number of pages (last_page)
  current_page: number;
  total: number;
  onPageChange: (value: number) => void;
  onPageSizeChange?: (value: number) => void;
}

export function ServerSideTablePagination({
  table,
  current_page,
  total,
  last_page = 1,
  onPageChange,
  onPageSizeChange,
}: ServerSideTableProps) {
  const handlePageChange = (page: number) => {
    table.setPageIndex(page - 1); // Convert to 0-based index
  };

  const isPreviousDisabled = total === 0 || current_page === 1;
  const isNextDisabled = total === 0 || current_page === last_page;

  const handlePageSizeChange = (pageSize: number) => {
    table.setPageSize(pageSize);
    table.setPageIndex(0); // Reset to first page
    onPageSizeChange?.(pageSize);
  };

  return (
    <div className="row-flex !justify-end mt-3 gap-2 text-sm ">
      <div className="row-flex-start gap-2">
        <span className="">Show</span>

        <SelectDropdown
          options={pageSizeOptions}
          defaultValue={pageSizeOptions.find((opt) => opt.value === "15") || pageSizeOptions[0]}
          triggerStyles="!w-22 !min-w-[0px] border !bg-background !border-border !h-7"
          placeholder=""
          onChangeHandler={(value: any) => {
            table.setPageSize(Number(value));
            handlePageSizeChange(value);
          }}
        />
      </div>

      <span className="">|</span>

      <div className="row-flex-start leading-3 gap-2 font-medium foreground-100">
        <button
          className="disabled:opacity-60 disabled:hidden"
          disabled={isPreviousDisabled}
          onClick={() => {
            table.previousPage();
            handlePageChange(current_page - 1);
            onPageChange(current_page - 1); // Convert to 1-based
          }}
        >
          <KeyboardArrowLeft className="size-4" />
        </button>
        {/* Page {current_page} of {last_page} */}
        Page {table.getState().pagination.pageIndex + 1} of {last_page}
        <button
          className="disabled:opacity-60 disabled:hidden"
          disabled={isNextDisabled}
          onClick={() => {
            handlePageChange(current_page + 1);
            onPageChange(current_page + 1);
          }}
        >
          <KeyboardArrowRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
