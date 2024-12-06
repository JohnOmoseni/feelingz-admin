import { uploadChunks } from "@/hooks/usePost";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface Props {
  title: string;
  name: string;
  accept?: string;
  sizeLimit?: number; // in MB
  required?: boolean;
  hideSubtitle?: boolean;
  onFileChange?: (files: string[]) => void;
}

function TestFormFileUpload({
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (!selectedFiles) return;

    const validFiles: File[] = [];
    const previewFiles: string[] = [];

    Array.from(selectedFiles).forEach((file) => {
      previewFiles.push(URL.createObjectURL(file));
      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setPreview((prevFiles) => [...prevFiles, ...previewFiles]);
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
      setIsUploading(true); // Mark uploading as true
      uploadImages(validFiles); // Call upload immediately
    }
  };

  // const uploadImages = async () => {
  //   if (files.length === 0) {
  //     toast.error("No files to upload.");
  //     return;
  //   }

  //   setIsUploading(true);
  //   setUploadStatus("Uploading...");
  //   setProgress(0);

  //   try {
  //     for (const [index, file] of files.entries()) {
  //       await uploadChunks(file, (chunkIndex, chunkProgress, totalChunks) => {
  //         const overallProgress = ((index + chunkProgress / 100) / files.length) * 100;
  //         setProgress(Math.min(Math.round(overallProgress), 100));
  //       });
  //     }

  //     setUploadStatus("Upload complete!");
  //     toast.success("All files uploaded successfully!");
  //   } catch (error) {
  //     setUploadStatus("Error during upload.");
  //     toast.error("An error occurred while uploading files.");
  //   } finally {
  //     setIsUploading(false);
  //   }
  // };

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

  const handleRemoveFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div>
      <label>
        {title}
        <input
          type="file"
          name={name}
          accept={accept}
          multiple
          onChange={handleFileChange}
          disabled={isUploading}
          required={required}
        />
      </label>

      {!hideSubtitle && <small>Supported formats: {accept.replace(/,/g, ", ")}</small>}

      <div>
        <h4>Selected Files:</h4>
        {files.map((file, idx) => (
          <div key={file.name}>
            {file.name} - {(file.size / 1024 / 1024).toFixed(2)} MB
            <button onClick={() => handleRemoveFile(file.name)} disabled={isUploading}>
              Remove
            </button>
          </div>
        ))}
      </div>

      {isUploading && <p>Uploading: {progress}%</p>}
      {uploadStatus && <p>Status: {uploadStatus}</p>}

      <button disabled={isUploading || files.length === 0}>
        {isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default TestFormFileUpload;
