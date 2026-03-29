import { useEffect, useRef, useState } from "react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";

const projects = [
  { img: portfolio1, title: "Noir Bedroom Suite", category: "Residential" },
  { img: portfolio2, title: "Obsidian Kitchen", category: "Residential" },
  { img: portfolio3, title: "Marble Sanctuary", category: "Bathroom" },
  { img: portfolio4, title: "Skyline Penthouse", category: "Penthouse" },
  { img: portfolio5, title: "Heritage Study", category: "Commercial" },
];

const PortfolioSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

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
    <>
      <section id="portfolio" ref={sectionRef} className="section-padding cinematic-spacing">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <p className="reveal opacity-0 text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Portfolio
            </p>
            <h2 className="reveal opacity-0 font-serif text-4xl md:text-5xl">
              Curated <span className="text-gradient-gold italic">Masterpieces</span>
            </h2>
          </div>
        </div>

        {/* Horizontal scroll gallery */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto px-6 md:px-12 pb-8 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {projects.map((project, i) => (
            <div
              key={i}
              className="reveal opacity-0 flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw] snap-center cursor-hover group"
              style={{ animationDelay: `${i * 0.1}s` }}
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
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-xs tracking-[0.2em] uppercase text-primary mb-2">{project.category}</p>
                  <h3 className="font-serif text-xl">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fullscreen modal */}
      {selectedProject !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 animate-fade-in cursor-pointer"
          onClick={() => setSelectedProject(null)}
        >
          <div className="max-w-5xl w-full mx-6 animate-scale-in">
            <img
              src={projects[selectedProject].img}
              alt={projects[selectedProject].title}
              className="w-full max-h-[80vh] object-contain"
            />
            <div className="mt-6 text-center">
              <p className="text-xs tracking-[0.2em] uppercase text-primary mb-2">
                {projects[selectedProject].category}
              </p>
              <h3 className="font-serif text-3xl">{projects[selectedProject].title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioSection;
