import { ImageIcon } from "lucide-react";
import { useState } from "react";
import type { UploadStatus } from "../types";
import { useDropzone } from "react-dropzone";
import { cn } from "../lib/utils";
import { uploadImageToCloudinary } from "../cloudinary/upload-direct";
import type { CloudinaryUploadResult } from "../cloudinary/UploadWidget";

interface UploadCardProps {
  uploadStatus: UploadStatus;
  uploadError: string | null;
  onUploadStart: () => void;
  onUploadError: (error: Error) => void;
  onUploadSuccess: (result: CloudinaryUploadResult) => void;
}

const ACCEPTED_FILE_TYPES = {
  "image/jpeg": [".jpeg", ".jpg"],
  "image/png": [".png"],
  "image/gif": [".gif"],
};

export default function UploadCard({
  uploadStatus,
  uploadError,
  onUploadStart,
  onUploadError,
  onUploadSuccess,
}: UploadCardProps) {
  const [progress, setProgress] = useState<number>(0);

  const uploadFile = async (file: File) => {
    onUploadStart();
    setProgress(0);
    try {
      const result = await uploadImageToCloudinary(file, setProgress);
      onUploadSuccess(result);
      setProgress(0);
    } catch (error) {
      onUploadError(new Error("Upload failed. Please try again."));
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      onUploadError(new Error("No files were accepted."));
    }
    console.log("Accepted files:", acceptedFiles);

    uploadFile(acceptedFiles[0]);
  };

  const isUploading = uploadStatus === "uploading";

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxFiles: 1,
    multiple: false,
    disabled: isUploading,
  });

  return (
    <section id="upload" className="px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-2 text-center text-2xl font-semibold">
          Upload your selfie
        </h2>
        <p className="text-center mb-8 text-white/60">
          Drag, and drop your image here or click to browse
        </p>

        <div
          {...getRootProps()}
          className={cn(
            "glass-card relative flex cursor-pointer flex-col items-center gap-6 p-10 transition",
            isDragActive && "border-2 border-indigo-500/50 bg-indigo-500/10",
            isUploading && "cursor-not-allowed opacity-50",
          )}
        >
          <input {...getInputProps()} />
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400">
            <ImageIcon className="h-10 w-10" />
          </div>
          <div className="text-center text-sm text-white/60">
            <p>Drag and drop your image here or click to browse</p>
            <p>Click to browse .jpg, .png, .gif</p>
          </div>
          {isUploading && (
            <div>
              <div>
                <div></div>
              </div>
              <p>Uploading... {progress > 0 ? `${progress}%` : ""}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
