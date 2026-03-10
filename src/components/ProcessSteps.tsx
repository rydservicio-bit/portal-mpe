import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Entender la operación real",
    description: "Mapeamos cómo funciona realmente la organización, no cómo debería funcionar.",
  },
  {
    number: "02",
    title: "Diseñar procesos claros",
    description: "Definimos flujos de trabajo eficientes que conectan personas, información y decisiones.",
  },
  {
    number: "03",
    title: "Integrar sistemas",
    description: "Implementamos la tecnología que soporta y automatiza los procesos diseñados.",
  },
];

const ProcessSteps = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cómo diseñamos sistemas
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 hidden md:block" />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex gap-8 items-start"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full border border-primary/30 bg-muted flex items-center justify-center node-glow">
                  <span className="font-heading text-sm font-bold text-primary">{step.number}</span>
                </div>
                <div className="pt-3">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
