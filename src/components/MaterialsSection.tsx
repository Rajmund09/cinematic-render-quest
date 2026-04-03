import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const materials = [
  { name: "Solid Oak", desc: "Warm, durable hardwood with natural grain patterns that age beautifully.", emoji: "🪵" },
  { name: "Italian Marble", desc: "Luxurious Carrara marble surfaces for countertops and accent features.", emoji: "🏛️" },
  { name: "Matte Lacquer", desc: "Silky-smooth anti-fingerprint finish in a curated palette of neutrals.", emoji: "✨" },
];

const MaterialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".material-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="materials" className="py-32 lg:py-40 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-accent mb-4">Materials & Finishes</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground">Crafted from the Finest</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {materials.map((m, i) => (
            <div key={i} className="material-card glass-light rounded-2xl p-10 text-center hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10">
              <div className="text-5xl mb-6">{m.emoji}</div>
              <h3 className="text-xl font-bold text-foreground mb-3">{m.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialsSection;
