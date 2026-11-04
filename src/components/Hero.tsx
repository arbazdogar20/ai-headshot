export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-4">
        Welcome to AI Headshots
      </h1>
      <p className="text-lg text-center mb-6">
        Generate professional headshots using AI technology. Upload your photo
        and let our AI create stunning headshots for you.
      </p>
      <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition duration-300">
        Get Started
      </button>
    </div>
  );
}
