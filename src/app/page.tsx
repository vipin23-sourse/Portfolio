import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ExperienceSection } from "@/components/experience-section";
import { WorkSection } from "@/components/work-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      {/* Skip to main content — accessibility / Lighthouse a11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:font-medium focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <WorkSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
