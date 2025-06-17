import { useCallback, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import CustomButton from "../reuseables/CustomButton";

const basicStyles = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "3em 1em",
  borderWidth: "1px",
  borderStyle: "dashed",
  borderColor: "#ddd",
  backgroundColor: "#f2f5fa",
  color: "#121212",
  width: "100%",
  marginInline: "4px",
  marginTop: "10px",
  minHeight: "min(30vh, 200px)",
  outline: "none",
  borderRadius: "8px",
  transition: "border .24s ease-in",
  cursor: "pointer",
  overflow: "hidden",
  clipPath: "none",
};

const focusStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "green",
};

const rejectStyle = {
  borderColor: "red",
};

type Props = {
  name?: string;
  accept?: string;
  onFileChange?: (files: FileList) => void;
};

export default function Dropzone({ onFileChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [_preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = new FileReader();
    file.onload = () => {
      setPreview(file?.result);
    };
    setFiles(acceptedFiles);
    onFileChange?.(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, isFocused } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [], // Accepts all image types (e.g., .jpg, .jpeg, .png, .svg, .gif)
      },
    });

  const style = useMemo(() => {
    return {
      ...basicStyles,
      ...(isFocused ? focusStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    } as const;
  }, [isFocused, isDragAccept, isDragReject]);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      {...getRootProps()}
      style={{
        ...getInputProps().style,
        ...style,
        flexDirection: "column",
        position: "relative",
        whiteSpace: "pre-wrap",
      }}
      className="relative flex-1"
    >
      <input
        {...getInputProps()}
        style={{
          ...getInputProps().style,
          appearance: "none",
          columnFill: "balance",
        }}
      />
      {isDragActive ? (
        <p className="text-center">Drag the files here....</p>
      ) : (files?.length as number) > 0 ? (
        Array.from(files as FileList)?.map((file, idx) => (
          <p key={idx} className="text-center text-base">
            {file?.name}
          </p>
        ))
      ) : (
        <p className="text-center">Drag and drop here or click to select the files</p>
      )}

      <p className="text-grey text-center px-2 pt-4 text-sm">
        Supported files type: .jpg, .jpeg, .png, .gif
      </p>

      <CustomButton title="Select File" className="mt-4" onClick={handleButtonClick} />
    </div>
  );
}
