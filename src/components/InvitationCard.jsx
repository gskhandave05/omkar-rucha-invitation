import marathiCard from "../assets/marathi-card.jpg";
import englishCard from "../assets/english-card.jpg";

export default function InvitationCard({
  language,
}) {
  return (
    <section className="py-20">

      <div className="max-w-md mx-auto shadow-2xl rounded-xl overflow-hidden">

        <img
          src={
            language === "mr"
              ? marathiCard
              : englishCard
          }
          alt="Invitation"
          className="w-full"
        />

      </div>

    </section>
  );
}