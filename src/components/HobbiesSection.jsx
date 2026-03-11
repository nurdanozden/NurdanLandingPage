import { useState } from "react";
import { motion } from "framer-motion";

const HOBBIES = [
  {
    img: "https://picsum.photos/seed/hiking/400/560",
  },
  {
    img: "https://picsum.photos/seed/coding42/400/560",
  },
  {
    img: "https://picsum.photos/seed/books77/400/560",
  },
  {
    img: "https://picsum.photos/seed/music55/400/560",
  },
  {
    img: "https://picsum.photos/seed/artsy99/400/560",
  },
  {
    img: "https://picsum.photos/seed/cats11/400/560",
  },
  {

    img: "https://picsum.photos/seed/coffee88/400/560",
  },
];

// Duplicate for seamless infinite loop
const TRACK = [...HOBBIES, ...HOBBIES];

// Speed: total px per cycle ≈ card width (220) + gap (20) = 240 × items
const DURATION = `${HOBBIES.length * 4}s`;

export default function HobbiesSection() {
  const [paused, setPaused] = useState(false);

  return (
    <section id="hobbies" className="relative z-1 py-28 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-rose-200/15 rounded-full blur-3xl pointer-events-none" />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 px-4 text-[var(--color-text-heading)] tracking-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Çektiğim Fotoğraflar
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-[var(--color-text-muted)] text-center mb-14 px-4 font-light"
      >
        Zamanımı renklendiren şeyler 🌸
      </motion.p>

      {/* Marquee strip */}
      <div className="relative w-full overflow-hidden">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-[#eeb4ce] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-[#eeb4ce] to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div
          className="flex gap-5 w-max px-5"
          style={{
            animation: `scroll-x ${DURATION} linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {TRACK.map((hobby, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 group cursor-default"
              style={{ width: "clamp(160px, 18vw, 220px)" }}
            >
              {/* Photo card */}
              <div className="relative overflow-hidden rounded-2xl border border-rose-100/50 shadow-md shadow-stone-200/40 bg-white/40">
                <img
                  src={hobby.img}
                  alt={hobby.label}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ aspectRatio: "4 / 5.6" }}
                  loading="lazy"
                  draggable={false}
                />


              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
