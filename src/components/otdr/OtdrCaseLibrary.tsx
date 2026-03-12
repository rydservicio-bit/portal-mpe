import { FlaskConical, FolderOpen, BookOpen } from "lucide-react";
import OtdrCaseCard from "./OtdrCaseCard";
import { trainingCases, realCases } from "@/lib/otdr/trainingCases";
import type { OtdrCase } from "@/lib/otdr/types";

interface Props {
  onLoadCase: (c: OtdrCase) => void;
}

const OtdrCaseLibrary = ({ onLoadCase }: Props) => (
  <div className="space-y-8">
    <Section
      icon={<FlaskConical size={18} className="text-primary" />}
      title="Casos de entrenamiento"
      description="Casos predefinidos para capacitación y validación del motor de análisis."
      cases={trainingCases}
      onLoadCase={onLoadCase}
    />
    <Section
      icon={<FolderOpen size={18} className="text-secondary" />}
      title="Casos reales"
      description="Casos de campo documentados para referencia."
      cases={realCases}
      onLoadCase={onLoadCase}
      emptyMessage="Aún no hay casos reales registrados."
    />
  </div>
);

function Section({ icon, title, description, cases, onLoadCase, emptyMessage }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  cases: OtdrCase[];
  onLoadCase: (c: OtdrCase) => void;
  emptyMessage?: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {icon}
        <div>
          <h3 className="font-heading text-sm font-bold text-foreground">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {cases.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border/40 py-10 text-center">
          <BookOpen size={24} className="mx-auto mb-2 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">{emptyMessage || "Sin casos disponibles."}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {cases.map((c, i) => (
            <OtdrCaseCard key={c.caseId} caseData={c} index={i} onLoad={onLoadCase} />
          ))}
        </div>
      )}
    </div>
  );
}

export default OtdrCaseLibrary;
