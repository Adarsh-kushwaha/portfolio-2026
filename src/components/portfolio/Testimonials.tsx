/**
 * Testimonials Section — Carousel/grid of quote cards
 */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Linkedin, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  linkedin?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    role: "Head of Product",
    company: "TechCorp India",
    avatar: "PS",
    linkedin: "https://linkedin.com",
    quote:
      "Adarsh is the kind of frontend developer you rarely find — someone who truly cares about the end user experience while also being an absolute pleasure to work with. He transformed our design system from a vague notion into a living, breathing product that all our teams rely on.",
  },
  {
    name: "Rahul Mehta",
    role: "CTO",
    company: "StartupHub",
    avatar: "RM",
    linkedin: "https://linkedin.com",
    quote:
      "I've worked with a lot of frontend devs. Adarsh is different. He asks the uncomfortable questions about WHY before writing a single line of code. The result? Solutions that actually last. Our dashboard performance went from embarrassing to showcase-worthy under his watch.",
  },
  {
    name: "Sneha Patel",
    role: "Senior Designer",
    company: "WebAgency Co.",
    avatar: "SP",
    linkedin: "https://linkedin.com",
    quote:
      "Every designer's dream: a developer who reads Figma comments, questions inconsistencies in the design (politely!), and implements things with such care that the output often looks better than the original mockup. Adarsh is that developer.",
  },
  {
    name: "Vikram Nair",
    role: "Engineering Manager",
    company: "TechCorp India",
    avatar: "VN",
    linkedin: "https://linkedin.com",
    quote:
      "Beyond technical excellence, what stands out is Adarsh's ability to mentor. He brought our junior developers up to speed in ways that genuinely improved the whole team's craft. His code reviews are thorough, kind, and educational.",
  },
];

const avatarColors = [
  "from-primary to-primary/50",
  "from-gold to-gold/50",
  "from-primary to-gold",
  "from-gold to-primary",
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section id="testimonials" className="section-padding bg-surface/30" ref={ref}>
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="section-label">Testimonials</span>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-700 tracking-tight">
            What People <span className="text-gradient-teal">Say</span>
          </h2>
          <p className="text-foreground-muted mt-2 text-sm md:text-base">
            Kind words from folks I've had the privilege of working with.
          </p>
        </motion.div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-all duration-300"
            >
              <Quote className="w-6 h-6 text-primary/40 mb-4" />
              <p className="text-sm text-foreground-muted leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[i]} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-xs font-heading font-700 text-primary-foreground">{t.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-heading font-700 text-foreground">{t.name}</p>
                  <p className="text-xs text-foreground-muted">{t.role} · {t.company}</p>
                </div>
                {t.linkedin && (
                  <a href={t.linkedin} target="_blank" rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg flex items-center justify-center border border-border hover:border-primary hover:text-primary text-foreground-muted transition-all"
                    aria-label={`${t.name} LinkedIn`}>
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="glass-card rounded-2xl p-6 border border-border mb-6"
          >
            <Quote className="w-6 h-6 text-primary/40 mb-4" />
            <p className="text-sm text-foreground-muted leading-relaxed mb-6 italic">
              "{testimonials[current].quote}"
            </p>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColors[current]} flex items-center justify-center`}>
                <span className="text-xs font-heading font-700 text-primary-foreground">{testimonials[current].avatar}</span>
              </div>
              <div>
                <p className="text-sm font-heading font-700 text-foreground">{testimonials[current].name}</p>
                <p className="text-xs text-foreground-muted">{testimonials[current].role} · {testimonials[current].company}</p>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-4">
            <button onClick={prev} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:border-primary transition-all" aria-label="Previous">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-4" : "bg-border"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:border-primary transition-all" aria-label="Next">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
