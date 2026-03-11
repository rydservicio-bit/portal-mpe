import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Zap } from "lucide-react";
import type { MainEventDiagnosis } from "@/lib/otdr-engine";

interface Props {
  diagnosis: MainEventDiagnosis;
}

const confidenceColors: Record<string, string> = {
  Alta: "text-green-400",
  "Media-Alta": "text-secondary",
  Media: "text-yellow-400",
  Baja: "text-muted-foreground",
};

const OtdrDiagnosisPanel = ({ diagnosis }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-primary/30 bg-card p-6 space-y-4"
    >
      <div className="flex items-center gap-2">
        <Zap size={18} className="text-primary" />
        <h2 className="font-heading text-base font-bold text-foreground">
          Resultado del análisis
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Evento principal detectado" value={`Evento #${diagnosis.eventIndex}`} />
        <Field label="Distancia" value={diagnosis.distance !== "—" ? `${diagnosis.distance} km` : "—"} />
        <Field label="Diagnóstico probable" value={diagnosis.diagnosis} />
        <Field
          label="Confianza"
          value={diagnosis.confidence}
          className={confidenceColors[diagnosis.confidence]}
        />
      </div>

      <div>
        <span className="text-xs text-muted-foreground block mb-2">Evidencia</span>
        <ul className="space-y-1">
          {diagnosis.evidence.map((e, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
              <CheckCircle size={14} className="mt-0.5 shrink-0 text-primary" />
              {e}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

function Field({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div>
      <span className="text-xs text-muted-foreground">{label}</span>
      <p className={`text-sm font-medium ${className || "text-foreground"}`}>{value}</p>
    </div>
  );
}

export default OtdrDiagnosisPanel;
