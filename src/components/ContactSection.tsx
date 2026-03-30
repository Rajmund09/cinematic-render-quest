import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0, filter: "blur(4px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            delay: i * 0.1,
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

  const isActive = (field: string) => focused === field || values[field as keyof typeof values];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding cinematic-spacing"
      style={{ background: "linear-gradient(180deg, hsl(40, 15%, 94%), hsl(40, 20%, 96%))" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <p className="contact-reveal text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(42, 65%, 45%)" }}>
            Get In Touch
          </p>
          <h2 className="contact-reveal font-serif text-4xl md:text-5xl" style={{ color: "hsl(220, 15%, 15%)" }}>
            Begin Your{" "}
            <span className="italic" style={{ color: "hsl(42, 65%, 45%)" }}>
              Journey
            </span>
          </h2>
        </div>

        <form className="contact-reveal space-y-12" onSubmit={(e) => e.preventDefault()}>
          {[
            { name: "name", label: "Your Name", type: "text" },
            { name: "email", label: "Email Address", type: "email" },
          ].map((field) => (
            <div key={field.name} className="relative">
              <label
                className="absolute left-0 transition-all duration-300 pointer-events-none text-sm"
                style={{
                  color: isActive(field.name) ? "hsl(42, 65%, 45%)" : "hsl(220, 10%, 50%)",
                  top: isActive(field.name) ? "-1.5rem" : "0.5rem",
                  fontSize: isActive(field.name) ? "0.75rem" : "0.875rem",
                }}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                className="w-full bg-transparent pb-3 pt-2 outline-none transition-colors duration-300"
                style={{
                  borderBottom: `1px solid ${focused === field.name ? "hsl(42, 65%, 55%)" : "hsl(220, 10%, 80%)"}`,
                  color: "hsl(220, 15%, 15%)",
                }}
                onFocus={() => setFocused(field.name)}
                onBlur={() => setFocused(null)}
                onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                value={values[field.name as keyof typeof values]}
              />
            </div>
          ))}

          <div className="relative">
            <label
              className="absolute left-0 transition-all duration-300 pointer-events-none text-sm"
              style={{
                color: isActive("message") ? "hsl(42, 65%, 45%)" : "hsl(220, 10%, 50%)",
                top: isActive("message") ? "-1.5rem" : "0.5rem",
                fontSize: isActive("message") ? "0.75rem" : "0.875rem",
              }}
            >
              Tell us about your project
            </label>
            <textarea
              rows={4}
              className="w-full bg-transparent pb-3 pt-2 outline-none transition-colors duration-300 resize-none"
              style={{
                borderBottom: `1px solid ${focused === "message" ? "hsl(42, 65%, 55%)" : "hsl(220, 10%, 80%)"}`,
                color: "hsl(220, 15%, 15%)",
              }}
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              onChange={(e) => setValues({ ...values, message: e.target.value })}
              value={values.message}
            />
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="relative overflow-hidden px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] transition-all duration-500 group"
              style={{
                border: "1px solid hsl(42, 65%, 55%, 0.5)",
                color: "hsl(42, 65%, 45%)",
              }}
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">Send Message</span>
              <div
                className="absolute inset-0 transition-transform duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                style={{ background: "var(--gradient-gold)" }}
              />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
