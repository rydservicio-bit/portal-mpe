import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, MapPin, User, MessageSquare, FileText } from "lucide-react";
import type { Escalamiento } from "@/lib/escalamientosData";
import { estadoColor, prioColor } from "@/lib/escalamientosData";

interface Props {
  caso: Escalamiento;
  onBack: () => void;
}

const CasoDetalle = ({ caso, onBack }: Props) => (
  <div className="space-y-6">
    <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
      <ArrowLeft size={14} /> Volver
    </button>

    {/* Header */}
    <div className="glass-card p-5 space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        <h3 className="font-heading text-base font-bold text-foreground">{caso.id}</h3>
        <Badge className={`text-[10px] ${estadoColor[caso.estado]}`}>{caso.estado}</Badge>
        <Badge className={`text-[10px] ${prioColor[caso.prioridad]}`}>{caso.prioridad}</Badge>
      </div>
      <h4 className="text-sm text-foreground font-medium">{caso.titulo}</h4>
      <div className="grid gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-2"><MapPin size={12} /> {caso.sitio}</span>
        <span className="flex items-center gap-2"><User size={12} /> {caso.tecnicoAsignado}</span>
        <span className="flex items-center gap-2"><Clock size={12} /> {caso.fecha}</span>
        <span className="flex items-center gap-2"><FileText size={12} /> {caso.servicio}</span>
      </div>
      <p className="text-xs text-muted-foreground border-t border-border/30 pt-3">{caso.descripcion}</p>
    </div>

    {/* Estado actual */}
    <div className="glass-card p-5">
      <h4 className="font-heading text-xs font-bold text-foreground mb-2">Estado actual</h4>
      <Badge className={`${estadoColor[caso.estado]}`}>{caso.estado}</Badge>
    </div>

    {/* Timeline */}
    <div className="glass-card p-5">
      <h4 className="font-heading text-xs font-bold text-foreground mb-4">Historial de estados</h4>
      <div className="relative pl-4 border-l border-border/40 space-y-4">
        {caso.historial.map((h, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={`text-[10px] ${estadoColor[h.estado]}`}>{h.estado}</Badge>
              <span className="text-[10px] text-muted-foreground">{h.fecha}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{h.nota}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Comments */}
    <div className="glass-card p-5">
      <h4 className="font-heading text-xs font-bold text-foreground mb-4">Comentarios</h4>
      {caso.comentarios.length > 0 ? (
        <div className="space-y-3">
          {caso.comentarios.map((c, i) => (
            <div key={i} className="flex items-start gap-2">
              <MessageSquare size={12} className="shrink-0 mt-0.5 text-muted-foreground" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-foreground">{c.autor}</span>
                  <span className="text-[10px] text-muted-foreground">{c.fecha}</span>
                </div>
                <p className="text-xs text-muted-foreground">{c.texto}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground">Sin comentarios.</p>
      )}
    </div>

    {/* Bitácora placeholder */}
    <div className="glass-card p-5 text-center">
      <FileText size={20} className="mx-auto mb-2 text-muted-foreground/40" />
      <p className="text-xs text-muted-foreground">Bitácora técnica</p>
      <p className="text-[10px] text-muted-foreground/60 mt-1">Disponible cuando el técnico registre avances</p>
    </div>
  </div>
);

export default CasoDetalle;
