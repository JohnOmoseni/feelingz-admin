import Header from "./Header";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
	children: ReactNode;
	headerTitle: string;
	mainContainerStyles?: string;
	customHeaderContent?: ReactNode;
};

const SectionWrapper = ({
	children,
	headerTitle,
	customHeaderContent,
	mainContainerStyles,
}: Props) => {
	return (
		<div className={cn("")}>
			<Header
				title={headerTitle}
				customContent={customHeaderContent && customHeaderContent}
			/>

			<main
				className={cn(
					"h-full w-full py-4 px-4 sm:py-6 sm:px-6",
					mainContainerStyles
				)}
			>
				{children}
			</main>
		</div>
	);
};

export default SectionWrapper;
