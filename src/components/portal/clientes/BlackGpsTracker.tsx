import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, ExternalLink, AlertCircle } from "lucide-react";

const BlackGpsTracker = () => {
  const [url, setUrl] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [embedError, setEmbedError] = useState(false);

  const load = () => {
    if (!url.trim()) return;
    setEmbedError(false);
    setLoaded(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-secondary" />
        <h3 className="font-heading text-sm font-bold text-foreground">Seguimiento del equipo técnico</h3>
      </div>
      <p className="text-xs text-muted-foreground">Ingresa un enlace de BlackGPS para visualizar la ubicación del equipo técnico asignado.</p>

      <div className="flex gap-2 items-end max-w-lg">
        <div className="flex-1 space-y-1.5">
          <Label className="text-xs text-muted-foreground">URL de BlackGPS</Label>
          <Input value={url} onChange={(e) => { setUrl(e.target.value); setLoaded(false); }} placeholder="https://app.blackgps.com/..." className="h-9 text-xs" />
        </div>
        <Button size="sm" onClick={load} disabled={!url.trim()} className="text-xs">Cargar</Button>
      </div>

      {loaded && (
        <div className="glass-card overflow-hidden">
          {!embedError ? (
            <iframe
              src={url}
              title="BlackGPS Tracking"
              className="w-full h-[400px] border-0"
              onError={() => setEmbedError(true)}
              sandbox="allow-scripts allow-same-origin"
            />
          ) : null}
          {/* Fallback always visible below iframe */}
          <div className="p-4 border-t border-border/30 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertCircle size={14} />
              <span>Si el mapa no se muestra, abre el enlace directamente:</span>
            </div>
            <Button size="sm" variant="outline" asChild className="text-xs gap-1">
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={12} /> Abrir seguimiento BlackGPS
              </a>
            </Button>
          </div>
        </div>
      )}

      {!loaded && (
        <div className="glass-card p-10 text-center border-dashed">
          <MapPin size={28} className="mx-auto mb-2 text-muted-foreground/30" />
          <p className="text-xs text-muted-foreground">Ingresa una URL de BlackGPS para visualizar el seguimiento.</p>
          <p className="text-[10px] text-muted-foreground/60 mt-1">Prueba de concepto — no se almacenan credenciales</p>
        </div>
      )}
    </div>
  );
};

export default BlackGpsTracker;
