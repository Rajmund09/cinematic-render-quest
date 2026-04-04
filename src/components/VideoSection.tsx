import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax video
      gsap.to(".video-inner", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Text reveal
      gsap.from(".video-text > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });

      // Floating decorative elements
      gsap.to(".video-float-1", {
        y: -30,
        rotation: 8,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
      });
      gsap.to(".video-float-2", {
        y: 40,
        rotation: -5,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[80vh] lg:h-screen overflow-hidden">
      {/* Video background with camouflage effect */}
      <div className="absolute inset-0">
        <div className="video-inner absolute inset-[-15%] w-[130%] h-[130%]">
          <video
            ref={videoRef}
            src="/kitchen.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay layers to make it look like a 3D model render */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/80 via-transparent to-cream/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/60 via-transparent to-cream/60" />
        <div className="absolute inset-0 mix-blend-overlay bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--cream))_100%)]" />
        
        {/* Vignette to mask edges */}
        <div className="absolute inset-0 shadow-[inset_0_0_120px_60px_hsl(var(--cream))]" />

        {/* Grain/texture overlay for 3D render feel */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating decorative elements */}
      <div className="video-float-1 absolute top-[15%] right-[10%] w-32 h-32 rounded-full border border-accent/20 pointer-events-none" />
      <div className="video-float-2 absolute bottom-[20%] left-[8%] w-24 h-24 rounded-full bg-accent/5 blur-xl pointer-events-none" />

      {/* Content overlay */}
      <div className="video-text relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-6">Immersive Experience</p>
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-foreground leading-tight max-w-4xl">
          Where Design
          <br />
          <span className="text-gradient-gold">Meets Craft</span>
        </h2>
        <p className="mt-8 text-lg text-muted-foreground max-w-lg leading-relaxed">
          Every detail is rendered with precision — from material grain to ambient lighting.
        </p>
        <div className="mt-8 w-20 h-[2px] bg-accent/40 rounded-full" />
      </div>
    </section>
  );
};

export default VideoSection;
