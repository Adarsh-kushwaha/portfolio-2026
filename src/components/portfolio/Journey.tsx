/**
 * Journey / Timeline Section — Elegant vertical timeline of career milestones
 */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, TrendingUp, Users, Zap } from "lucide-react";

interface Role {
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  current?: boolean;
  achievements: string[];
  tech: string[];
}

const roles: Role[] = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp India",
    location: "Mumbai, IN",
    period: "2023 — Present",
    type: "Full-time",
    current: true,
    achievements: [
      "Led migration of legacy jQuery codebase to React 18 + TypeScript, reducing bundle size by 42%",
      "Architected a shared design system used by 8 product teams, cutting UI dev time by 60%",
      "Improved Core Web Vitals scores from 45 → 92 LCP, achieving top 10% performance tier",
      "Mentored 4 junior developers through structured pair-programming and code reviews",
    ],
    tech: ["React 18", "TypeScript", "Tailwind CSS", "Storybook", "Vite"],
  },
  {
    title: "Frontend Developer",
    company: "StartupHub",
    location: "Mumbai, IN",
    period: "2022 — 2023",
    type: "Full-time",
    achievements: [
      "Built the company's public-facing marketing site from scratch — 0 to launch in 6 weeks",
      "Implemented real-time dashboard with WebSocket integration serving 10K+ concurrent users",
      "Reduced page load time by 35% through code splitting, lazy loading, and image optimization",
      "Collaborated with design team to ship 3 major product features ahead of schedule",
    ],
    tech: ["React", "Next.js", "Framer Motion", "React Query", "SCSS"],
  },
  {
    title: "Junior Frontend Developer",
    company: "WebAgency Co.",
    location: "Mumbai, IN",
    period: "2021 — 2022",
    type: "Full-time",
    achievements: [
      "Delivered 12+ client websites with pixel-perfect implementation of Figma designs",
      "Built reusable component library that accelerated project delivery by 25%",
      "First to introduce TypeScript to the team — now standard across all projects",
    ],
    tech: ["React", "JavaScript", "CSS3", "Figma", "WordPress"],
  },
  {
    title: "Frontend Intern",
    company: "DigiSolutions",
    location: "Mumbai, IN",
    period: "2020 — 2021",
    type: "Internship",
    achievements: [
      "Learned React and shipped my first production feature in week 3",
      "Redesigned the company's internal admin panel, receiving team-wide recognition",
      "Converted the whole team to using VS Code + ESLint + Prettier 😄",
    ],
    tech: ["React", "HTML", "CSS", "JavaScript"],
  },
];

export default function Journey() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="journey" className="section-padding" ref={ref}>
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="section-label">My Journey</span>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-700 tracking-tight">
            Where I've <span className="text-gradient-teal">Been</span>
          </h2>
          <p className="text-foreground-muted mt-2 text-sm md:text-base max-w-xl">
            4 years of shipping, learning, breaking things (intentionally), and growing.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px timeline-line" />

          <div className="space-y-12">
            {roles.map((role, idx) => (
              <motion.div
                key={`${role.company}-${idx}`}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
                className="relative pl-12 md:pl-20"
              >
                {/* Dot */}
                <div className={`absolute left-2.5 md:left-6 top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  role.current
                    ? "border-primary bg-primary shadow-teal"
                    : "border-gold bg-gold/20"
                }`}>
                  {role.current && (
                    <span className="w-2 h-2 rounded-full bg-primary-foreground" />
                  )}
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="glass-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-start gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-heading font-700 text-foreground">{role.title}</h3>
                        {role.current && (
                          <span className="px-2 py-0.5 rounded-full text-xs bg-primary/15 text-primary border border-primary/30 font-600">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-foreground-muted">
                        <span className="font-600 text-foreground">{role.company}</span>
                        <span>·</span>
                        <span>{role.location}</span>
                        <span>·</span>
                        <span className="text-xs bg-muted px-2 py-0.5 rounded-full">{role.type}</span>
                      </div>
                    </div>
                    <span className="text-sm text-foreground-muted font-body whitespace-nowrap">{role.period}</span>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-2 mb-4">
                    {role.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground-muted">
                        <TrendingUp className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {role.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg text-xs bg-surface-2 text-foreground-muted border border-border-subtle font-heading font-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
