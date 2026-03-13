import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Clock, MessageSquare } from "lucide-react";

interface CasoTracking {
  id: string;
  estado: string;
  ultimaActualizacion: string;
  comentario: string;
  historial: { estado: string; fecha: string }[];
}

const demoCasos: CasoTracking[] = [
  {
    id: "CASO-101",
    estado: "En resolución",
    ultimaActualizacion: "2026-03-12",
    comentario: "Técnico realizando pruebas de fusión en terreno.",
    historial: [
      { estado: "Recibido", fecha: "2026-03-10" },
      { estado: "En revisión", fecha: "2026-03-10" },
      { estado: "Asignado a técnico", fecha: "2026-03-11" },
      { estado: "En resolución", fecha: "2026-03-12" },
    ],
  },
  {
    id: "CASO-102",
    estado: "Asignado a técnico",
    ultimaActualizacion: "2026-03-11",
    comentario: "Pendiente de visita técnica.",
    historial: [
      { estado: "Recibido", fecha: "2026-03-11" },
      { estado: "Asignado a técnico", fecha: "2026-03-11" },
    ],
  },
];

const estadoColor: Record<string, string> = {
  Recibido: "bg-muted text-muted-foreground",
  "En revisión": "bg-primary/20 text-primary",
  Escalado: "bg-yellow-500/20 text-yellow-400",
  "Asignado a técnico": "bg-primary/20 text-primary",
  "En resolución": "bg-yellow-500/20 text-yellow-400",
  Cerrado: "bg-emerald-500/20 text-emerald-400",
};

const SeguimientoCasos = () => {
  const [filter, setFilter] = useState("");
  const filtered = demoCasos.filter((c) => c.id.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search size={14} className="text-muted-foreground" />
        <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Buscar por número de caso..." className="h-9 text-xs max-w-xs" />
      </div>

      <div className="space-y-4">
        {filtered.map((c) => (
          <div key={c.id} className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-heading text-xs font-bold text-foreground">{c.id}</span>
              <Badge className={`text-[10px] ${estadoColor[c.estado] || "bg-muted text-muted-foreground"}`}>{c.estado}</Badge>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock size={10} />{c.ultimaActualizacion}</span>
            </div>
            <p className="text-xs text-muted-foreground flex items-start gap-1"><MessageSquare size={12} className="shrink-0 mt-0.5" />{c.comentario}</p>
            <div className="flex items-center gap-2 flex-wrap">
              {c.historial.map((h, i) => (
                <div key={i} className="flex items-center gap-1">
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0">{h.estado}</Badge>
                  {i < c.historial.length - 1 && <span className="text-muted-foreground/30">→</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="glass-card p-8 text-center">
            <p className="text-xs text-muted-foreground">No se encontraron casos.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeguimientoCasos;
