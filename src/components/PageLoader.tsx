import { useEffect, useState } from "react";

const PageLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setHiding(true);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${
        hiding ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <h1 className="font-serif text-3xl md:text-5xl text-gradient-gold mb-8 tracking-wider">
        AUREUM
      </h1>
      <div className="w-48 h-[1px] bg-muted overflow-hidden">
        <div
          className="h-full transition-all duration-200 ease-out"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: "var(--gradient-gold)",
          }}
        />
      </div>
      <p className="mt-4 text-xs tracking-[0.3em] uppercase text-muted-foreground">
        {Math.min(Math.floor(progress), 100)}%
      </p>
    </div>
  );
};

export default PageLoader;
