/**
 * Arena — Stats, Arsenal / Tools inventory and Bosses. See CONTEXT.md.
 */
import { sitePerf } from "./perf";

export type SkillLevel = "Expert" | "Advanced" | "Intermediate";

export interface Stat {
  name: string;
  value: number;
  evidence: string;
  /** Honest note shown when this Stat is a Weakness. */
  note?: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: SkillLevel;
  years: string;
  group: string;
  /** Arsenal = techniques used as Moves; Tools = gear. */
  kind: "arsenal" | "tools";
}

export interface Boss {
  id: string;
  name: string;
  move: string;
  headline: string;
  before: string;
  after: string | null;
  /** Health left after the Move lands, 0–100. */
  remaining: number;
  /** Tower where this fight happened; absent for the This Site Boss. */
  towerId?: string;
}

export const stats: Stat[] = [
  { name: "Architecture", value: 90, evidence: "Module Federation, schema-driven forms" },
  { name: "Performance", value: 95, evidence: "Lighthouse 60 → 95" },
  { name: "Leadership", value: 80, evidence: "Mentoring, bug density −40%" },
  { name: "State & Data", value: 85, evidence: "Zustand, React Query, GraphQL" },
  {
    name: "Testing",
    value: 60,
    evidence: "Vitest / RTL, Intermediate",
    note: "I ship with RTL coverage on critical flows, and I'm building toward test-first.",
  },
  {
    name: "Backend",
    value: 55,
    evidence: "Node.js basics, Intermediate",
    note: "I can build an Express API, but I'd pair with a backend engineer before owning one in production.",
  },
];

const byValue = [...stats].sort((a, b) => b.value - a.value);
export const strengths = byValue.slice(0, 3);
export const weaknesses = byValue.slice(-2);

const arsenal = (group: string, items: [string, string, SkillLevel, string][]): Skill[] =>
  items.map(([name, icon, level, years]) => ({ name, icon, level, years, group, kind: "arsenal" }));

export const skills: Skill[] = [
  ...arsenal("Core Frontend", [
    ["React", "⚛️", "Expert", "3+ yrs"],
    ["Next.js (SSR/SSG)", "▲", "Expert", "2+ yrs"],
    ["TypeScript", "🔷", "Advanced", "2.5+ yrs"],
    ["JavaScript (ES6+)", "⚡", "Expert", "3.5+ yrs"],
    ["HTML5 & CSS3", "🎨", "Expert", "4+ yrs"],
    ["Tailwind CSS", "💨", "Advanced", "2+ yrs"],
  ]),
  ...arsenal("State & Data", [
    ["Zustand", "🗂️", "Advanced", "1.5+ yrs"],
    ["React Query", "🔄", "Advanced", "2+ yrs"],
    ["GraphQL", "📊", "Advanced", "1.5+ yrs"],
    ["React Hook Form", "📝", "Advanced", "2+ yrs"],
    ["Context API", "🎯", "Advanced", "2+ yrs"],
    ["REST APIs", "🌐", "Advanced", "3+ yrs"],
  ]),
  ...arsenal("Architecture", [
    ["Module Federation", "🏗️", "Advanced", "1+ yrs"],
    ["Schema-Driven Forms", "📋", "Advanced", "1.5+ yrs"],
    ["Design Systems", "🧩", "Advanced", "2.5+ yrs"],
    ["Component Composition", "🔗", "Advanced", "3+ yrs"],
    ["Code Splitting & Lazy Loading", "📦", "Advanced", "2+ yrs"],
    ["Web Security (CSP, Auth)", "🔐", "Advanced", "1.5+ yrs"],
  ]),
  ...arsenal("Performance", [
    ["Core Web Vitals", "⚡", "Expert", "2+ yrs"],
    ["Lighthouse Optimization", "🚦", "Expert", "2+ yrs"],
    ["Bundle Optimization", "📦", "Advanced", "2+ yrs"],
    ["Image Optimization", "🖼️", "Advanced", "2+ yrs"],
    ["Data Caching Strategies", "🗄️", "Advanced", "1.5+ yrs"],
    ["WCAG 2.2 Accessibility", "♿", "Advanced", "1.5+ yrs"],
  ]),
  ...arsenal("Craft", [
    ["Node.js Basics", "📱", "Intermediate", "2+ yrs"],
    ["Code Review & Mentoring", "👥", "Advanced", "2+ yrs"],
  ]),
  { name: "Vite / Webpack", icon: "🔨", level: "Advanced", years: "2+ yrs", group: "Build", kind: "tools" },
  { name: "Git / GitHub", icon: "🐙", level: "Advanced", years: "4+ yrs", group: "Version control", kind: "tools" },
  { name: "CI/CD Pipelines", icon: "🔁", level: "Advanced", years: "2+ yrs", group: "Delivery", kind: "tools" },
  { name: "Testing (Vitest / RTL)", icon: "🧪", level: "Intermediate", years: "1.5+ yrs", group: "Testing", kind: "tools" },
];

export const bosses: Boss[] = [
  {
    id: "bundle-bloat",
    name: "Bundle Bloat",
    move: "Code-Split Slash",
    headline: "JavaScript bundle",
    before: "2.5 MB",
    after: "600 KB",
    remaining: 24,
    towerId: "performance-optimization",
  },
  {
    id: "slow-lcp",
    name: "Slow LCP",
    move: "Lighthouse Uppercut",
    headline: "Largest Contentful Paint",
    before: "5.3 s",
    after: "1.2 s",
    remaining: 23,
    towerId: "performance-optimization",
  },
  {
    id: "form-chaos",
    name: "Form Chaos",
    move: "Schema-Driven Combo",
    headline: "200+ vendor form variants",
    before: "N codebases",
    after: "1 codebase",
    remaining: 5,
    towerId: "claim-portal",
  },
  {
    id: "monolith",
    name: "Monolith",
    move: "Module Federation Split",
    headline: "Booking experience",
    before: "Shared deploys",
    after: "Independent deploys, 75% faster",
    remaining: 25,
    towerId: "lab-booking",
  },
  {
    id: "crash-demon",
    name: "Crash Demon",
    move: "Stability Shield",
    headline: "Crash-free sessions",
    before: "96%",
    after: "99.3%",
    remaining: 18,
    towerId: "performance-optimization",
  },
  {
    id: "this-site",
    name: "This Site",
    move: "Poster-First Strike",
    headline: "This portfolio's mobile LCP",
    before: sitePerf.before.lcp,
    after: sitePerf.after?.lcp ?? null,
    remaining: sitePerf.after ? sitePerf.after.remaining : 100,
  },
];
