import { useMemo } from "react";

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

/* ── SVG bird silhouette (simple stylized) ────── */
function BirdSvg({ className, style }) {
  return (
    <svg
      viewBox="0 0 40 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M0 10 Q10 0 20 10 Q30 0 40 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function SpringBackground() {
  /* ── Flying birds ──────────────────────────────── */
  const birds = useMemo(
    () => [
      // Sol üst köşeden sağa — 12 kuş
      ...Array.from({ length: 12 }, (_, i) => ({
        id: `bird-tl-${i}`,
        top: `${rand(6, 48)}%`,
        size: rand(20, 48),
        delay: `${rand(0, 4)}s`,
        duration: `${rand(20, 38)}s`,
        reverse: false,
        colorIdx: i % 4,
      })),
      // Sağ alt köşeden sola — 12 kuş
      ...Array.from({ length: 12 }, (_, i) => ({
        id: `bird-br-${i}`,
        top: `${rand(58, 90)}%`,
        size: rand(18, 38),
        delay: `${rand(0, 6)}s`,
        duration: `${rand(24, 42)}s`,
        reverse: true,
        colorIdx: (i + 2) % 4,
      })),
    ],
    []
  );

  /* ── Falling petals ────────────────────────────── */
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: `petal-${i}`,
        left: `${rand(0, 100)}%`,
        size: rand(8, 18),
        delay: `${rand(0, 15)}s`,
        duration: `${rand(10, 22)}s`,
        color: ["#f9c6d3", "#fde2e4", "#fbc4ab", "#f4acb7", "#ffe5ec"][
          Math.floor(rand(0, 5))
        ],
      })),
    []
  );

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* ── Pink sunlight glow (top-right) ─────────── */}
      <div
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-pink-300/20 blur-3xl"
        style={{ animation: "sunlight-pulse 8s ease-in-out infinite" }}
      />

      {/* ── Rose glow (top-left) ───────────────────── */}
      <div
        className="absolute top-10 -left-24 w-[400px] h-[400px] rounded-full bg-rose-200/20 blur-3xl"
        style={{ animation: "sunlight-pulse 10s ease-in-out infinite 3s" }}
      />

      {/* ── Bottom blush glow ──────────────────────── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] rounded-full bg-pink-100/25 blur-3xl" />

      {/* ── Flying birds ─────────────────────────────── */}
      {birds.map((b) => {
        const colors = [
          "#e8739a",
          "#c084a0",
          "#a0727e",
          "#d4618c",
        ];
        return (
          <BirdSvg
            key={b.id}
            className="absolute"
            style={{
              top: b.top,
              width: b.size,
              height: b.size / 2,
              color: colors[b.colorIdx],
              animationName: b.reverse ? "flyAcrossReverse" : "flyAcross",
              animationDuration: b.duration,
              animationDelay: b.delay,
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
            }}
          />
        );
      })}

      {/* ── Falling petals ───────────────────────────── */}
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: "-20px",
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0,
            animationName: "petal-fall",
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}
        />
      ))}
    </div>
  );
}
