# Nurdan — Kişisel Landing Page Teknik Dokümanı

## Proje Özeti

React + Tailwind CSS ile yazılmış, tek sayfalık (SPA) kişisel tanıtım sitesi. Hafif, abartısız ama esprili bir ton benimsenmiştir. Arka plan `#0F172A` (koyu lacivert) üzerine inşa edilmiş; tüm sayfa boyunca kayan yıldız animasyonu çalışır. Her bölüm ayrı bir React component'tır.

---

## Teknoloji Yığını

| Katman | Araç |
|---|---|
| UI Framework | React 18 (Vite veya CRA) |
| Stil | Tailwind CSS |
| Animasyon | CSS keyframes + Tailwind `animate-*` |
| Sprite Animasyon | Vanilla JS / requestAnimationFrame |
| Bundler | Vite (tercih edilir) |

---

## Dosya Yapısı

```
src/
├── assets/
│   ├── letter.txt          # Mektup metni (düz metin)
│   └── gallery/
│       ├── 1.jpg
│       ├── 2.jpg
│       └── ...             # Tüm fotoğraflar sırayla numaralandırılmış
│       └── sprite.png      # Sprite sheet (animasyon için)
├── components/
│   ├── StarBackground.jsx  # Kayan yıldızlar (tüm sayfanın arkasında fixed)
│   ├── HeroSection.jsx     # Tam ekran giriş bölümü
│   ├── LetterSection.jsx   # Mektup bölümü
│   ├── AboutSection.jsx    # Kişisel bilgi kartları
│   ├── GallerySection.jsx  # Yatay kayan fotoğraf galerisi
│   └── SpriteSection.jsx   # Sprite sheet animasyon oynatıcı
├── App.jsx
└── main.jsx
```

---

## Tasarım Kılavuzu

### Renk Paleti

| Değişken | Değer | Kullanım |
|---|---|---|
| `--bg-base` | `#0F172A` | Sayfa arka planı |
| `--accent` | `#38BDF8` (sky-400) veya tercihe göre | Vurgu rengi, butonlar |
| `--text-primary` | `#F1F5F9` | Ana metin |
| `--text-muted` | `#94A3B8` | Yardımcı metin |
| `--card-bg` | `#1E293B` | Kart arka planı |

### Tipografi
- Başlıklar için Google Fonts'tan **Space Grotesk** veya **Syne** gibi karakterli bir font
- Gövde metni için **DM Sans** veya **Plus Jakarta Sans**

---

## Bileşen Detayları

### `StarBackground.jsx`
- `position: fixed`, `z-index: 0`, tüm viewport'u kaplar
- 80–150 adet rastgele boyut + pozisyonda `<span>` veya `<div>` noktası
- CSS `@keyframes twinkle` + `@keyframes drift` ile hafif kaydırma animasyonu
- Her yıldıza farklı `animation-delay` ve `animation-duration` atanır

### `HeroSection.jsx`
- `min-height: 100vh`, `display: flex`, dikey + yatay ortala
- **Headline:** `"MERHABA BEN NURDAN"` — büyük, bold, tek satır
- **Alt metin:** `"Beni tanımak ister misiniz?"` — muted renkte, italic
- **CTA Butonu:** `"Beni Tanı"` → LetterSection'a smooth scroll
- **Mini Esprili Buton:** `"Beni Hack'le"` → tıklanınca `<Modal>` açar
  - Modal içeriği: `"Benim sitem kolay kolay çökertilemez 😉"`
  - Modal kapanma: backdrop click veya "Tamam" butonu

### `LetterSection.jsx`
- `/assets/letter.txt` içeriği `fetch` veya `import` ile okunur
- Kağıt/mektup estetiğinde bir kart: hafif sarımsı veya beyaz arka plan, el yazısı benzeri font (`Caveat` veya `Kalam` Google Font)
- Üstte zarf ikonu veya dekoratif çizgi
- Mektup metni `white-space: pre-wrap` ile satır sonlarına saygı göstererek render edilir

### `AboutSection.jsx`
Aşağıdaki veriler kart grid'inde gösterilir:

| Alan | Değer |
|---|---|
| Doğum Tarihi | 14 Ocak 2004 |
| Memleket | Sakarya |
| Üniversite | Çanakkale Onsekiz Mart Üniversitesi, Bilgisayar Mühendisliği |
| Teknolojiler | .NET, HTML, CSS, JavaScript |
| Burç | Oğlak ☀️ / Yükselen: Akrep — *"Hırslıyımdır 😉"* |

- Her kart: ikon + başlık + değer yapısında
- Hover'da hafif `scale` veya `glow` efekti
- Grid: mobilde 1 sütun, tablette 2, masaüstünde 3

### `GallerySection.jsx`
- `/assets/gallery/1.jpg`, `2.jpg`, ... dosyaları bir dizi olarak tanımlanır
- **Yatay otomatik kayan** (marquee/carousel) animasyon
- İki yöntem seçeneği:
  - CSS `@keyframes scroll-x` ile sonsuz döngü (tercih edilir, lightweight)
  - veya `overflow-x: auto` ile kullanıcı scroll'u
- Görseller `object-fit: cover`, sabit yükseklik (ör. 280px), değişken genişlik
- Görsellere tıklanınca lightbox açılabilir (opsiyonel)

### `SpriteSection.jsx`
- `/assets/gallery/sprite.png` bir sprite sheet olarak kullanılır
- İlk kare (frame 0) default görüntü olarak gösterilir
- Kareye tıklandığında `requestAnimationFrame` veya `setInterval` ile `background-position` kaydırılarak animasyon oynatılır
- **Gerekli prop/config:**
  - `frameWidth`: Tek kare genişliği (px)
  - `frameHeight`: Tek kare yüksekliği (px)
  - `frameCount`: Toplam kare sayısı
  - `fps`: Saniyedeki kare sayısı (ör. 12)
- Animasyon bittikten sonra ilk kareye döner veya loop eder (tercih edilebilir)

> ⚠️ **Not:** Sprite sheet kare boyutları ve toplam kare sayısı görselin gerçek boyutlarına göre ayarlanmalıdır.

---

## Genel Notlar

- `App.jsx` içinde tüm section component'ları sırayla render edilir; `StarBackground` ise hepsinin arkasında `fixed` olarak bulunur
- Section'lar arası geçiş: Her section `position: relative`, `z-index: 1`
- Smooth scroll: `scroll-behavior: smooth` CSS veya `scrollIntoView({ behavior: 'smooth' })`
- Responsive: Tailwind breakpoint'leri (`sm`, `md`, `lg`) kullanılır
- Accessibility: Butonlarda `aria-label`, görsellerde `alt` metni eklenmeli
- Letter.txt yüklenemezse fallback metin göster

---

## Varlık Listesi (Assets)

Aşağıdaki dosyaların proje başlamadan önce hazır olması gerekir:

- [ ] `/src/assets/letter.txt` — Nurdan'ın mektup metni
- [ ] `/src/assets/gallery/1.jpg` ... `N.jpg` — Fotoğraflar
- [ ] `/src/assets/gallery/sprite.png` — Sprite sheet (kare boyutları not edilmeli)