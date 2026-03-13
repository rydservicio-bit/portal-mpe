import { useState } from "react";
import { Plus, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface BitacoraEntry {
  id: string;
  fecha: string;
  estado: string;
  observacion: string;
  tipo: "avance" | "estado" | "cierre";
}

const tipoLabel: Record<string, string> = {
  avance: "Avance",
  estado: "Cambio de estado",
  cierre: "Cierre técnico",
};

const BitacoraSection = () => {
  const [entries, setEntries] = useState<BitacoraEntry[]>([
    { id: "1", fecha: "2026-03-12 09:30", estado: "En diagnóstico", observacion: "Se inició prueba OTDR en tramo Norte-Centro.", tipo: "avance" },
    { id: "2", fecha: "2026-03-12 11:00", estado: "En reparación", observacion: "Se identificó empalme degradado a 4.2 km. Procediendo con re-fusión.", tipo: "estado" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [obs, setObs] = useState("");
  const [tipo, setTipo] = useState<string>("avance");

  const addEntry = () => {
    if (!obs.trim()) { toast.error("Escribe una observación."); return; }
    const now = new Date();
    setEntries((prev) => [
      { id: crypto.randomUUID(), fecha: now.toISOString().slice(0, 16).replace("T", " "), estado: "Registrado", observacion: obs, tipo: tipo as BitacoraEntry["tipo"] },
      ...prev,
    ]);
    setObs("");
    setShowForm(false);
    toast.success("Registro agregado a la bitácora.");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-sm font-bold text-foreground">Bitácora técnica</h3>
        <Button size="sm" variant="outline" onClick={() => setShowForm(!showForm)} className="gap-1 text-xs">
          <Plus size={12} /> Agregar registro
        </Button>
      </div>

      {showForm && (
        <div className="glass-card p-4 space-y-3">
          <Select value={tipo} onValueChange={setTipo}>
            <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="avance">Avance</SelectItem>
              <SelectItem value="estado">Cambio de estado</SelectItem>
              <SelectItem value="cierre">Cierre técnico</SelectItem>
            </SelectContent>
          </Select>
          <Textarea value={obs} onChange={(e) => setObs(e.target.value)} placeholder="Observaciones..." className="text-xs min-h-[60px]" />
          <Button size="sm" onClick={addEntry} className="text-xs">Guardar</Button>
        </div>
      )}

      <div className="relative pl-4 border-l border-border/40 space-y-4">
        {entries.map((e) => (
          <div key={e.id} className="relative">
            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge variant="secondary" className="text-[10px]">{tipoLabel[e.tipo]}</Badge>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground"><Clock size={10} />{e.fecha}</span>
            </div>
            <p className="text-xs text-muted-foreground">{e.observacion}</p>
          </div>
        ))}
      </div>

      {entries.length === 0 && (
        <div className="glass-card p-8 text-center">
          <p className="text-xs text-muted-foreground">Sin registros en la bitácora.</p>
        </div>
      )}
    </div>
  );
};

export default BitacoraSection;
