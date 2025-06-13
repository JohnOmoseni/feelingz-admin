import { DonutUserChart } from "@/components/charts/DonutUserChart";
import { DonutPostChart } from "@/components/charts/DonutPostChart";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Modal } from "@/components/ui/components/Modal";
import { UserAvatar } from "@/constants/icons";
import { useGetDashboardOveriew } from "@/server/actions/dashboard/useDashboard";
import Card from "../_sections/Card";
import SectionWrapper from "@/layouts/SectionWrapper";
import SkeletonLoader from "@/components/fallback/SkeletonLoader";
import useEmptyState from "@/hooks/useEmptyState";
import CustomButton from "@/components/reuseables/CustomButton";
import PostForm from "@/components/forms/contents/PostForm";

const activity = [
  {
    label: "John @johnnyomoseni100@gmail.com",
    icon: "",
    desc: "just got activated by Admin Dania",
  },
];

function Dashboard() {
  const { data: overviewData, isLoading, isError, error } = useGetDashboardOveriew();
  const [openModal, setOpenModal] = useState<false | "create-post">(false);

  const userStats = useMemo(
    () => [
      {
        label: "Total Users",
        value: overviewData?.user?.total || "0",
      },
      {
        label: "Active Users",
        value: overviewData?.user?.Active || "0",
      },
      {
        label: "Pending Users",
        value: overviewData?.user?.Pending || "0",
      },
      {
        label: "Approved Users",
        value: overviewData?.user?.Suspended || "0",
      },
    ],
    [overviewData?.user]
  );

  const contentStats = useMemo(
    () => [
      {
        label: "Total Reactions",
        value: overviewData?.["total reactions"] || 0,
      },
      {
        label: "Total Chats",
        value: overviewData?.["total chats"] || 0,
      },
      {
        label: "Total Posts",
        value: overviewData?.["total posts"] || 0,
      },
      {
        label: "Total Bookmarks",
        value: overviewData?.["total bookmarks"] || 0,
      },
    ],
    [overviewData]
  );

  const isValidData = useMemo(
    () => overviewData && Object.keys(overviewData).length > 0,
    [overviewData]
  );

  const {} = useEmptyState({
    data: isValidData ? [overviewData] : [],
    isError,
    error,
    errorTitle: "Error fetching information",
  });

  return (
    <SectionWrapper headerTitle={"Dashboard"}>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <>
          <div className="grid sm:grid-cols-3 gap-4">
            {userStats.map(({ label, value }, idx) => (
              <Card key={idx} label={label} value={value} idx={idx} />
            ))}{" "}
          </div>

          <div className="mt-4 flex-column sm:grid grid-cols-2 gap-6">
            <div className="flex-column gap-6 card">
              <h3>Recent Activity</h3>

              <ul className="flex-column gap-3">
                {activity.map((item, idx) => (
                  <li
                    className="grid grid-cols-[min-content_1fr] gap-3 pb-2.5 pt-1 border-b border-border-100 last:border-0"
                    key={idx}
                  >
                    <UserAvatar className="w-fit h-[30px]" />
                    <div className="flex-column gap-1 w-full overflow-hidden">
                      <p className="text-sm font-semibold line-clamp-2 truncate">{item.label}</p>
                      <p className="text-xs text-grey">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-column gap-3 card ">
              <DonutUserChart data={overviewData?.user} />
            </div>
          </div>

          {/* CONTENT */}
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {contentStats.map(({ label, value }, idx) => (
              <Card key={idx} label={label} value={value} idx={idx} />
            ))}
          </div>

          <div className="mt-4 flex-column sm:grid grid-cols-2 gap-6">
            <div className="flex-column gap-3 card ">
              <DonutPostChart data={overviewData} />
            </div>

            <div className="flex-column gap-6 card">
              <h3>Quick Actions</h3>

              <ul className="flex-column gap-3">
                <Link className="w-full" to="/users">
                  <CustomButton title="View Users" variant="outline" className="w-full" />
                </Link>
                <CustomButton
                  title="Create Post"
                  variant="outline"
                  onClick={() => setOpenModal("create-post")}
                />
                <a
                  href="mailto:support@feelingz.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full"
                >
                  <CustomButton title="Check Inbox" variant="outline" className="w-full" />
                </a>
              </ul>
            </div>
          </div>
        </>
      )}

      <Modal
        openModal={openModal === "create-post"}
        setOpenModal={() => setOpenModal(false)}
        modalStyles="max-w-xl max-h-[550px]"
        title="Create New Post"
      >
        <div className="px-0.5">
          <PostForm closeModal={() => setOpenModal(false)} />
        </div>
      </Modal>
    </SectionWrapper>
  );
}

export default Dashboard;
