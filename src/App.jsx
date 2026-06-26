import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import LanguageTabs from "./components/LanguageTabs";
import EnvelopeCover from "./components/EnvelopeCover";
import BackgroundMusic from "./components/BackgroundMusic";

const Hero = lazy(() => import("./components/Hero"));
const ScratchDate = lazy(() => import("./components/ScratchDate"));
const Countdown = lazy(() => import("./components/Countdown"));
const InvitationCard = lazy(() => import("./components/InvitationCard"));
const Venue = lazy(() => import("./components/Venue"));
const ContactSection = lazy(() => import("./components/ContactSection"));
const PetalsCanvas = lazy(() => import("./components/PetalsCanvas"));

function LoadingScreen() {
  return (
    <div className="snap-page" style={{ background: "var(--cream-2)" }}>
      <div className="video-intro__loading" aria-label="Loading">
        <span className="video-intro__spinner" />
      </div>
    </div>
  );
}

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
      <Suspense fallback={null}>
        <PetalsCanvas active={isOpened} />
      </Suspense>

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

            <Suspense fallback={<LoadingScreen />}>
              <main className="invitation-main">
                <Hero language={language} />
                <ScratchDate language={language} />
                <Countdown language={language} />
                <InvitationCard language={language} />
                <Venue language={language} />
                <ContactSection language={language} />
              </main>
            </Suspense>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
