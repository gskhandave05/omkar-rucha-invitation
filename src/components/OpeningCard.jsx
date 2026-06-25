import { motion } from "framer-motion";

export default function OpeningCard({ onOpen }) {
  return (
    <div className="fixed inset-0 bg-[#fffaf5] flex items-center justify-center z-50">

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md w-[90%] rounded-3xl border-4 border-amber-300 bg-white shadow-2xl p-8 text-center"
      >
        <div className="text-5xl mb-6">🕉️</div>

        <h1 className="text-2xl font-semibold text-amber-700 mb-2">
          || श्री गणेशाय नमः ||
        </h1>

        <p className="text-gray-600 mb-6">
          Tompe & Durve Family
        </p>

        <h2 className="text-4xl font-serif text-rose-700 mb-4">
          O ❤️ R
        </h2>

        <button
          onClick={onOpen}
          className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition"
        >
          Open Invitation
        </button>
      </motion.div>
    </div>
  );
}