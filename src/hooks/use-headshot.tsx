import { useMemo, useState } from "react";
import type { UploadStatus } from "../types";
import type { CloudinaryUploadResult } from "../cloudinary/UploadWidget";
import { buildOriginalPreview } from "../lib/transformations";

export function useHeadshot() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [publicId, setPublicId] = useState<string | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);

  const handleUploadStart = async () => {
    setUploadStatus("uploading");
    setUploadError(null);
  };

  const handleUploadSuccess = async (result: CloudinaryUploadResult) => {
    if (result.resource_type !== "image") {
      setUploadStatus("error");
      setUploadError(
        "Please upload a valid image file. (Only JPEG, PNG, and WEBP files are supported.)",
      );
      return;
    }

    setPublicId(result.public_id);
    setSelectedPresetId(null); // Reset selected preset ID on new upload
    setUploadStatus("success");
    setUploadError(null);
  };

  const handleUploadError = (error: Error) => {
    setUploadStatus("error");
    setUploadError(error.message);
  };

  const originalImage = useMemo(() => {
    if (!publicId) return null;
    return buildOriginalPreview(publicId);
  }, [publicId]);

  return {
    uploadStatus,
    uploadError,
    handleUploadStart,
    handleUploadError,
    handleUploadSuccess,
    originalImage,
  };
}
