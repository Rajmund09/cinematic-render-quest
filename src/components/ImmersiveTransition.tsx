import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ImmersiveTransition = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        pin: true,
        pinSpacing: true,
      },
    });

    // Dark → light background transition
    tl.to(section, {
      backgroundColor: "hsl(40, 20%, 96%)",
      duration: 1,
    });

    // Text animations
    tl.fromTo(
      ".transition-text-1",
      { opacity: 0, y: 60, filter: "blur(12px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4 },
      0
    );
    tl.to(
      ".transition-text-1",
      { opacity: 0, y: -40, duration: 0.3 },
      0.45
    );
    tl.fromTo(
      ".transition-text-2",
      { opacity: 0, y: 60, filter: "blur(12px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4 },
      0.5
    );
    tl.to(
      ".transition-text-2",
      { opacity: 0, y: -40, duration: 0.3 },
      0.85
    );

    // Gradient line expands
    tl.fromTo(
      ".transition-line",
      { scaleX: 0 },
      { scaleX: 1, duration: 1 },
      0
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "hsl(220, 15%, 5%)" }}
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10 px-6">
        <p className="transition-text-1 font-serif text-3xl md:text-5xl lg:text-6xl leading-tight opacity-0">
          Where <span className="text-gradient-gold italic">Dark Luxury</span>
          <br />
          Meets Light
        </p>
        <p className="transition-text-2 font-serif text-2xl md:text-4xl mt-8 opacity-0" style={{ color: "hsl(220, 10%, 25%)" }}>
          Discover Our{" "}
          <span className="italic" style={{ color: "hsl(42, 65%, 45%)" }}>
            Collection
          </span>
        </p>
      </div>

      <div
        className="transition-line absolute bottom-1/4 left-0 right-0 h-[1px] origin-left"
        style={{ background: "var(--gradient-gold)" }}
      />
    </div>
  );
};

export default ImmersiveTransition;
