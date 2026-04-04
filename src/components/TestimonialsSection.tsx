import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "Cabinet Factory didn't just design our kitchen — they designed the way we feel in it. Every morning is a revelation.",
    name: "Victoria Sterling",
    role: "Private Residence, London",
  },
  {
    text: "The attention to detail is extraordinary. They understood our vision before we could articulate it ourselves.",
    name: "Marcus Chen",
    role: "Boutique Hotel, Tokyo",
  },
  {
    text: "Working with Cabinet Factory felt like collaborating with artists. The result is nothing short of breathtaking.",
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
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 lg:py-40 bg-secondary">
      <div className="max-w-4xl mx-auto text-center px-6">
        <p className="testimonial-reveal text-sm font-semibold tracking-[0.2em] uppercase text-accent mb-4">
          Testimonials
        </p>
        <h2 className="testimonial-reveal text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-20">
          Words of <span className="text-gradient-gold">Praise</span>
        </h2>

        <div
          className="testimonial-reveal glass-light rounded-2xl p-10 md:p-16 relative min-h-[280px]"
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center p-10 md:p-16 transition-all duration-700 ${
                i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              <p className="text-lg md:text-2xl italic leading-relaxed mb-8 text-foreground">
                "{t.text}"
              </p>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent">{t.name}</p>
              <p className="text-xs mt-1 text-muted-foreground">{t.role}</p>
            </div>
          ))}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  background: i === current ? "hsl(var(--accent))" : "hsl(var(--muted-foreground) / 0.3)",
                  width: i === current ? 24 : 8,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
