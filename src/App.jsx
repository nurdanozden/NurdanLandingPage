import SpringBackground from "./components/StarBackground";
import HeroSection from "./components/HeroSection";
import LetterSection from "./components/LetterSection";
import AboutSection from "./components/AboutSection";
import GallerySection from "./components/GallerySection";
import SpriteAnimationSection from "./components/SpriteAnimationSection";
import PhotographySection from "./components/PhotographySection";

function App() {
  return (
    <>
      <SpringBackground />
      <main className="relative z-1">
        <HeroSection />
        <LetterSection />
        <AboutSection />
        <GallerySection />
        <SpriteAnimationSection />
        <PhotographySection />
      </main>
    </>
  );
}

export default App;
