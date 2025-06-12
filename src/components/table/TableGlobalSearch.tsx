import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/constants/icons";
import { useEffect, useState } from "react";

type TableGlobalSearchProps = {
  containerStyles?: string;
  placeholder?: string;
  globalValue: string;
  onChange: (value: string) => void;
};

function TableGlobalSearch({
  onChange,
  globalValue,
  containerStyles,
  placeholder,
}: TableGlobalSearchProps) {
  const [value, setValue] = useState(globalValue);

  useEffect(() => {
    setValue(globalValue);
  }, [globalValue]);

  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), 100);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div
      className={cn(
        "row-flex-start max-sm:w-[250px] w-[300px] rounded-md bg-background border border-border-100 px-3.5 py-1 max-[430px]:px-2.5",
        containerStyles
      )}
    >
      <SearchIcon className="size-5 text-grey" />
      <Input
        value={value}
        placeholder={placeholder ?? "Search..."}
        className="i-reset h-7 sm:h-8"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default TableGlobalSearch;

type TableSearchProps = {
  containerStyles?: string;
  placeholder?: string;
  columnFilters?: any;
  setColumnFilters?: any;
  filterBy?: string;
};

export function TableSearch({
  columnFilters,
  setColumnFilters,
  containerStyles,
  placeholder,
  filterBy = "name",
}: TableSearchProps) {
  const filterValue = columnFilters?.find((filter: any) => filter.id === filterBy)?.value || "";

  const onFilterChange = (columnId: string, value: string) => {
    setColumnFilters((prev: any) =>
      prev?.filter((filter: any) => filter.id !== columnId)?.concat({ id: columnId, value })
    );
  };

  return (
    <div
      className={cn(
        "row-flex-start max-sm:w-[250px] w-[300px] rounded-md bg-background border border-border-100 px-3.5 py-1 max-[430px]:px-2.5",
        containerStyles
      )}
    >
      <SearchIcon className="size-5 text-grey" />
      <Input
        value={filterValue}
        placeholder={placeholder ?? "Search..."}
        className="i-reset h-7 sm:h-8"
        onChange={(e) => onFilterChange(filterBy, e.target.value)}
      />
    </div>
  );
}
