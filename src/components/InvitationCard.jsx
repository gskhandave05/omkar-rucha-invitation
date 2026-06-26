import { useRef } from "react";
import { useInView } from "framer-motion";
import marathiCard from "../assets/marathi-card.JPG";
import englishCard from "../assets/english-card.JPG";

export default function InvitationCard({ language }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="invitation-section"
      className="snap-page"
      style={{ background: "var(--cream-2)" }}
    >
      <div className={`event-invite-frame w-full reveal-item ${inView ? "visible" : ""}`}>
        <img
          key={language}
          src={language === "mr" ? marathiCard : englishCard}
          alt={
            language === "mr"
              ? "Omkar & Rucha — Marathi invitation card"
              : "Omkar & Rucha — English invitation card"
          }
          className="event-invite-img"
          draggable={false}
        />
      </div>
    </section>
  );
}
