import { Badge } from "@/components/ui/badge";
import { Clock, User, AlertCircle, CheckCircle, Loader } from "lucide-react";

interface CasoResumen {
  id: string;
  servicio: string;
  prioridad: "Alta" | "Media" | "Baja";
  estado: string;
  fecha: string;
  tecnico: string;
}

const demoCasos: CasoResumen[] = [
  { id: "CASO-101", servicio: "Enlace dedicado", prioridad: "Alta", estado: "En resolución", fecha: "2026-03-12", tecnico: "Técnico A" },
  { id: "CASO-102", servicio: "Internet corporativo", prioridad: "Media", estado: "Asignado a técnico", fecha: "2026-03-11", tecnico: "Técnico B" },
  { id: "CASO-103", servicio: "MPLS", prioridad: "Baja", estado: "Cerrado", fecha: "2026-03-08", tecnico: "Técnico A" },
];

const stats = [
  { label: "Abiertos", value: 1, icon: AlertCircle, cls: "text-yellow-400" },
  { label: "En proceso", value: 1, icon: Loader, cls: "text-primary" },
  { label: "Cerrados", value: 1, icon: CheckCircle, cls: "text-emerald-400" },
];

const estadoColor: Record<string, string> = {
  Recibido: "bg-muted text-muted-foreground",
  "En revisión": "bg-primary/20 text-primary",
  Escalado: "bg-yellow-500/20 text-yellow-400",
  "Asignado a técnico": "bg-primary/20 text-primary",
  "En ruta": "bg-secondary/20 text-secondary",
  "En terreno": "bg-secondary/20 text-secondary",
  "En resolución": "bg-yellow-500/20 text-yellow-400",
  Cerrado: "bg-emerald-500/20 text-emerald-400",
};

const ClienteDashboardHome = () => (
  <div className="space-y-6">
    <div className="grid gap-3 grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="glass-card p-4 text-center">
          <s.icon size={18} className={`mx-auto mb-1 ${s.cls}`} />
          <p className="font-heading text-lg font-bold text-foreground">{s.value}</p>
          <p className="text-[10px] text-muted-foreground">{s.label}</p>
        </div>
      ))}
    </div>

    <div className="space-y-3">
      <h3 className="font-heading text-sm font-bold text-foreground">Casos recientes</h3>
      {demoCasos.map((c) => (
        <div key={c.id} className="glass-card p-4 space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-heading text-xs font-bold text-foreground">{c.id}</span>
            <Badge className={`text-[10px] ${estadoColor[c.estado] || "bg-muted text-muted-foreground"}`}>{c.estado}</Badge>
            <Badge className={`text-[10px] ${c.prioridad === "Alta" ? "bg-destructive/20 text-destructive" : c.prioridad === "Media" ? "bg-yellow-500/20 text-yellow-400" : "bg-muted text-muted-foreground"}`}>{c.prioridad}</Badge>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span>{c.servicio}</span>
            <span className="flex items-center gap-1"><User size={10} />{c.tecnico}</span>
            <span className="flex items-center gap-1"><Clock size={10} />{c.fecha}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ClienteDashboardHome;
