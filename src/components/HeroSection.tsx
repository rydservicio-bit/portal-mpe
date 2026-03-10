import { motion } from "framer-motion";
import NetworkBackground from "./NetworkBackground";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <NetworkBackground />
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-tight text-gradient mb-2">
            MPE
          </h1>
          <p className="font-heading text-lg md:text-xl font-medium text-muted-foreground tracking-widest uppercase mb-12">
            Procesos, operaciones y sistemas
          </p>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <p className="font-heading text-2xl md:text-3xl font-semibold text-foreground leading-relaxed">
            "Cuando los procesos están claros, el trabajo fluye."
          </p>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-12"
        >
          Diseñamos sistemas operacionales que conectan procesos, información y tecnología.
        </motion.p>

        <motion.a
          href="#enfoque"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="inline-block px-8 py-3 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300 font-body text-sm font-medium tracking-wide"
        >
          Conocer más
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
