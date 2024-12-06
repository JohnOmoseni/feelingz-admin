import { cn } from "@/lib/utils";
import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const { pathname } = useLocation();
  const isSignupPage = pathname.startsWith("/signup");

  return (
    <div
      className={cn(
        "relative grid place-items-center h-full bg-background-100 w-full overflow-x-hidden px-3  overflow-y-auto",
        !isSignupPage ? "py-4" : "py-6 sm:py-8"
      )}
    >
      <div className="min-w-[300px] relative w-full max-w-[420px] rounded-xl bg-background px-6 py-7 border border-border-200 shadow-sm min-[450px]:w-full">
        <div className="flex-column gap-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
6;
