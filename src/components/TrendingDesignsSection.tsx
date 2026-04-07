import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const designs = [
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80",
    name: "Rajan Interiors",
    tall: true,
  },
  {
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    name: "Modern Kitchen Co.",
    tall: false,
  },
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    name: "LivSpace Studio",
    tall: false,
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    name: "Arch Design Lab",
    tall: true,
  },
  {
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80",
    name: "Elegant Homes",
    tall: false,
  },
  {
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    name: "Woodcraft Designs",
    tall: true,
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    name: "Studio Minimal",
    tall: false,
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    name: "Contemporary Hub",
    tall: false,
  },
  {
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
    name: "Prime Interiors",
    tall: true,
  },
  {
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?w=600&q=80",
    name: "Luxe Finishes",
    tall: false,
  },
  {
    image: "https://images.unsplash.com/photo-1574643156929-51fa098b0394?w=600&q=80",
    name: "Golden Touch",
    tall: false,
  },
  {
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80",
    name: "Villa Design Co.",
    tall: true,
  },
];

const TrendingDesignsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(".trending-heading", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      // Geometric shapes
      gsap.from(".geo-shape", {
        scale: 0,
        opacity: 0,
        rotation: -90,
        duration: 1.4,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });

      // CTA button
      gsap.from(".trending-cta", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".trending-cta", start: "top 90%" },
      });

      // Masonry cards stagger reveal
      gsap.from(".masonry-card", {
        y: 80,
        opacity: 0,
        scale: 0.92,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: ".masonry-grid", start: "top 85%" },
      });

      // Parallax on geometric shapes
      gsap.to(".geo-group", {
        y: -60,
        rotation: 8,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1.5 },
      });

      // Bottom CTA reveal
      gsap.from(".trending-bottom-cta > *", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: ".trending-bottom-cta", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#1a1a1a] overflow-hidden">
      {/* Hero area with heading + geometric shapes */}
      <div className="relative py-32 lg:py-44">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Heading */}
            <div>
              <h2 className="trending-heading text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black text-white/90 uppercase leading-[0.95] tracking-tight">
                Explore
                <br />
                Trending 3D
                <br />
                Home Designs
              </h2>
              <div className="trending-cta mt-10">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-white/30 text-white bg-transparent hover:bg-white hover:text-[#1a1a1a] px-10 py-6 text-base font-bold tracking-wider uppercase transition-all duration-500 group"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {/* Right: Geometric shapes */}
            <div className="geo-group relative h-[300px] lg:h-[400px] flex items-center justify-center">
              {/* Quarter circle */}
              <div className="geo-shape absolute top-0 right-[20%] w-40 h-40 lg:w-56 lg:h-56 border-2 border-white/20 rounded-br-full" />
              {/* Blue filled quarter */}
              <div className="geo-shape absolute top-0 right-0 w-36 h-36 lg:w-48 lg:h-48 bg-blue-600 rounded-bl-full" />
              {/* Yellow ellipse */}
              <div className="geo-shape absolute bottom-[15%] right-[15%] w-24 h-32 lg:w-32 lg:h-44 bg-yellow-400 rounded-full rotate-[-20deg]" />
              {/* Small outlined square */}
              <div className="geo-shape absolute bottom-[30%] right-[45%] w-20 h-20 lg:w-28 lg:h-28 border-2 border-white/15 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 pb-8">
        <div className="masonry-grid columns-2 md:columns-3 lg:columns-4 gap-3 lg:gap-4">
          {designs.map((d, i) => (
            <div
              key={i}
              className="masonry-card break-inside-avoid mb-3 lg:mb-4 group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={d.image}
                alt={d.name}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  d.tall ? "h-[320px] lg:h-[420px]" : "h-[220px] lg:h-[280px]"
                }`}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Designer name */}
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold">
                  {d.name.charAt(0)}
                </div>
                <span className="text-white text-sm font-medium">{d.name}</span>
              </div>
              {/* Subtle border glow on hover */}
              <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="trending-bottom-cta relative py-28 lg:py-36 text-center overflow-hidden">
        {/* Diagonal gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#111]" />
        {/* Subtle curve */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#1a1a1a] to-transparent" />
        <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute bottom-[25%] left-[12%] w-[400px] h-[400px] rounded-full border border-white/3 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black text-white uppercase tracking-tight leading-tight">
            Unleash Your Home
            <br />
            Design Potential
          </h2>
          <p className="mt-6 text-lg text-white/60">
            Trusted by <span className="text-yellow-400 font-bold">500+</span> homeowners across Bengaluru!
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              className="bg-white text-[#1a1a1a] hover:bg-accent hover:text-white rounded-full px-12 py-7 text-base font-bold tracking-wider uppercase transition-all duration-500 group shadow-2xl"
            >
              Try it NOW
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingDesignsSection;
