import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { AuroraBackground } from "@/components/ui/aurora-background";

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [typedLine1, setTypedLine1] = useState("");
  const [typedLine2, setTypedLine2] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const text1 = "Transform Spaces.";
    const text2 = "Redefine Living.";

    const typeText = async () => {
      await new Promise((r) => setTimeout(r, 600));
      for (let i = 0; i <= text1.length; i++) {
        if (!isMounted) return;
        setTypedLine1(text1.substring(0, i));
        await new Promise((r) => setTimeout(r, 50));
      }
      await new Promise((r) => setTimeout(r, 200));
      for (let i = 0; i <= text2.length; i++) {
        if (!isMounted) return;
        setTypedLine2(text2.substring(0, i));
        await new Promise((r) => setTimeout(r, 50));
      }
    };

    typeText();
    const cursorInterval = setInterval(() => setShowCursor((prev) => !prev), 500);

    return () => {
      isMounted = false;
      clearInterval(cursorInterval);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(videoContainerRef.current, {
        scale: 0.8,
        opacity: 0,
        rotateY: -30,
        rotateX: 15,
        duration: 1.8,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(headlineRef.current, { y: 60, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.6 });
      gsap.from(subtextRef.current, { y: 40, opacity: 0, duration: 1, ease: "power3.out", delay: 0.9 });
      gsap.from(ctaRef.current, { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 1.2 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = videoContainerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(container, { rotateY: x * 12, rotateX: -y * 8, duration: 0.6, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(container, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      <AuroraBackground className="min-h-screen w-full flex items-center pt-20 bg-cream" showRadialGradient={true}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-1 hero-3d-perspective">
            <div ref={videoContainerRef} className="hero-3d-video-container">
              <div className="hero-glow-ring" />
              <div className="hero-video-wrapper relative p-4 bg-transparent border-0 shadow-none">
                <video src="/hero-video.mp4" autoPlay loop muted playsInline className="hero-video-element mix-blend-multiply" />
              </div>
            </div>
          </div>

          <div className="order-2 flex flex-col gap-8">
            <h1 ref={headlineRef} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight">
              <span className="!text-foreground">{typedLine1 || "\u00A0"}</span>
              <br />
              <span className="text-[#8C5A3C]">
                {typedLine2 || (typedLine1 === "Transform Spaces." ? "" : "\u00A0")}
                <span className={`font-light transition-opacity duration-100 ${showCursor ? "opacity-100" : "opacity-0"}`}>|</span>
              </span>
            </h1>
            <p ref={subtextRef} className="text-lg lg:text-xl font-bold text-muted-foreground max-w-lg leading-relaxed">
              Experience next-generation modular interiors engineered with precision and elegance.
            </p>
            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-[#8C5A3C] text-white hover:bg-[#7A4E34] rounded-full px-8 text-base font-semibold">
                Explore Designs
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base font-semibold border-2 border-foreground/20 hover:border-foreground/40">
                Get Quote
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-8 right-8 z-[100] flex items-center justify-center">
        <div className="absolute right-[100%] flex items-center mr-4 cursor-default animate-in fade-in duration-500 pointer-events-none">
          <div className="bg-white text-gray-800 text-[15px] font-medium px-5 py-2.5 rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] whitespace-nowrap">Contact Us</div>
          <div className="w-0 h-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-white -ml-[1px]" />
        </div>
        <div className="absolute inset-[-24px] bg-[#25D366]/10 rounded-full animate-pulse pointer-events-none" />
        <div className="absolute inset-[-12px] bg-[#25D366]/20 rounded-full pointer-events-none" />
        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="relative bg-[#25D366] text-white p-4 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer" aria-label="Contact us on WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </a>
      </div>
      </AuroraBackground>
    </section>
  );
};

export default HeroSection;
