// ─── Types ────────────────────────────────────────────────────────────────────

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
  probableFault: string;
  severity: "normal" | "warning" | "critical";
  confidence: string;
  evidence: string[];
}

export interface MainEventDiagnosis {
  eventIndex: number;
  distance: string;
  diagnosis: string;
  confidence: string;
  evidence: string[];
}

export interface OtdrCase {
  caseId: string;
  category: "entrenamiento" | "real";
  title: string;
  fiberLengthKm: number;
  difficulty: "Básico" | "Intermedio" | "Avanzado";
  expectedFault: string;
  expectedDiagnosis: string;
  notes: string;
  events: OtdrEvent[];
}

// ─── Classification Engine ────────────────────────────────────────────────────

export function classifyEvent(event: OtdrEvent): {
  classification: string;
  probableFault: string;
  severity: "normal" | "warning" | "critical";
  confidence: string;
  evidence: string[];
} {
  const hasReflectance = event.reflectance !== "" && parseFloat(event.reflectance) !== 0;
  const loss = event.eventLoss !== "" ? parseFloat(event.eventLoss) : 0;
  const attenuation = event.attenuation !== "" ? parseFloat(event.attenuation) : 0;
  const evidence: string[] = [];

  // Rule 1: terminal reflective
  if (hasReflectance && event.isFiberEnd) {
    evidence.push("Reflectancia detectada");
    evidence.push("Marcado como fin de fibra");
    if (loss > 0) evidence.push(`Pérdida del evento: ${loss} dB`);
    return {
      classification: "Evento terminal reflectivo",
      probableFault: "Fin de fibra probable",
      severity: "normal",
      confidence: "Alta",
      evidence,
    };
  }

  // Rule 2: reflective intermediate
  if (hasReflectance && !event.isFiberEnd) {
    evidence.push(`Reflectancia: ${event.reflectance} dB`);
    evidence.push("No marcado como fin de fibra");
    if (loss > 0) evidence.push(`Pérdida del evento: ${loss} dB`);
    return {
      classification: "Evento reflectivo intermedio",
      probableFault: "Conector o interfaz reflectiva probable",
      severity: "warning",
      confidence: "Media",
      evidence,
    };
  }

  // Non-reflective rules
  // Rule 6: macrocurvature (check before generic loss rules)
  if (!hasReflectance && loss >= 0.5 && attenuation > 0.4) {
    evidence.push(`Pérdida del evento: ${loss} dB`);
    evidence.push(`Atenuación elevada del tramo: ${attenuation} dB/km`);
    evidence.push("Sin reflectancia — posible curvatura");
    return {
      classification: "Pérdida no reflectiva relevante",
      probableFault: "Macrocurvatura probable",
      severity: "critical",
      confidence: "Media",
      evidence,
    };
  }

  // Rule 3: normal splice
  if (!hasReflectance && loss < 0.2) {
    evidence.push(`Pérdida del evento: ${loss} dB (< 0.2 dB)`);
    evidence.push("Sin reflectancia");
    return {
      classification: "Evento no reflectivo menor",
      probableFault: "Empalme normal probable",
      severity: "normal",
      confidence: "Alta",
      evidence,
    };
  }

  // Rule 4: degraded splice
  if (!hasReflectance && loss >= 0.2 && loss < 1.0) {
    evidence.push(`Pérdida del evento: ${loss} dB (0.2–1.0 dB)`);
    evidence.push("Sin reflectancia");
    return {
      classification: "Empalme degradado probable",
      probableFault: "Fusión de mala calidad o empalme degradado",
      severity: "warning",
      confidence: "Alta",
      evidence,
    };
  }

  // Rule 5: significant non-reflective loss
  if (!hasReflectance && loss >= 1.0) {
    evidence.push(`Pérdida del evento: ${loss} dB (≥ 1.0 dB)`);
    evidence.push("Sin reflectancia");
    return {
      classification: "Pérdida no reflectiva relevante",
      probableFault: "Daño parcial o curvatura severa",
      severity: "critical",
      confidence: "Media",
      evidence,
    };
  }

  return {
    classification: "Evento indeterminado",
    probableFault: "No determinado",
    severity: "normal",
    confidence: "Baja",
    evidence: ["Datos insuficientes para clasificación"],
  };
}

export function classifyAllEvents(events: OtdrEvent[]): ClassifiedEvent[] {
  return events.map((event, index) => {
    const result = classifyEvent(event);
    return { ...event, index: index + 1, ...result };
  });
}

// ─── Main Event Detection ─────────────────────────────────────────────────────

export function detectMainEvent(classified: ClassifiedEvent[]): MainEventDiagnosis | null {
  if (classified.length === 0) return null;

  // Priority 1: terminal reflective
  const terminal = classified.find((e) => e.classification === "Evento terminal reflectivo");
  if (terminal) {
    return {
      eventIndex: terminal.index,
      distance: terminal.distance || "—",
      diagnosis: terminal.probableFault,
      confidence: terminal.confidence,
      evidence: terminal.evidence,
    };
  }

  // Priority 2: highest event loss
  const sorted = [...classified].sort((a, b) => {
    const lA = parseFloat(a.eventLoss) || 0;
    const lB = parseFloat(b.eventLoss) || 0;
    return lB - lA;
  });
  const highestLoss = sorted[0];
  if ((parseFloat(highestLoss.eventLoss) || 0) > 0.2) {
    return {
      eventIndex: highestLoss.index,
      distance: highestLoss.distance || "—",
      diagnosis: highestLoss.probableFault,
      confidence: highestLoss.confidence,
      evidence: highestLoss.evidence,
    };
  }

  // Priority 3: strongest reflective
  const reflective = classified.find((e) => e.classification === "Evento reflectivo intermedio");
  if (reflective) {
    return {
      eventIndex: reflective.index,
      distance: reflective.distance || "—",
      diagnosis: reflective.probableFault,
      confidence: reflective.confidence,
      evidence: reflective.evidence,
    };
  }

  // Fallback
  const first = classified[0];
  return {
    eventIndex: first.index,
    distance: first.distance || "—",
    diagnosis: "Todos los eventos dentro de parámetros normales",
    confidence: "Baja",
    evidence: ["No se detectaron eventos relevantes"],
  };
}
