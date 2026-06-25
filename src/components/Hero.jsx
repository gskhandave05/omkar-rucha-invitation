import { motion } from "framer-motion";

export default function Hero({ language }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-7xl text-amber-700 mb-4"
      >
        O ❤️ R
      </motion.h1>

      <h2 className="text-5xl font-serif text-rose-800">
        {language === "mr"
          ? "ओंकार ❤️ ऋचा"
          : "Omkar & Rucha"}
      </h2>

      <p className="mt-4 text-xl text-gray-700">
        {language === "mr"
          ? "साखरपुडा समारंभ"
          : "Engagement Ceremony"}
      </p>

      <div className="mt-8 text-lg">
        {language === "mr"
          ? "४ जुलै २०२६ • सकाळी ११:००"
          : "4 July 2026 • 11:00 AM"}
      </div>

    </section>
  );
}