import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
  {
    title: "Modern Kitchen",
    category: "Kitchen Design",
    desc: "Sleek handleless cabinets with integrated lighting and premium stone countertops.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  },
  {
    title: "Minimalist Wardrobe",
    category: "Bedroom Storage",
    desc: "Floor-to-ceiling modular wardrobes with soft-close mechanisms and hidden drawers.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
  },
  {
    title: "Executive Office",
    category: "Workspace",
    desc: "Fold-away desk systems with cable management and acoustic paneling.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  },
  {
    title: "Living Room Unit",
    category: "Entertainment",
    desc: "Modular TV units with concealed storage, ambient backlighting, and wine rack integration.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  },
];

const InteractiveShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".showcase-header > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from(".showcase-accordion", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".showcase-accordion", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    setActiveIndex(index);
    const card = e.currentTarget;
    const img = card.querySelector(".card-img") as HTMLElement;
    const overlay = card.querySelector(".card-overlay") as HTMLElement;
    const content = card.querySelector(".card-content") as HTMLElement;
    const line = card.querySelector(".card-line") as HTMLElement;

    gsap.to(img, { scale: 1.15, duration: 0.8, ease: "power2.out" });
    gsap.to(overlay, { opacity: 1, duration: 0.4 });
    gsap.to(content, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.1 });
    if (line) gsap.to(line, { scaleX: 1, duration: 0.6, ease: "power3.out", delay: 0.2 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setActiveIndex(null);
    const card = e.currentTarget;
    const img = card.querySelector(".card-img") as HTMLElement;
    const overlay = card.querySelector(".card-overlay") as HTMLElement;
    const content = card.querySelector(".card-content") as HTMLElement;
    const line = card.querySelector(".card-line") as HTMLElement;

    gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
    gsap.to(overlay, { opacity: 0, duration: 0.3 });
    gsap.to(content, { y: 30, opacity: 0, duration: 0.3 });
    if (line) gsap.to(line, { scaleX: 0, duration: 0.3 });
  };

  return (
    <section ref={sectionRef} className="py-32 lg:py-44 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="showcase-header text-center mb-20">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-5">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-foreground leading-tight">
            Explore Our <span className="text-gradient-gold">Creations</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
            Hover to discover the details behind each design.
          </p>
        </div>

        <div className="showcase-accordion flex flex-col lg:flex-row gap-3 h-[500px] lg:h-[600px]">
          {showcaseItems.map((item, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-lg ${
                activeIndex === i ? "lg:flex-[4]" : activeIndex !== null ? "lg:flex-[0.7]" : "lg:flex-1"
              } ${activeIndex === i ? "flex-[3]" : "flex-1"}`}
              onMouseEnter={(e) => handleMouseEnter(i, e)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="card-img absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="card-overlay absolute inset-0 bg-charcoal/50 backdrop-blur-[3px] opacity-0" />

              <div className={`absolute bottom-0 left-0 right-0 p-6 z-10 transition-opacity duration-300 ${activeIndex === i ? "opacity-0" : "opacity-100"}`}>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">{item.category}</span>
                <h3 className="text-xl font-extrabold text-white mt-1">{item.title}</h3>
              </div>

              <div className="card-content absolute inset-0 flex flex-col items-center justify-center text-center px-8 translate-y-[30px] opacity-0 z-20">
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent mb-3">{item.category}</span>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-white mb-4">{item.title}</h3>
                <div className="card-line w-12 h-[2px] bg-accent mb-4 origin-left scale-x-0" />
                <p className="text-sm text-white/80 leading-relaxed max-w-xs">{item.desc}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-accent text-sm font-semibold group/link">
                  View Project
                  <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              <div className="absolute top-6 right-6 z-10 text-white/15 text-6xl font-black select-none">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveShowcase;
