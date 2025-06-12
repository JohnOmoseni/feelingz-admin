import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUploadIcon, Remove } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  label?: string;
  images?: any;
  name?: string;
  accept?: string;
  required?: boolean;
  hideSubtitle?: boolean;
  setHasImageUploaded?: any;
  onFileChange?: (files: string[]) => void;
};

function FormFileUpload({
  label,
  images,
  name,
  accept = "image/png, image/jpeg, image/jpg",
  required,
  hideSubtitle,
  onFileChange,
  setHasImageUploaded,
}: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>(images);
  const [_uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  const [uploadStatus, setUploadStatus] = useState<Record<number, string>>({});

  useEffect(() => {
    if (images && images?.length > 0) {
      setPreview(images);
      onFileChange?.(images);
      images?.length >= 2 && setHasImageUploaded(true); // Set flag to true if images are provided
    }
  }, [images]);

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
    }
  };

  const handleRemoveFile = (fileUrl: string) => {
    const index = preview.findIndex((url) => url === fileUrl);
    setPreview((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-column gap-2.5 w-full">
      <Label
        className={cn(
          "opacity-70 w-max relative font-semibold after:absolute after:-right-2 after:text-red-500 after:-top-1 after:text-lg",
          required && "after:content-['*']"
        )}
      >
        {label}
      </Label>

      <div className="grid gap-4 grid-cols-1">
        {preview?.length > 0 && (
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
                  <Remove className="text-secondary size-5" />
                </button>

                {files?.length > 0 && (
                  <div className="my-1">
                    <p className="text-xs">{uploadStatus[index] || "Pending..."}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div
          className={cn(
            "w-full flex-column items-center justify-center gap-2 border border-border rounded-md overflow-hidden border-dashed bg-background-100 hover:border-neutral-400"
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
            <div className="flex-column p-4 !items-center">
              <div className="row-flex-start gap-2">
                <FileUploadIcon className="size-16 stroke-secondary-text" />
              </div>

              {!hideSubtitle && (
                <p className="text-sm mt-3 tracking-wide opacity-80 capitalize text-center">
                  JPEG, PNG, JPG, etc.
                </p>
              )}

              <p className="text-xs text-secondary text-center font-medium mt-1">
                click to browse.
              </p>
            </div>
          </Label>
        </div>
      </div>
    </div>
  );
}

export default FormFileUpload;
