import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const materials = [
  {
    name: "Solid Oak",
    desc: "Warm, durable hardwood with natural grain patterns that age beautifully over decades.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    texture: "Natural Grain",
    origin: "European Forests",
  },
  {
    name: "Italian Marble",
    desc: "Luxurious Carrara marble surfaces for countertops and accent features with unique veining.",
    image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=600&q=80",
    texture: "Veined Polish",
    origin: "Carrara, Italy",
  },
  {
    name: "Matte Lacquer",
    desc: "Silky-smooth anti-fingerprint finish in a curated palette of neutrals and bold accents.",
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80",
    texture: "Satin Smooth",
    origin: "German Engineering",
  },
  {
    name: "Brushed Brass",
    desc: "Warm metallic accents hand-finished to create subtle highlights and tactile luxury.",
    image: "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=600&q=80",
    texture: "Brushed Metal",
    origin: "Artisan Workshop",
  },
];

const MaterialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".mat-header > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from(".material-card", {
        y: 100,
        opacity: 0,
        rotateX: 8,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mat-grid", start: "top 88%" },
      });

      gsap.to(".mat-bg-element", {
        y: -50,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleHover = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredIndex(index);
    const card = e.currentTarget;
    const img = card.querySelector(".mat-img") as HTMLElement;
    const overlay = card.querySelector(".mat-overlay") as HTMLElement;
    const details = card.querySelector(".mat-details") as HTMLElement;

    gsap.to(img, { scale: 1.12, duration: 0.8, ease: "power2.out" });
    gsap.to(overlay, { opacity: 1, duration: 0.4 });
    gsap.to(details, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.1 });
  };

  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredIndex(null);
    const card = e.currentTarget;
    const img = card.querySelector(".mat-img") as HTMLElement;
    const overlay = card.querySelector(".mat-overlay") as HTMLElement;
    const details = card.querySelector(".mat-details") as HTMLElement;

    gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
    gsap.to(overlay, { opacity: 0, duration: 0.3 });
    gsap.to(details, { y: 20, opacity: 0, duration: 0.3 });
  };

  return (
    <section ref={sectionRef} id="materials" className="relative py-32 lg:py-44 bg-background overflow-hidden">
      <div className="mat-bg-element absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="mat-header text-center mb-20">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-5">
            Materials & Finishes
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-foreground leading-tight">
            Crafted from the <span className="text-gradient-gold">Finest</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We source only the highest-quality materials from trusted artisans and suppliers worldwide.
          </p>
        </div>

        <div className="mat-grid grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {materials.map((m, i) => (
            <div
              key={i}
              className="material-card group relative h-[400px] lg:h-[480px] rounded-3xl overflow-hidden cursor-pointer shadow-lg"
              onMouseEnter={(e) => handleHover(i, e)}
              onMouseLeave={handleLeave}
            >
              <img
                src={m.image}
                alt={m.name}
                loading="lazy"
                className="mat-img absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

              <div className="mat-overlay absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0" />

              <div className={`absolute bottom-0 left-0 right-0 p-6 z-10 transition-opacity duration-300 ${hoveredIndex === i ? "opacity-0" : "opacity-100"}`}>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">{m.texture}</span>
                <h3 className="text-2xl font-extrabold text-white mt-1">{m.name}</h3>
              </div>

              <div className="mat-details absolute inset-0 flex flex-col items-center justify-center text-center px-6 translate-y-[20px] opacity-0 z-20">
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent mb-3">{m.origin}</span>
                <h3 className="text-2xl font-extrabold text-white mb-2">{m.name}</h3>
                <div className="w-10 h-[2px] bg-accent mb-4" />
                <p className="text-sm text-white/80 leading-relaxed max-w-[220px]">{m.desc}</p>
                <div className="mt-5 px-5 py-2 border border-white/30 rounded-full text-xs text-white/90 font-semibold tracking-wider uppercase hover:bg-white/10 transition-colors">
                  Explore
                </div>
              </div>

              <div className="absolute top-5 right-5 z-10 text-white/15 text-5xl font-black select-none">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialsSection;
