export default function LanguageTabs({ language, setLanguage, visible = true }) {
  if (!visible) return null;

  return (
    <div className="flex justify-center gap-2">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setLanguage("mr");
        }}
        className={`language-tab ${language === "mr" ? "is-active" : ""}`}
      >
        मराठी
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setLanguage("en");
        }}
        className={`language-tab ${language === "en" ? "is-active" : ""}`}
      >
        English
      </button>
    </div>
  );
}
