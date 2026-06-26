import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LanguageTabs from "./components/LanguageTabs";
import EnvelopeCover from "./components/EnvelopeCover";
import BackgroundMusic from "./components/BackgroundMusic";
import PetalsCanvas from "./components/PetalsCanvas";
import Hero from "./components/Hero";
import ScratchDate from "./components/ScratchDate";
import Countdown from "./components/Countdown";
import InvitationCard from "./components/InvitationCard";
import Venue from "./components/Venue";
import ContactSection from "./components/ContactSection";

function App() {
  const [language, setLanguage] = useState("mr");
  const [isOpened, setIsOpened] = useState(false);
  const musicRef = useRef(null);

  useEffect(() => {
    document.documentElement.lang = language === "mr" ? "mr" : "en";
  }, [language]);

  useEffect(() => {
    if (!isOpened) {
      document.body.classList.add("no-scroll");
      document.documentElement.classList.remove("snap-scroll");
    } else {
      document.body.classList.remove("no-scroll");
      document.documentElement.classList.add("snap-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("snap-scroll");
    };
  }, [isOpened]);

  const handleOpen = () => {
    setIsOpened(true);
  };

  const handleUserInteract = () => {
    musicRef.current?.start();
  };

  return (
    <div className="relative min-h-screen" style={{ background: "var(--cream)" }}>
      <PetalsCanvas active={isOpened} />

      <AnimatePresence>
        {!isOpened && (
          <EnvelopeCover
            language={language}
            onOpen={handleOpen}
            onUserInteract={handleUserInteract}
          />
        )}
      </AnimatePresence>

      {!isOpened && (
        <div className="intro-lang-bar">
          <div onClick={(e) => e.stopPropagation()}>
            <LanguageTabs language={language} setLanguage={setLanguage} />
          </div>
        </div>
      )}

      <BackgroundMusic ref={musicRef} language={language} showControls={isOpened} />

      <div className={`main-content ${isOpened ? "visible" : ""}`}>
        {isOpened && (
          <>
            <div className="sticky-header">
              <LanguageTabs language={language} setLanguage={setLanguage} />
            </div>

            <main className="invitation-main">
              <Hero language={language} />
              <ScratchDate language={language} />
              <Countdown language={language} />
              <InvitationCard language={language} />
              <Venue language={language} />
              <ContactSection language={language} />
            </main>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
