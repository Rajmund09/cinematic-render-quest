import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax video movement
      gsap.to(".video-bg", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Text content reveal
      gsap.from(".video-text > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: { trigger: ".video-text", start: "top 85%" },
      });

      // Stats animation
      gsap.from(".video-stat", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".video-stats", start: "top 90%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-cream overflow-hidden">
      {/* Full-bleed video as background — no border, no frame, seamless */}
      <div className="relative w-full h-[70vh] lg:h-[90vh] overflow-hidden">
        <video
          src="/kitchen.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="video-bg absolute inset-0 w-full h-[120%] object-cover"
        />
        {/* Cinematic overlays to blend into the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-transparent to-cream pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/40 via-transparent to-cream/40 pointer-events-none" />
        <div className="absolute inset-0 bg-foreground/5 mix-blend-multiply pointer-events-none" />

        {/* Centered text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="video-text text-center px-6">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-5">
              Immersive Experience
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-foreground leading-tight max-w-4xl">
              Where Design
              <br />
              <span className="text-gradient-gold">Meets Craft</span>
            </h2>
            <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Every detail is rendered with precision — from material
              grain to ambient lighting.
            </p>
            <div className="mt-8 w-16 h-[2px] bg-accent/40 mx-auto rounded-full" />
          </div>
        </div>
      </div>

      {/* Stats & process content below */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-accent mb-5">Our Process</p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight mb-6">
              Every detail is rendered with <span className="text-gradient-gold">precision</span>
            </h3>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
              From material grain to ambient lighting, our team obsesses over every element.
              We use advanced 3D visualization to perfect designs before a single cut is made,
              ensuring your vision comes to life exactly as imagined.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              The result? Spaces that don't just look beautiful — they feel inevitable,
              as if they were always meant to exist.
            </p>
          </div>

          <div className="video-stats grid grid-cols-2 gap-6">
            {[
              { value: "500+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "15+", label: "Years Experience" },
              { value: "40+", label: "Material Options" },
            ].map((stat, i) => (
              <div
                key={i}
                className="video-stat group p-6 rounded-2xl bg-white border border-foreground/8 shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(140,90,60,0.08)] text-center"
              >
                <span className="block text-3xl lg:text-4xl font-black text-foreground group-hover:text-accent transition-colors duration-500">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground tracking-wider uppercase mt-2 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
