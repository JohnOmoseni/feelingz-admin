import Button from "@/components/reuseables/CustomButton";
import { UserAvatar } from "@/constants/icons";
import { cn } from "@/lib/utils";

function getStatusClass(label: string, value: string) {
  if (!label || !value) return "text-foreground-100";

  if (label.includes("Status")) {
    if (value.includes("Active")) return "text-green-600 font-semibold";
    if (value.includes("Inactive")) return "text-red-600 font-semibold";
  }
  return "text-foreground-100";
}

function UserDetails({ data, closeModal }: { data: any; closeModal?: () => void }) {
  console.log("DATA", data);

  const details = [
    {
      label: "State",
      value: data?.state_name || "N/A",
    },
    {
      label: "LGA",
      value: data?.lga_name || "N/A",
    },
    {
      label: "Status",
      value: data?.status || "N/A",
    },
    {
      label: "Last Seen",
      value: data?.last_seen || "N/A",
    },
  ];

  return (
    <div>
      <div className="pb-4 border-b border-border-100 flex-column !items-center">
        {data?.profile_picture ? (
          <img
            src={data?.profile_picture}
            alt="Profile Picture"
            className="rounded-full h-36 w-36 border border-border object-cover"
          />
        ) : (
          <UserAvatar className="w-fit h-[100px]" />
        )}

        <h3 className="leading-4 mt-4 mb-1">{data?.name || "Unknown"}</h3>

        <p className="text-sm text-grey max-w-[40ch]">
          {data?.email || <span>unknown</span>} {data?.phone && `| ${data?.phone}`}
        </p>
      </div>

      <div className="mt-6 mb-3 flex-column gap-6">
        <ul className="grid grid-cols-2 gap-5 sm:gap-x-12">
          {details?.map(({ label, value }, idx) => (
            <li key={idx} className="w-full flex-column gap-0.5">
              <p className="font-semibold">{label}</p>
              <p
                className={cn(
                  "text-foreground-100 tracking-wide text-base leading-5",
                  getStatusClass(label, value)
                )}
              >
                {value}
              </p>
            </li>
          ))}
        </ul>

        <Button title="Close" className="!w-max mx-auto mt-4" onClick={closeModal && closeModal} />
      </div>
    </div>
  );
}

export default UserDetails;
