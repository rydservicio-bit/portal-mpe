import { motion } from "framer-motion";
import { Globe, Mail } from "lucide-react";

const cards = [
  {
    title: "Portal de usuarios",
    icon: Globe,
    href: "https://access.domain.com",
  },
  {
    title: "Correo empresarial",
    icon: Mail,
    href: "https://mail.domain.com",
  },
];

const AccessSection = () => {
  return (
    <section id="acceso" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Acceso
          </h2>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-lg mx-auto">
          {cards.map((card, i) => (
            <motion.a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card p-6 flex-1 flex flex-col items-center gap-4 hover:border-primary/50 transition-colors"
            >
              <card.icon className="w-6 h-6 text-primary" />
              <span className="font-heading text-sm font-semibold text-foreground">{card.title}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccessSection;
