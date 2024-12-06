import { cn } from "@/lib/utils";

type Props = {
  tickerStyles: string;
  label: string;
};

function Ticker({ tickerStyles, label }: Props) {
  return (
    <div className="row-flex gap-2">
      <span
        className={cn("size-4 rounded-md")}
        style={{ backgroundColor: `hsl(var(${tickerStyles}))` }}
      />
      <p className="text-xs md:text-sm leading-none mt-0.5">{label}</p>
    </div>
  );
}

export default Ticker;
