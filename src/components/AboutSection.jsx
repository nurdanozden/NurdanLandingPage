import { motion } from "framer-motion";

const cards = [
  {
    icon: "🎂",
    title: "Doğum Tarihi",
    value: "14 Ocak 2004",
    color: "border-pink-200 hover:shadow-pink-100/50",
  },
  {
    icon: "🏠",
    title: "Memleket",
    value: "Sakarya",
    color: "border-green-200 hover:shadow-green-100/50",
  },
  {
    icon: "🎓",
    title: "Üniversite",
    value: "Çanakkale Onsekiz Mart Üniversitesi\nBilgisayar Mühendisliği",
    color: "border-sky-200 hover:shadow-sky-100/50",
  },
  {
    icon: "💻",
    title: "Teknolojiler",
    value: ".NET • HTML • CSS • JavaScript",
    color: "border-violet-200 hover:shadow-violet-100/50",
  },
  {
    icon: "♑",
    title: "Burç / Yükselen",
    value: "Oğlak ☀️ / Akrep\nHırslıyımdır 😉",
    color: "border-amber-200 hover:shadow-amber-100/50",
  },
  {
    icon: "💐",
    title: "Favori Çiçek",
    value: "Ortanca (Hydrangea) 🌸",
    color: "border-rose-200 hover:shadow-rose-100/50",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-1 py-28 px-4 max-w-6xl mx-auto"
    >
      {/* Soft radial glow */}
      <div className="absolute top-10 right-0 w-[400px] h-[400px] bg-green-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[350px] h-[350px] bg-rose-200/10 rounded-full blur-3xl pointer-events-none" />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-[var(--color-text-heading)] tracking-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Hakkımda
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-[var(--color-text-muted)] text-center mb-16 max-w-md mx-auto font-light leading-relaxed"
      >
        Birkaç cümlede ben
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {cards.map((c) => (
          <motion.div
            key={c.title}
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`group bg-white/70 backdrop-blur-sm rounded-2xl border ${c.color} p-7 flex flex-col gap-3 cursor-default shadow-sm hover:shadow-lg transition-all duration-500`}
          >
            <span className="text-4xl">{c.icon}</span>
            <h3
              className="text-[var(--color-accent)] font-semibold text-lg tracking-wide"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {c.title}
            </h3>
            <p className="text-[var(--color-text-muted)] leading-relaxed whitespace-pre-line font-light">
              {c.value}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
