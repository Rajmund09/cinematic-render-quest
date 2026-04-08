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

    // Responsive-aware matchMedia for mobile vs desktop scroll triggers
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add(
        {
          isMobile: "(max-width: 767px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isDesktop: "(min-width: 1024px)",
        },
        (context) => {
          const { isMobile, isTablet } = context.conditions!;

          // Adjust trigger points based on device
          const enterStart = isMobile ? "top 80%" : isTablet ? "top 70%" : "top 60%";
          const enterEnd = isMobile ? "bottom 20%" : isTablet ? "bottom 30%" : "bottom 40%";
          const bgDuration = isMobile ? 0.5 : 0.8;

          // Scroll-triggered background + text color transitions
          const bgSections = mainRef.current!.querySelectorAll<HTMLElement>("[data-bg]");

          bgSections.forEach((section) => {
            const bgColor = section.getAttribute("data-bg") || "#F9F8F6";
            const isDark = ["#1a1a1a", "#0a0a0a", "#111111", "#000000"].includes(bgColor);
            const textColor = isDark ? "#f5f5f5" : "#1a1a1a";

            // Smooth scrub-based color interpolation
            gsap.to("body", {
              backgroundColor: bgColor,
              color: textColor,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: enterStart,
                end: "top 20%",
                scrub: isMobile ? 0.8 : 1.2,
              },
            });

            // Callback-based for precise snapping on enter/leave
            ScrollTrigger.create({
              trigger: section,
              start: enterStart,
              end: enterEnd,
              onEnter: () => {
                gsap.to("body", {
                  backgroundColor: bgColor,
                  color: textColor,
                  duration: bgDuration,
                  ease: "power2.inOut",
                  overwrite: "auto",
                });
                // Update navbar awareness
                document.documentElement.setAttribute("data-theme-zone", isDark ? "dark" : "light");
              },
              onEnterBack: () => {
                gsap.to("body", {
                  backgroundColor: bgColor,
                  color: textColor,
                  duration: bgDuration,
                  ease: "power2.inOut",
                  overwrite: "auto",
                });
                document.documentElement.setAttribute("data-theme-zone", isDark ? "dark" : "light");
              },
            });
          });

          // Section reveal animations
          mainRef.current!.querySelectorAll<HTMLElement>("[data-bg]").forEach((section) => {
            const children = section.querySelectorAll("h1, h2, h3, p, .animate-on-scroll");
            if (children.length) {
              gsap.from(children, {
                y: isMobile ? 30 : 50,
                opacity: 0,
                duration: isMobile ? 0.6 : 0.9,
                stagger: 0.08,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: section,
                  start: isMobile ? "top 90%" : "top 80%",
                },
              });
            }
          });

          // Dividers
          mainRef.current!.querySelectorAll(".section-divider").forEach((el) => {
            gsap.from(el, {
              scaleX: 0,
              duration: isMobile ? 0.8 : 1.2,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 92%" },
            });
          });

          // Parallax overlays on dark sections
          if (!isMobile) {
            mainRef.current!.querySelectorAll<HTMLElement>(".parallax-overlay").forEach((el) => {
              gsap.to(el, {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.5,
                },
              });
            });
          }
        }
      );
    }, mainRef);

    // Refresh on resize for responsive recalculation
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      mm.revert();
      ctx.revert();
    };
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
