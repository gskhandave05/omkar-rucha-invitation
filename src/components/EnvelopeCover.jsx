import { useEffect, useRef, useState } from "react";
import { t } from "../i18n/translations";

const INTRO_VIDEO = `${import.meta.env.BASE_URL}intro-video.mp4`;

export default function EnvelopeCover({ language, onOpen, onUserInteract }) {
  const videoRef = useRef(null);
  const [phase, setPhase] = useState("idle");
  const [showFlash, setShowFlash] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const showFirstFrame = () => {
      video.currentTime = 0;
      video.pause();
      setVideoReady(true);
    };

    video.addEventListener("loadeddata", showFirstFrame);
    return () => video.removeEventListener("loadeddata", showFirstFrame);
  }, []);

  const finishOpen = () => {
    if (phase === "done") return;
    setPhase("done");
    setShowFlash(true);
    setTimeout(onOpen, 700);
  };

  const playVideo = async () => {
    const video = videoRef.current;
    if (!video) {
      finishOpen();
      return;
    }

    setPhase("playing");

    try {
      await video.play();
    } catch {
      video.muted = true;
      try {
        await video.play();
      } catch {
        finishOpen();
      }
    }
  };

  const handleTap = () => {
    if (phase === "done") return;

    if (phase === "playing") return;

    onUserInteract?.();

    if (videoFailed) {
      finishOpen();
      return;
    }

    playVideo();
  };

  const handleVideoEnd = () => {
    finishOpen();
  };

  return (
    <>
      <div
        className="video-intro envelope-paper"
        onClick={handleTap}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleTap();
          }
        }}
        aria-label={t(language, "tapToReveal")}
      >
        <div className="video-intro__frame">
          {!videoFailed && (
            <video
              ref={videoRef}
              className={videoReady ? "is-ready" : ""}
              src={INTRO_VIDEO}
              playsInline
              preload="auto"
              onEnded={handleVideoEnd}
              onError={() => setVideoFailed(true)}
            />
          )}
        </div>

        {phase === "idle" && (
          <div className="video-intro__overlay">
            {!videoReady && !videoFailed && (
              <div className="video-intro__loading" aria-hidden="true">
                <span className="video-intro__spinner" />
              </div>
            )}
            <p className={`video-intro__hint video-intro__hint--${language}`}>
              {videoFailed ? t(language, "openInvitation") : t(language, "tapToReveal")}
            </p>
          </div>
        )}
      </div>

      {showFlash && <div className="bright-flash active" />}
    </>
  );
}
