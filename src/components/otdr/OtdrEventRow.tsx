import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import type { ClassifiedEvent } from "@/lib/otdr-engine";

interface Props {
  event: ClassifiedEvent;
  onUpdate: (id: string, field: string, value: string | boolean) => void;
  onRemove: (id: string) => void;
  analyzed: boolean;
}

const severityBadge: Record<string, string> = {
  normal: "bg-green-500/15 text-green-400 border-green-500/30",
  warning: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  critical: "bg-destructive/15 text-destructive border-destructive/30",
};

const OtdrEventRow = ({ event, onUpdate, onRemove, analyzed }: Props) => (
  <TableRow className="border-border/30">
    <TableCell className="text-center font-mono text-muted-foreground text-sm">
      {event.index}
    </TableCell>
    <TableCell>
      <Input type="number" step="0.001" placeholder="0.000" value={event.distance}
        onChange={(e) => onUpdate(event.id, "distance", e.target.value)} className="h-9" />
    </TableCell>
    <TableCell>
      <Input type="number" step="0.01" placeholder="0.00" value={event.eventLoss}
        onChange={(e) => onUpdate(event.id, "eventLoss", e.target.value)} className="h-9" />
    </TableCell>
    <TableCell>
      <Input type="number" step="0.01" placeholder="0.00" value={event.reflectance}
        onChange={(e) => onUpdate(event.id, "reflectance", e.target.value)} className="h-9" />
    </TableCell>
    <TableCell>
      <Input type="number" step="0.01" placeholder="0.00" value={event.cumulativeLoss}
        onChange={(e) => onUpdate(event.id, "cumulativeLoss", e.target.value)} className="h-9" />
    </TableCell>
    <TableCell>
      <Input type="number" step="0.001" placeholder="0.000" value={event.attenuation}
        onChange={(e) => onUpdate(event.id, "attenuation", e.target.value)} className="h-9" />
    </TableCell>
    <TableCell className="text-center">
      <Switch checked={event.isFiberEnd}
        onCheckedChange={(v) => onUpdate(event.id, "isFiberEnd", v)} />
    </TableCell>
    {analyzed && (
      <>
        <TableCell>
          <span className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${severityBadge[event.severity]}`}>
            {event.classification}
          </span>
        </TableCell>
        <TableCell className="text-sm text-foreground/80 whitespace-nowrap">
          {event.probableFault}
        </TableCell>
        <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
          {event.confidence}
        </TableCell>
      </>
    )}
    <TableCell>
      <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-destructive"
        onClick={() => onRemove(event.id)}>
        <Trash2 size={16} />
      </Button>
    </TableCell>
  </TableRow>
);

export default OtdrEventRow;
