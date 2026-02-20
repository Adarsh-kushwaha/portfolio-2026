/**
 * Skills & Tools Section — Interactive grid with categories and hover effects
 */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

interface Skill {
  name: string;
  icon: string;
  level: string;
  years: string;
}

interface SkillCategory {
  label: string;
  color: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    label: "Core Frontend",
    color: "primary",
    skills: [
      { name: "HTML5", icon: "🌐", level: "Expert", years: "5 yrs" },
      { name: "CSS3 / SCSS", icon: "🎨", level: "Expert", years: "5 yrs" },
      { name: "JavaScript", icon: "⚡", level: "Expert", years: "4 yrs" },
      { name: "TypeScript", icon: "🔷", level: "Advanced", years: "3 yrs" },
      { name: "Web Vitals", icon: "📊", level: "Advanced", years: "2 yrs" },
      { name: "Accessibility", icon: "♿", level: "Advanced", years: "2 yrs" },
    ],
  },
  {
    label: "Frameworks & Libraries",
    color: "gold",
    skills: [
      { name: "React", icon: "⚛️", level: "Expert", years: "3 yrs" },
      { name: "Next.js", icon: "▲", level: "Advanced", years: "2 yrs" },
      { name: "Tailwind CSS", icon: "💨", level: "Expert", years: "3 yrs" },
      { name: "Framer Motion", icon: "🌀", level: "Advanced", years: "2 yrs" },
      { name: "React Query", icon: "🔄", level: "Advanced", years: "2 yrs" },
      { name: "Zustand", icon: "🐻", level: "Intermediate", years: "1.5 yrs" },
    ],
  },
  {
    label: "Design Systems",
    color: "primary",
    skills: [
      { name: "Radix UI", icon: "🔲", level: "Advanced", years: "2 yrs" },
      { name: "shadcn/ui", icon: "🧩", level: "Advanced", years: "1.5 yrs" },
      { name: "Storybook", icon: "📖", level: "Intermediate", years: "1.5 yrs" },
      { name: "Figma", icon: "🎭", level: "Advanced", years: "3 yrs" },
      { name: "Design Tokens", icon: "🎯", level: "Advanced", years: "2 yrs" },
      { name: "MUI / Ant Design", icon: "🏛️", level: "Intermediate", years: "2 yrs" },
    ],
  },
  {
    label: "Tools & DevOps",
    color: "gold",
    skills: [
      { name: "Git / GitHub", icon: "🐙", level: "Expert", years: "4 yrs" },
      { name: "Vite", icon: "⚡", level: "Advanced", years: "2 yrs" },
      { name: "Webpack", icon: "📦", level: "Intermediate", years: "2 yrs" },
      { name: "Jest / RTL", icon: "🧪", level: "Intermediate", years: "2 yrs" },
      { name: "Vercel / Netlify", icon: "🚀", level: "Advanced", years: "3 yrs" },
      { name: "Jira / Linear", icon: "📋", level: "Advanced", years: "3 yrs" },
    ],
  },
];

const levelColors: Record<string, string> = {
  Expert: "text-primary",
  Advanced: "text-gold",
  Intermediate: "text-foreground-muted",
};

function SkillCard({ skill, color }: { skill: Skill; color: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative glass-card rounded-xl p-4 border border-border hover:border-primary/50 transition-all duration-300 cursor-default group"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none">{skill.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-heading font-600 text-foreground truncate">{skill.name}</p>
          <p className={`text-xs mt-0.5 font-body ${levelColors[skill.level] || "text-foreground-muted"}`}>
            {skill.level}
          </p>
        </div>
      </div>

      {/* Tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        className="absolute -top-9 left-1/2 -translate-x-1/2 bg-surface border border-border rounded-lg px-3 py-1.5 text-xs text-foreground-muted whitespace-nowrap shadow-card pointer-events-none z-10"
      >
        {skill.years} of experience
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding bg-surface/30" ref={ref}>
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="section-label">Skills & Tools</span>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-700 tracking-tight">
            My <span className="text-gradient-teal">Arsenal</span>
          </h2>
          <p className="text-foreground-muted mt-2 text-sm md:text-base max-w-xl">
            Tools and technologies I reach for to build fast, accessible, and beautiful interfaces.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-10">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + catIdx * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`text-xs font-heading font-600 uppercase tracking-widest ${
                    cat.color === "primary" ? "text-primary" : "text-gold"
                  }`}
                >
                  {cat.label}
                </span>
                <div className="flex-1 h-px bg-border-subtle" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {cat.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} color={cat.color} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
