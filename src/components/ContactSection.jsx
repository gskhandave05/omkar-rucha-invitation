import { useRef } from "react";
import { useInView } from "framer-motion";
import { invitationData } from "../data/invitationData";
import { t } from "../i18n/translations";

export default function ContactSection({ language }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { groom, bride } = invitationData;
  const isMr = language === "mr";

  return (
    <section ref={ref} className="footer-section snap-page">
      <p className={`footer-msg reveal-item ${inView ? "visible" : ""}`}>
        {t(language, "footerMsg")}
      </p>

      <span className={`footer-regards reveal-item reveal-d1 ${inView ? "visible" : ""}`}>
        {t(language, "withLove")}
      </span>

      <div className={`footer-names reveal-item reveal-d2 ${inView ? "visible" : ""}`}>
        <span className={`footer-name shimmer ${isMr ? "footer-name--mr" : ""}`}>
          {isMr ? groom.nameMr.replace("चि. ", "") : groom.nameEn}
        </span>
        <span className="footer-amp">&</span>
        <span className={`footer-name shimmer ${isMr ? "footer-name--mr" : ""}`}>
          {isMr ? bride.nameMr.replace("चि. सौ. कां. ", "") : bride.nameEn}
        </span>
      </div>

      <div
        className={`mx-auto mt-10 flex max-w-md flex-col gap-4 reveal-item reveal-d3 ${inView ? "visible" : ""}`}
      >
        {invitationData.contacts.map((person) => (
          <div
            key={person.phone}
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-center"
          >
            <h3 className="text-lg text-[var(--gold-light)]">{person.name}</h3>
            <a
              href={`tel:${person.phone}`}
              className="mt-1 inline-block text-[var(--cream-2)] transition hover:text-white"
            >
              {person.phone}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
