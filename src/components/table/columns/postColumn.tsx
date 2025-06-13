import { fallback_post_img } from "@/constants/icons";
import { ColumnDef } from "@tanstack/react-table";
import { PostTableAction } from "./PostTableAction";
import dayjs from "dayjs";

export const postsColumn: ColumnDef<ArticleResponse>[] = [
  {
    id: "post_pic",
    cell: ({ row }) => {
      const userInfo = row.original;
      const post_pic = userInfo?.image;
      return (
        <div className="w-full">
          <img
            src={post_pic || fallback_post_img}
            alt=""
            className="min-w-[100px] w-[120px] h-[60px] object-contain"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "post",
    cell: ({ row }) => {
      const post = row.original;

      return (
        <div className="w-full flex-column gap-1">
          <h3 className="min-w-[20ch]">{post.title}</h3>
          <p className="text-grey text-xs">{post.caption}</p>
        </div>
      );
    },
    enableColumnFilter: true,
    filterFn: (row, _columnId, filterValue = "") => {
      const post = row.original as ArticleResponse;

      if (filterValue.toLowerCase() === "all") return true;

      // return post?.channel?.name.toLowerCase() === filterValue;
      return String(post?.channel?.id || "") === String(filterValue);
    },
  },
  {
    id: "created_at",
    cell: ({ row }) => {
      const post = row.original;
      const created_at = post?.created_at ? dayjs(post.created_at).format("ddd, MMMM YYYY") : "";

      return (
        <div className="flex-column items-end gap-1">
          <p className="font-semibold text-xs text-end">{post.reactions_count}</p>
          <span className="font-semibold text-xs text-grey text-end min-w-[10ch]">
            {created_at}
          </span>
        </div>
      );
    },
  },
  {
    id: "Actions",
    cell: ({ row }) => {
      const article = row.original;

      return <PostTableAction article={article} />;
    },
  },
];
