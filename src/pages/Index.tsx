import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TransformationSection from "@/components/TransformationSection";
import FeaturesSection from "@/components/FeaturesSection";
import MaterialsSection from "@/components/MaterialsSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import LocationSection from "@/components/LocationSection";
import FAQSection from "@/components/FAQSection";
import VideoSection from "@/components/VideoSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <TransformationSection />
      <FeaturesSection />
      <VideoSection />
      <MaterialsSection />
      <BeforeAfterSection />
      <TestimonialsSection />
      <InteractiveShowcase />
      <LocationSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
