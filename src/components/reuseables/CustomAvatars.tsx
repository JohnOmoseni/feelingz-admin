import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  seed?: string;
  className?: string;
  variant: "botttsNeutral" | "initials";
};

function CustomAvatars({ seed = "Admin", className, variant }: Props) {
  let avatar;

  if (variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, {
      seed,
    });
  } else if (variant === "initials") {
    avatar = createAvatar(initials, {
      seed,
      fontWeight: 600,
      fontSize: 42,
    });
  }
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar?.toDataUri()} alt="avatar" />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}

export default CustomAvatars;
