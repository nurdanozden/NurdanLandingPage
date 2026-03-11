import { useState } from "react";
import { motion } from "framer-motion";

// ── Gerçek fotoğraflar — Vite glob ile otomatik yükleme ──────────────────────
const yatayModules = import.meta.glob(
  "../assets/images/yatay-images/*.{jpg,jpeg,png,webp}",
  { eager: true }
);
const dikeyModules = import.meta.glob(
  "../assets/images/dikey-images/*.{jpg,jpeg,png,webp}",
  { eager: true }
);

const LANDSCAPE = Object.values(yatayModules).map((m) => m.default);
const PORTRAIT  = Object.values(dikeyModules).map((m) => m.default);

// ── Şerit bileşeni ────────────────────────────────────────────────────────────
function MarqueeStrip({ images, direction = "left", speed, height }) {
  const [paused, setPaused] = useState(false);
  // Seamless loop: dizi iki katına çıkarılır, translateX(-50%) ile sıfırlanır
  const track = [...images, ...images];
  const animName = direction === "left" ? "scroll-x" : "scroll-x-right";

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Kenar silikleştirme maskeleri */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#eeb4ce] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-[#eeb4ce] to-transparent z-10 pointer-events-none" />

      {/* Kayan şerit */}
      <div
        className="flex gap-5 w-max"
        style={{
          animation: `${animName} ${speed} linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {track.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 overflow-hidden rounded-2xl
                       border border-rose-100/50
                       shadow-md shadow-rose-900/10
                       bg-white/30"
            style={{ height }}
          >
            <img
              src={src}
              alt={`photo-${i % images.length}`}
              className="h-full w-auto object-contain block"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Ana bölüm ─────────────────────────────────────────────────────────────────
export default function HobbiesSection() {
  return (
    <section id="hobbies" className="relative z-1 py-28 overflow-hidden">
      {/* Ortam parıltısı */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[640px] h-[520px] bg-rose-200/15 rounded-full blur-3xl pointer-events-none" />

      {/* Başlık */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 px-4
                   text-[var(--color-text-heading)] tracking-tight"
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
        Zamanımı renklendiren anlar 🌸
      </motion.p>

      {/* Çift şerit — scroll'da fade-in + yukarı kayış */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col gap-6"
      >
        {/* Üst şerit — Yatay fotoğraflar, sola akar, 40 s */}
        <MarqueeStrip
          images={LANDSCAPE}
          direction="left"
          speed="80s"
          height="200px"
        />

        {/* Alt şerit — Dikey fotoğraflar, sağa akar, 40 s */}
        <MarqueeStrip
          images={PORTRAIT}
          direction="right"
          speed="85s"
          height="300px"
        />
      </motion.div>
    </section>
  );
}
