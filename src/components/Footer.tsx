const Footer = () => (
  <footer className="border-t border-border py-12 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <span className="font-serif text-lg tracking-[0.15em] text-gradient-gold">AUREUM</span>
      <p className="text-xs text-muted-foreground tracking-wider">
        © {new Date().getFullYear()} Aureum Design Studio. All rights reserved.
      </p>
      <div className="flex gap-8">
        {["Instagram", "Pinterest", "LinkedIn"].map((s) => (
          <a key={s} href="#" className="text-xs tracking-wider text-muted-foreground hover:text-primary transition-colors duration-300">
            {s}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
