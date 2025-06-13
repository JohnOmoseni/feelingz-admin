import CustomButton from "@/components/reuseables/CustomButton";
import { truncateString } from "@/lib";
import { useMutateUser } from "@/server/actions/users/useUsers";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

export const UserTableAction = ({ userInfo }: { userInfo: UserResponse }) => {
  const { mutateAsync: mutateUser, isPending } = useMutateUser();

  const [activeAction, setActiveAction] = useState<MutateUserActionType | null>(null);

  const fullName = `${userInfo?.first_name || "Unknown"} ${userInfo?.last_name || ""}`.trim();
  const location =
    [userInfo?.city, userInfo?.state, userInfo?.country].filter(Boolean).join(", ") || "N/A";

  const info = useMemo(
    () => [
      {
        label: "Age",
        value: userInfo?.dob ? dayjs().diff(dayjs(userInfo.dob), "year") : "N/A",
      },
      {
        label: "Education",
        value: userInfo?.education || "N/A",
      },
      {
        label: "Location",
        value: location,
      },
    ],
    [userInfo]
  );

  const onMutateUser = async (user: UserResponse, type: MutateUserActionType) => {
    setActiveAction(type);

    const data = {
      user_id: user.id,
      email: user.email,
      type,
    };

    try {
      await mutateUser(data);
    } catch (err: any) {
      console.log("Error", err);
    }
  };

  const isSuspended = userInfo.status === "suspended";
  const isApproved = userInfo.status === "active";

  return (
    <div className="flex-column gap-2">
      <h3 className="">{fullName}</h3>
      <p className="truncate">{userInfo.email ? truncateString(userInfo.email, 40) : "N/A"}</p>

      <div className="flex-column gap-1 my-3">
        {info.map((item, idx) => (
          <div key={idx} className="row-flex-start gap-3 text-sm">
            <span className="min-w-[8ch]">{item.label}:</span>
            <span className="">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="row-flex-start gap-3">
        <Link to={`/users/${userInfo.id}`}>
          <CustomButton title="View" variant="badge" className="bg-secondary-100" size={"badge"} />
        </Link>
        <CustomButton
          title={isApproved ? "Un-Approve" : "Approve"}
          variant="badge"
          size="badge"
          onClick={() => onMutateUser(userInfo, isApproved ? "Un-Approve" : "Approve")}
          disabled={isPending && activeAction === (isApproved ? "Un-Approve" : "Approve")}
          isLoading={isPending && activeAction === (isApproved ? "Un-Approve" : "Approve")}
        />
        <CustomButton
          title={isSuspended ? "Un-Suspend" : "Suspend"}
          size="badge"
          variant="badge"
          className="bg-red-500"
          onClick={() => onMutateUser(userInfo, isSuspended ? "Un-Suspend" : "Suspend")}
          disabled={isPending && activeAction === (isSuspended ? "Un-Suspend" : "Suspend")}
          isLoading={isPending && activeAction === (isSuspended ? "Un-Suspend" : "Suspend")}
        />
      </div>
    </div>
  );
};
