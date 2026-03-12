import { useState, useCallback, useMemo } from "react";
import OtdrEventsTable from "./OtdrEventsTable";
import OtdrSummaryPanel from "./OtdrSummaryPanel";
import { analyzeCase, selectMainEvent } from "@/lib/otdr/analysis";
import type { OtdrEventInput, OtdrCase } from "@/lib/otdr/types";
import { toast } from "sonner";

interface Props {
  initialEvents?: OtdrEventInput[];
}

const OtdrCaseAnalysis = ({ initialEvents }: Props) => {
  const [events, setEvents] = useState<OtdrEventInput[]>(initialEvents || []);
  const [analyzed, setAnalyzed] = useState(false);

  const addEvent = useCallback(() => {
    setAnalyzed(false);
    setEvents((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        distance: "",
        eventLoss: "",
        reflectance: "",
        cumulativeLoss: "",
        attenuation: "",
        isFiberEnd: false,
      },
    ]);
  }, []);

  const removeEvent = useCallback((id: string) => {
    setAnalyzed(false);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const updateEvent = useCallback((id: string, field: string, value: string | boolean) => {
    setAnalyzed(false);
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  }, []);

  const classified = useMemo(() => analyzeCase(events), [events]);
  const diagnosis = useMemo(() => (analyzed ? selectMainEvent(classified) : null), [classified, analyzed]);

  const runAnalysis = useCallback(() => {
    if (events.length === 0) {
      toast.error("Agrega al menos un evento para analizar.");
      return;
    }
    setAnalyzed(true);
    toast.success("Análisis completado.");
  }, [events.length]);

  // Expose a way to load case events from outside
  const loadCase = useCallback((c: OtdrCase) => {
    setEvents(c.events.map((e) => ({ ...e, id: crypto.randomUUID() })));
    setAnalyzed(false);
    toast.info(`Caso "${c.title}" cargado. Presiona "Analizar eventos" para diagnosticar.`);
  }, []);

  return (
    <div className="space-y-6">
      {diagnosis && <OtdrSummaryPanel diagnosis={diagnosis} />}
      <OtdrEventsTable
        events={events}
        classified={classified}
        analyzed={analyzed}
        onAdd={addEvent}
        onRemove={removeEvent}
        onUpdate={updateEvent}
        onAnalyze={runAnalysis}
      />
    </div>
  );
};

export default OtdrCaseAnalysis;
export type { Props as OtdrCaseAnalysisProps };
