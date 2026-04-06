import { Button } from "@/components/ui/button";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "motion/react";

const CTASection = () => {
  return (
    <section id="contact" className="bg-charcoal -mt-1 relative z-10 w-full">
      <LampContainer className="bg-charcoal min-h-[85vh] w-full pt-20">
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center mt-8 w-full max-w-4xl mx-auto px-6 text-center"
        >
          <p className="text-sm font-semibold tracking-[0.25em] uppercase text-accent mb-6">Let's Begin</p>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-8 drop-shadow-2xl">
            Ready to transform<br />
            <span className="text-gradient-gold">your space?</span>
          </h2>
          <p className="text-lg text-white/70 mb-12 max-w-xl mx-auto leading-relaxed">
            Book a free consultation with our design team and discover what's possible with premium craftsmanship and precision.
          </p>
          <Button size="lg" className="bg-[#8C5A3C] text-white hover:bg-[#A67352] rounded-full px-12 py-7 text-lg font-semibold shadow-[0_0_40px_rgba(140,90,60,0.4)] transition-all duration-300 hover:scale-105 border border-[#8C5A3C]/50 hover:shadow-[0_0_60px_rgba(140,90,60,0.6)]">
            Book Consultation
          </Button>
        </motion.div>
      </LampContainer>
    </section>
  );
};

export default CTASection;
