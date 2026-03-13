import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AlertTriangle, Paperclip } from "lucide-react";

const EscalamientoForm = () => {
  const [form, setForm] = useState({
    numeroCaso: "",
    cliente: "",
    servicio: "",
    sitio: "",
    tipoIncidencia: "",
    prioridad: "",
    descripcion: "",
    contacto: "",
  });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const submit = () => {
    if (!form.cliente || !form.descripcion) {
      toast.error("Completa al menos Cliente y Descripción.");
      return;
    }
    toast.success("Caso escalado correctamente (demo).");
    setForm({ numeroCaso: "", cliente: "", servicio: "", sitio: "", tipoIncidencia: "", prioridad: "", descripcion: "", contacto: "" });
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-2">
        <AlertTriangle size={16} className="text-yellow-400" />
        <h3 className="font-heading text-sm font-bold text-foreground">Escalamiento de caso</h3>
      </div>

      <div className="glass-card p-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Número de caso" value={form.numeroCaso} onChange={(v) => update("numeroCaso", v)} placeholder="Auto o manual" />
          <Field label="Cliente" value={form.cliente} onChange={(v) => update("cliente", v)} placeholder="Nombre del cliente" />
          <Field label="Servicio" value={form.servicio} onChange={(v) => update("servicio", v)} placeholder="Tipo de servicio" />
          <Field label="Sitio" value={form.sitio} onChange={(v) => update("sitio", v)} placeholder="Ubicación o enlace" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Tipo de incidencia</Label>
            <Select value={form.tipoIncidencia} onValueChange={(v) => update("tipoIncidencia", v)}>
              <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="corte">Corte de fibra</SelectItem>
                <SelectItem value="degradacion">Degradación de señal</SelectItem>
                <SelectItem value="equipo">Falla de equipo</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Prioridad</Label>
            <Select value={form.prioridad} onValueChange={(v) => update("prioridad", v)}>
              <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="baja">Baja</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">Descripción</Label>
          <Textarea value={form.descripcion} onChange={(e) => update("descripcion", e.target.value)} placeholder="Describe la incidencia..." className="text-xs min-h-[80px]" />
        </div>

        <Field label="Contacto" value={form.contacto} onChange={(v) => update("contacto", v)} placeholder="Teléfono o correo" />

        <div className="glass-card p-4 text-center border-dashed">
          <Paperclip size={16} className="mx-auto mb-1 text-muted-foreground/40" />
          <p className="text-[10px] text-muted-foreground">Adjuntos — Próximamente</p>
        </div>

        <Button onClick={submit} className="text-xs">Escalar caso</Button>
      </div>
    </div>
  );
};

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="h-9 text-xs" />
    </div>
  );
}

export default EscalamientoForm;
