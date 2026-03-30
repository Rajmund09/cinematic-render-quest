import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene3D from "./Scene3D";
import heroImage from "@/assets/hero-interior.jpg";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Parallax background
    tl.to(".hero-bg", { y: 200, scale: 1.1 }, 0);
    // Fade out content on scroll
    tl.to(".hero-content", { y: -80, opacity: 0 }, 0);
    // Zoom camera forward
    tl.to(".hero-3d", { scale: 1.3, opacity: 0.3 }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-background/70" />

      {/* 3D Scene */}
      <div className="hero-3d absolute inset-0 will-change-transform">
        <Scene3D />
      </div>

      {/* Content */}
      <div className="hero-content relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <p
          className="text-xs tracking-[0.4em] uppercase text-primary mb-6 opacity-0"
          style={{ animation: "fade-up 0.8s ease-out 0.3s forwards" }}
        >
          Luxury Interior Design Studio
        </p>
        <h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium leading-[0.95] mb-8 opacity-0"
          style={{ animation: "fade-up 0.8s ease-out 0.5s forwards" }}
        >
          Where Vision
          <br />
          <span className="text-gradient-gold italic">Becomes Space</span>
        </h1>
        <p
          className="max-w-md text-sm text-muted-foreground leading-relaxed mb-12 opacity-0"
          style={{ animation: "fade-up 0.8s ease-out 0.7s forwards" }}
        >
          Crafting bespoke interiors that transcend the ordinary — where every detail tells your story.
        </p>
        <div className="opacity-0" style={{ animation: "fade-up 0.8s ease-out 0.9s forwards" }}>
          <button className="btn-premium group">
            <span>Explore Our World</span>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        style={{ animation: "fade-up 0.8s ease-out 1.5s forwards" }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
