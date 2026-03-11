import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { ClassifiedEvent } from "@/lib/otdr-engine";

interface Props {
  event: ClassifiedEvent;
  onUpdate: (id: string, field: string, value: string | boolean) => void;
  onRemove: (id: string) => void;
}

const severityBadge: Record<string, string> = {
  normal: "bg-green-500/15 text-green-400 border-green-500/30",
  warning: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  critical: "bg-destructive/15 text-destructive border-destructive/30",
};

const OtdrEventCard = ({ event, onUpdate, onRemove }: Props) => (
  <div className="rounded-lg border border-border/30 bg-card p-4 space-y-3">
    <div className="flex items-center justify-between">
      <span className="font-heading text-sm font-semibold text-foreground">Evento #{event.index}</span>
      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive"
        onClick={() => onRemove(event.id)}>
        <Trash2 size={14} />
      </Button>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <Field label="Distancia (km)" type="number" step="0.001" placeholder="0.000"
        value={event.distance} onChange={(v) => onUpdate(event.id, "distance", v)} />
      <Field label="Pérdida (dB)" type="number" step="0.01" placeholder="0.00"
        value={event.eventLoss} onChange={(v) => onUpdate(event.id, "eventLoss", v)} />
      <Field label="Reflectancia (dB)" type="number" step="0.01" placeholder="0.00"
        value={event.reflectance} onChange={(v) => onUpdate(event.id, "reflectance", v)} />
      <Field label="Pérdida acum. (dB)" type="number" step="0.01" placeholder="0.00"
        value={event.cumulativeLoss} onChange={(v) => onUpdate(event.id, "cumulativeLoss", v)} />
      <Field label="Atenuación (dB/km)" type="number" step="0.001" placeholder="0.000"
        value={event.attenuation} onChange={(v) => onUpdate(event.id, "attenuation", v)} />
      <div>
        <label className="mb-1 block text-xs text-muted-foreground">Fin de fibra</label>
        <Switch checked={event.isFiberEnd}
          onCheckedChange={(v) => onUpdate(event.id, "isFiberEnd", v)} />
      </div>
    </div>

    <div>
      <span className="text-xs text-muted-foreground">Clasificación</span>
      <div className="mt-1">
        <span className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-medium ${severityBadge[event.severity]}`}>
          {event.classification}
        </span>
      </div>
    </div>
  </div>
);

function Field({ label, value, onChange, ...rest }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; step?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted-foreground">{label}</label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} className="h-9" {...rest} />
    </div>
  );
}

export default OtdrEventCard;
