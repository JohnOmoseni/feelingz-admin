import FallbackLoader from "@/components/fallback/FallbackLoader";
import CustomButton from "@/components/reuseables/CustomButton";
import useEmptyState from "@/hooks/useEmptyState";
import dayjs from "dayjs";
import SectionWrapper from "@/layouts/SectionWrapper";

import { useGetUserDetails, useMutateUser } from "@/server/actions/users/useUsers";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { fallback_profile } from "@/constants/icons";

function getStatusClass(label: string, value: string) {
  if (!label || !value) return "text-foreground-100";

  if (label.includes("Status")) {
    if (value.includes("Approved")) return "text-green-600 font-semibold";
    if (value.includes("Rejected")) return "text-red-600 font-semibold";
  }
  return "text-foreground-100";
}

function UserDetails() {
  const { user_id } = useParams();

  const { data: user, isError, error, isLoading: isFetchingUser } = useGetUserDetails(user_id!);

  const [activeAction, setActiveAction] = useState<MutateUserActionType | null>(null);
  const { mutateAsync: mutateUser, isPending } = useMutateUser();

  const isValidData = useMemo(() => user && Object.keys(user).length > 0, [user]);
  const {} = useEmptyState({
    data: isValidData ? [user] : [],
    isError,
    error,
  });

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

  const userInfo = useMemo(() => {
    const fullName = `${user?.first_name || "Unknown"} ${user?.last_name || ""}`.trim();
    const location = [user?.city, user?.state, user?.country].filter(Boolean).join(", ") || "N/A";
    const dob = user?.dob ? dayjs().diff(dayjs(user.dob), "year") : "N/A";

    return {
      fullName,
      dob,
      location,
      first_name: user?.first_name || "Jane",
      zodiac: user?.zodiac || "",
      occupation: user?.occupation || "",
      height: user?.height || "",
      size: user?.size || "",
      education: user?.faith || "",
      faith: user?.faith || "",
      bio: user?.bio || "",
      profile_pic: user?.profile_pic || fallback_profile,
      selfie: user?.selfie || fallback_profile,
      images: [],
      created_at: user?.created_at ? dayjs(user.created_at).format("[Created] ddd, MMMM YYYY") : "",
      status: user?.status,
      last_seen: user?.last_seen
        ? dayjs(user.last_seen).format("[Last Seen:] ddd, MMMM YYYY, hh:mm")
        : "",
    };
  }, [user]);

  const details = useMemo(() => {
    const fullName = `${user?.first_name || "Unknown"} ${user?.last_name || ""}`.trim();
    const location = [user?.city, user?.state, user?.country].filter(Boolean).join(", ") || "N/A";
    const dob = user?.dob ? dayjs().diff(dayjs(user.dob), "year") : "N/A";

    return [
      {
        profile_details: {
          fullName,
          dob,
          location,
          first_name: user?.first_name || "",
          zodiac: user?.zodiac || "",
          occupation: user?.occupation || "",
          height: user?.height || "",
          size: user?.size || "",
          education: user?.faith || "",
          faith: user?.faith || "",
          bio: user?.bio || "",
        },
      },
      {
        preferences: {
          age_range: user?.age_range || "",
          zodiac: user?.zodiac || "",
          height: user?.height || "",
          location: user?.location || "",
          size: user?.size || "",
          faith: user?.faith || "",
        },
      },
    ];
  }, [user]);

  const isSuspended = userInfo.status === "suspended";
  const isApproved = userInfo.status === "active";

  return (
    <SectionWrapper headerTitle="User Details">
      {false ? (
        <FallbackLoader />
      ) : (
        <div className="flex-column gap-8 mt-6 items-center">
          <div className="row-flex gap-6">
            <div className="flex-column items-center justify-between gap-3 w-full">
              <label className="text-center">Profile Picture</label>
              <img
                src={userInfo.profile_pic}
                alt=""
                className="rounded-md min-w-[160px] size-[160px] object-cover"
              />
            </div>

            <div className="flex-column items-center justify-between gap-3 w-full">
              <label className="text-center">Selfie</label>
              <img
                src={userInfo.selfie}
                alt=""
                className="rounded-md min-w-[160px] size-[160px] object-cover"
              />
            </div>
          </div>

          <div className="flex-column items-center gap-6">
            <h2 className="text-center">{userInfo.first_name}</h2>

            <div className="row-flex-start gap-3">
              <CustomButton
                title={isApproved ? "Un-Approve" : "Approve"}
                variant="badge"
                size="badge"
                className="bg-secondary"
                onClick={() => onMutateUser(user, isApproved ? "Un-Approve" : "Approve")}
                disabled={isPending && activeAction === (isApproved ? "Un-Approve" : "Approve")}
                isLoading={isPending && activeAction === (isApproved ? "Un-Approve" : "Approve")}
              />
              <CustomButton
                title={isApproved ? "Un-Approve" : "Approve"}
                variant="badge"
                size="badge"
                className="bg-green-500"
                onClick={() => onMutateUser(user, isApproved ? "Un-Approve" : "Approve")}
                disabled={isPending && activeAction === (isApproved ? "Un-Approve" : "Approve")}
                isLoading={isPending && activeAction === (isApproved ? "Un-Approve" : "Approve")}
              />
              <CustomButton
                title={isSuspended ? "Un-Suspend" : "Suspend"}
                size="badge"
                variant="badge"
                className="bg-red-500"
                onClick={() => onMutateUser(user, isSuspended ? "Un-Suspend" : "Suspend")}
                disabled={isPending && activeAction === (isSuspended ? "Un-Suspend" : "Suspend")}
                isLoading={isPending && activeAction === (isSuspended ? "Un-Suspend" : "Suspend")}
              />
            </div>

            <div className="row-flex-btwn gap-4">
              <span>{userInfo.created_at}</span>
              <span>{userInfo.last_seen}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-border-100 flex-column">
            <h3>Profile Details</h3>

            <ul className="grid grid-cols-2 gap-5 sm:gap-x-12">
              {details?.map((item, idx) => (
                <li key={idx} className="w-full flex-column gap-0.5">
                  <p className="font-semibold"></p>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-border-100 flex-column">
            <h3>Photos</h3>

            <div className="grid grid-cols-[repeat(auto-fit,_minmax(90px,_1fr))] gap-4">
              {user?.images.length > 0 &&
                userInfo.images.map((src: string, idx: number) => {
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
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}

export default UserDetails;
