import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useGSAPScrollAnimations = () => {
  useEffect(() => {
    // Text reveal animations
    const reveals = gsap.utils.toArray<HTMLElement>(".gsap-reveal");
    reveals.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Parallax layers
    const parallaxElements = gsap.utils.toArray<HTMLElement>(".gsap-parallax");
    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.dataset.speed || "0.3");
      gsap.to(el, {
        y: () => -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Stagger children
    const staggerContainers = gsap.utils.toArray<HTMLElement>(".gsap-stagger");
    staggerContainers.forEach((container) => {
      const children = container.children;
      gsap.fromTo(
        children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
};
