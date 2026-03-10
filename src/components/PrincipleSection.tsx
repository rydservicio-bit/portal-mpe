import { motion } from "framer-motion";

const PrincipleSection = () => {
  return (
    <section id="soluciones" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 leading-relaxed">
            Cuando todo funciona como un sistema, el trabajo se vuelve más simple.
          </h2>

          <div className="space-y-2 text-muted-foreground text-base leading-relaxed">
            <p>Procesos claros.</p>
            <p>Información disponible.</p>
            <p>Sistemas que ayudan.</p>
          </div>

          <p className="mt-8 text-muted-foreground text-sm">
            Eso permite que la organización avance con menos fricción.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PrincipleSection;
