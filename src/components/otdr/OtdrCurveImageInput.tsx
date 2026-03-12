import { useState, useRef } from "react";
import { ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const OtdrCurveImageInput = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border/30 bg-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ImageIcon size={18} className="text-primary" />
          <h3 className="font-heading text-sm font-bold text-foreground">Análisis por imagen de curva</h3>
        </div>
        <p className="text-xs text-muted-foreground">
          Sube una imagen de una traza OTDR para análisis visual. El motor de reconocimiento de curvas será implementado en una próxima etapa.
        </p>

        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        <Button onClick={() => fileRef.current?.click()} variant="outline" size="sm" className="gap-2">
          <Upload size={14} />
          Seleccionar imagen
        </Button>

        {preview ? (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Archivo: {fileName}</p>
            <div className="rounded-lg border border-border/20 overflow-hidden bg-background/50">
              <img src={preview} alt="Traza OTDR" className="w-full max-h-80 object-contain" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/40 py-16">
            <ImageIcon size={32} className="mb-2 text-muted-foreground/30" />
            <p className="text-xs text-muted-foreground">Ninguna imagen seleccionada</p>
          </div>
        )}
      </div>

      {/* Result placeholder */}
      <div className="rounded-lg border border-border/30 bg-card p-6 space-y-3">
        <h4 className="font-heading text-sm font-semibold text-foreground">Resultado del análisis de imagen</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          <PlaceholderField label="Tipo probable de evento" value="Pendiente" />
          <PlaceholderField label="Posible tipo de falla" value="Pendiente" />
          <PlaceholderField label="Confianza" value="—" />
          <PlaceholderField label="Observaciones" value="Motor de reconocimiento visual en desarrollo" />
        </div>
      </div>
    </div>
  );
};

function PlaceholderField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs text-muted-foreground">{label}</span>
      <p className="text-sm text-foreground/50 italic">{value}</p>
    </div>
  );
}

export default OtdrCurveImageInput;
