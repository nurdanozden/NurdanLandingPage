import SpringBackground from "./components/StarBackground";
import HeroSection from "./components/HeroSection";
import LetterSection from "./components/LetterSection";
import AboutSection from "./components/AboutSection";
import HobbiesSection from "./components/HobbiesSection";
import PhotographySection from "./components/PhotographySection";

function App() {
  return (
    <>
      <SpringBackground />
      <main className="relative z-1">
        <HeroSection />
        <LetterSection />
        <AboutSection />
        <HobbiesSection />
        <PhotographySection />
      </main>
    </>
  );
}

export default App;
