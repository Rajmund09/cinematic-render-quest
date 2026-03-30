import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutImage from "@/assets/about-portrait.jpg";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "200+", label: "Projects Completed" },
  { value: "12", label: "Design Awards" },
  { value: "98%", label: "Client Satisfaction" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to(".about-image", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Text reveals with blur
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
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

      // Stats counter animation
      gsap.utils.toArray<HTMLElement>(".stat-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: 0.3 + i * 0.1,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
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
      id="about"
      ref={sectionRef}
      className="section-padding cinematic-spacing transition-colors duration-1000"
      style={{ background: "linear-gradient(180deg, hsl(40, 20%, 96%), hsl(40, 15%, 94%))" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="about-reveal relative overflow-hidden">
            <div className="about-image relative overflow-hidden will-change-transform">
              <img
                src={aboutImage}
                alt="Interior designer portrait"
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
                width={800}
                height={1024}
              />
              <div className="absolute inset-0" style={{ border: "1px solid hsl(42, 65%, 55%, 0.2)" }} />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24" style={{ border: "1px solid hsl(42, 65%, 55%, 0.3)" }} />
          </div>

          {/* Text */}
          <div>
            <p className="about-reveal text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(42, 65%, 45%)" }}>
              About Us
            </p>
            <h2 className="about-reveal font-serif text-4xl md:text-5xl leading-tight mb-8" style={{ color: "hsl(220, 15%, 15%)" }}>
              Designing <span className="italic" style={{ color: "hsl(42, 65%, 45%)" }}>Emotion</span>
              <br />Into Every Space
            </h2>
            <p className="about-reveal leading-relaxed mb-6" style={{ color: "hsl(220, 10%, 40%)" }}>
              Founded on the belief that spaces shape experiences, Aureum transforms
              architectural visions into living masterpieces. Our approach blends timeless
              elegance with contemporary innovation.
            </p>
            <p className="about-reveal leading-relaxed mb-12" style={{ color: "hsl(220, 10%, 40%)" }}>
              Every project begins with deep listening — understanding not just what you want,
              but how you want to feel. The result is interiors that are unmistakably yours.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-item">
                  <div className="text-3xl font-serif mb-1" style={{ color: "hsl(42, 65%, 45%)" }}>{stat.value}</div>
                  <div className="text-xs tracking-[0.15em] uppercase" style={{ color: "hsl(220, 10%, 50%)" }}>{stat.label}</div>
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
