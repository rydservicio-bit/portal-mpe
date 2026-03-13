import { Settings, Wrench, AlertTriangle, Network } from "lucide-react";

const items = [
  { label: "Operación", icon: Settings },
  { label: "Mantenimiento", icon: Wrench },
  { label: "Incidencias", icon: AlertTriangle },
  { label: "Infraestructura", icon: Network },
];

const OmDashboard = () => (
  <div>
    <h2 className="font-heading text-2xl font-bold text-foreground mb-1">O&M</h2>
    <p className="text-sm text-muted-foreground mb-6">Operación y mantenimiento</p>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((i) => (
        <div key={i.label} className="glass-card p-8 text-center">
          <i.icon size={24} className="mx-auto mb-3 text-secondary/60" />
          <p className="font-heading text-sm font-semibold text-foreground">{i.label}</p>
          <p className="text-[10px] text-muted-foreground/60 mt-2">Próximamente</p>
        </div>
      ))}
    </div>
  </div>
);

export default OmDashboard;
