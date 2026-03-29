import { useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We begin with an immersive consultation, understanding your lifestyle, tastes, and the emotions you want your space to evoke.",
  },
  {
    num: "02",
    title: "Concept",
    desc: "Our designers translate your vision into detailed mood boards, 3D renders, and material palettes that capture the essence of your dream.",
  },
  {
    num: "03",
    title: "Design",
    desc: "Every element is meticulously planned — from spatial flow to lighting, acoustics to texture — creating a holistic design blueprint.",
  },
  {
    num: "04",
    title: "Realization",
    desc: "With our trusted artisans and craftsmen, we bring the design to life with uncompromising attention to quality and detail.",
  },
];

const ProcessSection = () => {
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
    <section id="process" ref={sectionRef} className="section-padding cinematic-spacing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <p className="reveal opacity-0 text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Our Process
          </p>
          <h2 className="reveal opacity-0 font-serif text-4xl md:text-5xl">
            From Vision to <span className="text-gradient-gold italic">Reality</span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/30 via-primary/10 to-transparent" />

          <div className="space-y-24 md:space-y-32">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`reveal opacity-0 flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className={`flex-1 ${i % 2 === 1 ? "md:text-left" : "md:text-right"}`}>
                  <span className="font-serif text-6xl text-gradient-gold opacity-30">{step.num}</span>
                  <h3 className="font-serif text-2xl mt-2 mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md mx-auto md:mx-0">
                    {step.desc}
                  </p>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex items-center justify-center w-4 h-4 rounded-full border border-primary bg-background relative z-10">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>

                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
