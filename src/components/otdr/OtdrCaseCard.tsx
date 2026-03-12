import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OtdrCase } from "@/lib/otdr/types";

const difficultyColor: Record<string, string> = {
  "Básico": "text-green-400 bg-green-500/10 border-green-500/30",
  "Intermedio": "text-yellow-400 bg-yellow-500/10 border-yellow-500/30",
  "Avanzado": "text-destructive bg-destructive/10 border-destructive/30",
};

interface Props {
  caseData: OtdrCase;
  index: number;
  onLoad: (c: OtdrCase) => void;
}

const OtdrCaseCard = ({ caseData, index, onLoad }: Props) => (
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

export default OtdrCaseCard;
