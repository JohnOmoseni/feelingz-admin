import { APP_ROLES } from "@/types";
import { ContentIcon, Dashboard, User, UsersIcon } from "./icons";

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
  {
    value: "Read and Post Only",
    label: "Read and Post Only",
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
    allowedRoles: [APP_ROLES.Admin, APP_ROLES.Staff],
  },
  {
    label: "User Management",
    href: "/users",
    tag: "users",
    icon: User,
    allowedRoles: [APP_ROLES.Admin, APP_ROLES.Staff],
  },
  {
    label: "Staff Management",
    href: "/staffs",
    tag: "staffs",
    icon: UsersIcon,
    allowedRoles: [APP_ROLES.Admin],
  },
  // {
  //   label: "Settings",
  //   href: "/settings",
  //   tag: "settings",
  //   icon: Settings,
  //   allowedRoles: [APP_ROLES.Admin, APP_ROLES.User, APP_ROLES.Staff],
  //   showAlways: true,
  // },
];

export const ssToken = "feelingz-admin-token";
export const ssCurrentUser = "feelingz-admin-currentUser";

export const test_data = [
  {
    id: "4ce91870-bb95-46da-9a83-7e9dce30d733",
    first_name: "David",
    last_name: null,
    email: "lawrenceazuadavid@gmail.com",
    paid: false,
    phone: null,
    avatar: null,
    cover_pic: null,
    selfie: null,
    bio: null,
    dob: "1999-06-17",
    gender: "male",
    country: null,
    state: null,
    city: null,
    zodiac: "Gemini",
    faith: null,
    height: null,
    size: null,
    education: null,
    occupation: null,
    role: "user",
    social_id: null,
    social_type: null,
    status: "inactive",
    is_verified: 1,
    created_at: "2025-07-24T17:15:50.000000Z",
    updated_at: "2025-07-24T17:16:21.000000Z",
    google_id: null,
  },
];
