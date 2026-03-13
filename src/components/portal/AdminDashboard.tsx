import { FileText, BarChart3, KeyRound } from "lucide-react";

const items = [
  { label: "Formularios", icon: FileText },
  { label: "Reportes", icon: BarChart3 },
  { label: "Accesos internos", icon: KeyRound },
];

const AdminDashboard = () => (
  <div>
    <h2 className="font-heading text-2xl font-bold text-foreground mb-1">Administrativos</h2>
    <p className="text-sm text-muted-foreground mb-6">Herramientas administrativas</p>
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((i) => (
        <div key={i.label} className="glass-card p-8 text-center">
          <i.icon size={24} className="mx-auto mb-3 text-primary/60" />
          <p className="font-heading text-sm font-semibold text-foreground">{i.label}</p>
          <p className="text-[10px] text-muted-foreground/60 mt-2">Próximamente</p>
        </div>
      ))}
    </div>
  </div>
);

export default AdminDashboard;
