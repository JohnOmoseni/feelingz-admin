import { APP_ROLES } from "@/types";
import { Dashboard, Settings, User } from "./icons";

export const routes = {
  LOGIN: "/signin",
  VERIFY_OTP: "/verify-otp",
  DASHBOARD: "/",
  ADMIN_ROUTES: ["/contents", "/users"],
};

export const selectOptions = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 days", value: "week" },
  { label: "Last 30 days", value: "month" },
  { label: "This Year", value: "year" },
  { label: "Custom", value: "custom" },
];

export const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/",
    tag: "dashboard",
    icon: Dashboard,
    allowedRoles: [APP_ROLES.Admin, APP_ROLES.User, APP_ROLES.Staff],
    showAlways: true,
  },
  {
    label: "Content Management",
    href: "/contents",
    tag: "contents",
    icon: User,
    allowedRoles: [APP_ROLES.Admin, APP_ROLES.User, APP_ROLES.Staff],
    showAlways: true,
  },
  {
    label: "User Management",
    href: "/users",
    tag: "users",
    icon: User,
    allowedRoles: [APP_ROLES.Admin, APP_ROLES.User, APP_ROLES.Staff],
    showAlways: true,
  },
  {
    label: "Staff Management",
    href: "/staffs",
    tag: "staffs",
    icon: User,
    allowedRoles: [APP_ROLES.Admin],
    showAlways: true,
  },
  {
    label: "Settings",
    href: "/settings",
    tag: "settings",
    icon: Settings,
    allowedRoles: [APP_ROLES.Admin, APP_ROLES.User, APP_ROLES.Staff],
    showAlways: true,
  },
];

export const ssToken = "feelingz-admin-token";
export const ssCurrentUser = "feelingz-admin-currentUser";
