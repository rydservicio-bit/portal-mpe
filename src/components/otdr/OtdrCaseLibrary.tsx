import { motion } from "framer-motion";
import { BookOpen, FlaskConical, FolderOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trainingCases, realCases } from "@/lib/otdr-cases";
import type { OtdrCase } from "@/lib/otdr-engine";

interface Props {
  onLoadCase: (c: OtdrCase) => void;
}

const difficultyColor: Record<string, string> = {
  "Básico": "text-green-400 bg-green-500/10 border-green-500/30",
  "Intermedio": "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  "Avanzado": "text-destructive bg-destructive/10 border-destructive/30",
};

const OtdrCaseLibrary = ({ onLoadCase }: Props) => {
  return (
    <div className="space-y-8">
      {/* Training */}
      <Section
        icon={<FlaskConical size={18} className="text-primary" />}
        title="Casos de entrenamiento"
        description="Casos predefinidos para capacitación y validación del motor de análisis."
        cases={trainingCases}
        onLoadCase={onLoadCase}
      />

      {/* Real */}
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
};

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
            <CaseCard key={c.caseId} caseData={c} index={i} onLoad={onLoadCase} />
          ))}
        </div>
      )}
    </div>
  );
}

function CaseCard({ caseData, index, onLoad }: { caseData: OtdrCase; index: number; onLoad: (c: OtdrCase) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="rounded-lg border border-border/30 bg-card p-4 space-y-3 flex flex-col"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1 flex-1">
          <p className="font-heading text-sm font-semibold text-foreground">{caseData.title}</p>
          <p className="text-xs text-muted-foreground">{caseData.caseId} · {caseData.fiberLengthKm} km</p>
        </div>
        <span className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${difficultyColor[caseData.difficulty]}`}>
          {caseData.difficulty}
        </span>
      </div>

      <div className="space-y-1">
        <div>
          <span className="text-xs text-muted-foreground">Falla esperada: </span>
          <span className="text-xs text-foreground/80">{caseData.expectedFault}</span>
        </div>
        <div>
          <span className="text-xs text-muted-foreground">Eventos: </span>
          <span className="text-xs text-foreground/80">{caseData.events.length}</span>
        </div>
      </div>

      {caseData.notes && (
        <p className="text-xs text-muted-foreground/70 italic">{caseData.notes}</p>
      )}

      <div className="mt-auto pt-2">
        <Button onClick={() => onLoad(caseData)} variant="outline" size="sm" className="w-full gap-2 text-xs">
          <ArrowRight size={14} />
          Cargar en análisis
        </Button>
      </div>
    </motion.div>
  );
}

export default OtdrCaseLibrary;
