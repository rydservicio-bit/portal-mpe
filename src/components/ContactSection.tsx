import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section id="contacto" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
            Conversemos
          </h2>
          <p className="text-muted-foreground text-base mb-10 leading-relaxed">
            A veces una conversación clara es el primer paso para entender cómo mejorar un proceso.
          </p>
          <a
            href="mailto:contacto@mpe.com"
            className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            Contactar
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
