import { useEffect, useRef } from "react";
import aboutImage from "@/assets/about-portrait.jpg";

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "200+", label: "Projects Completed" },
  { value: "12", label: "Design Awards" },
  { value: "98%", label: "Client Satisfaction" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding cinematic-spacing">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="reveal opacity-0 relative">
            <div className="relative overflow-hidden">
              <img
                src={aboutImage}
                alt="Interior designer portrait"
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
                width={800}
                height={1024}
              />
              <div className="absolute inset-0 border border-primary/20" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-primary/30" />
          </div>

          {/* Text */}
          <div>
            <p className="reveal opacity-0 text-xs tracking-[0.3em] uppercase text-primary mb-4">
              About Us
            </p>
            <h2 className="reveal opacity-0 font-serif text-4xl md:text-5xl leading-tight mb-8">
              Designing <span className="text-gradient-gold italic">Emotion</span>
              <br />Into Every Space
            </h2>
            <p className="reveal opacity-0 text-muted-foreground leading-relaxed mb-6" style={{ animationDelay: "0.2s" }}>
              Founded on the belief that spaces shape experiences, Aureum transforms 
              architectural visions into living masterpieces. Our approach blends timeless 
              elegance with contemporary innovation.
            </p>
            <p className="reveal opacity-0 text-muted-foreground leading-relaxed mb-12" style={{ animationDelay: "0.3s" }}>
              Every project begins with deep listening — understanding not just what you want, 
              but how you want to feel. The result is interiors that are unmistakably yours.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, i) => (
                <div key={stat.label} className="reveal opacity-0" style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
                  <div className="text-3xl font-serif text-gradient-gold mb-1">{stat.value}</div>
                  <div className="text-xs tracking-[0.15em] uppercase text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
