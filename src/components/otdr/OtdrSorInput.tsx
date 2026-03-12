import { useState, useRef } from "react";
import { FileText, Upload, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";

const OtdrSorInput = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border/30 bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-primary" />
          <h3 className="font-heading text-sm font-bold text-foreground">Análisis por archivo .sor</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Carga un archivo .sor exportado desde un equipo OTDR. El parser de formato SOR será implementado en una próxima etapa.
        </p>

        <input ref={fileRef} type="file" accept=".sor,.SOR" onChange={handleFile} className="hidden" />
        <Button onClick={() => fileRef.current?.click()} variant="outline" size="sm" className="gap-2">
          <Upload size={14} />
          Seleccionar archivo .sor
        </Button>

        {fileName ? (
          <div className="rounded-lg border border-border/30 bg-background/50 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <HardDrive size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Archivo .sor seleccionado</span>
            </div>
            <p className="text-xs text-muted-foreground">Nombre del archivo: <span className="text-foreground/80">{fileName}</span></p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/40 py-16">
            <FileText size={32} className="mb-2 text-muted-foreground/30" />
            <p className="text-xs text-muted-foreground">Ningún archivo seleccionado</p>
          </div>
        )}
      </div>

      {/* Status card */}
      <div className="rounded-lg border border-border/30 bg-card p-6 space-y-3">
        <h4 className="font-heading text-sm font-semibold text-foreground">Estado del módulo .sor</h4>
        <div className="space-y-2">
          <StatusRow label="Carga de archivo OTDR" status={fileName ? "Archivo cargado" : "Esperando archivo"} active={!!fileName} />
          <StatusRow label="Estructura preparada para análisis" status="Listo" active />
          <StatusRow label="Parser SOR" status="Próxima etapa" active={false} />
        </div>
      </div>
    </div>
  );
};

function StatusRow({ label, status, active }: { label: string; status: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className={active ? "text-primary font-medium" : "text-muted-foreground/50 italic"}>{status}</span>
    </div>
  );
}

export default OtdrSorInput;
