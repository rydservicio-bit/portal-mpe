import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, AlertTriangle, Search, MapPin, FileText } from "lucide-react";
import ClienteDashboardHome from "./clientes/ClienteDashboardHome";
import EscalamientoForm from "./clientes/EscalamientoForm";
import SeguimientoCasos from "./clientes/SeguimientoCasos";
import BlackGpsTracker from "./clientes/BlackGpsTracker";

const ClientesDashboard = () => (
  <div>
    <h2 className="font-heading text-2xl font-bold text-foreground mb-1">Clientes</h2>
    <p className="text-sm text-muted-foreground mb-6">Gestión de casos y seguimiento</p>

    <Tabs defaultValue="dashboard" className="space-y-6">
      <TabsList className="bg-muted/50 flex-wrap h-auto gap-1 p-1">
        <TabsTrigger value="dashboard" className="gap-2 text-xs sm:text-sm">
          <LayoutDashboard size={14} /> Dashboard
        </TabsTrigger>
        <TabsTrigger value="escalar" className="gap-2 text-xs sm:text-sm">
          <AlertTriangle size={14} /> Escalar caso
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

      <TabsContent value="dashboard"><ClienteDashboardHome /></TabsContent>
      <TabsContent value="escalar"><EscalamientoForm /></TabsContent>
      <TabsContent value="seguimiento"><SeguimientoCasos /></TabsContent>
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

export default ClientesDashboard;
