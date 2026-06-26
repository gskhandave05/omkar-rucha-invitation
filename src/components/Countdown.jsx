import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { t } from "../i18n/translations";
import { invitationData } from "../data/invitationData";

const LABEL_KEYS = ["days", "hours", "minutes", "seconds"];

export default function Countdown({ language }) {
  const eventDate = new Date("2026-07-04T11:00:00");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isMr = language === "mr";

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const difference = Math.max(0, eventDate - new Date());
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];

  return (
    <section
      ref={ref}
      className="snap-page"
      style={{ background: "var(--cream)" }}
    >
      <div className={`cd-card reveal-item ${inView ? "visible" : ""}`}>
        <p className="mb-2 text-lg italic text-[var(--text-mid)]">
          {t(language, "countdownQuote")}
        </p>
        <span className="font-display mb-1 block text-3xl text-[var(--sage-dark)]">
          {isMr ? invitationData.event.titleMr : invitationData.event.titleEn}
        </span>
        <span className="font-sans mb-8 mt-4 block text-sm uppercase tracking-[0.25em] text-[var(--sage-deep)]">
          {isMr ? invitationData.event.dateMr : invitationData.event.dateEn}
        </span>

        <div className="cd-grid">
          {LABEL_KEYS.map((key, index) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <div className="cd-num">{values[index]}</div>
              <div className="cd-lbl">{t(language, key)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
