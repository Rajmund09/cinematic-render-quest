import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { img: portfolio1, title: "Noir Bedroom Suite", category: "Residential" },
  { img: portfolio2, title: "Obsidian Kitchen", category: "Residential" },
  { img: portfolio3, title: "Marble Sanctuary", category: "Bathroom" },
  { img: portfolio4, title: "Skyline Penthouse", category: "Penthouse" },
  { img: portfolio5, title: "Heritage Study", category: "Commercial" },
];

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Grid items stagger in
      gsap.utils.toArray<HTMLElement>(".portfolio-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
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

  // Lock body scroll when modal open
  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  return (
    <>
      <section
        id="portfolio"
        ref={sectionRef}
        className="section-padding cinematic-spacing"
        style={{ background: "hsl(40, 15%, 96%)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <p className="gsap-reveal text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(42, 65%, 45%)" }}>
              Portfolio
            </p>
            <h2 className="gsap-reveal font-serif text-4xl md:text-5xl" style={{ color: "hsl(220, 15%, 15%)" }}>
              Curated{" "}
              <span className="italic" style={{ color: "hsl(42, 65%, 45%)" }}>
                Masterpieces
              </span>
            </h2>
          </div>

          {/* Responsive grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div
                key={i}
                className={`portfolio-card group cursor-pointer ${
                  i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""
                }`}
                onClick={() => setSelectedProject(i)}
              >
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(to top, hsl(220, 15%, 5%, 0.8), transparent)" }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "hsl(42, 65%, 55%)" }}>
                      {project.category}
                    </p>
                    <h3 className="font-serif text-xl text-white">{project.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen modal */}
      {selectedProject !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center cursor-pointer"
          style={{ background: "hsl(220, 15%, 5%, 0.95)" }}
          onClick={() => setSelectedProject(null)}
        >
          <div className="max-w-5xl w-full mx-6 animate-scale-in">
            <img
              src={projects[selectedProject].img}
              alt={projects[selectedProject].title}
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="mt-6 text-center">
              <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "hsl(42, 65%, 55%)" }}>
                {projects[selectedProject].category}
              </p>
              <h3 className="font-serif text-3xl text-white">{projects[selectedProject].title}</h3>
            </div>
          </div>
          <button
            className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors text-2xl"
            onClick={(e) => { e.stopPropagation(); setSelectedProject(null); }}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};

export default PortfolioSection;
