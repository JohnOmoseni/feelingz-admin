import clsx from "clsx";

import { StatusType } from "@/types";
import { STATUSES } from "@/constants";

export const StatusBadge = ({ status }: { status: StatusType }) => {
  return (
    <div className="row-flex-start gap-2">
      <span
        className={clsx("size-2.5 rounded-full", {
          "bg-green-300": STATUSES["green"].includes(status),
          "bg-red-200": STATUSES["error"].includes(status),
          "bg-yellow-200": STATUSES["yellow"].includes(status),
        })}
      />
      <p
        className={clsx("capitalize leading-3 mt-px", {
          "text-green-700": STATUSES["green"].includes(status),
          "text-red-600": STATUSES["error"].includes(status),
          "text-yellow-600": STATUSES["yellow"].includes(status),
        })}
      >
        {status}
      </p>
    </div>
  );
};
