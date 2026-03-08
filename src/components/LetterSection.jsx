import { motion } from "framer-motion";

const LETTER_PARAGRAPHS = [
  {
    text: "Sevgili Ziyaretçi,",
    className: "text-xl sm:text-2xl font-semibold text-rose-500 mb-2",
  },
  {
    text: "Bu sayfayı sana özel hazırladım. 💌\nBelki burada birkaç satır okursun, 📖\nbelki fotoğraflara göz atarsın, 🖼️\nbelki de sadece kuşları izlersin… 🕊️",
  },
  {
    text: "Her ne yaparsan yap, hoş geldin! 🌸",
    className: "text-lg sm:text-xl font-medium text-rose-400",
  },
  {
    text: "Bilgisayar mühendisliği 3. öğrencisiyim 👩‍💻 ve fikirleri gerçek çalışan projelere dönüştürmeyi seviyorum. 💡✨",
  },
  {
    text: "Sistemlerin perde arkasında nasıl çalıştığını keşfetmek hoşuma gidiyor — özellikle API'ler, veritabanları ve her şeyi birbirine bağlayan o mantık kısmı. 🛠️ Kod yazmak benim için biraz bulmaca çözmek gibi: bazen sinir bozucu ama çözüldüğünde inanılmaz tatmin edici. 🧩✨",
  },
  {
    text: "Kod yazmadığım zamanlarda genelde yeni bir şey öğreniyor 📚, projelerimi geliştirmeye devam ediyor ⚡ ya da sıradaki fikrimi düşünürken buluyorum kendimi. 💭",
  },
  {
    text: "Buraya kadar geldiyseniz projelerime göz atmayı unutmayın. Belki bir sonraki proje şu ankinden bile daha iyidir. 🚀🔥",
  },
  {
    text: "Sevgilerle,\nNurdan 💛",
    className: "text-lg sm:text-xl font-semibold text-rose-500 mt-2",
  },
];

export default function LetterSection() {
  return (
    <section
      id="letter"
      className="relative z-1 flex items-center justify-center min-h-screen px-4 py-24"
    >
      {/* Warm radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-full max-w-2xl"
      >
        {/* Paper card */}
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-pink-200/70 p-8 sm:p-12 shadow-xl shadow-pink-100/40">
          {/* Corner florals */}
          <span className="absolute -top-4 -left-4 text-3xl select-none opacity-80 rotate-[-20deg]">🌸</span>
          <span className="absolute -top-4 -right-4 text-3xl select-none opacity-80 rotate-[20deg]">🌷</span>
          <span className="absolute -bottom-4 -left-4 text-2xl select-none opacity-70 rotate-[12deg]">🌿</span>
          <span className="absolute -bottom-4 -right-4 text-2xl select-none opacity-70 rotate-[-12deg]">🌺</span>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">✉️</span>
            <div className="flex-1 h-px bg-gradient-to-r from-pink-300/60 via-rose-200/50 to-transparent" />
          </div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold italic mb-8 text-[var(--color-text-heading)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Sana Bir Mektup
          </motion.h2>

          {/* Paragraphs with stagger */}
          <div className="flex flex-col gap-5">
            {LETTER_PARAGRAPHS.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.55, ease: "easeOut" }}
                className={
                  p.className ??
                  "text-base sm:text-lg leading-relaxed text-stone-600"
                }
                style={{
                  fontFamily: "var(--font-handwriting)",
                  fontSize: p.className ? undefined : "1.15rem",
                  whiteSpace: "pre-wrap",
                }}
              >
                {p.text}
              </motion.p>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-10 flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300/50 to-transparent" />
            <span className="text-lg text-pink-300 select-none">❀</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-pink-300/50 to-transparent" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
