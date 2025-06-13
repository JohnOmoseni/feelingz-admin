import { APP_ROLES } from "@/types";
import { ContentIcon, Dashboard, Settings, User, UsersIcon } from "./icons";

export const routes = {
  LOGIN: "/signin",
  VERIFY_OTP: "/verify-otp",
  DASHBOARD: "/",
  ADMIN_ROUTES: ["/contents", "/users", "/staffs"],
};

export const STATUSES = {
  green: ["active", "approved"],
  error: ["banned", "suspended"],
  yellow: ["pending", "inactive"],
};

export const accessLevels = [
  {
    value: "All Access",
    label: "All Access",
  },
  {
    value: "Read and Review",
    label: "Read and Review",
  },
  {
    value: "Read Only",
    label: "Read Only",
  },
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
    icon: ContentIcon,
    allowedRoles: [APP_ROLES.Admin, APP_ROLES.User, APP_ROLES.Staff],
    showAlways: true,
  },
  {
    label: "User Management",
    href: "/users",
    tag: "users",
    icon: User,
    allowedRoles: [APP_ROLES.Admin, APP_ROLES.User, APP_ROLES.Staff],
  },
  {
    label: "Staff Management",
    href: "/staffs",
    tag: "staffs",
    icon: UsersIcon,
    allowedRoles: [APP_ROLES.Admin],
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
