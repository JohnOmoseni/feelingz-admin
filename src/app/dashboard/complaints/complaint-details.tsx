import Button from "@/components/reuseables/CustomButton";
import { house } from "@/constants/icons";
import { ComplaintInfo } from "@/types/api.types";

const complaintInfo: ComplaintInfo = {
  "complaint id": "#2345",
  user: "John Doe",
  category: "Property Lisiting issue",
  "date submitted": "14-Oct-2015",
  status: "Open",
};

function ComplaintDetails({ data, closeModal }: { data: any; closeModal: () => void }) {
  return (
    <div>
      <ul className="flex-column text-sm gap-3 pb-4">
        {Object.keys(complaintInfo)?.map((key: any, idx) => {
          return (
            <li key={idx} className="w-full inline-flex gap-1 ">
              <p className="font-semibold capitalize">{key}:</p>

              <p className="text-foreground-100 tracking-wide ">
                {complaintInfo[key as keyof ComplaintInfo]}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="py-5 border-t border-border-100 flex-column gap-1.5">
        <p className="font-semibold">Complaint Details</p>

        <p className="text-sm text-grey pr-1">
          Complaint Details: "The listing for the 3-bedroom apartment contains false information
          about the price."
        </p>

        <div className="mt-3 row-flex-start gap-4">
          <img src={house} alt="" className="rounded-xl overflow-hidden object-fit w-20 h-[80px]" />
          <div>
            <p className="text-base">IMG567.png</p>
            <p className="text-xs text-grey">456kb</p>
          </div>
        </div>
      </div>
      <Button title="Close" className="mx-auto" onClick={closeModal} />
    </div>
  );
}

export default ComplaintDetails;
