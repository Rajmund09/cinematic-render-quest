import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    text: "Aureum didn't just design our home — they designed the way we feel in it. Every morning is a revelation.",
    name: "Victoria Sterling",
    role: "Private Residence, London",
  },
  {
    text: "The attention to detail is extraordinary. They understood our brand before we could articulate it ourselves.",
    name: "Marcus Chen",
    role: "Boutique Hotel, Tokyo",
  },
  {
    text: "Working with Aureum felt like collaborating with artists. The result is nothing short of breathtaking.",
    name: "Isabella Rossi",
    role: "Penthouse, Milan",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-fade-up");
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding cinematic-spacing">
      <div className="max-w-4xl mx-auto text-center">
        <p className="reveal opacity-0 text-xs tracking-[0.3em] uppercase text-primary mb-4">
          Testimonials
        </p>
        <h2 className="reveal opacity-0 font-serif text-4xl md:text-5xl mb-20">
          Words of <span className="text-gradient-gold italic">Praise</span>
        </h2>

        <div className="reveal opacity-0 glass-panel rounded-lg p-10 md:p-16 relative min-h-[280px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center p-10 md:p-16 transition-all duration-700 ${
                i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              <p className="font-serif text-lg md:text-2xl italic leading-relaxed mb-8 text-foreground/90">
                "{t.text}"
              </p>
              <p className="text-xs tracking-[0.2em] uppercase text-primary">{t.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{t.role}</p>
            </div>
          ))}

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
