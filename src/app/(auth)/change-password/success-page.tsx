import Button from "@/components/reuseables/CustomButton";
import { SuccessIcon } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex-column !items-center gap-5">
      <div className="relative">
        <SuccessIcon className="h-fit w-fit" />
      </div>

      <div className="flex-column mt-2 !items-center gap-2.5">
        <h3 className="text-center text-lg leading-6">
          Password Reset <br className="sm:hidde" /> Successful
        </h3>

        <p className="max-w-[35ch] px-2 text-center leading-5 ">
          Your password has been updated. You can now log in using your new password.{" "}
        </p>
      </div>

      <Button onClick={() => navigate("/signin")} title="Login" className={cn("!mt-2 !w-max")} />
    </div>
  );
}

export default SuccessPage;
