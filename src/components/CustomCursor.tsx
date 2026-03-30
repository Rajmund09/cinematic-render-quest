import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || window.innerWidth < 768;
    if (isTouchDevice) return;

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);

      // Inner dot follows instantly
      if (innerRef.current) {
        gsap.set(innerRef.current, { x: e.clientX - 3, y: e.clientY - 3 });
      }
      // Outer ring follows with lag
      if (outerRef.current) {
        gsap.to(outerRef.current, {
          x: e.clientX - 16,
          y: e.clientY - 16,
          duration: 0.15,
          ease: "power2.out",
        });
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], .cursor-hover") && outerRef.current) {
        gsap.to(outerRef.current, { scale: 2, opacity: 0.5, duration: 0.3 });
      }
    };

    const handleOut = () => {
      if (outerRef.current) {
        gsap.to(outerRef.current, { scale: 1, opacity: 1, duration: 0.3 });
      }
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        ref={outerRef}
        className="fixed pointer-events-none z-[99] rounded-full"
        style={{
          width: 32,
          height: 32,
          border: "1px solid hsl(42, 65%, 55%, 0.5)",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={innerRef}
        className="fixed pointer-events-none z-[99] rounded-full"
        style={{
          width: 6,
          height: 6,
          background: "hsl(42, 65%, 55%)",
        }}
      />
    </>
  );
};

export default CustomCursor;
