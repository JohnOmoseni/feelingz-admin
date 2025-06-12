import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";

export const APP_ROLES = {
  Admin: "ADMIN",
  User: "USER",
  Staff: "STAFF",
};

export type Status =
  | "VERIFED"
  | "NOT_VERIFIED"
  | "APPROVED"
  | "SUCCESS"
  | "ACTIVE"
  | "COMPLETED"
  | "REQUESTED"
  | "CANCELLED"
  | "ACCEPTED"
  | "IN_PROGRESS"
  | "FAILED"
  | "DEACTIVATED"
  | "Verified"
  | "Not Verified"
  | "Active"
  | "Deactivated";

export type ROLE = "ADMIN" | "STAFF";

export type User = {
  userId: string;
  name: string;
  email: string;
  phone: string;
  image: string;

  otpVerified: boolean;
  role: (typeof APP_ROLES)[keyof typeof APP_ROLES];
};

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
