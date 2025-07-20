import CustomCursor from "./components/CustomCursor";
import GridBackground from "./components/GridBackground";
import Header from "./components/Header";
import ScrollIndicator from "./components/ScrollIndicator";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import FooterSection from "./components/sections/FooterSection";
import HeroSection from "./components/sections/HeroSection";
import SkillSection from "./components/sections/SkillSection";
import WormEffect from "./components/WormEffect";

function App() {
  return (
    <div className="relative w-full h-full bg-surface-950 text-surface-50 font-sans flex flex-col items-center">
      <div className="container relative">
        <Header />
        <ScrollIndicator />
        <CustomCursor />
        <GridBackground />

        <main className="w-full">
          <HeroSection />
          <AboutSection />
          <SkillSection />
          <ContactSection />
          <FooterSection />
        </main>
      </div>
      <WormEffect
        colors={["#00f5ff", "#7ffc90", "#3dffa5", "#00ffe1"]}
        particleCount={15}
        speed={0.8}
      />
    </div>
  );
}

export default App;
