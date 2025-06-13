import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  isPending?: boolean;
  title?: string;
  trigger: ReactNode;
  onDeleteClick: () => void;
};

const ConfirmDelete = ({ onDeleteClick, isPending, title = "", trigger }: Props) => {
  const [open, setOpen] = useState(false);
  const isActive = useRef(false);

  useEffect(() => {
    if (isActive.current) {
      isPending ? null : setOpen(false);
    }
  }, [isPending]);

  const handleDeleteClick = () => {
    isActive.current = true;
    onDeleteClick();
  };
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger onClick={() => setOpen(true)} className="w-full">
        {trigger}
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-background z-[999] max-sm:w-[85%] max-w-md rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete {title}</AlertDialogTitle>
          <AlertDialogDescription className="">This action is irreversible</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            className="cursor-pointer min-w-[90px] hover:bg-accent hover:border-none hover:text-secondary-foreground"
            onClick={() => setOpen(false)}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 text-white cursor-pointer min-w-[90px]"
            onClick={handleDeleteClick}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDelete;
