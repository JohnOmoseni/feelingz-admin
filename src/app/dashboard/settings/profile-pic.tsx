import { ChangeEvent, useState } from "react";
import { UserAvatar } from "@/constants/icons";
import { toast } from "sonner";
import { convertFileToUrl } from "@/lib";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "@/components/reuseables/CustomButton";

function ProfilePic() {
  const [_file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (!["image/jpeg", "image/png", "image/svg+xml"].includes(selectedFile.type)) {
        alert("Please select a JPG, PNG, or SVG file.");
        toast.info("Please select a JPG, PNG, or SVG file.");
        return;
      }
      if (selectedFile.size > 4 * 1024 * 1024) {
        alert("File size must be less than 4MB.");
        toast.info("File size must be less than 4MB.");
        return;
      }

      try {
        setIsUploading(true);
        setFile(selectedFile);

        setPreview(convertFileToUrl(selectedFile));
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="flex-column gap-2 !items-center p-3">
      <div className="group relative h-44 w-44 overflow-hidden rounded-full p-0.5 shadow-inner outline outline-border-border-100 clip-circle max-sm:mx-auto">
        {preview ? (
          <img
            src={preview!}
            alt="profile"
            className="object-cover size-full border border-border"
          />
        ) : (
          <UserAvatar className="w-fit h-full" />
        )}
      </div>

      <Input
        id="uploadImage"
        type="file"
        accept="image/jpeg, image/png, image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />

      <Label htmlFor="uploadImage" className="cursor-pointer text-[1rem] mt-2.5 leading-4 mb-4">
        {isUploading ? "Uploading..." : "Edit your Photo"}
      </Label>

      <div className="row-flex gap-4">
        <Button title="Delete" className="" onClick={() => setPreview(null)} />

        <Button title="Save" className="" />
      </div>
    </div>
  );
}

export default ProfilePic;
