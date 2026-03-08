import { useState, useRef, useCallback, useEffect } from "react";

// ⚠️ Sprite sheet boyutları gerçek görsele göre ayarlanmalı
const FRAME_WIDTH = 128;
const FRAME_HEIGHT = 128;
const FRAME_COUNT = 8;
const FPS = 12;

export default function SpriteSection() {
  const [playing, setPlaying] = useState(false);
  const [frame, setFrame] = useState(0);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(0);

  let spriteUrl;
  try {
    spriteUrl = /* @vite-ignore */ new URL("../assets/gallery/sprite.png", import.meta.url).href;
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
            // Animasyon bitti – durdur
            setPlaying(false);
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
      setPlaying(true);
    }
  };

  if (!spriteUrl) return null;

  return (
    <section id="sprite" className="relative z-1 py-20 px-4 text-center">
      <h2
        className="text-3xl sm:text-4xl font-bold mb-8"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Animasyon
      </h2>

      <p className="text-[var(--color-text-muted)] mb-6">
        Tıkla ve izle!
      </p>

      <div
        onClick={handleClick}
        className="inline-block cursor-pointer rounded-xl overflow-hidden border-2 border-[var(--color-accent)]/30 hover:border-[var(--color-accent)] transition"
        style={{
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
          backgroundImage: `url(${spriteUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: `-${frame * FRAME_WIDTH}px 0px`,
          imageRendering: "pixelated",
        }}
        role="button"
        aria-label="Sprite animasyonu oynat"
      />
    </section>
  );
}
