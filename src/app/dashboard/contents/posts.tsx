import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { useGetAllArticles } from "@/server/actions/contents/useArticles";
import { postsColumn } from "@/components/table/columns/postColumn";
import { useGetAllChannels } from "@/server/actions/contents/useContent";
import TableGlobalSearch from "@/components/table/TableGlobalSearch";
import Filters from "@/components/table/filters";
import CustomButton from "@/components/reuseables/CustomButton";
import useEmptyState from "@/hooks/useEmptyState";
import ServerSideTable from "@/components/table/ServerSideTable";

type PostProps = {
  setOpenModal: Dispatch<
    SetStateAction<false | "create-channel" | "create-post" | "edit-post" | "edit-channel">
  >;
};

const Post = ({ setOpenModal }: PostProps) => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const {
    data: posts,
    isError,
    error,
    isLoading: isFetchingPosts,
  } = useGetAllArticles({ page: currentPage, perPage: perPage, searchValue: globalFilter });

  const { data: channels } = useGetAllChannels();

  const { emptyState } = useEmptyState({
    data: posts?.data,
    isError,
    error,
  });

  const tableData = useMemo(() => posts?.data || [], [posts?.data]);
  const paginationMeta = useMemo(
    () => ({
      last_page: posts?.last_page ?? 1,
      per_page: posts?.per_page ?? 10,
      to: posts?.to ?? 0,
      total: posts?.total ?? 0,
      current_page: posts?.links?.current_page ?? currentPage,
    }),
    [posts]
  );

  useEffect(() => {
    if (tableData.length === 0 && currentPage > 1) {
      setCurrentPage(1);
    }
  }, [tableData, currentPage]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((value: number) => {
    setPerPage(value);
    setCurrentPage(1);
  }, []);

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
          onInputChange={(value: string) => setGlobalFilter(value)}
        />

        <div className="row-flex gap-4">
          <div title="Filter by channel">
            <Filters
              placeholder="Filter by channel"
              columnId="post"
              options={[
                {
                  label: "All",
                  value: "all",
                },
                ...(channels?.map((channel: any) => ({
                  label: channel.name,
                  value: String(channel.id),
                })) || []),
              ]}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              setColumnFilters={setColumnFilters}
            />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <ServerSideTable
          columns={postsColumn}
          tableData={tableData}
          isLoading={isFetchingPosts}
          {...(isError || !tableData.length ? { emptyState } : {})}
          columnFilters={columnFilters}
          paginationMeta={{
            last_page: paginationMeta.last_page,
            current_page: paginationMeta.current_page,
            pageSize: paginationMeta.per_page,
            total: paginationMeta.total,
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange,
          }}
        />
      </div>
    </div>
  );
};

export default Post;
