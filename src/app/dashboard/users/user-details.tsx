import FallbackLoader from "@/components/fallback/FallbackLoader";
import CustomButton from "@/components/reuseables/CustomButton";
import useEmptyState from "@/hooks/useEmptyState";
import dayjs from "dayjs";
import SectionWrapper from "@/layouts/SectionWrapper";

import {
  useDeleteUser,
  useGetUserDetails,
  useGetUserMedia,
  useMutateUser,
  useNotifyUser,
} from "@/server/actions/users/useUsers";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { fallback_profile } from "@/constants/icons";
import { StatusBadge } from "@/components/reuseables/StatusBadge";

const formatKey = (key: string) => {
  const words = key.split("_");

  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();

  return words.join(" ");
};

function UserDetails() {
  const { user_id } = useParams();
  const { data: user, isError, error, isLoading: isFetchingUser } = useGetUserDetails(user_id!);
  const {
    data: userMedia,
    isError: isFetchingUserMediaError,
    isLoading: isFetchingUserMedia,
  } = useGetUserMedia(user_id!);

  const [activeAction, setActiveAction] = useState<MutateUserActionType | null>(null);
  const { mutateAsync: mutateUser, isPending } = useMutateUser();
  const { mutateAsync: notifyUser, isPending: isNotifying } = useNotifyUser();
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUser();

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
    } catch (err: any) {}
  };

  const onNotifyUser = async () => {
    const data = {
      user_id: user.id,
      email: user.email,
    };

    try {
      await notifyUser(data);
    } catch (err: any) {}
  };

  const onDeleteUser = async () => {
    try {
      await deleteUser(user.id);
    } catch (err: any) {}
  };

  const userInfo = useMemo(() => {
    const fullName = `${user?.first_name || "Unknown"} ${user?.last_name || ""}`.trim();
    const location = [user?.city, user?.state, user?.country].filter(Boolean).join(", ") || "N/A";
    const dob = user?.dob ? dayjs().diff(dayjs(user.dob), "year") : "N/A";

    return {
      fullName,
      dob,
      location,
      first_name: user?.first_name || "Unknown",
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
    const location = [user?.city, user?.state, user?.country].filter(Boolean).join(", ") || "N/A";
    const dob = user?.dob ? dayjs().diff(dayjs(user.dob), "year") : "N/A";

    return [
      {
        profile_details: {
          first_name: user?.first_name || "Unknown",
          date_of_birth: dob,
          location,
          zodiac: user?.zodiac || "N/A",
          occupation: user?.occupation || "N/A",
          faith: user?.faith || "N/A",
        },
      },
      {
        preferences: {
          size: user?.size || "N/A",
          zodiac: user?.zodiac || "N/A",
          age_range: user?.age_range || "N/A",
          location,
          faith: user?.faith || "N/A",
        },
      },
    ];
  }, [user]);

  const isSuspended = userInfo.status === "suspended";
  const isApproved = userInfo.status === "active";

  return (
    <SectionWrapper
      headerTitle="User Details"
      customHeaderContent={<StatusBadge status={userInfo.status} />}
    >
      {isFetchingUser ? (
        <div className="loader-body">
          <FallbackLoader />
        </div>
      ) : (
        <div className="flex-column gap-8 my-6">
          <div className="row-flex gap-6 w-max mx-auto">
            <div className="flex-column items-center justify-between gap-3 w-full">
              <label className="text-center whitespace-nowrap">Profile Picture</label>
              <img
                src={userInfo.profile_pic}
                alt=""
                className="size-[100px] min-[500px]:size-[160px] object-cover"
              />
            </div>

            <div className="flex-column items-center justify-between gap-3 w-full">
              <label className="text-center">Selfie</label>
              <img
                src={userInfo.selfie}
                alt=""
                className="size-[100px] min-[500px]:size-[160px]  object-cover"
              />
            </div>
          </div>

          <div className="flex-column items-center gap-7">
            <div>
              <h2 className="text-center">{userInfo.first_name}</h2>
              <p className="text-center text-xs text-grey mt-2 font-inter max-w-[60ch] mx-auto">
                {userInfo.bio}
              </p>
            </div>

            <div className="row-flex !flex-wrap gap-3">
              <CustomButton
                title={isApproved ? "Un-Approve" : "Approve"}
                variant="badge"
                size="badge"
                className="bg-green-600"
                onClick={() => onMutateUser(user, isApproved ? "Un-Approve" : "Approve")}
                disabled={isPending && activeAction === (isApproved ? "Un-Approve" : "Approve")}
                isLoading={isPending && activeAction === (isApproved ? "Un-Approve" : "Approve")}
              />
              <CustomButton
                title={isSuspended ? "Un-Suspend" : "Suspend"}
                size="badge"
                variant="badge"
                className="bg-secondary"
                onClick={() => onMutateUser(user, isSuspended ? "Un-Suspend" : "Suspend")}
                disabled={isPending && activeAction === (isSuspended ? "Un-Suspend" : "Suspend")}
                isLoading={isPending && activeAction === (isSuspended ? "Un-Suspend" : "Suspend")}
              />
              <CustomButton
                title={"Notify"}
                variant="badge"
                size="badge"
                className="bg-accent"
                onClick={() => onNotifyUser()}
                disabled={isNotifying}
                isLoading={isNotifying}
              />
              <CustomButton
                title={"Delete User"}
                variant="badge"
                size="badge"
                className="bg-red-600"
                onClick={() => onDeleteUser()}
                disabled={isDeleting}
                isLoading={isDeleting}
              />
            </div>

            <div className="row-flex-btwn gap-4">
              <span className="text-sm font-inter font-semibold">{userInfo.created_at}</span>
              <span className="">{userInfo.last_seen}</span>
            </div>
          </div>

          <div className="pt-4 flex-column gap-6 border-t border-border-100 flex-column">
            <h3 className="text-lg">Profile Details</h3>

            <ul className="max-[500px]:flex-column grid grid-cols-2 grid-rows-3 gap-y-4 gap-x-12">
              {Object.entries(details[0]?.profile_details || []).map(([key, value], idx) => {
                return (
                  <li key={idx} className="w-full row-flex-start gap-2 text-base">
                    <p className="font-semibold capitalize max-[500px]:min-w-[15ch] min-w-[12ch]">
                      {formatKey(key || "")}:
                    </p>
                    <p className="text-grey min-w-[10ch]">{value}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="pt-4 flex-column gap-6 border-t border-border-100 flex-column">
            <h3 className="text-lg">Preferences</h3>

            <ul className="max-[500px]:flex-column grid grid-cols-2 grid-rows-3 gap-y-4 gap-x-12">
              {Object.entries(details[1]?.preferences || []).map(([key, value], idx) => {
                return (
                  <li key={idx} className="w-full row-flex-start gap-2 text-base">
                    <p className="font-semibold capitalize max-[500px]:min-w-[15ch] min-w-[12ch]">
                      {formatKey(key || "")}:
                    </p>
                    <p className="text-grey min-w-[10ch]">{value}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="pt-4 flex-column gap-6 border-t border-border-100 flex-column">
            <h3 className="text-lg">Photos</h3>

            {isFetchingUserMedia ? (
              <div className="loader-container">
                <FallbackLoader />
              </div>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fit,_minmax(100px,1fr))] lg:grid-cols-[repeat(5,_minmax(90px,_max-content))] gap-4 pr-3">
                {/* {Array.from({ length: 10 }).map((img: any, idx: number) => { */}
                {Array.isArray(userMedia) && userMedia?.length > 0 ? (
                  userInfo.images.map((img: any, idx: number) => {
                    return (
                      <img
                        key={idx}
                        src={img?.url || ""}
                        alt=""
                        className="overflow-hidden size-[90px] object-cover w-24"
                      />
                    );
                  })
                ) : (
                  <div className="loader-container !h-[150px]">
                    <p className="">
                      {isFetchingUserMediaError ? "Error fetching User Media" : "No user media"}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}

export default UserDetails;
