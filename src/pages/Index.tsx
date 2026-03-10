import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OrganizationMap from "@/components/OrganizationMap";
import ProcessSteps from "@/components/ProcessSteps";
import SolutionsSection from "@/components/SolutionsSection";
import PrincipleSection from "@/components/PrincipleSection";
import AccessSection from "@/components/AccessSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <OrganizationMap />
      <ProcessSteps />
      <SolutionsSection />
      <PrincipleSection />
      <AccessSection />
      <ContactSection />
      <footer className="border-t border-border/30 py-8 text-center">
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} MPE — Procesos, operaciones y sistemas
        </p>
      </footer>
    </div>
  );
};

export default Index;
