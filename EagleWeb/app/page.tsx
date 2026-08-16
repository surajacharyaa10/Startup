import Hero from "./Components/Hero/page";
import About from "./Components/About/page";
import Services from "./Components/Servises/page";
import Stats from "./Components/Stats/page";
import Testimonials from "./Components/Testimonials/page";
import FAQ from "./Components/FAQ/page";
import CTA from "./Components/CTA/page";
import ParticleBackground from "./Components/shared/ParticleBackground";
import ScrollProgress from "./Components/shared/ScrollProgress";
import CustomCursor from "./Components/shared/CustomCursor";
import Founder from "./Components/Founder/page";

export default function Home() {
  return (
    <div className="bg-black min-h-screen relative">
      <ScrollProgress />
      <CustomCursor />
      <ParticleBackground />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Founder />
      <Testimonials />
      <FAQ />
      <CTA />
    </div>
  );
}
