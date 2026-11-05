import Hero from "../components/Hero";
import UploadCard from "../components/UploadCard";
import { useHeadshot } from "../hooks/use-headshot";

export default function Home() {
  const headshot = useHeadshot();

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 px-4 py-4">
        <div className="text-lg font-bold">
          <span className="">
            AI <span className="text-indigo-400">Headshots</span>
          </span>
        </div>
      </header>

      <Hero />
      <UploadCard
        uploadStatus={headshot.uploadStatus}
        uploadError={headshot.uploadError}
        onUploadStart={headshot.handleUploadStart}
        onUploadError={headshot.handleUploadError}
      />
    </div>
  );
}
