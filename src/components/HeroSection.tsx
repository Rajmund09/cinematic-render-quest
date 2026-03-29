import { useEffect, useRef } from "react";
import Scene3D from "./Scene3D";
import heroImage from "@/assets/hero-interior.jpg";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrollY = window.scrollY;
      const overlay = sectionRef.current.querySelector(".hero-overlay") as HTMLElement;
      if (overlay) {
        overlay.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="hero-overlay absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-background/80" />

      {/* Split layout: text left, 3D right */}
      <div className="relative z-10 flex flex-col md:flex-row items-center h-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Left: Text content */}
        <div className="flex-1 flex flex-col justify-center md:pr-8 text-center md:text-left pt-20 md:pt-0">
          <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            Luxury Interior Design Studio
          </p>
          <h1
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-medium leading-[0.95] mb-8 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            Where Vision
            <br />
            <span className="text-gradient-gold italic">Becomes Space</span>
          </h1>
          <p
            className="max-w-md text-sm text-muted-foreground leading-relaxed mb-12 animate-fade-up mx-auto md:mx-0"
            style={{ animationDelay: "0.7s" }}
          >
            Crafting bespoke interiors that transcend the ordinary — where every detail tells your story.
          </p>
          <div className="animate-fade-up" style={{ animationDelay: "0.9s" }}>
            <button className="btn-premium">
              <span>Explore Our World</span>
            </button>
          </div>
        </div>

        {/* Right: 3D Model */}
        <div className="flex-1 relative h-[40vh] md:h-full w-full">
          <Scene3D />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: "1.5s" }}>
        <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
