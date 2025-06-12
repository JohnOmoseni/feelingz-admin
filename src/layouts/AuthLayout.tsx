import { Logo } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div
      className={cn(
        "relative grid place-items-center h-full bg-background-100 w-full overflow-x-hidden px-3 overflow-y-auto"
      )}
    >
      <div className="min-w-[300px] relative w-full max-w-[420px] rounded-xl bg-background px-6 py-7 md:p-8 border border-border-100 shadow-sm min-[450px]:w-full">
        <div className="flex-column items-center gap-4 md:gap-6 w-full">
          <Logo className="w-[100px] md:h-[30px]" />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
6;
