import type { OtdrCase } from "./types";
import { trainingCases, realCases } from "./trainingCases";

export function getAllCases(): OtdrCase[] {
  return [...trainingCases, ...realCases];
}

export function getCasesByCategory(category: "entrenamiento" | "real"): OtdrCase[] {
  return getAllCases().filter((c) => c.category === category);
}

export function getCaseById(caseId: string): OtdrCase | undefined {
  return getAllCases().find((c) => c.caseId === caseId);
}
