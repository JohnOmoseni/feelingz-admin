import { cn } from "@/lib/utils";

type CardProps = {
  idx: number;
  label: string;
  value: number | string;
  status?: "high" | "low" | "neutral";
  labelStyles?: string;
};

function Card({ idx, label, value, labelStyles }: CardProps) {
  return (
    <div
      key={idx}
      className="rounded-lg min-w-min bg-background shadow-sm border-b border-border-100 py-3.5 px-4"
    >
      <div className="flex-column gap-1">
        <span className={cn("font-medium text-base capitalize tracking-wide", labelStyles)}>
          {label}
        </span>
        <p className={cn("font-bold leading-6 text-2xl")}>{value}</p>
      </div>
    </div>
  );
}

export default Card;
