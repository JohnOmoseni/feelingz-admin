import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUploadIcon } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { MdCancel } from "react-icons/md";
import { uploadChunks } from "@/hooks/usePost";

type Props = {
  title?: string;
  value?: string[];
  name?: string;
  accept?: string;
  required?: boolean;
  hideSubtitle?: boolean;
  onFileChange?: (files: string[]) => void;
};

function FormFileUpload({
  title,
  name,
  accept = "image/png, image/jpeg, image/jpg",
  required,
  hideSubtitle,
  onFileChange,
}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  const [uploadStatus, setUploadStatus] = useState<Record<number, string>>({});
  const [hasImageUpload, setHasImageUpload] = useState(false);

  const MIN_SIZE = 5 * 1024 * 1024; // 5 MB

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles) return;

    const selectedFilesArray = Array.from(selectedFiles);
    const validFiles: File[] = [];
    const previewFiles: string[] = [];

    selectedFilesArray.forEach((file) => {
      previewFiles.push(URL.createObjectURL(file));
      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setPreview((prevFiles) => [...prevFiles, ...previewFiles]);
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      uploadImages(validFiles); // Initiate upload
    }
  };
  const uploadImages = async (fileList: File[]) => {
    const imageURLS: string[] = [];
    const progressMap: Record<number, number> = {};
    const statusMap: Record<number, string> = {};

    fileList.forEach((_, i) => {
      progressMap[i] = 0;
      statusMap[i] = "Uploading...";
    });

    setUploadProgress({ ...progressMap });
    setUploadStatus({ ...statusMap });

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      try {
        const res = await uploadChunks(file, (_chunkIndex, chunkProgress) => {
          progressMap[i] = chunkProgress;
          setUploadProgress({ ...progressMap });
        });

        statusMap[i] = "Uploaded";
        res && imageURLS.push(res);

        // Check if the upload count meets the threshold (5 successful uploads)
        if (imageURLS.length >= 5) {
          setHasImageUpload(true);
        }

        toast.success(`File ${file.name} uploaded successfully.`);
      } catch (error) {
        statusMap[i] = "Error";
        setUploadStatus({ ...statusMap });
        toast.error(`Error uploading ${file.name}.`);
      }
    }

    console.log("[IMAGE URLS", imageURLS);

    onFileChange?.(imageURLS);
  };

  const handleRemoveFile = (fileUrl: string) => {
    const index = preview.findIndex((url) => url === fileUrl);
    setPreview((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full row-flex-start gap-4">
      <div className="flex-column gap-2 w-full">
        <Label
          className={cn(
            "text-base opacity-70 w-max relative font-semibold after:absolute  after:-right-2 after:text-red-500 after:-top-1 after:text-lg",
            required && "after:content-['*']"
          )}
        >
          {title}
        </Label>

        <div className="grid gap-4 grid-cols-1 mt-">
          {files.length > 0 && (
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(4rem,_6rem))] gap-x-4 gap-y-8">
              {preview.map((fileUrl, index) => (
                <div key={index} className="relative w-24 h-28">
                  <img
                    src={fileUrl}
                    alt={`Uploaded preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(fileUrl)}
                    className="absolute top-1 right-1 bg-background rounded-full"
                  >
                    <MdCancel className="text-secondary size-5" />
                  </button>
                  <div className="mt-1">
                    <p className="text-xs">{uploadStatus[index] || "Pending..."}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div
            className={cn(
              "w-full flex-column items-center justify-center gap-2 border border-border  rounded-md overflow-hidden border-dashed bg-background-100 hover:border-secondary-100",
              files?.length === 0 ? "max-w-[60%]" : "mt-5"
            )}
          >
            <Input
              id={name}
              type="file"
              accept={accept}
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <Label htmlFor={name} className="w-full">
              <div className="flex-column py-4 items-center">
                <div className="row-flex-start gap-2">
                  <FileUploadIcon className="size-16 stroke-secondary-text" />
                </div>

                {!hideSubtitle && (
                  <p className="text-sm mt-3 tracking-wide opacity-80 capitalize">
                    JPEG, PNG, JPG, etc.
                  </p>
                )}

                <p className="text-xs text-secondary font-medium mt-1">click to browse.</p>
              </div>
            </Label>
          </div>
        </div>

        {hasImageUpload && (
          <p className="mt-3 text-green-500">At least 5 images uploaded successfully.</p>
        )}
      </div>
    </div>
  );
}

export default FormFileUpload;
