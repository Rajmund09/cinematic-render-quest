import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const showcaseItems = [
  {
    title: "Modern Kitchen",
    category: "Kitchen Design",
    desc: "Sleek handleless cabinets with integrated lighting and premium stone countertops.",
    gradient: "from-[#8C5A3C]/20 to-accent/10",
  },
  {
    title: "Minimalist Wardrobe",
    category: "Bedroom Storage",
    desc: "Floor-to-ceiling modular wardrobes with soft-close mechanisms and hidden drawers.",
    gradient: "from-accent/15 to-[#8C5A3C]/10",
  },
  {
    title: "Executive Office",
    category: "Workspace",
    desc: "Fold-away desk systems with cable management and acoustic paneling.",
    gradient: "from-[#8C5A3C]/15 to-accent/20",
  },
  {
    title: "Living Room Unit",
    category: "Entertainment",
    desc: "Modular TV units with concealed storage, ambient backlighting, and wine rack integration.",
    gradient: "from-accent/10 to-[#8C5A3C]/15",
  },
];

const InteractiveShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".showcase-header > *", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      document.querySelectorAll(".hover-card").forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          scale: 0.95,
          duration: 0.9,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const overlay = card.querySelector(".card-overlay");
    const content = card.querySelector(".card-reveal");
    const bg = card.querySelector(".card-bg");

    gsap.to(bg, { scale: 1.08, duration: 0.6, ease: "power2.out" });
    gsap.to(overlay, { opacity: 1, duration: 0.4, ease: "power2.out" });
    gsap.to(content, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", delay: 0.1 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const overlay = card.querySelector(".card-overlay");
    const content = card.querySelector(".card-reveal");
    const bg = card.querySelector(".card-bg");

    gsap.to(bg, { scale: 1, duration: 0.6, ease: "power2.out" });
    gsap.to(overlay, { opacity: 0, duration: 0.4, ease: "power2.out" });
    gsap.to(content, { y: 30, opacity: 0, duration: 0.3, ease: "power2.in" });
  };

  return (
    <section ref={sectionRef} className="py-32 lg:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="showcase-header text-center mb-20">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-accent mb-4">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">Explore Our Creations</h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">Hover to discover the details behind each design.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          {showcaseItems.map((item, i) => (
            <div
              key={i}
              className="hover-card group relative rounded-3xl overflow-hidden cursor-pointer h-[320px] sm:h-[380px] lg:h-[420px]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Background */}
              <div className={`card-bg absolute inset-0 bg-gradient-to-br ${item.gradient} transition-transform duration-500`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(140,90,60,0.08),transparent_60%)]" />
                {/* Decorative shapes */}
                <div className="absolute top-8 right-8 w-20 h-20 rounded-full border border-accent/20" />
                <div className="absolute bottom-12 left-8 w-32 h-1 bg-accent/15 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] font-black text-foreground/[0.03] select-none">
                  0{i + 1}
                </div>
              </div>

              {/* Default visible content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-accent">{item.category}</span>
                <h3 className="text-2xl lg:text-3xl font-extrabold text-foreground mt-2">{item.title}</h3>
              </div>

              {/* Hover overlay */}
              <div className="card-overlay absolute inset-0 bg-charcoal/80 backdrop-blur-sm opacity-0 z-20 flex items-center justify-center">
                <div className="card-reveal text-center px-8 translate-y-[30px] opacity-0">
                  <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent">{item.category}</span>
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-primary-foreground mt-3 mb-4">{item.title}</h3>
                  <p className="text-base text-primary-foreground/70 leading-relaxed max-w-sm mx-auto">{item.desc}</p>
                  <div className="mt-6 inline-flex items-center gap-2 text-accent text-sm font-semibold">
                    View Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveShowcase;
