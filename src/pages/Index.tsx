import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TransformationSection from "@/components/TransformationSection";
import FeaturesSection from "@/components/FeaturesSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import MaterialsSection from "@/components/MaterialsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TransformationSection />
      <FeaturesSection />
      <ShowcaseSection />
      <MaterialsSection />
      <BeforeAfterSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
