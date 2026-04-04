import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    title: "Living Room",
    desc: "Modular sofas and storage that transform open spaces into organized sanctuaries.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  },
  {
    title: "Kitchen",
    desc: "Precision-engineered cabinetry with hidden compartments and seamless finishes.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  },
  {
    title: "Bedroom",
    desc: "Wall beds and wardrobe systems that double your usable floor space.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
  },
  {
    title: "Office",
    desc: "Compact workstations that fold away completely, restoring your living space.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
];

const ShowcaseSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const totalScroll = track.scrollWidth - window.innerWidth;

      // Horizontal scroll pinned section
      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${totalScroll}`,
        },
      });

      // Individual panel content animations
      track.querySelectorAll(".hscroll-panel").forEach((panel) => {
        const content = panel.querySelector(".panel-content");
        if (content) {
          gsap.from(content, {
            x: 80,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: gsap.getById?.("horizontalScroll") || undefined,
              start: "left 80%",
              toggleActions: "play none none none",
            },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="overflow-hidden bg-charcoal">
      <div ref={trackRef} className="flex h-screen w-max">
        {panels.map((p, i) => (
          <div
            key={i}
            className="hscroll-panel relative flex items-center justify-center w-screen h-screen flex-shrink-0"
          >
            {/* Background image */}
            <img
              src={p.image}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/60 to-charcoal/90" />

            {/* Content */}
            <div className="panel-content relative z-10 text-center px-8 max-w-2xl">
              <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-5">
                {`0${i + 1}`}
              </p>
              <h3 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6">
                {p.title}
              </h3>
              <p className="text-lg text-white/60 leading-relaxed max-w-lg mx-auto">
                {p.desc}
              </p>
              <div className="mt-8 w-16 h-[2px] bg-accent/50 mx-auto rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShowcaseSection;
