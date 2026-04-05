import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Layers, Gem, Archive } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Cpu,
    title: "Precision Engineering",
    desc: "Every joint, hinge, and surface is engineered to sub-millimeter accuracy for flawless operation.",
    stat: "0.1mm",
    statLabel: "Tolerance",
  },
  {
    icon: Layers,
    title: "Modular Flexibility",
    desc: "Infinitely reconfigurable systems that adapt to evolving needs and spatial constraints.",
    stat: "∞",
    statLabel: "Configurations",
  },
  {
    icon: Gem,
    title: "Premium Materials",
    desc: "Sourced from the finest suppliers — solid hardwoods, aerospace-grade metals, and artisan finishes.",
    stat: "40+",
    statLabel: "Material Options",
  },
  {
    icon: Archive,
    title: "Smart Storage",
    desc: "Intelligent compartmentalization that maximizes every cubic inch with elegant concealment.",
    stat: "3x",
    statLabel: "More Space",
  },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feat-header > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from(".feature-card", {
        y: 80,
        opacity: 0,
        scale: 0.92,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ".feature-grid", start: "top 88%" },
      });

      gsap.to(".feat-float-1", {
        y: -60,
        rotation: 15,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
      });
      gsap.to(".feat-float-2", {
        y: 40,
        rotation: -10,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="relative py-32 lg:py-44 bg-cream overflow-hidden">
      <div className="feat-float-1 absolute top-16 right-[5%] w-64 h-64 rounded-full border border-accent/10 pointer-events-none" />
      <div className="feat-float-2 absolute bottom-20 left-[8%] w-40 h-40 rounded-full bg-accent/5 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="feat-header text-center mb-20">
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-5">
            Engineering Excellence
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-foreground leading-tight">
            Built Without <span className="text-gradient-gold">Compromise</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From concept to completion, every detail is obsessed over to deliver perfection.
          </p>
        </div>

        <div className="feature-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card group relative p-8 rounded-3xl bg-white border border-foreground/8 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:border-accent/30 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(140,90,60,0.1)] cursor-default overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-500">
                <f.icon className="w-7 h-7 text-accent" strokeWidth={1.5} />
              </div>

              <div className="mb-4">
                <span className="text-3xl font-black text-foreground">{f.stat}</span>
                <span className="text-xs text-muted-foreground ml-2 tracking-wider uppercase">{f.statLabel}</span>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>

              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-accent/0 group-hover:bg-accent/5 blur-2xl transition-all duration-700 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
