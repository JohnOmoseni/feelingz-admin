import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUploadIcon, Remove } from "@/constants/icons";
import { cn } from "@/lib/utils";
import { uploadChunks } from "@/server/actions/uploadChunks";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  title?: string;
  images?: any;
  name?: string;
  accept?: string;
  required?: boolean;
  hideSubtitle?: boolean;
  setHasImageUploaded?: any;
  onFileChange?: (files: string[]) => void;
};

function FormFileUpload({
  title,
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

        setUploadStatus({ ...statusMap });

        toast.success(`File ${file.name} uploaded successfully.`);
      } catch (error) {
        statusMap[i] = "Error";
        setUploadStatus({ ...statusMap });
        toast.error(`Error uploading ${file.name}.`);
      }
    }

    console.log("[IMAGE URLS]", imageURLS);

    if (imageURLS.length >= 2) {
      setHasImageUploaded(true);
    }

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
              "w-full flex-column items-center justify-center gap-2 border border-border  rounded-md overflow-hidden border-dashed bg-background-100 hover:border-secondary-100",
              preview?.length === 0 ? "sm:max-w-[60%]" : "mt-4"
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

        {/* {hasImageUploaded && (
          <p className="mt-3 text-green-500 text-xs">At least 2 images uploaded successfully.</p>
        )} */}
      </div>
    </div>
  );
}

export default FormFileUpload;
