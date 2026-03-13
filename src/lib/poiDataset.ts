// POI dataset for auto-populating site data

export interface POI {
  id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  region: string;
  latitud: string;
  longitud: string;
  condicionesAcceso: string;
  gestionPermisos: string;
}

export const poiDataset: POI[] = [
  {
    id: "POI-001",
    nombre: "Nodo Norte - Enlace 4",
    direccion: "Av. Industrial 1250",
    ciudad: "Santiago",
    region: "Metropolitana",
    latitud: "-33.4200",
    longitud: "-70.6500",
    condicionesAcceso: "Acceso con llave magnética. Horario: 08:00–18:00.",
    gestionPermisos: "Coordinación previa con NOC cliente",
  },
  {
    id: "POI-002",
    nombre: "POP Sur - Puerto 12",
    direccion: "Calle Los Robles 340",
    ciudad: "Temuco",
    region: "Araucanía",
    latitud: "-38.7359",
    longitud: "-72.5904",
    condicionesAcceso: "Acceso libre con credencial.",
    gestionPermisos: "Sin gestión adicional",
  },
  {
    id: "POI-003",
    nombre: "Troncal Oeste km 14",
    direccion: "Ruta 5 Sur km 14",
    ciudad: "Rancagua",
    region: "O'Higgins",
    latitud: "-34.1708",
    longitud: "-70.7404",
    condicionesAcceso: "Punto en ruta. Requiere señalización vial.",
    gestionPermisos: "Permiso vial municipal requerido",
  },
  {
    id: "POI-004",
    nombre: "Data Center Central",
    direccion: "Av. Providencia 2100",
    ciudad: "Santiago",
    region: "Metropolitana",
    latitud: "-33.4260",
    longitud: "-70.6120",
    condicionesAcceso: "Acceso biométrico. Acompañamiento obligatorio.",
    gestionPermisos: "Solicitud 48h antes a seguridad",
  },
  {
    id: "POI-005",
    nombre: "Nodo Costero Valparaíso",
    direccion: "Av. España 890",
    ciudad: "Valparaíso",
    region: "Valparaíso",
    latitud: "-33.0472",
    longitud: "-71.6127",
    condicionesAcceso: "Horario restringido 09:00–17:00. Llave física.",
    gestionPermisos: "Coordinación con jefe de planta",
  },
];
