export default function LanguageTabs({
    language,
    setLanguage,
  }) {
    return (
      <div className="flex justify-center gap-4 py-8">
  
        <button
          onClick={() => setLanguage("mr")}
          className={`px-5 py-2 rounded-full ${
            language === "mr"
              ? "bg-amber-600 text-white"
              : "bg-gray-200"
          }`}
        >
          मराठी
        </button>
  
        <button
          onClick={() => setLanguage("en")}
          className={`px-5 py-2 rounded-full ${
            language === "en"
              ? "bg-amber-600 text-white"
              : "bg-gray-200"
          }`}
        >
          English
        </button>
  
      </div>
    );
  }