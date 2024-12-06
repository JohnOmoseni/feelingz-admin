import SelectDropdown from "../ui/components/SelectDropdown";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@/constants/icons";
import { Table } from "@tanstack/react-table";

type Props = {
  table: Table<any>;
  hidePageCountDropdown?: boolean;
};

const options = [
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

function TablePaginate({ table, hidePageCountDropdown }: Props) {
  return (
    <div className="row-flex !justify-end mt-3 gap-2 text-sm ">
      {!hidePageCountDropdown && (
        <>
          <div className="row-flex-start gap-2">
            <span className="text-base">Show</span>

            <SelectDropdown
              // value={table.getState().pagination.pageSize}
              options={options}
              defaultValue={options[0]}
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

      {/* <Input
        type="text"
        max={table.getPageCount()}
        value={value}
        defaultValue={table.getState().pagination.pageIndex + 1}
        className="!shad-input !w-10 !h-8 text-center !rounded-lg"
        onChange={(e) => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0;
          table.setPageIndex(page);
          setValue(page);
        }}
      /> */}
    </div>
  );
}

export default TablePaginate;
