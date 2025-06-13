import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";

export const APP_ROLES = {
  Admin: "admin",
  User: "user",
  Staff: "staff",
};

// export type StatusType = (typeof STATUSES)[keyof typeof STATUSES][number];
export type StatusType = "active" | "approved" | "banned" | "suspended" | "pending" | "inactive";
export type ROLE = "ADMIN" | "STAFF";

export type SidebarLinksProp = {
  icon: any;
  label: string;
  href: string;
  tag?: string;
  idx?: number;
};

export type TabsPanelProp = {
  activeTab: number;
  id: string;
  idx: number;
  children: React.ReactNode;
};

export type TabIDS = "all" | "pending" | "active" | "suspended";

export type TabsProps = {
  activeTab: TabIDS;
  changeTab: (value: TabIDS) => void;
  tabIDs: { label: string; value: TabIDS }[];
};

export type TabProps = Omit<TabsProps, "tabIDs"> & {
  value: TabIDS;
  tab: { label: string; value: TabIDS };
  className?: string;
};

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
