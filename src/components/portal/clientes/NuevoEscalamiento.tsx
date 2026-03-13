import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, AlertTriangle, ExternalLink, Upload, CheckCircle, MapPin, Users } from "lucide-react";
import { poiDataset, type POI } from "@/lib/poiDataset";
import type { TipoCaso } from "@/lib/escalamientosData";

type Step = "tipo" | "flujo" | "sitio" | "descripcion" | "asignacion" | "validacion" | "confirmacion";

const NuevoEscalamiento = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState<Step>("tipo");
  const [tipoCaso, setTipoCaso] = useState<TipoCaso | "">("");

  // Incidencia sub-flow
  const [envioCorreo, setEnvioCorreo] = useState<"si" | "no" | "">("");
  const [asuntoCorreo, setAsuntoCorreo] = useState("");
  const [casoEncontrado, setCasoEncontrado] = useState(false);

  // Site data
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);

  // Description
  const [descripcion, setDescripcion] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [contacto, setContacto] = useState("");
  const [telefono, setTelefono] = useState("");

  // Assignment
  const [asignacion, setAsignacion] = useState("");

  const goTo = (s: Step) => setStep(s);

  return (
    <div className="space-y-6 max-w-2xl">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={14} /> Volver
      </button>

      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle size={16} className="text-yellow-400" />
        <h3 className="font-heading text-base font-bold text-foreground">Crear nuevo escalamiento</h3>
      </div>

      {/* Progress */}
      <div className="flex gap-1">
        {["tipo", "flujo", "sitio", "descripcion", "asignacion", "validacion", "confirmacion"].map((s, i) => (
          <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${
            ["tipo", "flujo", "sitio", "descripcion", "asignacion", "validacion", "confirmacion"].indexOf(step) >= i
              ? "bg-primary" : "bg-muted"
          }`} />
        ))}
      </div>

      {/* STEP 1: Type */}
      {step === "tipo" && (
        <div className="glass-card p-6 space-y-4">
          <h4 className="font-heading text-sm font-bold text-foreground">Tipo de caso</h4>
          <div className="grid gap-3 sm:grid-cols-3">
            {(["Incidencia", "TOT", "Otro"] as TipoCaso[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTipoCaso(t); goTo("flujo"); }}
                className={`glass-card p-4 text-center hover:border-primary/50 transition-colors cursor-pointer ${tipoCaso === t ? "border-primary" : ""}`}
              >
                <span className="text-sm font-medium text-foreground">{t}</span>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {t === "Incidencia" && "Falla o corte de servicio"}
                  {t === "TOT" && "Tarea operativa técnica"}
                  {t === "Otro" && "Otro tipo de requerimiento"}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2: Flow-specific */}
      {step === "flujo" && (
        <div className="glass-card p-6 space-y-4">
          {tipoCaso === "Incidencia" && (
            <>
              <h4 className="font-heading text-sm font-bold text-foreground">¿Ya enviaste correo de incidencia?</h4>
              <div className="flex gap-3">
                <Button variant={envioCorreo === "si" ? "default" : "outline"} size="sm" className="text-xs" onClick={() => setEnvioCorreo("si")}>Sí</Button>
                <Button variant={envioCorreo === "no" ? "default" : "outline"} size="sm" className="text-xs" onClick={() => setEnvioCorreo("no")}>No</Button>
              </div>

              {envioCorreo === "si" && (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Asunto exacto del correo</Label>
                    <Input value={asuntoCorreo} onChange={(e) => setAsuntoCorreo(e.target.value)} placeholder="Ej: INC-12345 Corte enlace Norte" className="h-9 text-xs" />
                  </div>
                  {asuntoCorreo && (
                    <div className="glass-card p-3 border-dashed">
                      <p className="text-xs text-muted-foreground">
                        {casoEncontrado ? "✅ Caso asociado encontrado. Se pre-llenará el formulario." : "⚠️ No se encontró caso asociado. Puedes continuar manualmente."}
                      </p>
                    </div>
                  )}
                  <Button size="sm" className="text-xs gap-1" onClick={() => goTo("sitio")}>
                    <ArrowRight size={12} /> Continuar
                  </Button>
                </div>
              )}

              {envioCorreo === "no" && (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">Adjunta respaldo de incidencia a través de SharePoint:</p>
                  <Button size="sm" variant="outline" className="text-xs gap-1" asChild>
                    <a href="https://sharepoint.com" target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={12} /> Adjuntar respaldo de incidencia
                    </a>
                  </Button>
                  <Button size="sm" className="text-xs gap-1" onClick={() => goTo("sitio")}>
                    <ArrowRight size={12} /> Continuar sin correo
                  </Button>
                </div>
              )}
            </>
          )}

          {tipoCaso === "TOT" && (
            <div className="space-y-4">
              <h4 className="font-heading text-sm font-bold text-foreground">Origen de la tarea</h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button variant="outline" size="sm" className="text-xs gap-1 h-auto py-3" asChild>
                  <a href="https://officetrack.com" target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={12} /> Abrir OfficeTrack
                  </a>
                </Button>
                <label className="glass-card p-3 text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload size={16} className="mx-auto mb-1 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Importar Excel o CSV</span>
                  <input type="file" accept=".csv,.xlsx,.xls" className="hidden" onChange={() => toast.info("Archivo importado (demo). Los campos se pre-llenarán.")} />
                </label>
              </div>
              <Button size="sm" className="text-xs gap-1" onClick={() => goTo("sitio")}>
                <ArrowRight size={12} /> Continuar
              </Button>
            </div>
          )}

          {tipoCaso === "Otro" && (
            <div className="space-y-3">
              <h4 className="font-heading text-sm font-bold text-foreground">Requerimiento general</h4>
              <p className="text-xs text-muted-foreground">Continúa para completar la información del caso.</p>
              <Button size="sm" className="text-xs gap-1" onClick={() => goTo("sitio")}>
                <ArrowRight size={12} /> Continuar
              </Button>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: Site */}
      {step === "sitio" && (
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-primary" />
            <h4 className="font-heading text-sm font-bold text-foreground">Selección de sitio</h4>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Sitio / POI</Label>
            <Select onValueChange={(v) => setSelectedPoi(poiDataset.find((p) => p.id === v) || null)}>
              <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Seleccionar sitio" /></SelectTrigger>
              <SelectContent>
                {poiDataset.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.nombre}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedPoi && (
            <div className="glass-card p-4 space-y-2 text-xs text-muted-foreground">
              <p><span className="text-foreground font-medium">Dirección:</span> {selectedPoi.direccion}</p>
              <p><span className="text-foreground font-medium">Ciudad:</span> {selectedPoi.ciudad}</p>
              <p><span className="text-foreground font-medium">Región:</span> {selectedPoi.region}</p>
              <p><span className="text-foreground font-medium">Coordenadas:</span> {selectedPoi.latitud}, {selectedPoi.longitud}</p>
              <p><span className="text-foreground font-medium">Acceso:</span> {selectedPoi.condicionesAcceso}</p>
              <p><span className="text-foreground font-medium">Permisos:</span> {selectedPoi.gestionPermisos}</p>
            </div>
          )}

          <Button size="sm" className="text-xs gap-1" onClick={() => goTo("descripcion")} disabled={!selectedPoi}>
            <ArrowRight size={12} /> Continuar
          </Button>
        </div>
      )}

      {/* STEP 4: Description */}
      {step === "descripcion" && (
        <div className="glass-card p-6 space-y-4">
          <h4 className="font-heading text-sm font-bold text-foreground">Descripción del caso</h4>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Descripción</Label>
              <Textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Describe la incidencia o requerimiento..." className="text-xs min-h-[80px]" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Prioridad</Label>
                <Select value={prioridad} onValueChange={setPrioridad}>
                  <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Media">Media</SelectItem>
                    <SelectItem value="Baja">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Contacto</Label>
                <Input value={contacto} onChange={(e) => setContacto(e.target.value)} placeholder="Nombre o correo" className="h-9 text-xs" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Teléfono</Label>
              <Input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="+56 9 ..." className="h-9 text-xs" />
            </div>
            <div className="glass-card p-3 text-center border-dashed">
              <Upload size={14} className="mx-auto mb-1 text-muted-foreground/40" />
              <p className="text-[10px] text-muted-foreground">Adjuntos — Próximamente</p>
            </div>
          </div>
          <Button size="sm" className="text-xs gap-1" onClick={() => goTo("asignacion")} disabled={!descripcion || !prioridad}>
            <ArrowRight size={12} /> Continuar
          </Button>
        </div>
      )}

      {/* STEP 5: Assignment suggestion */}
      {step === "asignacion" && (
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Users size={14} className="text-primary" />
            <h4 className="font-heading text-sm font-bold text-foreground">Sugerencia de asignación</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            Basado en la región ({selectedPoi?.region}), disponibilidad y especialidad:
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { key: "tecnico", label: "Asignar técnico disponible", desc: "Técnico A — Región " + (selectedPoi?.region || "—") },
              { key: "team", label: "Asignar team", desc: "Equipo Planta Externa" },
              { key: "sin", label: "Sin asignación", desc: "Pendiente de coordinación" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setAsignacion(opt.key)}
                className={`glass-card p-4 text-left hover:border-primary/50 transition-colors cursor-pointer ${asignacion === opt.key ? "border-primary" : ""}`}
              >
                <span className="text-xs font-medium text-foreground">{opt.label}</span>
                <p className="text-[10px] text-muted-foreground mt-1">{opt.desc}</p>
              </button>
            ))}
          </div>
          <Button size="sm" className="text-xs gap-1" onClick={() => goTo("validacion")} disabled={!asignacion}>
            <ArrowRight size={12} /> Continuar
          </Button>
        </div>
      )}

      {/* STEP 6: Supervisor validation */}
      {step === "validacion" && (
        <div className="glass-card p-6 space-y-4">
          <h4 className="font-heading text-sm font-bold text-foreground">Validación de supervisor</h4>
          <div className="glass-card p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-500/20 text-yellow-400 text-[10px]">Pendiente validación</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Este escalamiento requiere aprobación del supervisor o coordinador antes de la asignación final.
            </p>
            <div className="text-[10px] text-muted-foreground space-y-1">
              <p><span className="text-foreground">Tipo:</span> {tipoCaso}</p>
              <p><span className="text-foreground">Sitio:</span> {selectedPoi?.nombre}</p>
              <p><span className="text-foreground">Prioridad:</span> {prioridad}</p>
              <p><span className="text-foreground">Asignación:</span> {asignacion === "tecnico" ? "Técnico disponible" : asignacion === "team" ? "Equipo" : "Sin asignación"}</p>
            </div>
          </div>
          <Button size="sm" className="text-xs gap-1" onClick={() => { goTo("confirmacion"); toast.success("Escalamiento enviado a validación (demo)."); }}>
            <ArrowRight size={12} /> Enviar a validación
          </Button>
        </div>
      )}

      {/* STEP 7: Confirmation */}
      {step === "confirmacion" && (
        <div className="glass-card p-6 text-center space-y-4">
          <CheckCircle size={32} className="mx-auto text-emerald-400" />
          <h4 className="font-heading text-sm font-bold text-foreground">Escalamiento creado</h4>
          <p className="text-xs text-muted-foreground">
            El caso ha sido registrado y enviado para validación del supervisor.
          </p>
          <div className="glass-card p-4 text-xs text-muted-foreground space-y-1 text-left max-w-sm mx-auto">
            <p><span className="text-foreground font-medium">ID:</span> ESC-{Math.floor(Math.random() * 9000 + 1000)}</p>
            <p><span className="text-foreground font-medium">Tipo:</span> {tipoCaso}</p>
            <p><span className="text-foreground font-medium">Sitio:</span> {selectedPoi?.nombre}</p>
            <p><span className="text-foreground font-medium">Estado:</span> Pendiente validación</p>
          </div>
          <Button size="sm" variant="outline" className="text-xs" onClick={onBack}>
            Volver al dashboard
          </Button>
        </div>
      )}
    </div>
  );
};

export default NuevoEscalamiento;
