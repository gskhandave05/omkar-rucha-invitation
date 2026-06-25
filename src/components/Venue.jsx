import { invitationData } from "../data/invitationData";

export default function Venue() {
  return (
    <section className="py-20 text-center">

      <h2 className="text-4xl text-amber-700 mb-8">
        Venue
      </h2>

      <h3 className="text-2xl">
        {invitationData.event.venue}
      </h3>

      <p className="mb-6">
        {invitationData.event.location}
      </p>

      <a
        href={invitationData.event.maps}
        target="_blank"
        rel="noreferrer"
        className="bg-rose-600 text-white px-6 py-3 rounded-full"
      >
        Navigate To Venue
      </a>

    </section>
  );
}