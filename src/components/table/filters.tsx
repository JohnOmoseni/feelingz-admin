import { Dispatch, SetStateAction } from "react";
import SelectDropdown from "../ui/components/SelectDropdown";

type Props = {
  setSelectedFilter: Dispatch<SetStateAction<string>>;
  selectedFilter: string;
  isSelected?: string;
  columnId?: string;
  setColumnFilters?: any;
  options?: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
};

const defaultOptions = [{ label: "All", value: "all" }];

function Filters({
  setSelectedFilter,
  selectedFilter,
  setColumnFilters,
  columnId = "role",
  options = defaultOptions,
  placeholder,
}: Props) {
  const handleClick = (filter: string) => {
    setSelectedFilter(filter);
    setColumnFilters((prev: any) =>
      prev?.filter((f: any) => f.id !== columnId)?.concat({ id: columnId, value: filter })
    );
  };

  return (
    <>
      <SelectDropdown
        value={selectedFilter}
        defaultValue={options[0]}
        options={options}
        placeholder={placeholder}
        onChangeHandler={handleClick}
      />
    </>
  );
}

export default Filters;
