import { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BeforeAfterSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(5, Math.min(95, x)));
  }, []);

  const onPointerDown = () => { dragging.current = true; };
  const onPointerUp = () => { dragging.current = false; };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) updatePosition(e.clientX);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ba-header > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".ba-slider", {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ba-slider", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 lg:py-44 bg-cream">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="ba-header text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-5">Transformation</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">
            Before & <span className="text-gradient-gold">After</span>
          </h2>
        </div>
        <div
          ref={containerRef}
          className="ba-slider relative w-full aspect-[16/9] rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-2xl border border-foreground/8"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onPointerMove={onPointerMove}
        >
          <div className="absolute inset-0 bg-charcoal flex items-center justify-center">
            <div className="text-center">
              <p className="text-accent text-sm tracking-[0.25em] uppercase mb-2">After</p>
              <p className="text-white text-2xl sm:text-4xl font-extrabold">Transformed</p>
              <p className="text-white/50 mt-2 text-sm">Modern, elegant, functional</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-muted flex items-center justify-center" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
            <div className="text-center">
              <p className="text-accent text-sm tracking-[0.25em] uppercase mb-2">Before</p>
              <p className="text-foreground text-2xl sm:text-4xl font-extrabold">Original Space</p>
              <p className="text-muted-foreground mt-2 text-sm">Untouched, waiting for design</p>
            </div>
          </div>
          <div className="absolute top-0 bottom-0 w-[2px] bg-accent z-10" style={{ left: `${position}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/30">
              <span className="text-white text-sm font-bold">⟷</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
