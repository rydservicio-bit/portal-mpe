import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, AlertTriangle, Search, MapPin, FileText, ShieldAlert, Mail } from "lucide-react";
import ClienteDashboardHome from "./clientes/ClienteDashboardHome";
import NuevoEscalamiento from "./clientes/NuevoEscalamiento";
import SeguimientoCasos from "./clientes/SeguimientoCasos";
import BlackGpsTracker from "./clientes/BlackGpsTracker";
import CasoDetalle from "./clientes/CasoDetalle";
import { resolveClientAuth, getSimulatedEmail } from "@/lib/clientAuth";
import { demoEscalamientos, type Escalamiento } from "@/lib/escalamientosData";

type ClientView = "tabs" | "nuevo" | "detalle";

const ClientesDashboard = () => {
  const [view, setView] = useState<ClientView>("tabs");
  const [selectedCaso, setSelectedCaso] = useState<Escalamiento | null>(null);

  const email = getSimulatedEmail();
  const auth = resolveClientAuth(email);

  const clientEscalamientos = useMemo(
    () => (auth.crmClient ? demoEscalamientos.filter((e) => e.crmClient === auth.crmClient) : []),
    [auth.crmClient]
  );

  if (!auth.allowed) {
    return (
      <div className="glass-card p-10 text-center space-y-3 max-w-md mx-auto">
        <ShieldAlert size={32} className="mx-auto text-destructive" />
        <h3 className="font-heading text-sm font-bold text-foreground">Acceso denegado</h3>
        <p className="text-xs text-muted-foreground">
          El dominio <span className="text-foreground font-medium">{auth.domain}</span> no tiene acceso al portal de clientes.
        </p>
      </div>
    );
  }

  if (view === "nuevo") {
    return <NuevoEscalamiento onBack={() => setView("tabs")} />;
  }

  if (view === "detalle" && selectedCaso) {
    return <CasoDetalle caso={selectedCaso} onBack={() => { setView("tabs"); setSelectedCaso(null); }} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
        <h2 className="font-heading text-2xl font-bold text-foreground">Clientes</h2>
        <div className="flex items-center gap-2">
          <Mail size={12} className="text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">{email}</span>
          <Badge className="bg-primary/20 text-primary text-[10px]">{auth.crmClient}</Badge>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Gestión de casos y seguimiento</p>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="bg-muted/50 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="dashboard" className="gap-2 text-xs sm:text-sm">
            <LayoutDashboard size={14} /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="seguimiento" className="gap-2 text-xs sm:text-sm">
            <Search size={14} /> Seguimiento
          </TabsTrigger>
          <TabsTrigger value="gps" className="gap-2 text-xs sm:text-sm">
            <MapPin size={14} /> Equipo técnico
          </TabsTrigger>
          <TabsTrigger value="docs" className="gap-2 text-xs sm:text-sm">
            <FileText size={14} /> Documentos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <ClienteDashboardHome
            escalamientos={clientEscalamientos}
            onViewDetail={(c) => { setSelectedCaso(c); setView("detalle"); }}
            onNuevo={() => setView("nuevo")}
          />
        </TabsContent>
        <TabsContent value="seguimiento">
          <SeguimientoCasos escalamientos={clientEscalamientos} />
        </TabsContent>
        <TabsContent value="gps"><BlackGpsTracker /></TabsContent>
        <TabsContent value="docs">
          <div className="glass-card p-8 text-center">
            <FileText size={24} className="mx-auto mb-2 text-muted-foreground/40" />
            <p className="text-xs text-muted-foreground">Documentos y accesos</p>
            <p className="text-[10px] text-muted-foreground/60 mt-1">Próximamente</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientesDashboard;
