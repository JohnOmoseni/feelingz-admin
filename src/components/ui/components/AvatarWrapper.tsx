import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type AvatarProps = {
	src?: string;
	fallback?: string;
	containerClassName?: string;
};

function AvatarWrapper({ src, fallback, containerClassName }: AvatarProps) {
	return (
		<Avatar
			className={cn(
				"icon bg-muted shadow transition-all hover:scale-105 overflow-hidden",
				containerClassName,
				!fallback && "blend-image"
			)}
		>
			<AvatarImage src={src || ""} />
			<AvatarFallback>{fallback ?? "QA"}</AvatarFallback>
		</Avatar>
	);
}

export default AvatarWrapper;
