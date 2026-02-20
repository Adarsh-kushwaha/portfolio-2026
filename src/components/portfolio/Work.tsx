/**
 * Work / Projects Section — Masonry grid with full-screen project modals
 */
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, X, ArrowRight } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  problem: string;
  results: string;
  tech: string[];
  tags: string[];
  color: string;
  emoji: string;
  live?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: "design-system",
    title: "Enterprise Design System",
    description: "Scalable component library serving 8 product teams.",
    longDescription:
      "Built a comprehensive design system from scratch — tokens, components, patterns — that became the single source of truth for 8 cross-functional product teams at TechCorp India.",
    problem:
      "Teams were duplicating UI work, inconsistencies were rampant, and onboarding new designers/devs took weeks.",
    results:
      "60% reduction in UI development time. Consistent experience across all products. Storybook documentation with 100% component coverage.",
    tech: ["React", "TypeScript", "Radix UI", "Tailwind CSS", "Storybook"],
    tags: ["Design System", "Open Source"],
    color: "primary",
    emoji: "🎨",
    live: "https://example.com",
    github: "https://github.com",
  },
  {
    id: "dashboard",
    title: "Real-Time Analytics Dashboard",
    description: "10K+ concurrent users. Live WebSocket data visualization.",
    longDescription:
      "A high-performance analytics dashboard with real-time data streaming, customizable widgets, and complex data visualization built for a SaaS startup.",
    problem:
      "Existing dashboard crashed under load and had 8-second load times, frustrating premium users.",
    results:
      "Handles 10K+ concurrent connections. Load time dropped from 8s → 1.2s. User satisfaction score up 40%.",
    tech: ["React", "WebSockets", "Recharts", "React Query", "Zustand"],
    tags: ["SaaS", "Data Viz", "Performance"],
    color: "gold",
    emoji: "📊",
    live: "https://example.com",
    github: "https://github.com",
  },
  {
    id: "ecommerce",
    title: "E-Commerce Platform",
    description: "Full shopping experience — cart, checkout, wishlist, reviews.",
    longDescription:
      "End-to-end e-commerce front-end with advanced filtering, multi-currency support, and a blazing-fast checkout flow optimized for mobile.",
    problem:
      "Client's old platform had 72% cart abandonment due to slow, clunky checkout on mobile.",
    results:
      "Cart abandonment dropped to 38%. Mobile conversion rate tripled. Featured in a case study by the payment provider.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Stripe"],
    tags: ["E-Commerce", "Mobile-first"],
    color: "primary",
    emoji: "🛒",
    live: "https://example.com",
    github: "https://github.com",
  },
  {
    id: "portfolio-gen",
    title: "Portfolio Generator",
    description: "No-code portfolio builder for developers in minutes.",
    longDescription:
      "A no-code tool letting developers generate stunning portfolio sites by filling a JSON config. Multiple themes, one-click Vercel deploy.",
    problem:
      "Most developers waste days setting up a portfolio instead of spending that time on actual projects.",
    results:
      "500+ portfolios generated. 4.9⭐ Product Hunt launch. Featured in weekly developer newsletter.",
    tech: ["React", "Vite", "Tailwind CSS", "Node.js", "Vercel API"],
    tags: ["Side Project", "Open Source", "Devtools"],
    color: "gold",
    emoji: "🚀",
    live: "https://example.com",
    github: "https://github.com",
  },
  {
    id: "saas-landing",
    title: "SaaS Marketing Site",
    description: "High-converting landing page with perfect Lighthouse score.",
    longDescription:
      "Marketing website for a B2B SaaS with advanced animations, a/b testing integration, and 100/100 Lighthouse across all metrics.",
    problem:
      "Competitor's landing pages were outranking them and converting 2x better despite inferior product.",
    results:
      "100 Lighthouse score. Organic traffic +280% in 3 months. Conversion rate 4.2% (industry avg: 1.8%).",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript", "PostHog"],
    tags: ["Marketing", "SEO", "Performance"],
    color: "primary",
    emoji: "🎯",
    live: "https://example.com",
    github: "https://github.com",
  },
  {
    id: "mumbai-walks",
    title: "Mumbai Walks",
    description: "Interactive city exploration app for heritage walks.",
    longDescription:
      "A passion project — an interactive map-based guide to heritage and street walks across Mumbai, built with love for the city.",
    problem:
      "Mumbai's incredible heritage and street life is largely undiscovered by most residents and tourists.",
    results:
      "1,200+ monthly active users. Featured in TimeOut Mumbai. Partnered with 3 heritage walk organizations.",
    tech: ["React", "Mapbox GL", "TypeScript", "Supabase", "Tailwind CSS"],
    tags: ["Side Project", "Mumbai", "Maps"],
    color: "gold",
    emoji: "🗺️",
    live: "https://example.com",
    github: "https://github.com",
  },
];

const tagColors = ["bg-primary/15 text-primary border-primary/30", "bg-gold/15 text-gold border-gold/30"];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card rounded-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className={`p-6 pb-4 border-b border-border relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-all"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{project.emoji}</span>
            <h3 className="text-xl font-heading font-700 text-foreground">{project.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={tag} className={`px-2 py-0.5 rounded-full text-xs border font-600 ${tagColors[i % 2]}`}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-sm font-heading font-600 text-primary uppercase tracking-wider mb-2">Overview</h4>
            <p className="text-foreground-muted text-sm leading-relaxed">{project.longDescription}</p>
          </div>
          <div>
            <h4 className="text-sm font-heading font-600 text-gold uppercase tracking-wider mb-2">The Problem</h4>
            <p className="text-foreground-muted text-sm leading-relaxed">{project.problem}</p>
          </div>
          <div>
            <h4 className="text-sm font-heading font-600 text-primary uppercase tracking-wider mb-2">Results</h4>
            <p className="text-foreground-muted text-sm leading-relaxed">{project.results}</p>
          </div>
          <div>
            <h4 className="text-sm font-heading font-600 text-foreground-muted uppercase tracking-wider mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 rounded-lg text-xs bg-surface-2 text-foreground-muted border border-border-subtle font-heading font-500">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg btn-primary text-sm">
                <ExternalLink className="w-3.5 h-3.5" /> Live Demo
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg btn-outline text-sm">
                <Github className="w-3.5 h-3.5" /> Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Work() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="work" className="section-padding bg-surface/30" ref={ref}>
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-4"
        >
          <span className="section-label">Featured Work</span>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-700 tracking-tight">
            Things I've <span className="text-gradient-teal">Built</span>
          </h2>
          <p className="text-foreground-muted mt-2 text-sm md:text-base max-w-xl">
            A selection of projects I'm proud of — each one taught me something new.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + idx * 0.08 }}
              onClick={() => setSelected(project)}
              className="glass-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer group hover-lift p-6"
            >
              {/* Emoji header */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{project.emoji}</span>
                <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
              </div>

              <h3 className="text-base font-heading font-700 text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed mb-4">{project.description}</p>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-md text-xs bg-surface-2 text-foreground-muted border border-border-subtle font-500">
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-2 py-0.5 rounded-md text-xs bg-surface-2 text-foreground-muted border border-border-subtle">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-xs text-primary hover:text-primary-glow transition-colors font-600"
                  >
                    <ExternalLink className="w-3 h-3" /> Live
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-xs text-foreground-muted hover:text-foreground transition-colors font-600"
                  >
                    <Github className="w-3 h-3" /> Code
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
