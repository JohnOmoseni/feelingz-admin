import CustomEmptyList from "@/components/reuseables/CustomEmptyList";
import { showToast } from "@/lib/utils";
import { ReactNode, useEffect, useMemo } from "react";

interface Props {
  data: unknown[] | null | undefined;
  isError: boolean;
  showToastPopup?: boolean;
  error?: Error | null;
  noResultTitle?: string;
  errorTitle?: string;
  noResultSubText?: string;
  errorSubText?: string;
  icon?: any;
  footerSection?: ReactNode;
}

function useEmptyState({
  data,
  isError,
  showToastPopup = false,
  error,
  noResultTitle,
  errorTitle,
  noResultSubText,
  errorSubText,
  icon: Icon,
  footerSection,
}: Props) {
  useEffect(() => {
    if (isError && showToastPopup && error) {
      const message = error.message || "Something went wrong";
      showToast("info", message, "Please try again.");
    }
  }, [isError, showToastPopup]);

  const emptyState: ReactNode = useMemo(() => {
    // const isEmpty = !data || (Array.isArray(data) && data.length === 0);
    const isEmpty = Array.isArray(data) && data?.length === 0;

    let title = "";
    let subText = "";

    if (isError) {
      title = error?.message || errorTitle || "Something went wrong";
      subText = errorSubText || "Please try again!";
    } else if (isEmpty) {
      title = noResultTitle || "No results";
      subText = noResultSubText || " ";
    } else {
      return null; // No empty state needed
    }

    return (
      <CustomEmptyList
        title={title}
        subText={subText}
        {...(Icon && {
          icon: Icon,
          iconVariant: "show-icon",
        })}
        {...(footerSection && {
          footerSection,
        })}
      />
    );
  }, [
    data,
    isError,
    error,
    noResultTitle,
    errorTitle,
    noResultSubText,
    errorSubText,
    Icon,
    footerSection,
  ]);

  return { emptyState };
}

export default useEmptyState;
