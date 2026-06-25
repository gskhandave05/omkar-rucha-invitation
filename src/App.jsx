import { useState } from "react";
import LanguageTabs from "./components/LanguageTabs";
import InvitationCover from "./components/InvitationCover";
import Countdown from "./components/Countdown";
import InvitationCard from "./components/InvitationCard";
import Venue from "./components/Venue";
import ContactSection from "./components/ContactSection";

function App() {
  const [language, setLanguage] = useState("mr");

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-b
        from-[#fffdf9]
        via-[#fff7ef]
        to-[#fffdf9]
      "
    >
      <LanguageTabs
        language={language}
        setLanguage={setLanguage}
      />

      <InvitationCover />

      <Countdown />

      <InvitationCard language={language} />

      <Venue />

      <ContactSection />
    </div>
  );
}

export default App;