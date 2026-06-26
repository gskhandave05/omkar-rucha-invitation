import { useRef } from "react";
import { useInView } from "framer-motion";
import GaneshaIcon from "./GaneshaIcon";
import { invitationData } from "../data/invitationData";
import { t } from "../i18n/translations";

function useReveal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, inView };
}

export default function Hero({ language }) {
  const { groom, bride } = invitationData;
  const isMr = language === "mr";
  const { ref, inView } = useReveal();

  const reveal = (delay) =>
    `reveal-item reveal-d${delay} ${inView ? "visible" : ""}`;

  return (
    <section
      id="hero"
      ref={ref}
      className="snap-page relative overflow-hidden"
      style={{ background: "var(--cream-2)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(226,180,177,0.18) 0%, transparent 65%)",
        }}
      />

      <div className="hero-corner">
        <span />
      </div>

      <div className="hero-card w-full max-w-full">
        <div className={reveal(1)}>
          <GaneshaIcon />
        </div>

        <div className={`god-quote ${reveal(2)}`}>
          {t(language, "ganeshMantra")}
          {"\n"}
          {t(language, "ganeshShloka")}
        </div>

        <p className={`intro-text ${reveal(3)}`}>{t(language, "introText")}</p>

        <div className={`hero-couple-block ${reveal(4)}`}>
          <div className="couple-name shimmer">
            {isMr ? groom.nameMr.replace("चि. ", "") : groom.nameEn}
          </div>
          <p className="parent-sub">
            {isMr ? groom.parentsLineMr : groom.parentsLineEn}
          </p>
        </div>

        <div className={`amp-row ${reveal(5)}`}>
          <span className="amp-line" />
          <span className="amp">&</span>
          <span className="amp-line" />
        </div>

        <div className={`hero-couple-block ${reveal(5)}`}>
          <div className="couple-name shimmer">
            {isMr ? bride.nameMr.replace("चि. सौ. कां. ", "") : bride.nameEn}
          </div>
          <p className="parent-sub">
            {isMr ? bride.parentsLineMr : bride.parentsLineEn}
          </p>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>{t(language, "scrollHint")}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
