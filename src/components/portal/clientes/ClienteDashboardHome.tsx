import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, AlertCircle, CheckCircle, Loader, ChevronRight, Plus, MapPin } from "lucide-react";
import type { Escalamiento } from "@/lib/escalamientosData";
import { estadoColor, prioColor } from "@/lib/escalamientosData";

interface Props {
  escalamientos: Escalamiento[];
  onViewDetail: (caso: Escalamiento) => void;
  onNuevo: () => void;
}

const ClienteDashboardHome = ({ escalamientos, onViewDetail, onNuevo }: Props) => {
  const abiertos = escalamientos.filter((e) => !["Cerrado"].includes(e.estado)).length;
  const enProceso = escalamientos.filter((e) => ["En resolución", "En ruta", "En terreno", "En curso"].includes(e.estado)).length;
  const cerrados = escalamientos.filter((e) => e.estado === "Cerrado").length;

  const stats = [
    { label: "Abiertos", value: abiertos, icon: AlertCircle, cls: "text-yellow-400" },
    { label: "En proceso", value: enProceso, icon: Loader, cls: "text-primary" },
    { label: "Cerrados", value: cerrados, icon: CheckCircle, cls: "text-emerald-400" },
  ];

  return (
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

      <div className="flex items-center justify-between">
        <h3 className="font-heading text-sm font-bold text-foreground">Mis escalamientos detectados</h3>
        <Button size="sm" variant="outline" className="gap-1 text-xs" onClick={onNuevo}>
          <Plus size={12} /> Crear nuevo escalamiento
        </Button>
      </div>

      <div className="space-y-3">
        {escalamientos.map((c) => (
          <div key={c.id} className="glass-card p-4 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-heading text-xs font-bold text-foreground">{c.id}</span>
              <Badge className={`text-[10px] ${estadoColor[c.estado]}`}>{c.estado}</Badge>
              <Badge className={`text-[10px] ${prioColor[c.prioridad]}`}>{c.prioridad}</Badge>
              <Badge variant="outline" className="text-[10px]">{c.tipoCaso}</Badge>
            </div>
            <p className="text-xs text-foreground font-medium">{c.titulo}</p>
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1"><MapPin size={10} />{c.sitio}</span>
              <span className="flex items-center gap-1"><User size={10} />{c.tecnicoAsignado}</span>
              <span className="flex items-center gap-1"><Clock size={10} />{c.fecha}</span>
            </div>
            <div className="flex gap-2 pt-1">
              <Button size="sm" variant="outline" className="text-xs gap-1 h-7" onClick={() => onViewDetail(c)}>
                Continuar <ChevronRight size={10} />
              </Button>
              <Button size="sm" variant="ghost" className="text-xs h-7" onClick={() => onViewDetail(c)}>
                Ver detalle
              </Button>
            </div>
          </div>
        ))}

        {escalamientos.length === 0 && (
          <div className="glass-card p-8 text-center">
            <AlertCircle size={24} className="mx-auto mb-2 text-muted-foreground/40" />
            <p className="text-xs text-muted-foreground">No se encontraron escalamientos para tu cuenta.</p>
            <Button size="sm" variant="outline" className="mt-3 text-xs gap-1" onClick={onNuevo}>
              <Plus size={12} /> Crear nuevo escalamiento
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClienteDashboardHome;
