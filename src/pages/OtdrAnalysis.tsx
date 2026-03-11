import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type EventType = "splice" | "connector" | "splitter" | "break" | "end of fiber";

interface OtdrEvent {
  id: string;
  distance: string;
  loss: string;
  reflectance: string;
  eventType: EventType;
}

const eventTypeLabels: Record<EventType, string> = {
  splice: "Splice",
  connector: "Connector",
  splitter: "Splitter",
  break: "Break",
  "end of fiber": "End of Fiber",
};

const OtdrAnalysis = () => {
  const [events, setEvents] = useState<OtdrEvent[]>([]);

  const addEvent = useCallback(() => {
    setEvents((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        distance: "",
        loss: "",
        reflectance: "",
        eventType: "splice",
      },
    ]);
  }, []);

  const removeEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const updateEvent = useCallback(
    (id: string, field: keyof Omit<OtdrEvent, "id">, value: string) => {
      setEvents((prev) =>
        prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
      );
    },
    []
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center gap-4 px-6">
          <Link to="/">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft size={18} />
            </Button>
          </Link>
          <div>
            <h1 className="font-heading text-lg font-bold tracking-wider text-foreground">
              OTDR Analysis
            </h1>
            <p className="text-xs text-muted-foreground">Event Table</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:px-6">
        {/* Actions */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {events.length} event{events.length !== 1 && "s"}
          </p>
          <Button onClick={addEvent} size="sm" className="gap-2">
            <Plus size={16} />
            Add Event
          </Button>
        </div>

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/50 py-20">
            <p className="mb-4 text-sm text-muted-foreground">
              No events yet. Add your first OTDR event.
            </p>
            <Button onClick={addEvent} variant="outline" size="sm" className="gap-2">
              <Plus size={16} />
              Add Event
            </Button>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden md:block rounded-lg border border-border/30 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/30 bg-muted/30">
                    <TableHead className="w-16 text-center">#</TableHead>
                    <TableHead>Distance (km)</TableHead>
                    <TableHead>Loss (dB)</TableHead>
                    <TableHead>Reflectance (dB)</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead className="w-16" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event, index) => (
                    <TableRow key={event.id} className="border-border/30">
                      <TableCell className="text-center font-mono text-muted-foreground text-sm">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          step="0.001"
                          placeholder="0.000"
                          value={event.distance}
                          onChange={(e) => updateEvent(event.id, "distance", e.target.value)}
                          className="h-9"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={event.loss}
                          onChange={(e) => updateEvent(event.id, "loss", e.target.value)}
                          className="h-9"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          value={event.reflectance}
                          onChange={(e) => updateEvent(event.id, "reflectance", e.target.value)}
                          className="h-9"
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={event.eventType}
                          onValueChange={(v) => updateEvent(event.id, "eventType", v)}
                        >
                          <SelectTrigger className="h-9">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(eventTypeLabels).map(([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 text-muted-foreground hover:text-destructive"
                          onClick={() => removeEvent(event.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className="rounded-lg border border-border/30 bg-card p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-sm font-semibold text-foreground">
                      Event #{index + 1}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeEvent(event.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs text-muted-foreground">Distance (km)</label>
                      <Input
                        type="number"
                        step="0.001"
                        placeholder="0.000"
                        value={event.distance}
                        onChange={(e) => updateEvent(event.id, "distance", e.target.value)}
                        className="h-9"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-muted-foreground">Loss (dB)</label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={event.loss}
                        onChange={(e) => updateEvent(event.id, "loss", e.target.value)}
                        className="h-9"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-muted-foreground">Reflectance (dB)</label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={event.reflectance}
                        onChange={(e) => updateEvent(event.id, "reflectance", e.target.value)}
                        className="h-9"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs text-muted-foreground">Event Type</label>
                      <Select
                        value={event.eventType}
                        onValueChange={(v) => updateEvent(event.id, "eventType", v)}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(eventTypeLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default OtdrAnalysis;
