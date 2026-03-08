import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Vite glob import — tüm gallery fotoğraflarını çeker
const imageModules = import.meta.glob(
  "../assets/gallery/*.{jpg,jpeg,png,webp}",
  { eager: true, import: "default" }
);

const photos = Object.values(imageModules);

export default function PhotographySection() {
  if (photos.length === 0) return null;

  return (
    <section
      id="photography"
      className="relative z-1 py-28 px-4 max-w-6xl mx-auto"
    >
      {/* Warm ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-100/15 rounded-full blur-3xl pointer-events-none" />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-[var(--color-text-heading)] tracking-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Fotoğrafçılık
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-[var(--color-text-muted)] text-center mb-14 max-w-lg mx-auto font-light leading-relaxed"
      >
        Güzel anları yakalamayı ve fotoğraflamayı seviyorum 📷
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={photos.length > 3}
          grabCursor
          breakpoints={{
            640: { slidesPerView: 1.5, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 2.5, spaceBetween: 28 },
          }}
          className="photography-swiper"
          style={{
            "--swiper-navigation-color": "#e8739a",
            "--swiper-pagination-color": "#e8739a",
            "--swiper-navigation-size": "28px",
            paddingBottom: "48px",
          }}
        >
          {photos.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="group relative overflow-hidden rounded-2xl border border-rose-100/50 shadow-md shadow-stone-200/30 bg-white/50">
                <img
                  src={src}
                  alt={`Fotoğraf ${i + 1}`}
                  className="w-full h-64 sm:h-72 md:h-80 object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Soft overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}
