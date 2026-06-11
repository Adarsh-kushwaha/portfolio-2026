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
    id: "campaign-workflow",
    title: "Campaign Management System",
    description: "Enterprise workflow builder handling 1.25L+ API calls/month across 15+ live campaigns.",
    longDescription:
      "Built a Next.js B2B SaaS portal with a node-based workflow builder for enterprise clients (HDFC, BALIC, TVS). System manages campaign orchestration, real-time execution monitoring, and dynamic workflow configuration. Handles 1.25L+ API calls monthly with 100K+ record virtualization and optimistic UI updates.",
    problem:
      "Managing complex, multi-step campaigns required flexible workflow logic. State explosion with Redux would've created unmaintainable subscriptions. Table rendering 100K+ records crushed performance. Real-time updates needed without API overload.",
    results:
      "Zustand for granular state kept complexity low. Virtualized tables handle 100K+ records at 60fps. Caching + optimistic updates reduced perceived latency by 70%. 15+ live campaigns processing millions of calls monthly with zero critical issues.",
    tech: ["Next.js", "Zustand", "React Query", "TypeScript", "Tailwind CSS"],
    tags: ["B2B SaaS", "Architecture", "Scale"],
    color: "primary",
    emoji: "⚙️",
    live: "",
    github: "",
  },
  {
    id: "claim-portal",
    title: "Claim Submission Portal (Schema-Driven Forms)",
    description: "Dynamic form framework powering 200+ variants, 20K+ daily submissions.",
    longDescription:
      "Built a vendor-agnostic claim platform using custom schema-driven form framework with React Hook Form + TypeScript. Single codebase dynamically renders 200+ form variants across 10+ insurance vendors. Processes 20K+ daily submissions with conditional logic, field dependencies, and optimistic validation.",
    problem:
      "Each vendor had different claim requirements — hardcoding forms meant N separate codebases. Schema-driven approach scales to new vendors without code changes. Conditional workflows needed runtime resolution, not build-time templates.",
    results:
      "200+ form variants from single framework. 20K+ daily submissions at 99.3% uptime. New vendor onboarding now takes days, not weeks. Reduced codebase duplication by 85%.",
    tech: ["Next.js", "React Hook Form", "TypeScript", "Zod", "SSR"],
    tags: ["Framework Design", "B2B", "Forms"],
    color: "gold",
    emoji: "📋",
    live: "",
    github: "",
  },
  {
    id: "performance-optimization",
    title: "Performance & Bundle Optimization",
    description: "Reduced bundle 76%, improved LCP 5.3s→1.2s, Lighthouse 60→95.",
    longDescription:
      "Systematic performance audit across Bajaj Health portals. Identified JavaScript bloat from vendor dependencies, inefficient code splitting, and unoptimized image delivery. Applied code splitting, SSR, image optimization, and render-path refactoring across multiple applications.",
    problem:
      "Bundle size 2.5 MB, LCP 5.3s, Lighthouse score 60. Users on 3G networks experienced 10+ second load times. Vendor dependencies weren't tree-shaking properly. Images served at full resolution regardless of device.",
    results:
      "Bundle: 2.5 MB → 600 KB (76% reduction). LCP: 5.3s → 1.2s. Lighthouse: 60 → 95. Crash-free rate: 96% → 99.3%. Real-world improvement: 3G users now see interactive content in <2s.",
    tech: ["Code Splitting", "SSR", "Image Optimization", "Webpack", "Vite"],
    tags: ["Performance", "Optimization", "DevOps"],
    color: "primary",
    emoji: "⚡",
    live: "",
    github: "",
  },
  {
    id: "analytics-dashboard",
    title: "Real-Time Analytics Dashboard",
    description: "GraphQL-optimized dashboard reducing API requests by 25%.",
    longDescription:
      "Built operational analytics dashboard using GraphQL subscriptions and React Query. Real-time call performance metrics, cost tracking, and business KPIs. Optimized GraphQL queries to reduce request volume while maintaining freshness.",
    problem:
      "Multiple data sources (call metrics, costs, KPIs) required separate REST calls. Over-fetching led to 40+ API calls per dashboard load. Real-time updates needed without constant polling.",
    results:
      "Consolidated to 3 GraphQL queries per dashboard. 25% reduction in API requests. Real-time metrics with <500ms update latency. Improved decision-making efficiency for ops teams.",
    tech: ["GraphQL", "React Query", "TypeScript", "Real-time Subscriptions"],
    tags: ["Dashboard", "Data Fetching", "Real-time"],
    color: "gold",
    emoji: "📊",
    live: "",
    github: "",
  },
  {
    id: "lab-booking",
    title: "Lab Booking Portal (Microfrontend Architecture)",
    description: "Module Federation system serving 10K+ monthly bookings.",
    longDescription:
      "Built scalable B2B lab booking platform using Module Federation microfrontend architecture. Independent deployment of booking, lab discovery, and vendor management modules. React Query for server-state management with localization-driven component rendering.",
    problem:
      "Monolithic frontend blocked independent vendor deployments. Sharing React Query cache across teams needed clear boundaries. Booking experience required different flows per locale.",
    results:
      "Module Federation allowed independent deploys for each vendor. 75% faster booking experience with optimistic UI. 10K+ monthly bookings. Teams ship independently without coordination.",
    tech: ["React", "Module Federation", "React Query", "TypeScript"],
    tags: ["Architecture", "Microfrontend", "Scale"],
    color: "primary",
    emoji: "🏥",
    live: "",
    github: "",
  },
  {
    id: "call-pulse",
    title: "Call Pulse — AI Analytics Platform",
    description: "Processes 5K-8K call recordings daily with 97% accuracy.",
    longDescription:
      "AI-powered call analytics platform processing 5K-8K recordings daily. Custom pipeline splits long audio files into contextual chunks, generates transcriptions, sentiment analysis, and business insights using LLM inference. React + Express frontend/backend.",
    problem:
      "Raw call recordings 30+ minutes long. LLM inference on full audio expensive and slow. Needed accurate chunking that preserves conversation context.",
    results:
      "97% accuracy on transcription + sentiment. Optimized inference costs through smart chunking. Real-time insights dashboard serving analytics to ops teams.",
    tech: ["React", "Express", "Python", "LLM APIs", "Audio Processing"],
    tags: ["AI/ML", "Full Stack", "Analytics"],
    color: "gold",
    emoji: "🎙️",
    live: "",
    github: "",
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
