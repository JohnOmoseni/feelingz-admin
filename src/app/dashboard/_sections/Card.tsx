import { TrendDown, TrendFlat, TrendUp } from "@/constants/icons";
import { cn } from "@/lib/utils";

type CardProps = {
  idx: number;
  label: string;
  value: string;
  status?: "high" | "low" | "neutral";
  labelStyles?: string;
};

function Card({ idx, label, value, status, labelStyles }: CardProps) {
  const statusColor =
    status === "neutral"
      ? "text-yellow-500"
      : status === "high"
      ? "text-green-500"
      : "text-red-500";
  return (
    <div
      key={idx}
      className={cn(
        "rounded-lg min-w-min bg-background shadow-sm border-b border-border-100 py-3.5 px-4",
        status && "grid gap-3 grid-cols-[1fr_max-content]"
      )}
    >
      <div className="flex-column gap-1">
        <span className={cn("font-medium text-base capitalize  tracking-wide", labelStyles)}>
          {label}
        </span>
        <p className={cn("font-bold leading-6 text-2xl")}>{value}</p>
      </div>

      {status && (
        <div className={cn("text-sm font-semibold inline-flex gap-1 self-end", statusColor)}>
          {status === "neutral" ? (
            <TrendFlat className={cn("size-4", statusColor)} />
          ) : status === "high" ? (
            <TrendUp className={cn("size-4", statusColor)} />
          ) : (
            <TrendDown className={cn("size-4", statusColor)} />
          )}
          <p className="font-semibold">+ 5.7%</p>
        </div>
      )}
    </div>
  );
}

export default Card;
