import { useRef } from "react";
import { useInView } from "framer-motion";
import { invitationData } from "../data/invitationData";
import { t } from "../i18n/translations";

export default function Venue({ language }) {
  const { event } = invitationData;
  const isMr = language === "mr";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const venueName = isMr ? event.venueMr : event.venueEn;
  const location = isMr ? event.locationMr : event.locationEn;

  return (
    <section
      ref={ref}
      id="venue-section"
      className="snap-page text-center"
      style={{ background: "var(--cream)" }}
    >
      <span className={`sec-label reveal-item ${inView ? "visible" : ""}`}>
        {t(language, "venue")}
      </span>

      <div className={`venue-card reveal-item reveal-d1 ${inView ? "visible" : ""}`}>
        <div className="card-corner tl" />
        <div className="card-corner tr" />
        <div className="card-corner bl" />
        <div className="card-corner br" />

        <span className="venue-date">
          {isMr ? event.dateMr : event.dateEn}
        </span>

        <span className="venue-time">
          {isMr ? event.timeMr : event.timeEn}
        </span>

        <h3 className={`venue-name ${isMr ? "venue-name--mr" : ""}`}>
          {venueName}
        </h3>

        <p className="venue-location">{location}</p>

        <a href={event.maps} target="_blank" rel="noreferrer" className="venue-btn">
          {t(language, "navigateToVenue")}
        </a>
      </div>
    </section>
  );
}
