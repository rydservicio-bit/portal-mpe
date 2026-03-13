// Demo escalation cases per CRM client

export type EscalamientoEstado =
  | "Recibido" | "En revisión" | "Escalado" | "Asignado a técnico"
  | "En ruta" | "En terreno" | "En resolución" | "Cerrado"
  | "Pendiente validación" | "Validado" | "En curso";

export type EscalamientoPrioridad = "Alta" | "Media" | "Baja";
export type TipoCaso = "Incidencia" | "TOT" | "Otro";

export interface Escalamiento {
  id: string;
  crmClient: string;
  titulo: string;
  tipoCaso: TipoCaso;
  sitio: string;
  prioridad: EscalamientoPrioridad;
  estado: EscalamientoEstado;
  fecha: string;
  servicio: string;
  descripcion: string;
  contacto: string;
  tecnicoAsignado: string;
  historial: { estado: EscalamientoEstado; fecha: string; nota: string }[];
  comentarios: { autor: string; fecha: string; texto: string }[];
}

export const demoEscalamientos: Escalamiento[] = [
  {
    id: "ESC-2001",
    crmClient: "ENTEL",
    titulo: "Corte de fibra troncal Nodo Norte",
    tipoCaso: "Incidencia",
    sitio: "Nodo Norte - Enlace 4",
    prioridad: "Alta",
    estado: "En resolución",
    fecha: "2026-03-12",
    servicio: "Enlace dedicado",
    descripcion: "Corte de fibra detectado en tramo entre Nodo Norte y Nodo Centro. Afectación de servicio.",
    contacto: "jperez@entel.cl",
    tecnicoAsignado: "Técnico A",
    historial: [
      { estado: "Recibido", fecha: "2026-03-10 08:30", nota: "Caso registrado automáticamente desde NOC" },
      { estado: "En revisión", fecha: "2026-03-10 09:00", nota: "Revisión inicial por coordinador" },
      { estado: "Escalado", fecha: "2026-03-10 10:15", nota: "Escalado a equipo de planta externa" },
      { estado: "Asignado a técnico", fecha: "2026-03-11 07:00", nota: "Asignado a Técnico A" },
      { estado: "En resolución", fecha: "2026-03-12 08:00", nota: "Técnico en terreno realizando reparación" },
    ],
    comentarios: [
      { autor: "NOC", fecha: "2026-03-10 08:30", texto: "Alarma detectada en monitoreo. Pérdida total de señal." },
      { autor: "Coordinador", fecha: "2026-03-10 10:15", texto: "Se confirma corte. Se requiere equipo de empalme." },
    ],
  },
  {
    id: "ESC-2002",
    crmClient: "ENTEL",
    titulo: "Degradación de enlace POP Sur",
    tipoCaso: "Incidencia",
    sitio: "POP Sur - Puerto 12",
    prioridad: "Media",
    estado: "Asignado a técnico",
    fecha: "2026-03-11",
    servicio: "Internet corporativo",
    descripcion: "Degradación de señal en puerto 12 del POP Sur. Atenuación fuera de rango.",
    contacto: "mlopez@entel.cl",
    tecnicoAsignado: "Técnico B",
    historial: [
      { estado: "Recibido", fecha: "2026-03-11 10:00", nota: "Reporte de cliente" },
      { estado: "Asignado a técnico", fecha: "2026-03-11 14:00", nota: "Asignado a Técnico B" },
    ],
    comentarios: [
      { autor: "Cliente", fecha: "2026-03-11 10:00", texto: "Intermitencia en servicio desde ayer." },
    ],
  },
  {
    id: "ESC-2003",
    crmClient: "ENTEL",
    titulo: "Mantenimiento preventivo Troncal Oeste",
    tipoCaso: "TOT",
    sitio: "Troncal Oeste km 14",
    prioridad: "Baja",
    estado: "Cerrado",
    fecha: "2026-03-08",
    servicio: "MPLS",
    descripcion: "Tarea de mantenimiento preventivo completada.",
    contacto: "admin@entel.cl",
    tecnicoAsignado: "Técnico A",
    historial: [
      { estado: "Recibido", fecha: "2026-03-06 09:00", nota: "TOT programada" },
      { estado: "Validado", fecha: "2026-03-06 11:00", nota: "Aprobada por supervisor" },
      { estado: "Asignado a técnico", fecha: "2026-03-07 08:00", nota: "Asignado" },
      { estado: "Cerrado", fecha: "2026-03-08 16:00", nota: "Mantenimiento completado" },
    ],
    comentarios: [],
  },
  {
    id: "ESC-2004",
    crmClient: "MOVISTAR",
    titulo: "Falla de equipo en Data Center",
    tipoCaso: "Incidencia",
    sitio: "Data Center Central",
    prioridad: "Alta",
    estado: "En revisión",
    fecha: "2026-03-13",
    servicio: "Housing",
    descripcion: "Falla en equipo de transmisión.",
    contacto: "soporte@movistar.cl",
    tecnicoAsignado: "—",
    historial: [
      { estado: "Recibido", fecha: "2026-03-13 07:00", nota: "Caso creado" },
      { estado: "En revisión", fecha: "2026-03-13 07:30", nota: "Revisión en curso" },
    ],
    comentarios: [],
  },
];

export const estadoColor: Record<string, string> = {
  Recibido: "bg-muted text-muted-foreground",
  "En revisión": "bg-primary/20 text-primary",
  Escalado: "bg-yellow-500/20 text-yellow-400",
  "Asignado a técnico": "bg-primary/20 text-primary",
  "En ruta": "bg-secondary/20 text-secondary",
  "En terreno": "bg-secondary/20 text-secondary",
  "En resolución": "bg-yellow-500/20 text-yellow-400",
  Cerrado: "bg-emerald-500/20 text-emerald-400",
  "Pendiente validación": "bg-yellow-500/20 text-yellow-400",
  Validado: "bg-primary/20 text-primary",
  "En curso": "bg-secondary/20 text-secondary",
};

export const prioColor: Record<string, string> = {
  Alta: "bg-destructive/20 text-destructive",
  Media: "bg-yellow-500/20 text-yellow-400",
  Baja: "bg-muted text-muted-foreground",
};
