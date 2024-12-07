import { APP_ROLES, DynamicFieldType } from "@/types";
import { Analytics, Dashboard, Property, Settings, User, UserComplaint, Category } from "./icons";
import { FormFieldType } from "@/components/forms/CustomFormField";

export const routes = {
  ROOT: "/",
  LOGIN: "/signin",
  VERIFY_OTP: "/verify-otp",
  UNAUTH: "/dashboard",
  DASHBOARD: "/dashboard",
  ADMIN_ROUTES: ["/dashboard/users", "/dashboard/complaints", "/dashboard/messages"],
};

export const tabIDs = ["Profile", "Trips"];

export const selectOptions = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 days", value: "week" },
  { label: "Last 30 days", value: "month" },
  { label: "This Year", value: "year" },
  { label: "Custom", value: "custom" },
];

export const staticFields = [
  "name",
  "listingType",
  "category",
  "amount",
  "description",
  "actual_amount",
  "is_negotiable",
  "address",
  "state",
  "lga",
  "district",
  "mediaImage",
];

export const defaultStats = [
  {
    label: "Total Listing",
    value: "75,620",
  },
  {
    label: "Approved Listing",
    value: "5,620",
  },
  {
    label: "Rejected Listing",
    value: "6,620",
  },
];

export const defaultUserStats = [
  {
    label: "Total Users Registered",
    value: "75,620",
  },
  {
    label: "Active Users",
    value: "5,620",
  },
  {
    label: "Suspended Accounts",
    value: "6,620",
    status: "high",
  },
  {
    label: "Banned Accounts",
    value: "28",
    status: "low",
  },
  {
    label: "New Users",
    value: "28",
    status: "neutral",
  },
];

export const defaultDetails = [
  {
    label: "Property Title",
    value: "3-Bedroom Apartment",
  },
  {
    label: "Location",
    value: "Lekki, Lagos",
  },
  {
    label: "Price",
    value: "5,000,000",
  },
  {
    label: "Property Type",
    value: "Apartment",
  },
  {
    label: "Status",
    value: "Pending Approval",
  },
  {
    label: "Date Posted",
    value: "12-Oct-2024",
  },
];

export const sidebarLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    tag: "dashboard",
    icon: Dashboard,
    allowedRoles: [APP_ROLES.Admin, APP_ROLES.User, APP_ROLES.Staff],
    showAlways: true,
  },
  {
    label: "Property Listings",
    href: "/dashboard/property-listings",
    tag: "property listings",
    icon: Property,
    allowedRoles: [APP_ROLES.Admin, APP_ROLES.User, APP_ROLES.Staff],
  },
  // {
  //   label: "Vehicle Listings",
  //   href: "/dashboard/vehicle-listings",
  //   tag: "vehicle listings",
  //   icon: Car,
  //   allowedRoles: [APP_ROLES.Admin, APP_ROLES.Staff],
  // },
  {
    label: "User Management",
    href: "/dashboard/users",
    tag: "users",
    icon: User,
    allowedRoles: [APP_ROLES.Admin, APP_ROLES.Staff],
  },
  {
    label: "Complaints",
    href: "/dashboard/complaints",
    tag: "complaints",
    icon: UserComplaint,
    allowedRoles: [APP_ROLES.Admin],
  },
  {
    label: "Category",
    href: "/dashboard/category",
    tag: "category",
    icon: Category,
    allowedRoles: [APP_ROLES.Admin],
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    tag: "analytics",
    icon: Analytics,
    allowedRoles: [APP_ROLES.Admin],
  },
  // {
  // label: "Messages",
  //   href: "/dashboard/messages",
  //   tag: "messages",
  //   icon: Chat,
  //   allowedRoles: [APP_ROLES.Admin],
  // },
  {
    label: "Settings",
    href: "/dashboard/settings",
    tag: "settings",
    icon: Settings,
    allowedRoles: [APP_ROLES.Admin, APP_ROLES.User, APP_ROLES.Staff],
    showAlways: true,
  },
];

export const mainCategories = [
  { value: "Land", label: "Land" },
  { value: "Property", label: "Apartment" },
  { value: "Automobile", label: "Automobile" },
];

export const listingTypes = [
  {
    label: "Sale",
    value: "sale",
  },
  {
    label: "Rent",
    value: "rent",
  },
  {
    label: "Hire",
    value: "hire",
  },
  {
    label: "Shortlet",
    value: "shortlet",
  },
  {
    label: "Lease",
    value: "lease",
  },
];

