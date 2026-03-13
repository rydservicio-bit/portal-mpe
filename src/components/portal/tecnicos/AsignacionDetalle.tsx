import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User, FileText, Paperclip } from "lucide-react";
import type { Asignacion } from "./AsignacionesList";
import { statusColor } from "./AsignacionesList";

interface Props {
  asignacion: Asignacion;
}

const AsignacionDetalle = ({ asignacion: a }: Props) => (
  <div className="space-y-6">
    {/* Header */}
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <h3 className="font-heading text-base font-bold text-foreground">{a.id}</h3>
        <Badge className={`text-[10px] ${statusColor[a.estado]}`}>{a.estado}</Badge>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><User size={12} /> {a.cliente}</span>
        <span className="flex items-center gap-2"><MapPin size={12} /> {a.sitio}</span>
        <span className="flex items-center gap-2"><Clock size={12} /> {a.fecha}</span>
        <span className="flex items-center gap-2"><FileText size={12} /> Prioridad: {a.prioridad}</span>
      </div>
      <p className="text-xs text-muted-foreground border-t border-border/30 pt-3">{a.descripcion}</p>
    </div>

    {/* Timeline */}
    <div className="glass-card p-5">
      <h4 className="font-heading text-xs font-bold text-foreground mb-4">Historial de cambios</h4>
      <div className="relative pl-4 border-l border-border/40 space-y-4">
        {a.historial.map((h, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={`text-[10px] ${statusColor[h.estado]}`}>{h.estado}</Badge>
              <span className="text-[10px] text-muted-foreground">{h.fecha}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{h.nota}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Placeholders */}
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="glass-card p-5 text-center">
        <FileText size={20} className="mx-auto mb-2 text-muted-foreground/40" />
        <p className="text-xs text-muted-foreground">Observaciones</p>
        <p className="text-[10px] text-muted-foreground/60 mt-1">Sin observaciones registradas</p>
      </div>
      <div className="glass-card p-5 text-center">
        <Paperclip size={20} className="mx-auto mb-2 text-muted-foreground/40" />
        <p className="text-xs text-muted-foreground">Adjuntos</p>
        <p className="text-[10px] text-muted-foreground/60 mt-1">Sin archivos adjuntos</p>
      </div>
    </div>
  </div>
);

export default AsignacionDetalle;
