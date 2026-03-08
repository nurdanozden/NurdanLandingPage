import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  const scrollToLetter = () => {
    document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative z-1 flex items-center justify-center min-h-screen px-6 py-20 overflow-hidden">
      {/* Warm radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto w-full">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] text-[var(--color-text-heading)]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Merhaba, ben NURDAN
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg sm:text-xl text-[var(--color-text-muted)] max-w-lg leading-relaxed font-light"
        >
          Beni tanımak ister misiniz?
        </motion.p>

        {/* Decorative flower divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex items-center gap-3 text-rose-300"
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-300/50" />
          <span className="text-2xl">🌷</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-300/50" />
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex flex-wrap gap-4 justify-center mt-2"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(232,115,154,0.25)" }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToLetter}
            aria-label="Mektup bölümüne git"
            className="px-9 py-3.5 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-rose-400 text-white font-semibold text-base shadow-lg shadow-rose-200/40 hover:shadow-rose-300/50 transition-all duration-500 cursor-pointer tracking-wide"
          >
            Beni Tanı
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setModalOpen(true)}
            aria-label="Hack denemesi esprisi"
            className="px-9 py-3.5 rounded-full bg-white/60 backdrop-blur-sm border border-rose-200/50 text-[var(--color-text-muted)] font-semibold text-base hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] transition-all duration-500 cursor-pointer tracking-wide"
          >
            Beni Hack'le
          </motion.button>
        </motion.div>

        {/* Floating illustration hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { delay: 1.2, duration: 0.8 },
            y: { delay: 1.2, duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          className="mt-8 text-5xl select-none"
        >
          🦋
        </motion.div>
      </div>

      {/* Hack Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-10 max-w-sm mx-4 text-center shadow-2xl border border-rose-100"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-2xl font-medium mb-6 leading-relaxed text-[var(--color-text-heading)]">
                O kadar kolay mı sandınızz ihihi 🤭😉
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setModalOpen(false)}
                className="px-7 py-2.5 rounded-full bg-gradient-to-r from-[var(--color-accent)] to-rose-400 text-white font-semibold shadow-lg hover:shadow-rose-300/40 transition-all duration-300 cursor-pointer"
              >
                Tamam
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
