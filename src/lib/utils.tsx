import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";
import { toast } from "sonner";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ToastType = "success" | "info" | "error";

const getIcon = (type: ToastType) => {
  switch (type) {
    case "success":
      return CheckCircle;
    case "info":
      return Info;
    case "error":
      return XCircle;
    default:
      return AlertTriangle;
  }
};

const getColor = (type: ToastType) => {
  switch (type) {
    case "success":
      return "text-green-600";
    case "info":
      return "text-blue-600";
    case "error":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

export function showToast(type: ToastType, message: string, desc?: string) {
  const Icon = getIcon(type);
  const color = getColor(type);

  toast[type](
    <div className="grid grid-cols-[max-content_1fr] items-center gap-2">
      <Icon className={`size-5 lg:size-6 self-start ${color}`} />
      <div className="flex-column">
        <h3 className="font-semibold leading-5 capitalize text-base">{message}</h3>
        {desc && <p className="text-sm">{desc}</p>}
      </div>
    </div>
  );
}
