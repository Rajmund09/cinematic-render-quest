import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content > *", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      gsap.to(".cta-glow-1", {
        y: -30,
        x: 20,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to(".cta-glow-2", {
        y: 20,
        x: -30,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 lg:py-48 bg-charcoal overflow-hidden">
      <div className="absolute inset-0">
        <div className="cta-glow-1 absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px]" />
        <div className="cta-glow-2 absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/[0.08] blur-[100px]" />
      </div>
      <div className="cta-content relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-6">Let's Begin</p>
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-8">
          Ready to transform<br /><span className="text-gradient-gold">your space?</span>
        </h2>
        <p className="text-lg text-white/50 mb-12 max-w-xl mx-auto leading-relaxed">
          Book a free consultation with our design team and discover what's possible with Cabinet Factory precision.
        </p>
        <Button size="lg" className="bg-accent text-white hover:bg-accent/90 rounded-full px-10 text-base font-semibold shadow-lg shadow-accent/20 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5">
          Book Consultation
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
