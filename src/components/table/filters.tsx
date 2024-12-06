import { cn } from "@/lib/utils";
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
	showAsDropdown?: boolean;
	isArrowDown?: boolean;
};

const defaultOptions = [
	{ label: "All", value: "all" },
	{ label: "Verified", value: "Verified" },
	{ label: "Not-verified", value: "Not Verified" },
];

function Filters({
	setSelectedFilter,
	selectedFilter,
	setColumnFilters,
	columnId = "role",
	options = defaultOptions,
	placeholder,
	showAsDropdown,
	isArrowDown = true,
}: Props) {
	const selectedStyle = "!bg-foreground text-secondary-foreground shadow-sm";

	const handleClick = (filter: string) => {
		setSelectedFilter(filter);
		setColumnFilters((prev: any) =>
			prev
				?.filter((f: any) => f.id !== columnId)
				?.concat({ id: columnId, value: filter })
		);
	};

	return (
		<>
			<div className={cn(showAsDropdown ? "block" : "lg:hidden block")}>
				<SelectDropdown
					value={selectedFilter}
					defaultValue={options[0]}
					options={options}
					isArrowDown={isArrowDown}
					placeholder={placeholder}
					onChangeHandler={handleClick}
				/>
			</div>

			<div
				className={cn(
					" gap-3.5 max-[430px]:gap-1.5 cursor-pointer",
					showAsDropdown ? "hidden" : "lg:row-flex-start hidden"
				)}
			>
				{options?.map((option) => (
					<div
						key={option.value}
						className={cn(
							"filter-div transition-colors",
							selectedFilter === option.value && selectedStyle
						)}
						onClick={() => handleClick(option.value)}
					>
						{option.label}
					</div>
				))}
			</div>
		</>
	);
}

export default Filters;
