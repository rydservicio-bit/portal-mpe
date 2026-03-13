import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft, Clock, MapPin, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AsignacionDetalle from "./AsignacionDetalle";

export type TecnicoStatus =
  | "Pendiente" | "Asignado" | "En ruta" | "En terreno"
  | "En diagnóstico" | "En reparación" | "En validación" | "Cerrado";

export interface Asignacion {
  id: string;
  cliente: string;
  sitio: string;
  prioridad: "Alta" | "Media" | "Baja";
  estado: TecnicoStatus;
  fecha: string;
  descripcion: string;
  historial: { estado: TecnicoStatus; fecha: string; nota: string }[];
}

const demoData: Asignacion[] = [
  {
    id: "ASG-001",
    cliente: "Cliente Alfa",
    sitio: "Nodo Norte - Enlace 4",
    prioridad: "Alta",
    estado: "En diagnóstico",
    fecha: "2026-03-12",
    descripcion: "Pérdida excesiva reportada en tramo de fibra entre nodo Norte y nodo Centro.",
    historial: [
      { estado: "Pendiente", fecha: "2026-03-10", nota: "Caso creado" },
      { estado: "Asignado", fecha: "2026-03-11", nota: "Asignado a técnico de campo" },
      { estado: "En ruta", fecha: "2026-03-12", nota: "Técnico en camino" },
      { estado: "En diagnóstico", fecha: "2026-03-12", nota: "Realizando pruebas OTDR" },
    ],
  },
  {
    id: "ASG-002",
    cliente: "Cliente Beta",
    sitio: "POP Sur - Puerto 12",
    prioridad: "Media",
    estado: "Asignado",
    fecha: "2026-03-13",
    descripcion: "Mantenimiento programado de empalme en caja de distribución.",
    historial: [
      { estado: "Pendiente", fecha: "2026-03-12", nota: "Caso creado" },
      { estado: "Asignado", fecha: "2026-03-13", nota: "Asignado para mantenimiento" },
    ],
  },
  {
    id: "ASG-003",
    cliente: "Cliente Gamma",
    sitio: "Troncal Oeste km 14",
    prioridad: "Baja",
    estado: "Cerrado",
    fecha: "2026-03-08",
    descripcion: "Verificación de fusión post-reparación.",
    historial: [
      { estado: "Pendiente", fecha: "2026-03-06", nota: "Caso creado" },
      { estado: "Cerrado", fecha: "2026-03-08", nota: "Fusión verificada dentro de parámetros" },
    ],
  },
];

const statusColor: Record<string, string> = {
  Pendiente: "bg-muted text-muted-foreground",
  Asignado: "bg-primary/20 text-primary",
  "En ruta": "bg-secondary/20 text-secondary",
  "En terreno": "bg-secondary/20 text-secondary",
  "En diagnóstico": "bg-yellow-500/20 text-yellow-400",
  "En reparación": "bg-yellow-500/20 text-yellow-400",
  "En validación": "bg-primary/20 text-primary",
  Cerrado: "bg-emerald-500/20 text-emerald-400",
};

const prioColor: Record<string, string> = {
  Alta: "bg-destructive/20 text-destructive",
  Media: "bg-yellow-500/20 text-yellow-400",
  Baja: "bg-muted text-muted-foreground",
};

const AsignacionesList = () => {
  const [selected, setSelected] = useState<Asignacion | null>(null);

  return (
    <AnimatePresence mode="wait">
      {selected ? (
        <motion.div key="detalle" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <button onClick={() => setSelected(null)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft size={14} /> Volver a asignaciones
          </button>
          <AsignacionDetalle asignacion={selected} />
        </motion.div>
      ) : (
        <motion.div key="lista" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <h3 className="font-heading text-sm font-bold text-foreground mb-4">Mis asignaciones</h3>
          <div className="space-y-3">
            {demoData.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelected(a)}
                className="glass-card p-4 w-full text-left flex items-center gap-4 hover:border-primary/40 transition-colors"
              >
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-heading text-xs font-bold text-foreground">{a.id}</span>
                    <Badge className={`text-[10px] ${statusColor[a.estado]}`}>{a.estado}</Badge>
                    <Badge className={`text-[10px] ${prioColor[a.prioridad]}`}>{a.prioridad}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User size={10} />{a.cliente}</span>
                    <span className="flex items-center gap-1"><MapPin size={10} />{a.sitio}</span>
                    <span className="flex items-center gap-1"><Clock size={10} />{a.fecha}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-muted-foreground shrink-0" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AsignacionesList;
export { statusColor };
