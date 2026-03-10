import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const nodes = [
  {
    id: "personas",
    label: "Personas",
    description: "El talento humano que ejecuta, decide y colabora dentro de la organización. Son el punto de partida de todo sistema.",
    angle: -90,
  },
  {
    id: "procesos",
    label: "Procesos",
    description: "Las secuencias de actividades que transforman entradas en resultados. Procesos claros generan eficiencia operacional.",
    angle: -18,
  },
  {
    id: "informacion",
    label: "Información",
    description: "Los datos estructurados que permiten tomar decisiones fundamentadas y medir el desempeño organizacional.",
    angle: 54,
  },
  {
    id: "sistemas",
    label: "Sistemas",
    description: "Las plataformas tecnológicas que soportan, automatizan y conectan las operaciones del día a día.",
    angle: 126,
  },
  {
    id: "decisiones",
    label: "Decisiones",
    description: "El resultado de combinar personas, procesos e información. Decisiones informadas impulsan el crecimiento.",
    angle: 198,
  },
];

const OrganizationMap = () => {
  const [active, setActive] = useState<string | null>(null);
  const radius = 160;

  return (
    <section id="enfoque" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Mapa de la organización
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Cada nodo representa un pilar del sistema organizacional. Haz clic para explorar.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
          {/* Map */}
          <div className="relative w-[400px] h-[400px] flex-shrink-0">
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
              {nodes.map((node) => {
                const x = 200 + radius * Math.cos((node.angle * Math.PI) / 180);
                const y = 200 + radius * Math.sin((node.angle * Math.PI) / 180);
                return (
                  <line
                    key={node.id}
                    x1="200" y1="200"
                    x2={x} y2={y}
                    stroke="hsl(211, 100%, 52%)"
                    strokeWidth="1"
                    opacity="0.2"
                    strokeDasharray="4 4"
                    className="animate-flow-dash"
                  />
                );
              })}
            </svg>

            {/* Center node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-20 h-20 rounded-full bg-muted border border-primary/30 flex items-center justify-center node-glow">
                <span className="font-heading text-xs font-semibold text-foreground text-center leading-tight">
                  Organi-<br />zación
                </span>
              </div>
            </div>

            {/* Outer nodes */}
            {nodes.map((node) => {
              const x = 200 + radius * Math.cos((node.angle * Math.PI) / 180);
              const y = 200 + radius * Math.sin((node.angle * Math.PI) / 180);
              const isActive = active === node.id;

              return (
                <motion.button
                  key={node.id}
                  onClick={() => setActive(isActive ? null : node.id)}
                  className={`absolute z-10 w-16 h-16 -ml-8 -mt-8 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-primary/20 border-primary node-glow scale-110"
                      : "bg-muted/80 border-border/50 hover:border-primary/50 hover:node-glow"
                  }`}
                  style={{ left: x, top: y }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-body text-[10px] font-medium text-foreground text-center leading-tight px-1">
                    {node.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Info panel */}
          <div className="w-full lg:w-80 min-h-[120px]">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass-card p-6"
                >
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                    {nodes.find((n) => n.id === active)?.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {nodes.find((n) => n.id === active)?.description}
                  </p>
                </motion.div>
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-muted-foreground text-sm text-center lg:text-left"
                >
                  Selecciona un nodo para ver más detalles.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizationMap;
