import { ImageIcon } from "lucide-react";
import React from "react";
import type { UploadStatus } from "../types";

interface UploadCardProps {
  uploadStatus: UploadStatus;
  uploadError: string | null;
  onUploadStart: () => void;
  onUploadError: (error: Error) => void;
}

export default function UploadCard({
  uploadStatus,
  uploadError,
  onUploadStart,
  onUploadError,
}: UploadCardProps) {
  return (
    <section id="upload" className="px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-2 text-center text-2xl font-semibold">
          Upload your selfie
        </h2>
        <p className="text-center mb-8 text-white/60">
          Drag, and drop your image here or click to browse
        </p>

        <div className="glass-card relative flex cursor-pointer flex-col items-center gap-6 p-10 transition">
          <input />
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400">
            <ImageIcon className="h-10 w-10" />
          </div>
          <div className="text-center text-sm text-white/60">
            <p>Drag and drop your image here or click to browse</p>
            <p>Click to browse .jpg, .png, .gif</p>
          </div>
        </div>
      </div>
    </section>
  );
}