export const categoryFields: Record<string, DynamicFieldType[]> = {
  Automobile: [
    { name: "make", label: "Make", type: FormFieldType.INPUT, placeholder: "e.g., Toyota" },
    { name: "model", label: "Model", type: FormFieldType.INPUT, placeholder: "e.g., Corolla" },
    {
      name: "year",
      label: "Year",
      type: FormFieldType.INPUT,
      inputType: "number",

      placeholder: "e.g., 2020",
    },
    {
      name: "mileage",
      label: "Mileage",
      type: FormFieldType.INPUT,
      inputType: "number",

      placeholder: "e.g., 12000",
    },
    {
      name: "fuel_type",
      label: "Fuel Type",
      type: FormFieldType.SELECT,
      placeholder: "",
      options: [
        { value: "petrol", label: "Petrol" },
        { value: "diesel", label: "Diesel" },
        { value: "electric", label: "Electric" },
      ],
    },
    {
      name: "transmission",
      label: "Transmission",
      type: FormFieldType.SELECT,
      placeholder: "",
      options: [
        { value: "automatic", label: "Automatic" },
        { value: "manual", label: "Manual" },
      ],
    },
    { name: "color", label: "Color", type: FormFieldType.INPUT, placeholder: "e.g., Red" },
    {
      name: "engine_capacity",
      label: "Engine Capacity",
      type: FormFieldType.INPUT,
      placeholder: "e.g., 2000cc",
    },
    {
      name: "doors",
      label: "Doors",
      type: FormFieldType.INPUT,
      placeholder: "e.g., 4",
      inputType: "number",
    },
    {
      name: "seats",
      label: "Seats",
      type: FormFieldType.INPUT,
      placeholder: "e.g., 5",
      inputType: "number",
    },
    {
      name: "interior_color",
      label: "Interior Color",
      type: FormFieldType.INPUT,
      placeholder: "e.g., Black",
    },
    {
      name: "car_type",
      label: "Car Type",
      type: FormFieldType.SELECT,
      options: [
        { value: "sedan", label: "Sedan" },
        { value: "suv", label: "SUV" },
        { value: "truck", label: "Truck" },
      ],
    },
    {
      name: "body_type",
      label: "Body Type",
      type: FormFieldType.INPUT,
      placeholder: "e.g., Coupe",
    },
    {
      name: "fuel_efficiency",
      label: "Fuel Efficiency",
      type: FormFieldType.INPUT,
      placeholder: "e.g., 15 km/l",
    },
    {
      name: "air_conditioning",
      label: "Air Conditioning",
      type: FormFieldType.CHECKBOX,
      placeholder: "",
    },
    {
      name: "power_steering",
      label: "Power Steering",
      type: FormFieldType.CHECKBOX,
      placeholder: "",
    },
  ],
  Property: [
    {
      name: "bedrooms",
      label: "Bedrooms",
      type: FormFieldType.INPUT,
      inputType: "number",
      placeholder: "e.g., 3",
    },
    {
      name: "bathrooms",
      label: "Bathrooms",
      type: FormFieldType.INPUT,
      inputType: "number",
      placeholder: "e.g., 2",
    },
    {
      name: "kitchens",
      label: "Kitchens",
      type: FormFieldType.INPUT,
      inputType: "number",
      placeholder: "e.g., 1",
    },
    {
      name: "garages",
      label: "Garages",
      type: FormFieldType.INPUT,
      inputType: "number",
      placeholder: "e.g., 1",
    },
    {
      name: "living_rooms",
      label: "Living Rooms",
      type: FormFieldType.INPUT,
      inputType: "number",
      placeholder: "e.g., 1",
    },
    {
      name: "floor_area",
      label: "Floor Area (sq ft)",
      type: FormFieldType.INPUT,
      inputType: "number",
      placeholder: "e.g., 1500",
    },
    {
      name: "property_type",
      label: "Property Type",
      type: FormFieldType.SELECT,
      options: [
        { value: "house", label: "House" },
        { value: "apartment", label: "Apartment" },
      ],
    },
    {
      name: "property_status",
      label: "Property Status",
      type: FormFieldType.SELECT,
      options: [
        { value: "for_sale", label: "For Sale" },
        { value: "for_rent", label: "For Rent" },
      ],
    },
    {
      name: "is_fully_equipped",
      label: "Fully Equipped",
      type: FormFieldType.CHECKBOX,
      placeholder: "",
    },
    { name: "has_garden", label: "Garden", type: FormFieldType.CHECKBOX, placeholder: "" },
    {
      name: "has_swimming_pool",
      label: "Swimming Pool",
      type: FormFieldType.CHECKBOX,
      placeholder: "",
    },
    {
      name: "has_laundry_facility",
      label: "Laundry Facility",
      type: FormFieldType.CHECKBOX,
      placeholder: "",
    },
    { name: "has_internet", label: "Internet", type: FormFieldType.CHECKBOX, placeholder: "" },
    {
      name: "has_security_house",
      label: "Security House",
      type: FormFieldType.CHECKBOX,
      placeholder: "",
    },
  ],
  Land: [
    {
      name: "land_type",
      label: "Land Type",
      type: FormFieldType.SELECT,
      options: [
        { value: "residential", label: "Residential" },
        { value: "commercial", label: "Commercial" },
        { value: "agricultural", label: "Agricultural" },
        { value: "industrial", label: "Industrial" },
        { value: "mixed_use", label: "Mixed Use" },
        { value: "open", label: "Open" },
      ],
    },
    {
      name: "land_size",
      label: "Land Size (sq ft)",
      type: FormFieldType.INPUT,
      inputType: "number",
      placeholder: "e.g., 5000",
    },
    {
      name: "land_purpose",
      label: "Land Purpose",
      type: FormFieldType.SELECT,
      options: [
        { value: "sale", label: "For Sale" },
        { value: "lease", label: "For Lease" },
        { value: "development", label: "For Development" },
      ],
    },
    {
      name: "land_status",
      label: "Land Status",
      type: FormFieldType.SELECT,
      options: [
        { value: "developed", label: "Developed" },
        { value: "under_developed", label: "Under Developed" },
        { value: "freehold", label: "Freehold" },
        { value: "emcumbered", label: "Emcumbered" },
      ],
    },
    {
      name: "is_leased",
      label: "Is Leased",
      type: FormFieldType.CHECKBOX,
    },
  ],
  // Other categories
};

export const leasedFields = [
  {
    name: "leased_duration",
    label: "Lease Duration (months)",
    type: FormFieldType.INPUT,
    inputType: "number",
    placeholder: "e.g., 12",
  },
  {
    name: "leased_price",
    label: "Leased Price",
    type: FormFieldType.INPUT,
    inputType: "number",
    placeholder: "e.g., 5000",
  },
];
