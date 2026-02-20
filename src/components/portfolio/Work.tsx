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
    id: "nftzone",
    title: "NFTZONE — NFT Marketplace",
    description: "Marketplace to explore, buy, and sell NFTs.",
    longDescription:
      "A full-stack NFT marketplace that allows users to browse collections, view NFT details, and simulate buying and selling digital assets with a clean, responsive UI.",
    problem:
      "Most beginner NFT platforms are cluttered and hard to navigate, creating friction for first-time users exploring digital assets.",
    results:
      "Delivered a smooth browsing experience with responsive UI and optimized asset loading, improving usability and engagement.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    tags: ["Web3", "Marketplace", "Frontend"],
    color: "primary",
    emoji: "🖼️",
    live: "https://nftzone.netlify.app/",
    github: "https://github.com/Adarsh-kushwaha",
  },
  {
    id: "pixbook",
    title: "PixBook — Photo Sharing Platform",
    description: "Social platform to share and explore photos.",
    longDescription:
      "A lightweight photo-sharing web app where users can upload, browse, and explore images with a simple, mobile-first interface.",
    problem:
      "Existing photo-sharing tools are often heavy and ad-driven, leading to slow load times and poor mobile experience.",
    results:
      "Built a fast, responsive UI focused on performance and usability, improving page load speed and user experience on mobile devices.",
    tech: ["React", "Next.js", "CSS", "JavaScript"],
    tags: ["Social", "Media", "Frontend"],
    color: "gold",
    emoji: "📸",
    live: "https://pixbook.netlify.app/",
    github: "https://github.com/Adarsh-kushwaha",
  },
  {
    id: "personal-blog",
    title: "Personal Blog Platform",
    description: "Blog platform to write and publish articles.",
    longDescription:
      "A personal blogging platform with a clean reading experience, SEO-friendly pages, and support for publishing technical articles and notes.",
    problem:
      "Publishing technical content often requires heavy CMS setup or third-party platforms with limited customization.",
    results:
      "Enabled fast content publishing with optimized SEO structure and improved readability across devices.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    tags: ["Blog", "SEO", "Content"],
    color: "primary",
    emoji: "✍️",
    live: "https://my-portfolio-mc7hpo1v4-adarsh-kushwaha.vercel.app/blogs",
    github: "https://github.com/Adarsh-kushwaha",
  },
  {
    id: "search-ui",
    title: "SearchX — Google-like Search UI",
    description: "Search engine UI clone with modern frontend.",
    longDescription:
      "A frontend-only clone of a search engine interface, focusing on UI fidelity, accessibility, and fast page rendering.",
    problem:
      "Understanding large-scale search UI patterns requires hands-on practice with layout, performance, and accessibility constraints.",
    results:
      "Delivered a pixel-accurate, responsive search UI with optimized rendering and keyboard accessibility support.",
    tech: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    tags: ["UI Clone", "Frontend", "Practice"],
    color: "primary",
    emoji: "🔍",
    live: "https://search-x.vercel.app/search",
    github: "https://github.com/Adarsh-kushwaha",
  },
  {
    id: "pulse-internal",
    title: "Pulse — Call Recording Analytics (Internal)",
    description: "Internal dashboard to visualize and analyze call recordings.",
    longDescription:
      "A secure internal web application for operations teams to review call recordings, analyze transcripts, and track call quality metrics with an intuitive UI.",
    problem:
      "Support teams lacked a unified UI to review call data, leading to manual workflows and delayed analysis.",
    results:
      "Streamlined call review workflows with centralized dashboards, improving operational efficiency and turnaround time.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    tags: ["Internal Tool", "Dashboard", "Analytics"],
    color: "gold",
    emoji: "🎧",
    live: "",
    github: "",
  },
  {
    id: "voicebot-portal",
    title: "Voice Bot Campaign Portal (Internal)",
    description: "Portal to configure and manage AI voice bot campaigns.",
    longDescription:
      "A web portal that enables operations teams to create, configure, and manage automated voice bot campaigns through a no-code UI interface.",
    problem:
      "Campaign setup required engineering involvement for every change, slowing down experiments and iterations.",
    results:
      "Reduced engineering dependency for campaign configuration and accelerated iteration cycles for business teams.",
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    tags: ["Internal Tool", "Automation", "Admin"],
    color: "primary",
    emoji: "🤖",
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
