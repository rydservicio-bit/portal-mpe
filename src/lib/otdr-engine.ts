export interface OtdrEvent {
  id: string;
  distance: string;
  eventLoss: string;
  reflectance: string;
  cumulativeLoss: string;
  attenuation: string;
  isFiberEnd: boolean;
}

export interface ClassifiedEvent extends OtdrEvent {
  index: number;
  classification: string;
  severity: "normal" | "warning" | "critical";
}

export interface MainEventDiagnosis {
  eventIndex: number;
  distance: string;
  diagnosis: string;
  confidence: string;
  evidence: string[];
}

export function classifyEvent(event: OtdrEvent): { classification: string; severity: "normal" | "warning" | "critical" } {
  const hasReflectance = event.reflectance !== "" && parseFloat(event.reflectance) !== 0;
  const loss = event.eventLoss !== "" ? parseFloat(event.eventLoss) : 0;

  if (hasReflectance && event.isFiberEnd) {
    return { classification: "Evento terminal reflectivo", severity: "normal" };
  }

  if (hasReflectance && !event.isFiberEnd) {
    return { classification: "Evento reflectivo intermedio", severity: "warning" };
  }

  if (!hasReflectance && loss < 0.2) {
    return { classification: "Empalme normal", severity: "normal" };
  }

  if (!hasReflectance && loss >= 0.2 && loss <= 1.0) {
    return { classification: "Empalme degradado probable", severity: "warning" };
  }

  if (!hasReflectance && loss > 1.0) {
    return { classification: "Pérdida no reflectiva relevante", severity: "critical" };
  }

  return { classification: "Sin clasificación", severity: "normal" };
}

export function classifyAllEvents(events: OtdrEvent[]): ClassifiedEvent[] {
  return events.map((event, index) => {
    const { classification, severity } = classifyEvent(event);
    return { ...event, index: index + 1, classification, severity };
  });
}

export function detectMainEvent(classified: ClassifiedEvent[]): MainEventDiagnosis | null {
  if (classified.length === 0) return null;

  // Priority: terminal → highest loss → reflectance severity
  const terminal = classified.find((e) => e.classification === "Evento terminal reflectivo");
  const sorted = [...classified].sort((a, b) => {
    const lossA = parseFloat(a.eventLoss) || 0;
    const lossB = parseFloat(b.eventLoss) || 0;
    return lossB - lossA;
  });

  const highestLoss = sorted[0];
  const reflective = classified.find((e) => e.classification === "Evento reflectivo intermedio");

  let main: ClassifiedEvent;
  const evidence: string[] = [];

  if (terminal) {
    main = terminal;
    evidence.push("Evento terminal detectado (fin de fibra con reflectancia)");
    const loss = parseFloat(main.eventLoss) || 0;
    if (loss > 0) evidence.push(`Pérdida del evento: ${loss} dB`);
    const refl = parseFloat(main.reflectance) || 0;
    if (refl !== 0) evidence.push(`Reflectancia: ${refl} dB`);
  } else if (highestLoss && (parseFloat(highestLoss.eventLoss) || 0) > 0.5) {
    main = highestLoss;
    evidence.push(`Mayor pérdida registrada: ${highestLoss.eventLoss} dB`);
    if (main.severity === "critical") evidence.push("Pérdida supera umbral crítico (>1.0 dB)");
    if (main.severity === "warning") evidence.push("Pérdida en rango de degradación (0.2–1.0 dB)");
  } else if (reflective) {
    main = reflective;
    evidence.push("Evento reflectivo intermedio detectado");
    evidence.push(`Reflectancia: ${reflective.reflectance} dB`);
  } else {
    main = highestLoss;
    evidence.push("Todos los eventos dentro de parámetros normales");
  }

  const confidence = computeConfidence(main, classified);

  return {
    eventIndex: main.index,
    distance: main.distance || "—",
    diagnosis: main.classification,
    confidence,
    evidence,
  };
}

function computeConfidence(main: ClassifiedEvent, all: ClassifiedEvent[]): string {
  const loss = parseFloat(main.eventLoss) || 0;

  if (main.classification === "Evento terminal reflectivo") return "Alta";
  if (main.classification === "Pérdida no reflectiva relevante" && loss > 2) return "Alta";
  if (main.classification === "Pérdida no reflectiva relevante") return "Media-Alta";
  if (main.classification === "Empalme degradado probable") return "Media";
  if (main.classification === "Evento reflectivo intermedio") return "Media";
  return "Baja";
}
