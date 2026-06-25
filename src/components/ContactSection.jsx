import { invitationData } from "../data/invitationData";

export default function ContactSection() {
  return (
    <section className="py-20 text-center">

      <h2 className="text-4xl text-amber-700 mb-10">
        Contact
      </h2>

      {invitationData.contacts.map((person) => (
        <div
          key={person.phone}
          className="mb-6"
        >
          <h3 className="text-xl">
            {person.name}
          </h3>

          <a
            href={`tel:${person.phone}`}
            className="text-rose-700 text-lg"
          >
            {person.phone}
          </a>
        </div>
      ))}
    </section>
  );
}