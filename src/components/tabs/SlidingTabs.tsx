import { cn } from "@/lib/utils";
import type { TabProps, TabsProps } from "@/types";
import { motion } from "framer-motion";

const Tab = ({ value, activeTab, tab, changeTab, className }: TabProps) => {
  return (
    <li
      role="tab"
      aria-selected={activeTab === value ? "true" : "false"}
      className={cn(
        "relative cursor-pointer whitespace-nowrap px-2 py-2 pb-2.5 text-center capitalize",
        activeTab === value
          ? "font-semibold text-foreground-variant transition-colors"
          : "font-medium text-foreground-100",

        className
      )}
      onClick={() => changeTab(value)}
    >
      {tab.label}

      {activeTab === value && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn" }}
          className="absolute -bottom-0 left-0 right-0 mx-auto h-[2px] w-full rounded-full bg-secondary shadow-sm"
        />
      )}
    </li>
  );
};

export const SlidingTabs = ({ activeTab, changeTab, tabIDs }: TabsProps) => {
  return (
    <div className="remove-scrollbar overflow-x-auto">
      <ul role="tablist" aria-label="Tabs" className="row-flex-start gap-6 px-0.5 sm:gap-8">
        {tabIDs.map((tab, idx) => {
          return (
            <Tab
              key={idx}
              activeTab={activeTab}
              tab={tab}
              value={tab.value}
              changeTab={changeTab}
            />
          );
        })}
      </ul>
    </div>
  );
};
