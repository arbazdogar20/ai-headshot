import React, { useState } from "react";
import type { UploadStatus } from "../types";

export function useHeadshot() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUploadStart = async () => {
    setUploadStatus("uploading");
    setUploadError(null);
  };

  const handleUploadError = (error: Error) => {
    setUploadStatus("error");
    setUploadError(error.message);
  };

  return {
    uploadStatus,
    uploadError,
    handleUploadStart,
    handleUploadError,
  };
}
