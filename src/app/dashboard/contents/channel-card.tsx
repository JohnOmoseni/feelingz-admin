import { UserAvatar } from "@/constants/icons";

function ChannelCard({ channel }: { channel: any }) {
  const { name, created_at, no_of_posts = 0, image } = channel || {};
  return (
    <div className="rounded-lg min-w-min bg-background shadow-sm border-b border-border-100 py-3.5 px-4 gap-3 grid grid-cols-[max-content,_1fr] min-h-[100px]">
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
          {no_of_posts} {`${no_of_posts > 1 ? "posts" : "post"}`}
        </p>
        <p className="text-xs text-grey">{created_at}</p>
      </div>
    </div>
  );
}

export default ChannelCard;
