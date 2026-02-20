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
    title: "Software Engineer (Frontend)",
    company: "Bajaj Finserv Health",
    location: "Pune, IN",
    period: "Dec 2024 — Present",
    type: "Full-time",
    current: true,
    achievements: [
      "Built a Next.js portal to manage AI voice campaigns with configurable workflows, reducing release dependency and improving ops turnaround time",
      "Developed a shared frontend platform supporting 6 agent apps with reusable UI modules, achieving ~70% component reusability",
      "Implemented a dynamic form engine to render backend schemas into role-based, stateful UIs, enabling video KYC and geo-tagged media capture",
      "Improved Lighthouse performance from ~60 to ~95 by optimizing rendering, bundle size, SEO basics, and accessibility",
    ],
    tech: ["Next.js", "React", "TypeScript", "Shadcn UI", "React Hook Form"],
  },
  {
    title: "Associate Software Engineer (Frontend)",
    company: "Bajaj Finserv Health",
    location: "Pune, IN",
    period: "Jul 2023 — Nov 2024",
    type: "Full-time",
    achievements: [
      "Built a scalable React/Next.js lab booking interface for B2B use cases, improving booking completion rates and user flow",
      "Optimized frontend performance with client-side caching and optimistic UI updates, reducing perceived booking time by ~60%",
      "Implemented location-aware UI to surface nearest service providers, improving conversion by ~20%",
      "Developed an AI-assisted call processing interface to visualize long-form transcriptions and translations for operations teams",
    ],
    tech: ["React", "Next.js", "TypeScript", "React Query", "Tailwind CSS"],
  },
  {
    title: "Frontend Developer Intern",
    company: "Bajaj Finserv Health",
    location: "Pune, IN",
    period: "Jan 2023 — Jun 2023",
    type: "Internship",
    achievements: [
      "Reduced payment and invoice screen load time from ~2s to ~500ms using code splitting, lazy loading, and component restructuring",
      "Integrated a scan-and-pay UI module into the payment flow, improving checkout speed and reliability for high-volume usage",
      "Refactored UI components into reusable hooks and layouts, improving maintainability and development velocity",
      "Contributed to a large-scale UI revamp by standardizing colors, typography, and theming without disrupting production",
    ],
    tech: ["React", "JavaScript", "HTML", "CSS"],
  },
  {
    title: "Frontend Developer Intern",
    company: "Coding Sheep Technologies LLP",
    location: "Remote, IN",
    period: "Oct 2022 — Dec 2022",
    type: "Internship",
    achievements: [
      "Delivered responsive UI screens from Figma designs with consistent cross-browser behavior",
      "Built reusable UI components to accelerate feature delivery across multiple client projects",
      "Collaborated with backend developers to integrate APIs and improve end-to-end user flows",
    ],
    tech: ["HTML", "CSS", "JavaScript", "React", "Figma"],
  },
  {
    title: "WordPress Web Developer",
    company: "MiBi Services",
    location: "India",
    period: "Aug 2020 — Oct 2020",
    type: "Contract",
    achievements: [
      "Built an MVP job portal website using WordPress with custom HTML and CSS for faster time-to-market",
      "Implemented responsive UI layouts to support mobile and low-bandwidth users",
      "Worked with CMS data models and plugins to structure content and basic workflows",
    ],
    tech: ["WordPress", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Co-Founder & Frontend Engineer",
    company: "Verstile",
    location: "India",
    period: "Jul 2020 — Sep 2021",
    type: "Startup",
    achievements: [
      "Co-founded a web agency and delivered 10+ websites for education institutes during COVID",
      "Built reusable UI templates to speed up delivery across multiple client projects",
      "Handled client requirements, UI delivery, and performance optimization end-to-end",
    ],
    tech: ["HTML", "CSS", "JavaScript", "WordPress"],
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
                <div className={`absolute left-2.5 md:left-6 top-1.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${role.current
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
