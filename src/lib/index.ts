import { FormFieldType } from "@/components/forms/CustomFormField";
import { FormValues } from "@/components/forms/PostProperty";
import { categoryFields } from "@/constants";

export const handleApiError = (error: any, message?: string) => {
  console.error(`API Error - ${message}:`, error);
  if (error.response) {
    // Server returned a responnse not in the 200 range
    console.error("Response data:", error.response.data);
    console.error("Response status:", error.response.status);
  } else if (error.request) {
    console.error("Request data:", error.request);
  } else {
    // No response from server - 404
    console.error("Error message:", error.message);
  }
  throw error;
};

export function getInitials(name: string) {
  if (!name) return "User";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export const truncateString = (str: string, length: number = 25): string => {
  return str.length > length ? `${str.substring(0, length - 2)}...` : str;
};

export const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// Function to generate initial values for PostProperty
export const generateInitialValues = (
  categoryType: string | null = null,
  data?: any
): FormValues => {
  // Static fields
  const staticFields = {
    name: data?.name || "",
    listingType: data?.type || "",
    description: data?.description || "",
    address: data?.address || "",
    state: data?.state || "",
    lga: data?.lga || "",
    district: data?.district || "",
    amount: data?.amount || "",
    actual_amount: data?.actual_amount || "",
    category: data?.category ? data?.category : categoryType ? categoryType : "",
    mediaImage: data?.images || "",
    is_negotiable: data?.is_negotiable || false,
  };

  // Dynamic fields based on category type, if any
  const dynamicFields = categoryFields[categoryType || ""]?.reduce((acc, field) => {
    acc[field.name] = field.type === FormFieldType.CHECKBOX ? false : "";
    return acc;
  }, {} as Record<string, any>);

  return {
    ...staticFields,
    ...dynamicFields,
  };
};

export const formatPrice = (price: string | number) => {
  if (!price) return 0;
  return new Intl.NumberFormat("en-NG", {
    maximumFractionDigits: 0,
  }).format(Number(price));
};
