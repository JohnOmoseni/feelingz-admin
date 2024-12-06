import { Plus } from "@/constants/icons";
import Button from "./CustomButton";

type Props = {
  activeTab: string;
};

function TopHeading({ activeTab }: Props) {
  return (
    <div className="py-3.5 row-flex-btwn gap-5">
      <div className="row-flex-start gap-1 text-base leading-5 whitespace-nowrap">
        <p>Home</p>
        &gt;
        <p className="font-semibold">{activeTab}</p>
      </div>

      <Button title="Post" icon={Plus} className="" />
    </div>
  );
}

export default TopHeading;
