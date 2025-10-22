import { CTASection } from "@/components/modules/home/CTASection";
import { HeroSection } from "@/components/modules/home/HeroSection";
import { HowItWorks } from "@/components/modules/home/HowItWorks";
import { Promotions } from "@/components/modules/home/Promotions";
import { ServiceHighlights } from "@/components/modules/home/ServiceHighlights";
import { Testimonials } from "@/components/modules/home/Testimonials";

export default function Home() {
  return (
    <>
      <HeroSection></HeroSection>
      <HowItWorks></HowItWorks>
      <ServiceHighlights />
      <Testimonials />
      <Promotions />
      <CTASection />
    </>
  );
}
