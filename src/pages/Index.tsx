import { useState } from "react";
import Navbar from "@/components/Navbar";
#import HeroSection from "@/components/HeroSection";#
#import OrganizationMap from "@/components/OrganizationMap";#
#import ProcessSteps from "@/components/ProcessSteps";#
#import SolutionsSection from "@/components/SolutionsSection";#
#import PrincipleSection from "@/components/PrincipleSection";#
import PortalSection from "@/components/portal/PortalSection";
#import ContactSection from "@/components/ContactSection";#

const Index = () => {
  const [portalView, setPortalView] = useState<"menu" | "tecnicos" | "administrativos" | "oym" | "clientes">("menu");
  const isPortalActive = portalView !== "menu";

  return (
    <div className="min-h-screen bg-background">
      {!isPortalActive && <Navbar />}
      {!isPortalActive && <HeroSection />}
      {!isPortalActive && <OrganizationMap />}
      {!isPortalActive && <ProcessSteps />}
      {!isPortalActive && <SolutionsSection />}
      {!isPortalActive && <PrincipleSection />}
      {isPortalActive && <PortalSection view={portalView} onViewChange={setPortalView} />}
      {!isPortalActive && <ContactSection />}
      {!isPortalActive && (
        <footer className="border-t border-border/30 py-8 text-center">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} MPE — Procesos, operaciones y sistemas
          </p>
        </footer>
      )}
    </div>
  );
};

export default Index;
