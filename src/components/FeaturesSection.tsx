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
      // Header reveal
      gsap.from(".feat-header > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Cards stagger with scale
      gsap.from(".feature-card", {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".feature-grid", start: "top 85%" },
      });

      // Horizontal scrolling stat counter
      gsap.from(".feat-stat", {
        textContent: 0,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: ".feature-grid", start: "top 80%" },
      });

      // Floating bg elements parallax
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
      {/* Floating decorative elements */}
      <div className="feat-float-1 absolute top-16 right-[5%] w-64 h-64 rounded-full border border-accent/10 pointer-events-none" />
      <div className="feat-float-2 absolute bottom-20 left-[8%] w-40 h-40 rounded-full bg-accent/5 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
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

        {/* Alternating Layout Grid */}
        <div className="mt-20 flex flex-col gap-24 lg:gap-32">
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
            <div className="flex-1 lg:pr-10 lg:text-left text-center">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6">Precision engineering.</h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
                Each panel is expertly machined for a seamless fit, ensuring long lasting durability.
              </p>
            </div>
            <div className="flex-1 w-full">
              <img 
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2831&auto=format&fit=crop" 
                alt="Precision Engineering" 
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-[2rem] shadow-2xl lg:translate-x-4 hover:scale-[1.02] transition-transform duration-700" 
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-20">
            <div className="flex-1 lg:pl-10 lg:text-left text-center">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6">Premium materials.</h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
                We select rich walnut, matte charcoal, and subtle woods for a refined, contemporary feel.
              </p>
            </div>
            <div className="flex-1 w-full">
              <img 
                src="https://images.unsplash.com/photo-1558211583-d26f610e1eba?q=80&w=1000&auto=format&fit=crop" 
                alt="Premium materials" 
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-[2rem] shadow-2xl lg:-translate-x-4 hover:scale-[1.02] transition-transform duration-700" 
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
            <div className="flex-1 lg:pr-10 lg:text-left text-center">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6">Factory direct.</h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto lg:mx-0">
                Enjoy exceptional pricing and service from our own state-of-the-art manufacturing facility.
              </p>
            </div>
            <div className="flex-1 w-full">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop" 
                alt="Factory direct" 
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-[2rem] shadow-2xl lg:translate-x-4 hover:scale-[1.02] transition-transform duration-700" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
