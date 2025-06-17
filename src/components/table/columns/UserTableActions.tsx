import CustomButton from "@/components/reuseables/CustomButton";
import { truncateString } from "@/lib";
import { useMutateUser, useNotifyUser } from "@/server/actions/users/useUsers";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import dayjs from "dayjs";

export const UserTableAction = ({ userInfo }: { userInfo: UserResponse }) => {
  const { mutateAsync: mutateUser, isPending } = useMutateUser();

  const [activeAction, setActiveAction] = useState<MutateUserActionType | null>(null);
  const { mutateAsync: notifyUser, isPending: isNotifying } = useNotifyUser();

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
        label: "Faith",
        value: userInfo?.faith ?? "N/A",
      },
      {
        label: "Occupation",
        value: userInfo?.occupation ?? "N/A",
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

  const onNotifyUser = async (userInfo: UserResponse) => {
    const data = {
      user_id: userInfo.id,
      email: userInfo.email,
    };

    try {
      await notifyUser(data);
    } catch (err: any) {}
  };

  const isSuspended = userInfo.status === "suspended";
  const isApproved = userInfo.status === "active";

  return (
    <div className="flex-column gap-2">
      <h3 className="">{fullName}</h3>
      <p className="truncate">{userInfo.email ? truncateString(userInfo.email, 40) : "N/A"}</p>

      <div className="flex-column  gap-3.5 my-3">
        {info.map((item, idx) => (
          <div key={idx} className="row-flex-start gap-3 text-sm">
            <span className="min-w-[5ch]">{item.label}:</span>
            <span className="">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link to={`/users/${userInfo.id}`}>
          <CustomButton title="View" variant="badge" size="badge" />
        </Link>
        <CustomButton
          title={"Notify"}
          variant="badge"
          size="badge"
          className="bg-accent"
          onClick={() => onNotifyUser(userInfo)}
          disabled={isNotifying}
          isLoading={isNotifying}
        />
        <CustomButton
          title={isApproved ? "Un-Approve" : "Approve"}
          variant="badge"
          size="badge"
          className="bg-green-500"
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
