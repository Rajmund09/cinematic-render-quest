import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const zigzagItems = [
  {
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/b56a60245827101.69b6343ea123c.gif",
    alt: "Modular Interior Design Concept 1",
    title: "Precision Crafted",
    desc: "Every piece is meticulously designed to maximize space, functionality, and aesthetic harmony. We engineer environments that adapt to your life, not the other way around.",
  },
  {
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/2e45e9245827101.69b6343ea54c8.gif",
    alt: "Modular Interior Design Concept 2",
    title: "Seamless Integration",
    desc: "Our modular systems blend effortlessly into any architectural context — creating cohesive living spaces that feel intentional, elegant, and deeply personal.",
  },
];

const TransformationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      gsap.from(".transform-sub", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
      gsap.from(".transform-headline", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(".transform-intro", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // Zig-zag rows: alternate slide direction
      document.querySelectorAll(".zigzag-row").forEach((row, i) => {
        const imageEl = row.querySelector(".zigzag-image");
        const textEl = row.querySelector(".zigzag-text");
        const fromLeft = i % 2 === 0;

        gsap.from(imageEl, {
          x: fromLeft ? -120 : 120,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 80%" },
        });
        gsap.from(textEl, {
          x: fromLeft ? 120 : -120,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.15,
          scrollTrigger: { trigger: row, start: "top 80%" },
        });
      });

      // Parallax decorative blobs
      gsap.to(".parallax-blob-1", {
        y: -80,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.to(".parallax-blob-2", {
        y: 60,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="designs" className="relative py-32 lg:py-48 overflow-hidden bg-background">
      {/* Parallax decorative elements */}
      <div className="parallax-blob-1 absolute top-20 right-10 w-72 h-72 rounded-full bg-accent/5 blur-3xl pointer-events-none" />
      <div className="parallax-blob-2 absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-24">
          <p className="transform-sub text-sm font-semibold tracking-[0.2em] uppercase text-accent mb-6">
            The Concept
          </p>
          <h2 className="transform-headline text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight text-foreground">
            We transform —
            <br />
            <span className="text-gradient-gold">concept to reality.</span>
          </h2>
          <p className="transform-intro mt-8 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Every piece is meticulously designed to maximize space, functionality,
            and aesthetic harmony. We transform your environment to adapt to your life,
            not the other way around.
          </p>
        </div>

        {/* Criss-cross / zig-zag layout */}
        <div className="flex flex-col gap-20 lg:gap-28">
          {zigzagItems.map((item, i) => {
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                className={`zigzag-row grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isEven ? "" : "lg:[direction:rtl]"}`}
              >
                {/* Image card */}
                <div className={`zigzag-image ${isEven ? "" : "lg:[direction:ltr]"}`}>
                  <div className="group relative rounded-3xl overflow-hidden shadow-lg border border-foreground/5 bg-white/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-[300px] sm:h-[360px] lg:h-[420px] object-cover transform transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                    />
                    {/* Hover glow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>

                {/* Text block */}
                <div className={`zigzag-text flex flex-col justify-center gap-5 ${isEven ? "" : "lg:[direction:ltr]"}`}>
                  <span className="text-xs font-bold tracking-[0.25em] uppercase text-accent">
                    0{i + 1}
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                  <div className="w-16 h-[2px] bg-accent/40 rounded-full mt-2" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TransformationSection;
