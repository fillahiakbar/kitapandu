import { HeroSection } from "@/components/sections/hero";
import { ProgramSection } from "@/components/sections/programs";
import { AboutSection } from "@/components/sections/about";
import { FAQSection } from "@/components/sections/faq";
import { DonationSection } from "@/components/sections/donation";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProgramSection />
      <AboutSection />
      <FAQSection />
      <DonationSection />
    </>
  );
}
