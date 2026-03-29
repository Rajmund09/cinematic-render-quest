import { useEffect, useRef, useState } from "react";

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [values, setValues] = useState({ name: "", email: "", message: "" });

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

  const isActive = (field: string) => focused === field || values[field as keyof typeof values];

  return (
    <section id="contact" ref={sectionRef} className="section-padding cinematic-spacing">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <p className="reveal opacity-0 text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Get In Touch
          </p>
          <h2 className="reveal opacity-0 font-serif text-4xl md:text-5xl">
            Begin Your <span className="text-gradient-gold italic">Journey</span>
          </h2>
        </div>

        <form className="reveal opacity-0 space-y-12" onSubmit={(e) => e.preventDefault()}>
          {[
            { name: "name", label: "Your Name", type: "text" },
            { name: "email", label: "Email Address", type: "email" },
          ].map((field) => (
            <div key={field.name} className="relative">
              <label
                className={`floating-label ${isActive(field.name) ? "active" : ""}`}
              >
                {field.label}
              </label>
              <input
                type={field.type}
                className="w-full bg-transparent border-b border-border pb-3 pt-2 text-foreground outline-none focus:border-primary transition-colors duration-300"
                onFocus={() => setFocused(field.name)}
                onBlur={() => setFocused(null)}
                onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                value={values[field.name as keyof typeof values]}
              />
            </div>
          ))}

          <div className="relative">
            <label className={`floating-label ${isActive("message") ? "active" : ""}`}>
              Tell us about your project
            </label>
            <textarea
              rows={4}
              className="w-full bg-transparent border-b border-border pb-3 pt-2 text-foreground outline-none focus:border-primary transition-colors duration-300 resize-none"
              onFocus={() => setFocused("message")}
              onBlur={() => setFocused(null)}
              onChange={(e) => setValues({ ...values, message: e.target.value })}
              value={values.message}
            />
          </div>

          <div className="text-center pt-4">
            <button type="submit" className="btn-premium">
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
