import { motion } from "framer-motion";
import { ArrowLeft, Wrench, Briefcase, Settings, Users } from "lucide-react";
import TecnicosDashboard from "./TecnicosDashboard";
import ClientesDashboard from "./ClientesDashboard";
import AdminDashboard from "./AdminDashboard";
import OmDashboard from "./OmDashboard";

type PortalView = "menu" | "tecnicos" | "administrativos" | "oym" | "clientes";

type PortalSectionProps = {
  view: PortalView;
  onViewChange: (view: PortalView) => void;
};

const roles = [
  { key: "tecnicos" as const, label: "Técnicos", icon: Wrench, desc: "Asignaciones, bitácora, OTDR y herramientas de campo" },
  { key: "administrativos" as const, label: "Administrativos", icon: Briefcase, desc: "Formularios, reportes y accesos internos" },
  { key: "oym" as const, label: "O&M", icon: Settings, desc: "Operación, mantenimiento e infraestructura" },
  { key: "clientes" as const, label: "Clientes", icon: Users, desc: "Escalamiento, seguimiento y documentos" },
];

const PortalSection = ({ view, onViewChange }: PortalSectionProps) => {
  if (view !== "menu") {
    return (
      <section id="acceso" className="py-24 relative min-h-screen">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div key={view} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button
              onClick={() => onViewChange("menu")}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft size={16} /> Portal de usuarios
            </button>
            {view === "tecnicos" && <TecnicosDashboard />}
            {view === "administrativos" && <AdminDashboard />}
            {view === "oym" && <OmDashboard />}
            {view === "clientes" && <ClientesDashboard />}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="acceso" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div key="menu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Portal de usuarios</h2>
            <p className="text-sm text-muted-foreground">Accesos y herramientas según perfil</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {roles.map((r, i) => (
              <motion.button
                key={r.key}
                onClick={() => onViewChange(r.key)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-card p-6 flex flex-col items-center gap-3 text-center hover:border-primary/50 transition-colors cursor-pointer"
              >
                <r.icon className="w-7 h-7 text-primary" />
                <span className="font-heading text-sm font-bold text-foreground">{r.label}</span>
                <span className="text-xs text-muted-foreground leading-tight">{r.desc}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortalSection;
