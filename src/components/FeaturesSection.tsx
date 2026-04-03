import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Cpu, Layers, Gem, Archive } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Cpu, title: "Precision Engineering", desc: "Every joint, hinge, and surface is engineered to sub-millimeter accuracy for flawless operation." },
  { icon: Layers, title: "Modular Flexibility", desc: "Infinitely reconfigurable systems that adapt to evolving needs and spatial constraints." },
  { icon: Gem, title: "Premium Materials", desc: "Sourced from the finest suppliers — solid hardwoods, aerospace-grade metals, and artisan finishes." },
  { icon: Archive, title: "Smart Storage", desc: "Intelligent compartmentalization that maximizes every cubic inch with elegant concealment." },
];

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-32 lg:py-40 bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-accent mb-4">Engineering Excellence</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">Built Without Compromise</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="feature-card group relative p-8 rounded-2xl bg-background border border-border hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/5 cursor-default">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-500">
                <f.icon className="w-7 h-7 text-accent" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              <div className="absolute inset-0 rounded-2xl bg-accent/0 group-hover:bg-accent/[0.02] transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
