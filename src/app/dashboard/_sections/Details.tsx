import Button from "@/components/reuseables/CustomButton";
import { UserAvatar } from "@/constants/icons";
import { formatPrice } from "@/lib";
import { cn } from "@/lib/utils";

function getStatusClass(label: string, value: string) {
  if (!label || !value) return "text-foreground-100";

  if (label.includes("Status")) {
    if (value.includes("Approved")) return "text-green-600 font-semibold";
    if (value.includes("Rejected")) return "text-red-600 font-semibold";
  }
  return "text-foreground-100";
}

function Details({ data, type, closeModal }: { data: any; type?: any; closeModal?: () => void }) {
  console.log("DATA", data);

  const details = [
    {
      label: "Property Title",
      value: data?.name,
    },
    {
      label: "Location",
      value: data?.location,
    },
    {
      label: "Price",
      value: formatPrice(data?.amount || ""),
    },
    {
      label: "Property Type",
      value: data?.category,
    },
    {
      label: "Status",
      value: data?.status,
    },
    {
      label: "Date Posted",
      value: data?.created_at,
    },
  ];

  return (
    <div>
      <div className="pb-4 border-b border-border-100 flex-column !items-center">
        {data?.img ? (
          <img
            src={data?.img}
            alt="Profile Picture"
            className="rounded-full h-36 w-36 border border-border object-cover"
          />
        ) : (
          <UserAvatar className="w-fit h-[100px]" />
        )}

        <h3 className="leading-4 mt-4 mb-1">{data?.seller_name || "Unknown"}</h3>

        <p className="text-sm text-grey max-w-[40ch]">
          {data?.seller_email || <span>unknown</span>}{" "}
          {data?.phone_number && `| ${data?.phone_number}`}
        </p>
      </div>

      <div className="mt-6 mb-3 flex-column gap-6">
        {type !== "user-details" && data?.images && (
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(90px,_1fr))] gap-4">
            {Array.isArray(data?.images) &&
              data?.images.map((src: string, idx: number) => {
                return (
                  <img
                    key={idx}
                    src={src}
                    alt=""
                    className="rounded-xl overflow-hidden size-[90px] object-cover w-24"
                  />
                );
              })}
          </div>
        )}

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

export default Details;
