import { useState, useCallback } from "react";
import { useLenis } from "@/hooks/useLenis";
import { useGSAPScrollAnimations } from "@/hooks/useGSAPScrollAnimations";
import PageLoader from "@/components/PageLoader";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ImmersiveTransition from "@/components/ImmersiveTransition";
import ShowcaseSection from "@/components/ShowcaseSection";
import AboutSection from "@/components/AboutSection";
import ProcessSection from "@/components/ProcessSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const handleLoaded = useCallback(() => setLoaded(true), []);

  useLenis();
  useGSAPScrollAnimations();

  return (
    <>
      <PageLoader onComplete={handleLoaded} />
      {loaded && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>
            <HeroSection />
            <ImmersiveTransition />
            <ShowcaseSection />
            <AboutSection />
            <ProcessSection />
            <PortfolioSection />
            <TestimonialsSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

export default Index;
