import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/constants/icons";
import { InputHTMLAttributes, useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";

type TableGlobalSearchProps = InputHTMLAttributes<HTMLInputElement> & {
  containerStyles?: string;
  placeholder?: string;
  globalValue: string;
  onInputChange: (value: string) => void;
};

function TableGlobalSearch({
  onInputChange,
  globalValue,
  containerStyles,
  placeholder,
  ...props
}: TableGlobalSearchProps) {
  const [value, setValue] = useState(globalValue);

  const debouncedOnChange = useMemo(
    () => debounce((val: string) => onInputChange(val), 1000),
    [onInputChange]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!props.disabled) {
      setValue(newValue);
      debouncedOnChange(newValue);
    }
  };

  useEffect(() => {
    setValue(globalValue);
  }, [globalValue]);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

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
        onChange={(e) => handleChange(e)}
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
