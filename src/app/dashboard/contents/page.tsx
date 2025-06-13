import { Fragment, useEffect, useMemo, useState } from "react";
import { Modal } from "@/components/ui/components/Modal";
import { useGetChannels } from "@/server/actions/contents/useContent";
import { LoadMoreIcon } from "@/constants/icons";
import { debounce } from "lodash";
import { useInView } from "react-intersection-observer";

import TableGlobalSearch from "@/components/table/TableGlobalSearch";
import SectionWrapper from "@/layouts/SectionWrapper";
import CustomButton from "@/components/reuseables/CustomButton";
import ChannelForm from "@/components/forms/contents/ChannelForm";
import ChannelCard from "./channel-card";
import PostForm from "@/components/forms/contents/PostForm";
import FallbackLoader from "@/components/fallback/FallbackLoader";
import dayjs from "dayjs";
import Post from "./posts";

function Contents() {
  const [searchValue, setSearchValue] = useState("");
  const [openModal, setOpenModal] = useState<
    false | "create-channel" | "create-post" | "edit-post" | "edit-channel"
  >(false);
  const [activeChannel, setActiveChannel] = useState<ChannelResponse | null>(null);

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
  } = useGetChannels({ searchValue });

  const flattenedChannels = data?.pages?.flatMap((page: any) => page.data) || [];

  const debouncedFetchNextPage = useMemo(() => debounce(fetchNextPage, 300), [fetchNextPage]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      debouncedFetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, debouncedFetchNextPage]);

  return (
    <>
      <SectionWrapper headerTitle={"Contents"}>
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
            globalValue={searchValue}
            containerStyles="md:w-[480px]"
            onInputChange={(value: string) => setSearchValue(value)}
          />
        </div>

        {isFetchingChannels ? (
          <div className="loader-container !h-[120px]">
            <FallbackLoader />
          </div>
        ) : isFetchingChannelsError || flattenedChannels.length === 0 ? (
          <div className="loader-container !h-[100px]">
            {isFetchingChannelsError ? "Error fetching channels" : "No channels found"}
          </div>
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

                  return (
                    <ChannelCard
                      key={channel.id}
                      channel={formattedChannel}
                      setActiveChannel={setActiveChannel}
                      setOpenModal={setOpenModal}
                    />
                  );
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
        openModal={openModal === "edit-channel"}
        setOpenModal={() => setOpenModal(false)}
        title="Edit Channel"
      >
        <div className="px-0.5">
          <ChannelForm
            channel={activeChannel!}
            type="edit"
            closeModal={() => setOpenModal(false)}
          />
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
