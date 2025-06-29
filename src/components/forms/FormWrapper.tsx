import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Button from "../reuseables/CustomButton";

interface FormWrapperProps {
  children: ReactNode;
  buttonLabel?: string;
  isSubmitting?: boolean;
  containerStyles?: string;
  btnStyles?: string;
  onSubmit?: () => void;
  footerSection?: ReactNode;
}

function FormWrapper({
  children,
  buttonLabel,
  isSubmitting,
  containerStyles,
  btnStyles,
  onSubmit,
  footerSection,
}: FormWrapperProps) {
  return (
    <div className={cn("mt-6 size-full max-w-lg", containerStyles)}>
      <form onSubmit={onSubmit} className="flex-column flex-1 gap-10">
        <div className="flex-column gap-4">{children}</div>

        {footerSection ? (
          footerSection
        ) : (
          <Button
            type="submit"
            title={isSubmitting ? "Submitting..." : buttonLabel || "Submit"}
            className={cn("!mt-auto !w-full", btnStyles)}
            disabled={isSubmitting}
            isLoading={isSubmitting}
          />
        )}
      </form>
    </div>
  );
}

export default FormWrapper;
