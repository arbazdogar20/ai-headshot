import type { CloudinaryImage } from "@cloudinary/url-gen/index";
import type { HeadshotPreset } from "../types";
import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";

interface PresetImage {
  preset: HeadshotPreset;
  image: CloudinaryImage; // Replace 'any' with the appropriate type for your image object
}

interface TransformationGridProps {
  title?: string;
  presets?: PresetImage[];
  selectedPresetId?: string | null;
  onSelect?: (presetId: string) => void;
}

function PresetCard({
  preset,
  image,
}: {
  preset: HeadshotPreset;
  image: CloudinaryImage;
}) {
  return (
    <button>
      <div className="relative aspect-4/5 w-full overflow-hidden bg-black/30">
        <AdvancedImage
          cldImg={image}
          plugins={[placeholder({ mode: "blur" }), lazyload()]}
          alt="Original"
          className="mx-auto mt-4 rounded-xl shadow-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{preset.name}</h3>
        <p className="mt-1 text-xs text-white/50">{preset.description}</p>
      </div>
    </button>
  );
}

export default function TransformationGrid({
  title,
  presets,
}: TransformationGridProps) {
  if (presets?.length === 0) return null;
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-2 text-center text-2xl font-semibold">{title}</h2>
        <p className="mb-8 text-center text-sm text-white/50">
          Outfit swap . Background replace . Optimize for web
        </p>
        <p className="mb-6 text-center text-xs text-amber-400/70">
          Style generate one at a time.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {presets?.map(({ preset, image }) => (
            <PresetCard preset={preset} image={image} />
          ))}
        </div>
      </div>
    </section>
  );
}
