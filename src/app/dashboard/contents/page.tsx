import { DataTable } from "@/components/table/DataTable";
import { Dispatch, Fragment, SetStateAction, useEffect, useMemo, useState } from "react";
import { Modal } from "@/components/ui/components/Modal";
import { useGetAllChannels } from "@/server/actions/contents/useContent";
import { LoadMoreIcon } from "@/constants/icons";
import { debounce } from "lodash";
import { useInView } from "react-intersection-observer";

import TableGlobalSearch from "@/components/table/TableGlobalSearch";
import Filters from "@/components/table/filters";
import SectionWrapper from "@/layouts/SectionWrapper";
import SkeletonLoader from "@/components/fallback/SkeletonLoader";
import CustomButton from "@/components/reuseables/CustomButton";
import ChannelForm from "@/components/forms/contents/ChannelForm";
import ChannelCard from "./channel-card";
import PostForm from "@/components/forms/contents/PostForm";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import dayjs from "dayjs";

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Pending Approval", value: "pending" },
  { label: "Rejected", value: "rejected" },
];

function Contents() {
  const [globalFilter, setGlobalFilter] = useState("");
  const [openModal, setOpenModal] = useState<
    false | "create-channel" | "create-post" | "edit-post"
  >(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: "200px",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isFetchingChannels,
    isError: isFetchingChannelsError,
  } = useGetAllChannels({ searchValue: "" });

  const flattenedChannels = data?.pages?.flatMap((page: any) => page.data) || [];

  const debouncedFetchNextPage = useMemo(() => debounce(fetchNextPage, 300), [fetchNextPage]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      debouncedFetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, debouncedFetchNextPage]);

  const isLoading = false;

  console.log("DATA", data, flattenedChannels);
  return (
    <>
      <SectionWrapper headerTitle={"Contents"}>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            <div className="flex-column gap-3">
              <div className="row-flex-btwn gap-4">
                <h3 className="text-lg">Channels</h3>

                <CustomButton
                  title="Create New Channel"
                  onClick={() => setOpenModal("create-channel")}
                />
              </div>

              <TableGlobalSearch
                placeholder="Search Channels"
                globalValue={globalFilter}
                containerStyles="md:w-[480px]"
                onChange={(value: string) => setGlobalFilter(value)}
              />
            </div>

            {isFetchingChannels ? (
              <div className="loader-container !h-[120px]">
                <FallbackLoader />
              </div>
            ) : isFetchingChannelsError || flattenedChannels.length === 0 ? (
              <></>
            ) : (
              <div className="grid grid-flow-col [grid-auto-columns:_minmax(250px,_1fr)] items-center overflow-x-auto remove-scrollbar gap-4 sm:gap-5 [mask-image:linear-gradient(to_right,transparent,black_5%,black_96%,transparent)] px-3 -mx-2">
                {data?.pages?.map((page: any, pageIndex: number) => (
                  <Fragment key={pageIndex}>
                    {page?.data?.map((channel: any) => {
                      const formattedChannel = {
                        ...channel,
                        created_at: channel?.created_at
                          ? dayjs(channel.created_at).format("[Created] ddd, MMMM YYYY")
                          : "",
                      };

                      return <ChannelCard key={channel.id} channel={formattedChannel} />;
                    })}
                  </Fragment>
                ))}

                {isFetchingNextPage && (
                  <div ref={ref} className="px-3 row-flex">
                    <LoadMoreIcon className="size-6 animate-spin" />
                  </div>
                )}
              </div>
            )}

            <Post setOpenModal={setOpenModal} />
          </>
        )}
      </SectionWrapper>

      <Modal
        openModal={openModal === "create-channel"}
        setOpenModal={() => setOpenModal(false)}
        title="Create New Channel"
      >
        <div className="px-0.5">
          <ChannelForm closeModal={() => setOpenModal(false)} />
        </div>
      </Modal>

      <Modal
        openModal={openModal === "create-post"}
        setOpenModal={() => setOpenModal(false)}
        title="Create New Post"
      >
        <div className="px-0.5">
          <PostForm closeModal={() => setOpenModal(false)} />
        </div>
      </Modal>
    </>
  );
}

export default Contents;

type PostProps = {
  setOpenModal: Dispatch<SetStateAction<false | "create-channel" | "create-post" | "edit-post">>;
};

const Post = ({ setOpenModal }: PostProps) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  const tableData: any = [];

  return (
    <div className="flex-column mt-4 gap-3">
      <div className="row-flex-btwn gap-4">
        <h3 className="text-lg">Posts</h3>

        <CustomButton title="Post" onClick={() => setOpenModal("create-post")} />
      </div>

      <div className="row-flex-btwn gap-3">
        <TableGlobalSearch
          globalValue={globalFilter || ""}
          placeholder="Search Posts"
          onChange={(value: string) => setGlobalFilter(value)}
        />

        <div className="row-flex gap-4">
          <Filters
            placeholder="Filter by date"
            columnId="status"
            showAsDropdown={true}
            options={statusOptions}
            isArrowDown={true}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            setColumnFilters={setColumnFilters}
          />

          <Filters
            placeholder="Filter by channel"
            columnId="status"
            showAsDropdown={true}
            options={statusOptions}
            isArrowDown={true}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            setColumnFilters={setColumnFilters}
          />
        </div>
      </div>

      <div className="mt-3">
        <DataTable
          columns={[]}
          tableData={tableData || []}
          globalFilter={globalFilter}
          columnFilters={columnFilters}
        />
      </div>
    </div>
  );
};
