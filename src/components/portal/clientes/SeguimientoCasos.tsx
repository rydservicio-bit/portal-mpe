import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Clock, MessageSquare, ChevronRight } from "lucide-react";
import type { Escalamiento } from "@/lib/escalamientosData";
import { estadoColor } from "@/lib/escalamientosData";
import CasoDetalle from "./CasoDetalle";

interface Props {
  escalamientos: Escalamiento[];
}

const SeguimientoCasos = ({ escalamientos }: Props) => {
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState<Escalamiento | null>(null);
  const filtered = escalamientos.filter((c) =>
    c.id.toLowerCase().includes(filter.toLowerCase()) ||
    c.titulo.toLowerCase().includes(filter.toLowerCase())
  );

  if (selected) {
    return <CasoDetalle caso={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search size={14} className="text-muted-foreground" />
        <Input value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Buscar por ID o título..." className="h-9 text-xs max-w-xs" />
      </div>

      <div className="space-y-4">
        {filtered.map((c) => (
          <div key={c.id} className="glass-card p-4 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-heading text-xs font-bold text-foreground">{c.id}</span>
              <Badge className={`text-[10px] ${estadoColor[c.estado]}`}>{c.estado}</Badge>
              <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock size={10} />{c.fecha}</span>
            </div>
            <p className="text-xs text-foreground font-medium">{c.titulo}</p>
            {c.comentarios.length > 0 && (
              <p className="text-xs text-muted-foreground flex items-start gap-1">
                <MessageSquare size={12} className="shrink-0 mt-0.5" />
                {c.comentarios[c.comentarios.length - 1].texto}
              </p>
            )}
            <div className="flex items-center gap-2 flex-wrap">
              {c.historial.slice(-4).map((h, i) => (
                <div key={i} className="flex items-center gap-1">
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0">{h.estado}</Badge>
                  {i < Math.min(c.historial.length, 4) - 1 && <span className="text-muted-foreground/30">→</span>}
                </div>
              ))}
            </div>
            <Button size="sm" variant="ghost" className="text-xs gap-1 h-7" onClick={() => setSelected(c)}>
              Ver detalle <ChevronRight size={10} />
            </Button>
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
