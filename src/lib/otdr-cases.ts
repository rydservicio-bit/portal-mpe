import type { OtdrCase } from "./otdr-engine";

export const trainingCases: OtdrCase[] = [
  {
    caseId: "TC-001",
    category: "entrenamiento",
    title: "Corte franco",
    fiberLengthKm: 12.5,
    difficulty: "Básico",
    expectedFault: "Corte de fibra",
    expectedDiagnosis: "Evento terminal reflectivo — Fin de fibra probable",
    notes: "Caso típico de corte limpio. Se observa alta reflectancia y pérdida total en el punto de corte.",
    events: [
      { id: "tc001-1", distance: "0.000", eventLoss: "0.10", reflectance: "", cumulativeLoss: "0.10", attenuation: "0.22", isFiberEnd: false },
      { id: "tc001-2", distance: "4.200", eventLoss: "0.08", reflectance: "", cumulativeLoss: "1.02", attenuation: "0.21", isFiberEnd: false },
      { id: "tc001-3", distance: "8.100", eventLoss: "25.00", reflectance: "-14.5", cumulativeLoss: "26.02", attenuation: "0.00", isFiberEnd: true },
    ],
  },
  {
    caseId: "TC-002",
    category: "entrenamiento",
    title: "Atenuación por daño físico",
    fiberLengthKm: 20.0,
    difficulty: "Intermedio",
    expectedFault: "Daño parcial en fibra",
    expectedDiagnosis: "Pérdida no reflectiva relevante — Daño parcial o curvatura severa",
    notes: "Pérdida alta sin reflectancia en un punto intermedio. Compatible con aplastamiento o daño mecánico.",
    events: [
      { id: "tc002-1", distance: "0.000", eventLoss: "0.05", reflectance: "", cumulativeLoss: "0.05", attenuation: "0.20", isFiberEnd: false },
      { id: "tc002-2", distance: "5.300", eventLoss: "0.12", reflectance: "", cumulativeLoss: "1.17", attenuation: "0.21", isFiberEnd: false },
      { id: "tc002-3", distance: "12.800", eventLoss: "1.80", reflectance: "", cumulativeLoss: "4.55", attenuation: "0.22", isFiberEnd: false },
      { id: "tc002-4", distance: "20.000", eventLoss: "0.00", reflectance: "-15.0", cumulativeLoss: "5.95", attenuation: "0.20", isFiberEnd: true },
    ],
  },
  {
    caseId: "TC-003",
    category: "entrenamiento",
    title: "Fusión de mala calidad",
    fiberLengthKm: 15.0,
    difficulty: "Básico",
    expectedFault: "Empalme degradado",
    expectedDiagnosis: "Empalme degradado probable — Fusión de mala calidad o empalme degradado",
    notes: "Empalme con pérdida en rango 0.2–1.0 dB. Indica fusión deficiente.",
    events: [
      { id: "tc003-1", distance: "0.000", eventLoss: "0.08", reflectance: "", cumulativeLoss: "0.08", attenuation: "0.21", isFiberEnd: false },
      { id: "tc003-2", distance: "7.500", eventLoss: "0.55", reflectance: "", cumulativeLoss: "1.71", attenuation: "0.22", isFiberEnd: false },
      { id: "tc003-3", distance: "15.000", eventLoss: "0.00", reflectance: "-14.8", cumulativeLoss: "3.36", attenuation: "0.20", isFiberEnd: true },
    ],
  },
  {
    caseId: "TC-004",
    category: "entrenamiento",
    title: "FO aplastada / radio de curvatura no respetado",
    fiberLengthKm: 10.0,
    difficulty: "Avanzado",
    expectedFault: "Macrocurvatura",
    expectedDiagnosis: "Pérdida no reflectiva relevante — Macrocurvatura probable",
    notes: "Pérdida elevada sin reflectancia y atenuación alta del tramo. Compatible con fibra aplastada o radio de curvatura insuficiente.",
    events: [
      { id: "tc004-1", distance: "0.000", eventLoss: "0.06", reflectance: "", cumulativeLoss: "0.06", attenuation: "0.20", isFiberEnd: false },
      { id: "tc004-2", distance: "3.200", eventLoss: "0.85", reflectance: "", cumulativeLoss: "0.97", attenuation: "0.65", isFiberEnd: false },
      { id: "tc004-3", distance: "6.500", eventLoss: "0.10", reflectance: "", cumulativeLoss: "1.73", attenuation: "0.22", isFiberEnd: false },
      { id: "tc004-4", distance: "10.000", eventLoss: "0.00", reflectance: "-15.2", cumulativeLoss: "2.43", attenuation: "0.20", isFiberEnd: true },
    ],
  },
];

export const realCases: OtdrCase[] = [];

export function getAllCases(): OtdrCase[] {
  return [...trainingCases, ...realCases];
}
