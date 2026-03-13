import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import OtdrTabs from "./OtdrTabs";

interface OtdrModuleProps {
  embedded?: boolean;
}

const OtdrModule = ({ embedded = false }: OtdrModuleProps) => (
  <section id="otdr" className={embedded ? "relative" : "relative py-16 sm:py-24"}>
    <div className={embedded ? "" : "container mx-auto px-4 sm:px-6"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-10 text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 mb-4">
          <Activity size={14} className="text-primary" />
          <span className="text-xs font-medium text-primary">Herramienta de análisis</span>
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Análisis OTDR
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto">
          Motor de diagnóstico de eventos para fibra óptica. Analiza trazas por tabla de eventos, imagen de curva o archivo .sor.
        </p>
      </motion.div>

      <OtdrTabs />
    </div>
  </section>
);

export default OtdrModule;
