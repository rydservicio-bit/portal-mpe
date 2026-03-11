import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import OtdrEventRow from "@/components/otdr/OtdrEventRow";
import OtdrEventCard from "@/components/otdr/OtdrEventCard";
import OtdrDiagnosisPanel from "@/components/otdr/OtdrDiagnosisPanel";
import {
  type OtdrEvent,
  classifyAllEvents,
  detectMainEvent,
} from "@/lib/otdr-engine";

const OtdrAnalysis = () => {
  const [events, setEvents] = useState<OtdrEvent[]>([]);

  const addEvent = useCallback(() => {
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
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const updateEvent = useCallback(
    (id: string, field: string, value: string | boolean) => {
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
      );
    },
    []
  );

  const classified = useMemo(() => classifyAllEvents(events), [events]);
  const diagnosis = useMemo(() => detectMainEvent(classified), [classified]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center gap-4 px-6">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft size={18} />
            </Button>
          </Link>
          <div>
            <h1 className="font-heading text-lg font-bold tracking-wider text-foreground">
              Análisis OTDR
            </h1>
            <p className="text-xs text-muted-foreground">Motor de diagnóstico de eventos</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:px-6 space-y-8">
        {/* Actions */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {events.length} evento{events.length !== 1 && "s"}
          </p>
          <Button onClick={addEvent} size="sm" className="gap-2">
            <Plus size={16} />
            Agregar evento
          </Button>
        </div>

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/50 py-20">
            <p className="mb-4 text-sm text-muted-foreground">
              Aún no hay eventos. Agrega tu primer evento OTDR.
            </p>
            <Button onClick={addEvent} variant="outline" size="sm" className="gap-2">
              <Plus size={16} />
              Agregar evento
            </Button>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden lg:block rounded-lg border border-border/30 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30 bg-muted/30">
                    <TableHead className="w-14 text-center">Evento</TableHead>
                    <TableHead>Distancia (km)</TableHead>
                    <TableHead>Pérdida (dB)</TableHead>
                    <TableHead>Reflectancia (dB)</TableHead>
                    <TableHead>Pérdida acum. (dB)</TableHead>
                    <TableHead>Atenuación (dB/km)</TableHead>
                    <TableHead className="text-center">Fin de fibra</TableHead>
                    <TableHead>Clasificación</TableHead>
                    <TableHead className="w-14" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classified.map((event) => (
                    <OtdrEventRow key={event.id} event={event} onUpdate={updateEvent} onRemove={removeEvent} />
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden space-y-4">
              {classified.map((event) => (
                <OtdrEventCard key={event.id} event={event} onUpdate={updateEvent} onRemove={removeEvent} />
              ))}
            </div>

            {/* Diagnosis panel */}
            {diagnosis && <OtdrDiagnosisPanel diagnosis={diagnosis} />}
          </>
        )}
      </main>
    </div>
  );
};

export default OtdrAnalysis;
