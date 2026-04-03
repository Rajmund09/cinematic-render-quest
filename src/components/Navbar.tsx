import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Designs", "Features", "Materials", "Testimonials", "Contact"];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? "pt-4 sm:pt-6 px-4" : "pt-6 sm:pt-8 px-6 lg:px-8"
        }`}
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-in-out ${scrolled
            ? "max-w-5xl bg-background/80 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-foreground/5 rounded-full px-6 lg:px-8 h-16 sm:h-20"
            : "max-w-7xl bg-transparent border-transparent h-20"
          }`}
      >
        <a
          href="#"
          className="text-2xl font-black tracking-tighter text-foreground hover:opacity-80 transition-opacity"
        >
          CABINET FACTORY<span className="text-[#8C5A3C]">.</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="relative text-[13px] font-bold tracking-[0.15em] uppercase text-foreground/80 hover:text-[#8C5A3C] transition-all duration-300 hover:-translate-y-0.5 group"
            >
              {l}
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#8C5A3C] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 rounded-full" />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button className="bg-[#8C5A3C] text-white hover:bg-[#7A4E34] hover:shadow-[0_4px_20px_rgba(140,90,60,0.4)] hover:-translate-y-0.5 rounded-full px-8 py-5 text-sm font-bold tracking-wide transition-all duration-300">
            GET QUOTE
          </Button>
        </div>

        <button
          className="md:hidden text-foreground hover:text-[#8C5A3C] transition-colors p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 bg-background/95 backdrop-blur-2xl border border-foreground/10 rounded-3xl p-6 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="block py-4 text-sm font-bold tracking-[0.1em] uppercase text-center text-foreground/80 hover:text-[#8C5A3C] hover:bg-foreground/5 rounded-2xl transition-all"
                onClick={() => setMobileOpen(false)}
              >
                {l}
              </a>
            ))}
            <Button className="w-full mt-4 py-6 bg-[#8C5A3C] text-white hover:bg-[#7A4E34] hover:shadow-[0_4px_20px_rgba(140,90,60,0.4)] rounded-full transition-all duration-300 font-bold tracking-widest uppercase">
              Get Quote
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
