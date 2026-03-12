// ─── OTDR Types ───────────────────────────────────────────────────────────────

export interface OtdrEventInput {
  id: string;
  distance: string;
  eventLoss: string;
  reflectance: string;
  cumulativeLoss: string;
  attenuation: string;
  isFiberEnd: boolean;
}

export interface OtdrEventResult extends OtdrEventInput {
  index: number;
  classification: string;
  probableFault: string;
  severity: "normal" | "warning" | "critical";
  confidence: string;
  evidence: string[];
}

export interface OtdrDiagnosisSummary {
  eventIndex: number;
  distance: string;
  diagnosis: string;
  confidence: string;
  evidence: string[];
}

export type OtdrCaseCategory = "entrenamiento" | "real";

export interface OtdrCase {
  caseId: string;
  category: OtdrCaseCategory;
  title: string;
  fiberLengthKm: number;
  difficulty: "Básico" | "Intermedio" | "Avanzado";
  expectedFault: string;
  expectedDiagnosis: string;
  notes: string;
  events: OtdrEventInput[];
}
