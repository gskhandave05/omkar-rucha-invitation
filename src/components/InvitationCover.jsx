import { motion } from "framer-motion";

export default function InvitationCover() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-center"
      >
        <div className="text-[8rem] text-amber-700">
          O ❤️ R
        </div>

        <h1 className="text-7xl text-rose-800">
          Omkar & Rucha
        </h1>

        <p className="mt-6 text-2xl text-gray-700">
          Engagement Ceremony
        </p>

      </motion.div>
    </section>
  );
}