import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Timeline line draw
      gsap.fromTo(
        ".process-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );

      // Each step animates in
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0, filter: "blur(6px)" },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Dot pulse
      gsap.utils.toArray<HTMLElement>(".process-dot").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
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
      id="process"
      ref={sectionRef}
      className="section-padding cinematic-spacing"
      style={{ background: "hsl(40, 15%, 94%)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <p className="gsap-reveal text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(42, 65%, 45%)" }}>
            Our Process
          </p>
          <h2 className="gsap-reveal font-serif text-4xl md:text-5xl" style={{ color: "hsl(220, 15%, 15%)" }}>
            From Vision to{" "}
            <span className="italic" style={{ color: "hsl(42, 65%, 45%)" }}>
              Reality
            </span>
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="process-line hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] origin-top"
            style={{ background: "linear-gradient(180deg, hsl(42, 65%, 55%, 0.4), hsl(42, 65%, 55%, 0.05))" }}
          />

          <div className="space-y-24 md:space-y-32">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`process-step flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={`flex-1 ${i % 2 === 1 ? "md:text-left" : "md:text-right"}`}>
                  <span className="font-serif text-6xl opacity-20" style={{ color: "hsl(42, 65%, 45%)" }}>
                    {step.num}
                  </span>
                  <h3 className="font-serif text-2xl mt-2 mb-4" style={{ color: "hsl(220, 15%, 15%)" }}>
                    {step.title}
                  </h3>
                  <p className="leading-relaxed max-w-md mx-auto md:mx-0" style={{ color: "hsl(220, 10%, 45%)" }}>
                    {step.desc}
                  </p>
                </div>

                {/* Center dot */}
                <div className="process-dot hidden md:flex items-center justify-center w-4 h-4 rounded-full relative z-10" style={{ border: "1px solid hsl(42, 65%, 55%)", background: "hsl(40, 15%, 94%)" }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: "hsl(42, 65%, 55%)" }} />
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
