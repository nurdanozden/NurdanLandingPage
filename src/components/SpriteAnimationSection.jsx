import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ⚠️ Sprite sheet boyutları gerçek görsele göre ayarlanmalı
const FRAME_WIDTH = 128;
const FRAME_HEIGHT = 128;
const FRAME_COUNT = 8;
const FPS = 12;

export default function SpriteAnimationSection() {
  const [playing, setPlaying] = useState(false);
  const [frame, setFrame] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);

  let spriteUrl;
  try {
    // eslint-disable-next-line no-undef
    spriteUrl = new URL(
      /* @vite-ignore */ "../assets/gallery/sprite.png",
      import.meta.url
    ).href;
  } catch {
    spriteUrl = null;
  }

  const animate = useCallback(
    (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;

      if (delta >= 1000 / FPS) {
        lastTimeRef.current = timestamp;
        setFrame((prev) => {
          const next = prev + 1;
          if (next >= FRAME_COUNT) {
            setPlaying(false);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 3000);
            return 0;
          }
          return next;
        });
      }

      if (playing) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [playing]
  );

  useEffect(() => {
    if (playing) {
      lastTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing, animate]);

  const handleClick = () => {
    if (!playing) {
      setFrame(0);
      setShowMessage(false);
      setPlaying(true);
    }
  };

  if (!spriteUrl) return null;

  return (
    <section
      id="sprite"
      className="relative z-1 py-28 px-4 flex flex-col items-center"
    >
      {/* Soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-green-200/15 rounded-full blur-3xl pointer-events-none" />

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[var(--color-text-heading)] tracking-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Animasyon
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-[var(--color-text-muted)] mb-10 font-light"
      >
        Tıkla ve izle! 🎬
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="relative"
      >
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="relative cursor-pointer rounded-2xl overflow-hidden border border-rose-200/50 hover:border-[var(--color-accent)]/50 transition-all duration-500 bg-white/50 backdrop-blur-sm shadow-lg shadow-rose-100/30"
          style={{
            width: FRAME_WIDTH * 1.5,
            height: FRAME_HEIGHT * 1.5,
            backgroundImage: `url(${spriteUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: `-${frame * FRAME_WIDTH * 1.5}px 0px`,
            backgroundSize: `${FRAME_COUNT * FRAME_WIDTH * 1.5}px ${FRAME_HEIGHT * 1.5}px`,
            imageRendering: "pixelated",
          }}
          role="button"
          aria-label="Sprite animasyonu oynat"
        />
      </motion.div>

      {/* Achievement message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="mt-8 px-6 py-3 rounded-full bg-white/70 backdrop-blur-sm border border-green-200/50 shadow-md"
          >
            <span className="text-[var(--color-accent-green)] font-semibold text-sm">
              🏆 Achievement Unlocked!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
