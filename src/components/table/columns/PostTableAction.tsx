import { useState } from "react";
import { EditIcon, TrashIcon } from "@/constants/icons";
import { BtnLoader } from "@/components/fallback/FallbackLoader";
import { Modal } from "@/components/ui/components/Modal";
import { useDeleteArticle } from "@/server/actions/contents/useArticles";
import { PopoverComponent } from "@/components/ui/components/PopoverComponent";
import PostForm from "@/components/forms/contents/PostForm";
import usePopoverActions from "@/hooks/usePopoverActions";
import ConfirmDelete from "@/components/reuseables/ConfirmDelete";

const popoverList = [
  { icon: EditIcon, label: "Edit", showLoader: false },
  { icon: TrashIcon, label: "Delete", showLoader: true },
];

export const PostTableAction = ({ article }: { article: ArticleResponse }) => {
  const { mutateAsync: deleteArticle, isPending: isDeletingArticle } = useDeleteArticle();
  const [openModal, setOpenModal] = useState<false | "delete-post" | "edit-post">(false);

  const onClickHandlers: { [index: number]: () => Promise<void> | void } = {
    0: () => setOpenModal("edit-post"),
    1: async () => {
      try {
        await deleteArticle({ article_id: String(article?.id) });
      } catch (err: any) {}
    },
  };

  const { handleItemClick, loadingStates } = usePopoverActions({
    list: popoverList,
    onClickHandlers,
  });

  return (
    <>
      <PopoverComponent
        list={popoverList}
        containerStyles="!w-52"
        renderItem={(item, index) => (
          <>
            {item?.label.includes("Delete") ? (
              <div key={index}>
                <ConfirmDelete
                  onDeleteClick={() => handleItemClick(index, item?.showLoader)}
                  isPending={isDeletingArticle}
                  trigger={
                    <span className="popover-item">
                      {item?.icon && <item.icon className="size-5 font-semibold" />}
                      <span className="text-red-600 mt-px">{item?.label}</span>
                    </span>
                  }
                />
              </div>
            ) : (
              <div
                key={index}
                className="popover-item"
                onClick={() => handleItemClick(index, item?.showLoader)}
              >
                {item?.icon && <item.icon className="size-5" />}

                <span className="mt-px">{item?.label}</span>
                <BtnLoader isLoading={loadingStates[index]} />
              </div>
            )}
          </>
        )}
      />

      <Modal
        openModal={openModal === "edit-post"}
        setOpenModal={() => setOpenModal(false)}
        title={`${article?.title ? article.title : "Edit Post"}`}
      >
        <div className="px-0.5">
          <PostForm article={article} type="edit" closeModal={() => setOpenModal(false)} />
        </div>
      </Modal>
    </>
  );
};

export default PostTableAction;
