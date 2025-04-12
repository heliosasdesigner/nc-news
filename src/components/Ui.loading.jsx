const LoadingScreen = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-2xl font-semibold mb-2">Loading ...</h1>
      <p className="text-sm text-gray-500 mb-6">
        This website is a demonstration, so the loading time may be longer than
        typical site.
      </p>
    </div>
  );
};

export default LoadingScreen;
