import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What interior design services do you offer?",
    answer: "We offer end-to-end interior design solutions, including space planning, modular kitchens, wardrobes, living room setups, and full-scale home transformations from concept to execution."
  },
  {
    question: "Do you handle both design and execution?",
    answer: "Yes, we are a full-service firm. We manage everything from the initial design concepts and 3D renderings to manufacturing, procurement, and final installation."
  },
  {
    question: "How long does an interior project take?",
    answer: "Project timelines vary based on scope. A standard modular setup might take 3-4 weeks, while a full home interior project typically ranges from 45 to 60 days from design approval."
  },
  {
    question: "How do I get started?",
    answer: "Simply contact us through our website, phone, or visit our studio. We will schedule an initial consultation to understand your requirements, space, and budget."
  },
  {
    question: "Need to know more about our services?",
    answer: "Feel free to reach out to our team directly. We are always happy to discuss your specific needs and how we can bring your vision to life."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#0a0a0a] text-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-accent mb-4">Common Questions</p>
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Frequently Asked <span className="text-accent italic font-serif">Questions</span>
          </h2>
        </div>

        <div className="space-y-0 border-t border-white/10 mt-8">
          {faqs.map((faq, index) => {
             const isOpen = openIndex === index;
             return (
               <div key={index} className="border-b border-white/10">
                 <button
                   className="w-full flex items-center justify-between py-6 text-left hover:text-accent transition-colors duration-300 group"
                   onClick={() => toggleFaq(index)}
                 >
                   <span className="text-lg lg:text-xl font-medium">{faq.question}</span>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-300 ml-4 shrink-0 ${isOpen ? 'border-accent text-accent' : 'border-white/20 text-white group-hover:border-accent group-hover:text-accent'}`}>
                     {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                   </div>
                 </button>
                 <div
                   className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}
                 >
                   <div className="overflow-hidden text-white/60 text-sm lg:text-base leading-relaxed pr-12">
                     {faq.answer}
                   </div>
                 </div>
               </div>
             );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
