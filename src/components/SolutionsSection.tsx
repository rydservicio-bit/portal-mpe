import { motion } from "framer-motion";

const solutions = [
  "Integración de sistemas",
  "Automatización de procesos",
  "Infraestructura tecnológica",
  "Arquitectura de información",
  "Telecomunicaciones y redes",
];

const SolutionsSection = () => {
  return (
    <section id="arquitectura" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Arquitectura de soluciones
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card px-6 py-4 cursor-default"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                <span className="font-body text-sm text-foreground">{sol}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
