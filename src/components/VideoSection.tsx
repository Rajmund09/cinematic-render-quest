import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Video scale-up on scroll
      gsap.fromTo(
        ".video-frame",
        { scale: 0.85, borderRadius: "40px" },
        {
          scale: 1,
          borderRadius: "0px",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 10%",
            scrub: 1,
          },
        }
      );

      // Text content reveal
      gsap.from(".video-content > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: { trigger: ".video-content", start: "top 85%" },
      });

      // Stats counter animation
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
    <section ref={sectionRef} className="relative bg-cream">
      {/* Full-width video with cinematic scaling */}
      <div className="video-frame relative w-full h-[60vh] lg:h-[85vh] overflow-hidden">
        <video
          ref={videoRef}
          src="/kitchen.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        {/* Centered text on video */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-accent mb-5">Immersive Experience</p>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight max-w-4xl">
              Where Design
              <br />
              <span className="text-gradient-gold">Meets Craft</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Content below video */}
      <div className="video-content max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
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

          {/* Stats */}
          <div className="video-stats grid grid-cols-2 gap-6">
            {[
              { value: "500+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "15+", label: "Years Experience" },
              { value: "40+", label: "Material Options" },
            ].map((stat, i) => (
              <div
                key={i}
                className="video-stat group p-6 rounded-2xl bg-background border border-border/60 hover:border-accent/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 text-center"
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
