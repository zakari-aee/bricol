const GlobalBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100">

      {/* Global Animated Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gray-200 rounded-full blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-32 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      {/* Your Page Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlobalBackground;
