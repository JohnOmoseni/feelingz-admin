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
  type?: string;
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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [hasUploaded, setHasUploaded] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles) return;

    const selectedFilesArray = Array.from(selectedFiles);
    const totalFilesAfterAdd = files?.length + selectedFilesArray.length;

    if (totalFilesAfterAdd < 5) {
      toast.info("You can upload a minimum of 5 images.");
      return;
    }

    //  selectedFilesArray.forEach((file) => {
    //    if (sizeLimit && file.size > sizeLimit * 1024 * 1024) {
    //      toast.warning(`File size must be less than ${sizeLimit}MB.`);
    //      return;
    //    } else {
    //      newFiles.push(URL.createObjectURL(file));
    //      validFiles.push(URL.createObjectURL(file));
    //    }
    //  });

    const validFiles: File[] = [];
    const previewFiles: string[] = [];

    selectedFilesArray.forEach((file) => {
      previewFiles.push(URL.createObjectURL(file));
      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setPreview((prevFiles) => [...prevFiles, ...previewFiles]);
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setIsUploading(true);
      uploadImages(validFiles); // Call upload immediately
    }
  };

  const uploadImages = async (fileList: File[]) => {
    if (fileList?.length === 0) {
      toast.error("No files to upload.");
      return;
    }

    setUploadStatus("Uploading...");
    const imageURLS = [];

    for (const file of fileList) {
      try {
        const res = await uploadChunks(file, (_chunkIndex, chunkProgress, _totalChunks) => {
          setProgress(chunkProgress);
        });
        setUploadStatus("Uploaded");

        console.log("RESPONSE", res);
        res && imageURLS.push(res);
        onFileChange?.(imageURLS);

        toast.success(`File ${file.name} uploaded successfully`);
      } catch (error) {
        setUploadStatus("Error uploading images");
        toast.error(`Error uploading ${file.name}`);
        break; // Stop uploading if an error occurs
      }
    }

    console.log("[IMAGE URLS]", imageURLS);

    setIsUploading(false); // Mark uploading as complete
  };

  const handleRemoveFile = (fileUrl: string) => {
    setPreview((prevFiles) => prevFiles.filter((url) => url !== fileUrl));
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

        <div className="grid gap-4 grid-cols-1 mt-3">
          {files.length > 0 && (
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(4rem,_6rem))] gap-4 ">
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
                </div>
              ))}
            </div>
          )}

          <div
            className={cn(
              "w-full flex-column items-center justify-center gap-2 border border-border  rounded-md overflow-hidden border-dashed bg-background-100 hover:border-secondary-100",
              files?.length === 0 && "max-w-[60%]"
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

        {isUploading && <p>Uploading: {progress}%</p>}
        {uploadStatus && <p>Status: {uploadStatus}</p>}
      </div>
    </div>
  );
}

export default FormFileUpload;
