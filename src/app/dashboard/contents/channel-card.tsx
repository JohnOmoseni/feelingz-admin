import ConfirmDelete from "@/components/reuseables/ConfirmDelete";
import { EditIcon, TrashIcon, UserAvatar } from "@/constants/icons";
import { useDeleteChannel } from "@/server/actions/contents/useContent";

function ChannelCard({
  channel,
  setActiveChannel,
  setOpenModal,
}: {
  channel: any;
  setActiveChannel: any;
  setOpenModal: any;
}) {
  const { name, created_at, articles_count = 0, image } = channel || {};
  const { mutateAsync: deleteChannel, isPending: isDeletingChannel } = useDeleteChannel();

  const onDeleteChannel = async () => {
    try {
      await deleteChannel({ channel_id: String(channel?.id) });
    } catch (err: any) {}
  };

  return (
    <div className="rounded-lg min-w-min bg-background shadow-sm border-b border-border-100 py-3.5 px-4 gap-3 grid grid-cols-[max-content,_1fr,_max-content] min-h-[100px]">
      {image ? (
        <img
          src={image}
          alt={""}
          className="size-[32px] border border-border-100 object-cover rounded-full"
        />
      ) : (
        <UserAvatar className="w-fit h-[30px]" />
      )}
      <div className="flex-column gap-1 justify-between ">
        <h3 className="font-bold">{name}</h3>
        <p className="font-medium text-sm">
          {articles_count} {`${articles_count > 1 ? "posts" : "post"}`}
        </p>
        <p className="text-xs text-grey">{created_at}</p>
      </div>

      <div className="flex-column gap-y-1.5">
        <EditIcon
          className="size-4 cursor-pointer"
          onClick={() => {
            setActiveChannel(channel);
            setOpenModal("edit-channel");
          }}
        />

        <ConfirmDelete
          onDeleteClick={onDeleteChannel}
          isPending={isDeletingChannel}
          title="this channel"
          trigger={<TrashIcon className="size-4 text-red-600 stroke-2 cursor-pointer" />}
        />
      </div>
    </div>
  );
}

export default ChannelCard;
