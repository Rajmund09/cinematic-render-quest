const Footer = () => (
  <footer className="py-12 px-6 md:px-12 bg-charcoal border-t border-white/10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <span className="text-lg font-extrabold tracking-[0.15em] text-gradient-gold">CABINET FACTORY</span>
      <p className="text-xs tracking-wider text-white/40">
        © {new Date().getFullYear()} Cabinet Factory. All rights reserved.
      </p>
      <div className="flex gap-8">
        {["Instagram", "Pinterest", "LinkedIn"].map((s) => (
          <a
            key={s}
            href="#"
            className="text-xs tracking-wider text-white/40 hover:text-accent transition-colors duration-300"
          >
            {s}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
