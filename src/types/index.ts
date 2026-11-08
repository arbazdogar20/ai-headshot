import type { CloudinaryImage } from "@cloudinary/url-gen/index";

export type UploadStatus = "idle" | "uploading" | "success" | "error";

export type PresetCategory = "style";

export type ExportFormat = "png" | "jpeg" | "webp";

export interface HeadshotPreset {
  id: string;
  name: string;
  description: string;
  category: PresetCategory;
  transformationChain: string;
  build: (publicId: string) => CloudinaryImage;
}
