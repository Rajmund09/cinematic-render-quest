const Footer = () => (
  <footer className="py-12 px-6 md:px-12" style={{ background: "hsl(220, 15%, 5%)", borderTop: "1px solid hsl(220, 10%, 15%)" }}>
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <span className="font-serif text-lg tracking-[0.15em] text-gradient-gold">AUREUM</span>
      <p className="text-xs tracking-wider" style={{ color: "hsl(220, 10%, 45%)" }}>
        © {new Date().getFullYear()} Aureum Design Studio. All rights reserved.
      </p>
      <div className="flex gap-8">
        {["Instagram", "Pinterest", "LinkedIn"].map((s) => (
          <a
            key={s}
            href="#"
            className="text-xs tracking-wider transition-colors duration-300"
            style={{ color: "hsl(220, 10%, 45%)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(42, 65%, 55%)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(220, 10%, 45%)")}
          >
            {s}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
