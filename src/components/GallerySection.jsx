import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Vite glob import – tüm gallery görsellerini otomatik çeker
const imageModules = import.meta.glob(
  "../assets/gallery/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
);

const images = Object.values(imageModules);

export default function GallerySection() {
  const [lightbox, setLightbox] = useState(null);

  if (images.length === 0) return null;

  const doubled = [...images, ...images];

  return (
    <section id="gallery" className="relative z-1 py-28 overflow-hidden">
      {/* Warm glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-amber-100/20 rounded-full blur-3xl pointer-events-none" />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 px-4 text-[var(--color-text-heading)] tracking-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Galeri
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-[var(--color-text-muted)] text-center mb-14 px-4 font-light"
      >
        Anılardan kareler 🌿
      </motion.p>

      {/* Marquee with edge fade masks */}
      <div className="relative w-full overflow-hidden">
        {/* Left/right fade masks — match gradient bg */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#eeb4ce] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#eeb4ce] to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-5 w-max"
          style={{
            animation: `scroll-x ${Math.max(images.length * 5, 20)}s linear infinite`,
          }}
        >
          {doubled.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative flex-shrink-0 cursor-pointer group"
              onClick={() => setLightbox(src)}
            >
              {/* Soft glow border on hover */}
              <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-rose-300/40 to-amber-200/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

              <img
                src={src}
                alt={`Fotoğraf ${(i % images.length) + 1}`}
                className="relative h-56 sm:h-64 md:h-72 w-auto rounded-2xl object-cover shadow-md shadow-stone-200/50 transition-all duration-500"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={lightbox}
              alt="Büyütülmüş fotoğraf"
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
