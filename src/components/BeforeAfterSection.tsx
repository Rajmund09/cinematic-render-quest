import { useRef, useState, useCallback } from "react";

const BeforeAfterSection = () => {
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

  return (
    <section className="py-32 lg:py-40 bg-cream">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-accent mb-4">Transformation</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">Before & After</h2>
        </div>
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onPointerMove={onPointerMove}
        >
          <div className="absolute inset-0 bg-charcoal flex items-center justify-center">
            <div className="text-center">
              <p className="text-accent text-sm tracking-[0.2em] uppercase mb-2">After</p>
              <p className="text-primary-foreground text-2xl sm:text-4xl font-bold">Transformed</p>
              <p className="text-primary-foreground/60 mt-2">Modern, elegant, functional</p>
            </div>
          </div>
          <div className="absolute inset-0 bg-muted flex items-center justify-center" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
            <div className="text-center">
              <p className="text-accent text-sm tracking-[0.2em] uppercase mb-2">Before</p>
              <p className="text-foreground text-2xl sm:text-4xl font-bold">Original Space</p>
              <p className="text-muted-foreground mt-2">Untouched, waiting for design</p>
            </div>
          </div>
          <div className="absolute top-0 bottom-0 w-1 bg-accent z-10" style={{ left: `${position}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-lg">
              <span className="text-primary-foreground text-xs font-bold">⟷</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
