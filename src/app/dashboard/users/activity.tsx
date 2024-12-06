type Props = { data: any };

function ActivityHistory({}: Props) {
  return Array.from({ length: 4 }).map((_, index) => {
    return (
      <div
        key={index}
        className="flex-column gap-1.5 py-3.5 pb-4 first:pt-2 border-b border-border-100 last:border-none"
      >
        <p className="font-semibold mb-1.5">14-Oct-2024, 09:30 AM</p>

        <p className="text-sm text-grey max-w-[40ch]">Logged In</p>

        <p className="text-sm">
          <span className="font-semibold">Status: </span>
          <span className="text-grey">Awaiting Approval</span>
        </p>

        <p className="italic text-xs text-grey">No action required</p>
      </div>
    );
  });
}

export default ActivityHistory;
