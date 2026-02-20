/**
 * About Section — Two-column: professional story (left) + personal side (right)
 */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Heart, MapPin, Coffee } from "lucide-react";
import casualImg from "@/assets/adarsh-casual.png";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const highlights = [
  { icon: Code2, label: "React Specialist", desc: "Building enterprise-scale UIs" },
  { icon: MapPin, label: "Based in Pune", desc: "The city is so pretty" },
  { icon: Heart, label: "Design-first", desc: "Pixel perfection matters" },
  { icon: Coffee, label: "Coffee Addict", desc: "3 cups minimum per day" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="container-max">
        {/* Section label */}
        <motion.div
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="section-label">About Me</span>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Professional Story */}
          <motion.div
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-700 tracking-tight leading-tight">
              The Engineer{" "}
              <span className="text-gradient-teal">Behind the Pixels</span>
            </h2>

            <div className="space-y-4 text-foreground-muted leading-relaxed text-sm md:text-base">
              <p>
                I'm a Frontend Developer with <strong className="text-foreground">3+ years of experience</strong> crafting
                high-performance web applications for corporate and startup environments alike.
                Currently based in Pune — the city that taught me to move fast without breaking things.
              </p>
              <p>
                I specialize in <strong className="text-primary">React</strong>,{" "}<strong className="text-primary">Next.js</strong>,{" "}
                <strong className="text-primary">Javascript</strong>, and building scalable design
                systems that teams actually love using. I believe great frontend is the invisible
                bridge between product intent and user delight.
              </p>
              <p>
                What excites me most? Solving complex UX challenges with elegant code, optimizing
                Web Vitals until the numbers look beautiful, and collaborating with designers who
                are just as obsessed with details as I am.
              </p>
            </div>

            {/* Highlight cards */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {highlights.map(({ icon: Icon, label, desc }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="glass-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all duration-300 cursor-default"
                >
                  <Icon className="w-5 h-5 text-primary mb-2" />
                  <p className="text-sm font-heading font-600 text-foreground">{label}</p>
                  <p className="text-xs text-foreground-muted mt-0.5">{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Personal Side */}
          <motion.div
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-700 tracking-tight leading-tight">
              The Human{" "}
              <span className="text-gradient-gold">Behind the Screen</span>
            </h2>

            {/* Casual photo */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={casualImg}
                alt="Adarsh at a Mumbai cafe"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs text-foreground/80 font-body italic">
                  📍 My second office — my home with good filter coffee and fast WiFi
                </p>
              </div>
            </div>

            <div className="space-y-4 text-foreground-muted leading-relaxed text-sm md:text-base">
              <p>
                Beyond the editor, I'm a <strong className="text-foreground">curious generalist</strong> who enjoys
                unwinding with good films, getting lost in books, and experimenting in the kitchen after a long day in Pune.
              </p>
              <p>
                Living in Pune keeps me balanced — the calm pace, great weather, and weekend getaways offer the perfect reset.
                Movies and reading help me switch contexts, while cooking lets me slow down and build something tangible.
              </p>
              <p>
                I value <span className="text-gold">honesty</span>,{" "}
                <span className="text-gold">craft</span>,{" "}
                <span className="text-gold">continuous learning</span>, and meaningful
                collaboration where everyone leaves the room with clearer thinking than they walked in with.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
