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
  mainContainerStyles,
  customHeaderContent,
}: Props) => {
  return (
    <>
      <Header title={headerTitle} customHeaderContent={customHeaderContent} />

      <main
        className={cn(
          "w-full py-4 px-4 sm:p-6 max-w-[1100px] mx-auto flex-column gap-6",
          mainContainerStyles
        )}
      >
        {children}
      </main>
    </>
  );
};

export default SectionWrapper;
