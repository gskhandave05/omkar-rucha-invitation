import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { t } from "../i18n/translations";

const BackgroundMusic = forwardRef(function BackgroundMusic({ language, showControls }, ref) {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || isMuted) return false;

    try {
      await audio.play();
      setIsPlaying(true);
      return true;
    } catch {
      setIsPlaying(false);
      return false;
    }
  }, [isMuted]);

  useImperativeHandle(ref, () => ({
    start: playMusic,
  }));

  useEffect(() => {
    if (showControls && !isMuted) {
      playMusic();
    }
  }, [showControls, isMuted, playMusic]);

  const toggleMute = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      try {
        await audio.play();
        setIsMuted(false);
        setIsPlaying(true);
      } catch {
        setIsMuted(true);
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsMuted(true);
      setIsPlaying(false);
    }
  };

  const showMutedIcon = isMuted || !isPlaying;

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      {showControls && (
        <button
          id="audio-btn"
          type="button"
          onClick={toggleMute}
          aria-label={showMutedIcon ? t(language, "unmuteMusic") : t(language, "muteMusic")}
          aria-pressed={!showMutedIcon}
        >
          {showMutedIcon ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--sage-dark)" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--sage-dark)" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>
      )}
    </>
  );
});

export default BackgroundMusic;
