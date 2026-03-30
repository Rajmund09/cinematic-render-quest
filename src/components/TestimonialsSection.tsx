import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".testimonial-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding cinematic-spacing"
      style={{ background: "hsl(40, 15%, 94%)" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="testimonial-reveal text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(42, 65%, 45%)" }}>
          Testimonials
        </p>
        <h2 className="testimonial-reveal font-serif text-4xl md:text-5xl mb-20" style={{ color: "hsl(220, 15%, 15%)" }}>
          Words of{" "}
          <span className="italic" style={{ color: "hsl(42, 65%, 45%)" }}>
            Praise
          </span>
        </h2>

        <div
          className="testimonial-reveal rounded-lg p-10 md:p-16 relative min-h-[280px]"
          style={{
            background: "linear-gradient(135deg, hsl(0, 0%, 100%, 0.7), hsl(40, 20%, 98%, 0.4))",
            backdropFilter: "blur(20px)",
            border: "1px solid hsl(42, 65%, 55%, 0.15)",
            boxShadow: "0 20px 60px hsl(220, 15%, 5%, 0.06)",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex flex-col items-center justify-center p-10 md:p-16 transition-all duration-700 ${
                i === current ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
              }`}
            >
              <p className="font-serif text-lg md:text-2xl italic leading-relaxed mb-8" style={{ color: "hsl(220, 15%, 20%)" }}>
                "{t.text}"
              </p>
              <p className="text-xs tracking-[0.2em] uppercase" style={{ color: "hsl(42, 65%, 45%)" }}>{t.name}</p>
              <p className="text-xs mt-1" style={{ color: "hsl(220, 10%, 50%)" }}>{t.role}</p>
            </div>
          ))}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  background: i === current ? "hsl(42, 65%, 55%)" : "hsl(220, 10%, 70%)",
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
