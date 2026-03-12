import { Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { OtdrEventInput, OtdrEventResult } from "@/lib/otdr/types";

interface Props {
  events: OtdrEventInput[];
  classified: OtdrEventResult[];
  analyzed: boolean;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: string, value: string | boolean) => void;
  onAnalyze: () => void;
}

const severityBadge: Record<string, string> = {
  normal: "bg-green-500/10 text-green-400 border-green-500/30",
  warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  critical: "bg-destructive/10 text-destructive border-destructive/30",
};

const OtdrEventsTable = ({ events, classified, analyzed, onAdd, onRemove, onUpdate, onAnalyze }: Props) => {
  const displayEvents = analyzed ? classified : events;

  return (
    <div className="space-y-4">
      {/* Actions */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-muted-foreground">
          {events.length} evento{events.length !== 1 && "s"}
        </p>
        <div className="flex gap-2">
          <Button onClick={onAdd} size="sm" variant="outline" className="gap-2">
            <Plus size={16} />
            Agregar evento
          </Button>
          <Button onClick={onAnalyze} size="sm" className="gap-2">
            <Search size={16} />
            Analizar eventos
          </Button>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/50 py-20">
          <p className="mb-4 text-sm text-muted-foreground">
            Aún no hay eventos. Agrega tu primer evento OTDR o carga un caso desde la biblioteca.
          </p>
          <Button onClick={onAdd} variant="outline" size="sm" className="gap-2">
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
                  {analyzed && (
                    <>
                      <TableHead>Clase</TableHead>
                      <TableHead>Posible falla</TableHead>
                      <TableHead>Confianza</TableHead>
                    </>
                  )}
                  <TableHead className="w-14" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {(analyzed ? classified : events.map((e, i) => ({ ...e, index: i + 1 }))).map((event: any) => (
                  <TableRow key={event.id} className="border-border/20">
                    <TableCell className="text-center text-xs font-medium text-muted-foreground">{event.index}</TableCell>
                    <TableCell><Input value={event.distance} onChange={(e) => onUpdate(event.id, "distance", e.target.value)} className="h-8 text-xs bg-background/50" placeholder="0.000" /></TableCell>
                    <TableCell><Input value={event.eventLoss} onChange={(e) => onUpdate(event.id, "eventLoss", e.target.value)} className="h-8 text-xs bg-background/50" placeholder="0.00" /></TableCell>
                    <TableCell><Input value={event.reflectance} onChange={(e) => onUpdate(event.id, "reflectance", e.target.value)} className="h-8 text-xs bg-background/50" placeholder="" /></TableCell>
                    <TableCell><Input value={event.cumulativeLoss} onChange={(e) => onUpdate(event.id, "cumulativeLoss", e.target.value)} className="h-8 text-xs bg-background/50" placeholder="0.00" /></TableCell>
                    <TableCell><Input value={event.attenuation} onChange={(e) => onUpdate(event.id, "attenuation", e.target.value)} className="h-8 text-xs bg-background/50" placeholder="0.20" /></TableCell>
                    <TableCell className="text-center">
                      <Switch checked={event.isFiberEnd} onCheckedChange={(v) => onUpdate(event.id, "isFiberEnd", v)} />
                    </TableCell>
                    {analyzed && "classification" in event && (
                      <>
                        <TableCell>
                          <span className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-medium ${severityBadge[(event as OtdrEventResult).severity]}`}>
                            {(event as OtdrEventResult).classification}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-foreground/80">{(event as OtdrEventResult).probableFault}</TableCell>
                        <TableCell className="text-xs text-foreground/80">{(event as OtdrEventResult).confidence}</TableCell>
                      </>
                    )}
                    <TableCell>
                      <Button onClick={() => onRemove(event.id)} variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive">
                        <Trash2 size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden space-y-4">
            {(analyzed ? classified : events.map((e, i) => ({ ...e, index: i + 1 }))).map((event: any) => (
              <div key={event.id} className="rounded-lg border border-border/30 bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">Evento {event.index}</span>
                  <Button onClick={() => onRemove(event.id)} variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive">
                    <Trash2 size={14} />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-muted-foreground">Distancia (km)</label>
                    <Input value={event.distance} onChange={(e) => onUpdate(event.id, "distance", e.target.value)} className="h-8 text-xs bg-background/50" />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground">Pérdida (dB)</label>
                    <Input value={event.eventLoss} onChange={(e) => onUpdate(event.id, "eventLoss", e.target.value)} className="h-8 text-xs bg-background/50" />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground">Reflectancia (dB)</label>
                    <Input value={event.reflectance} onChange={(e) => onUpdate(event.id, "reflectance", e.target.value)} className="h-8 text-xs bg-background/50" />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground">Pérdida acum. (dB)</label>
                    <Input value={event.cumulativeLoss} onChange={(e) => onUpdate(event.id, "cumulativeLoss", e.target.value)} className="h-8 text-xs bg-background/50" />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground">Atenuación (dB/km)</label>
                    <Input value={event.attenuation} onChange={(e) => onUpdate(event.id, "attenuation", e.target.value)} className="h-8 text-xs bg-background/50" />
                  </div>
                  <div className="flex items-center gap-2 pt-4">
                    <Switch checked={event.isFiberEnd} onCheckedChange={(v) => onUpdate(event.id, "isFiberEnd", v)} />
                    <span className="text-[11px] text-muted-foreground">Fin de fibra</span>
                  </div>
                </div>
                {analyzed && "classification" in event && (
                  <div className="border-t border-border/20 pt-3 space-y-1">
                    <span className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-medium ${severityBadge[(event as OtdrEventResult).severity]}`}>
                      {(event as OtdrEventResult).classification}
                    </span>
                    <p className="text-xs text-foreground/80">{(event as OtdrEventResult).probableFault}</p>
                    <p className="text-[11px] text-muted-foreground">Confianza: {(event as OtdrEventResult).confidence}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OtdrEventsTable;
