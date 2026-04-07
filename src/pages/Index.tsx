import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TransformationSection from "@/components/TransformationSection";
import FeaturesSection from "@/components/FeaturesSection";
import MaterialsSection from "@/components/MaterialsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import LocationSection from "@/components/LocationSection";
import FAQSection from "@/components/FAQSection";
import VideoSection from "@/components/VideoSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import TrendingDesignsSection from "@/components/TrendingDesignsSection";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;

    const ctx = gsap.context(() => {
      // Scroll-triggered background color transitions
      const bgSections = mainRef.current!.querySelectorAll<HTMLElement>("[data-bg]");

      bgSections.forEach((section) => {
        const bgColor = section.getAttribute("data-bg") || "#F9F8F6";

        ScrollTrigger.create({
          trigger: section,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => {
            gsap.to("body", {
              backgroundColor: bgColor,
              duration: 0.8,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          },
          onEnterBack: () => {
            gsap.to("body", {
              backgroundColor: bgColor,
              duration: 0.8,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          },
        });
      });

      // Smooth section transitions — subtle fade dividers
      mainRef.current!.querySelectorAll(".section-divider").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="overflow-x-hidden">
      <Navbar />
      <div data-bg="#F9F8F6">
        <HeroSection />
      </div>
      <div className="section-divider h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent mx-auto max-w-4xl" />
      <div data-bg="#F9F8F6">
        <TransformationSection />
      </div>
      <div className="section-divider h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent mx-auto max-w-4xl" />
      <div data-bg="#F5F3F0">
        <FeaturesSection />
      </div>
      <div data-bg="#F9F8F6">
        <VideoSection />
      </div>
      <div className="section-divider h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent mx-auto max-w-4xl" />
      <div data-bg="#F5F3F0">
        <MaterialsSection />
      </div>
      <div data-bg="#F9F8F6">
        <BeforeAfterSection />
      </div>
      <div data-bg="#F5F3F0">
        <TestimonialsSection />
      </div>
      <div className="section-divider h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent mx-auto max-w-4xl" />
      <div data-bg="#F9F8F6">
        <InteractiveShowcase />
      </div>
      <div data-bg="#1a1a1a">
        <TrendingDesignsSection />
      </div>
      <div data-bg="#0a0a0a">
        <LocationSection />
      </div>
      <div data-bg="#0a0a0a">
        <FAQSection />
      </div>
      <div data-bg="#1a1a1a">
        <CTASection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
