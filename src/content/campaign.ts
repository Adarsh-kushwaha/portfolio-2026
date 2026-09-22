/**
 * Campaign — Levels (roles, oldest → newest) and the Towers (projects) built in them.
 * See CONTEXT.md for Level / Tower / Outpost / Side Quest / Fortress.
 */

export interface Tower {
  id: string;
  title: string;
  emoji: string;
  /** Level this Tower was built in, or "side-quest" for work outside any listed role. */
  levelId: string | "side-quest";
  /** The one metric on the Tower's banner. */
  banner: string;
  summary: string;
  context: string;
  /** The forces and trade-offs that shaped the decision. */
  problem: string;
  decision: string;
  results: string;
  metrics: string[];
  tech: string[];
}

export interface Level {
  id: string;
  number: number;
  title: string;
  company: string;
  location: string;
  /** ISO year-month. */
  start: string;
  /** ISO year-month, or null while current. */
  end: string | null;
  period: string;
  type: string;
  wins: string[];
  tech: string[];
  /** Early roles with no enterprise project show a single Outpost win instead of Towers. */
  outpost?: string;
}

export const levels: Level[] = [
  {
    id: "verstile",
    number: 1,
    title: "Co-Founder & Frontend Engineer",
    company: "Verstile",
    location: "India",
    start: "2020-07",
    end: "2021-09",
    period: "Jul 2020 — Sep 2021",
    type: "Startup",
    outpost: "10+ websites delivered for education institutes during COVID",
    wins: [
      "Co-founded a web agency and delivered 10+ websites for education institutes during COVID",
      "Built reusable UI templates to speed up delivery across multiple client projects",
      "Handled client requirements, UI delivery, and performance optimization end-to-end",
    ],
    tech: ["HTML", "CSS", "JavaScript", "WordPress"],
  },
  {
    id: "mibi",
    number: 2,
    title: "WordPress Web Developer",
    company: "MiBi Services",
    location: "India",
    start: "2020-08",
    end: "2020-10",
    period: "Aug 2020 — Oct 2020",
    type: "Contract",
    outpost: "MVP job portal shipped for faster time-to-market",
    wins: [
      "Built an MVP job portal website using WordPress with custom HTML and CSS for faster time-to-market",
      "Implemented responsive UI layouts to support mobile and low-bandwidth users",
      "Worked with CMS data models and plugins to structure content and basic workflows",
    ],
    tech: ["WordPress", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "coding-sheep",
    number: 3,
    title: "Frontend Developer Intern",
    company: "Coding Sheep Technologies LLP",
    location: "Remote, IN",
    start: "2022-10",
    end: "2022-12",
    period: "Oct 2022 — Dec 2022",
    type: "Internship",
    outpost: "Reusable UI components across multiple client projects",
    wins: [
      "Delivered responsive UI screens from Figma designs with consistent cross-browser behavior",
      "Built reusable UI components to accelerate feature delivery across multiple client projects",
      "Collaborated with backend developers to integrate APIs and improve end-to-end user flows",
    ],
    tech: ["HTML", "CSS", "JavaScript", "React", "Figma"],
  },
  {
    id: "bfh-intern",
    number: 4,
    title: "Frontend Developer Intern",
    company: "Bajaj Finserv Health",
    location: "Pune, IN",
    start: "2023-01",
    end: "2023-06",
    period: "Jan 2023 — Jun 2023",
    type: "Internship",
    outpost: "Payment screens ~2s → ~500ms",
    wins: [
      "Reduced payment and invoice screen load time from ~2s to ~500ms using code splitting, lazy loading, and component restructuring",
      "Integrated a scan-and-pay UI module into the payment flow, improving checkout speed and reliability for high-volume usage",
      "Refactored UI components into reusable hooks and layouts, improving maintainability and development velocity",
      "Contributed to a large-scale UI revamp by standardizing colors, typography, and theming without disrupting production",
    ],
    tech: ["React", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "sde-1",
    number: 5,
    title: "SDE I – Frontend",
    company: "Bajaj Finserv Health",
    location: "Pune, IN",
    // ⚠️ Assumed Jul 2023 (after the internship ends) — owner to confirm.
    start: "2023-07",
    end: "2024-10",
    period: "Jul 2023 — Oct 2024",
    type: "Full-time",
    wins: [
      "Built scalable Lab Booking Portal using Module Federation microfrontend architecture, supporting 10K+ monthly bookings with 75% faster experience",
      "Implemented React Query-based server-state management with optimistic UI updates and localization-driven component rendering",
      "Strengthened portal security by implementing CSP, input sanitization, secure cookies, maintaining 0 critical findings in production",
      "Led vendor frontend portal takeover with codebase analysis and CI/CD setup, enabling independent delivery within 2 weeks",
    ],
    tech: ["React", "Next.js", "TypeScript", "React Query", "Module Federation", "Tailwind CSS"],
  },
  {
    id: "sde-2",
    number: 6,
    title: "SDE II – Frontend",
    company: "Bajaj Finserv Health",
    location: "Pune, IN",
    start: "2024-11",
    end: null,
    period: "Nov 2024 — Present",
    type: "Full-time",
    wins: [
      "Architected Campaign Management System handling 1.25L+ API calls/month across 15+ live campaigns using Zustand + virtualized tables for 100K+ records",
      "Built schema-driven form framework supporting 200+ dynamic variants across 10+ vendors, processing 20K+ daily claim submissions",
      "Designed Real-Time Analytics Dashboard with GraphQL optimization, reducing API requests by 25% while maintaining real-time KPI freshness",
      "Led performance optimization: reduced JS bundle 76% (2.5MB → 600KB), improved LCP 5.3s → 1.2s, Lighthouse 60 → 95, crash-free rate 96% → 99.3%",
      "Mentored junior developers on code quality & Git workflows, reducing team-wide bug density by 40%",
    ],
    tech: ["Next.js", "React", "TypeScript", "Zustand", "React Query", "GraphQL"],
  },
];

export const towers: Tower[] = [
  {
    id: "campaign-workflow",
    title: "Campaign Management System",
    emoji: "⚙️",
    levelId: "sde-2",
    banner: "1.25L+ API calls/month",
    summary: "Enterprise workflow builder handling 1.25L+ API calls/month across 15+ live campaigns.",
    context:
      "A Next.js B2B SaaS portal with a node-based workflow builder for enterprise clients (HDFC, BALIC, TVS): campaign orchestration, real-time execution monitoring and dynamic workflow configuration.",
    problem:
      "Complex multi-step campaigns needed flexible workflow logic. Redux would have caused a state explosion of unmaintainable subscriptions. Tables of 100K+ records crushed performance, and real-time updates had to avoid overloading the API.",
    decision:
      "Zustand over Redux for granular state subscriptions; virtualized tables for 100K+ rows; caching plus optimistic updates instead of polling.",
    results:
      "Virtualized tables hold 60fps at 100K+ records. Perceived latency down 70%. 15+ live campaigns processing millions of calls monthly with zero critical issues.",
    metrics: ["1.25L+ API calls/month", "100K+ records at 60fps", "−70% perceived latency", "15+ live campaigns"],
    tech: ["Next.js", "Zustand", "React Query", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "claim-portal",
    title: "Claim Submission Portal (Schema-Driven Forms)",
    emoji: "📋",
    levelId: "sde-2",
    banner: "200+ form variants, 1 codebase",
    summary: "Schema-driven form framework powering 200+ variants and 20K+ daily submissions.",
    context:
      "A vendor-agnostic claim platform on a custom schema-driven form framework (React Hook Form + TypeScript), rendering every vendor's forms from one codebase.",
    problem:
      "Each of 10+ insurance vendors had different claim requirements. Hardcoding forms meant N separate codebases, and conditional workflows needed runtime resolution, not build-time templates.",
    decision:
      "A schema-driven framework: forms, conditions and field dependencies are data, so new vendors need no code changes.",
    results:
      "200+ form variants from a single framework, 20K+ daily submissions at 99.3% uptime. Vendor onboarding takes days, not weeks. Code duplication down 85%.",
    metrics: ["200+ variants", "20K+ daily submissions", "99.3% uptime", "−85% duplication"],
    tech: ["Next.js", "React Hook Form", "TypeScript", "Zod", "SSR"],
  },
  {
    id: "performance-optimization",
    title: "Performance & Bundle Optimization",
    emoji: "⚡",
    levelId: "sde-2",
    banner: "LCP 5.3s → 1.2s",
    summary: "Cut the bundle 76%, LCP 5.3s → 1.2s, Lighthouse 60 → 95.",
    context:
      "A systematic performance audit across Bajaj Finserv Health portals, covering vendor bloat, code splitting, image delivery and the render path.",
    problem:
      "A 2.5 MB bundle, 5.3s LCP and a Lighthouse score of 60. 3G users waited 10+ seconds. Vendor dependencies weren't tree-shaking and images shipped at full resolution to every device.",
    decision:
      "Code splitting, SSR, responsive image delivery and render-path refactoring, applied across every portal rather than one page at a time.",
    results:
      "Bundle 2.5 MB → 600 KB (−76%). LCP 5.3s → 1.2s. Lighthouse 60 → 95. Crash-free rate 96% → 99.3%. 3G users now see interactive content in under 2s.",
    metrics: ["2.5 MB → 600 KB", "LCP 5.3s → 1.2s", "Lighthouse 60 → 95", "Crash-free 96% → 99.3%"],
    tech: ["Code Splitting", "SSR", "Image Optimization", "Webpack", "Vite"],
  },
  {
    id: "analytics-dashboard",
    title: "Real-Time Analytics Dashboard",
    emoji: "📊",
    levelId: "sde-2",
    banner: "−25% API requests",
    summary: "GraphQL-optimized dashboard reducing API requests by 25%.",
    context:
      "An operational analytics dashboard with real-time call performance, cost tracking and business KPIs, on GraphQL subscriptions and React Query.",
    problem:
      "Several data sources needed separate REST calls, and over-fetching meant 40+ API calls per dashboard load. Real-time updates had to work without constant polling.",
    decision: "Consolidate into a few GraphQL queries plus subscriptions instead of polling many REST endpoints.",
    results:
      "3 GraphQL queries per dashboard instead of 40+ calls, 25% fewer API requests overall, and real-time metrics under 500ms latency.",
    metrics: ["40+ calls → 3 queries", "−25% API requests", "<500ms updates"],
    tech: ["GraphQL", "React Query", "TypeScript", "Real-time Subscriptions"],
  },
  {
    id: "lab-booking",
    title: "Lab Booking Portal (Microfrontend Architecture)",
    emoji: "🏥",
    levelId: "sde-1",
    banner: "10K+ bookings/month",
    summary: "Module Federation system serving 10K+ monthly bookings.",
    context:
      "A B2B lab booking platform split into independently deployed booking, lab discovery and vendor management modules.",
    problem:
      "A monolithic frontend blocked independent vendor deployments. Sharing the React Query cache across teams needed clear boundaries, and each locale needed its own booking flow.",
    decision: "Module Federation microfrontends with explicit shared-cache boundaries and localization-driven rendering.",
    results:
      "Each vendor deploys independently, the booking experience is 75% faster with optimistic UI, and the platform serves 10K+ monthly bookings.",
    metrics: ["10K+ bookings/month", "75% faster booking", "Independent deploys"],
    tech: ["React", "Module Federation", "React Query", "TypeScript"],
  },
  {
    id: "call-pulse",
    title: "Call Pulse — AI Analytics Platform",
    emoji: "🎙️",
    levelId: "side-quest",
    banner: "97% accuracy",
    summary: "Processes 5K–8K call recordings daily with 97% accuracy.",
    context:
      "An AI call analytics platform: a custom pipeline splits long recordings into contextual chunks, then produces transcriptions, sentiment and business insights with LLM inference.",
    problem:
      "Recordings run 30+ minutes, and LLM inference on full audio is slow and expensive. Chunking had to preserve conversation context.",
    decision: "Context-preserving chunking before inference, instead of sending full recordings to the model.",
    results:
      "97% accuracy on transcription and sentiment, lower inference costs, and a real-time insights dashboard for ops teams.",
    metrics: ["5K–8K recordings/day", "97% accuracy"],
    tech: ["React", "Express", "Python", "LLM APIs", "Audio Processing"],
  },
];

export const towersForLevel = (levelId: string) => towers.filter((t) => t.levelId === levelId);
export const sideQuests = towers.filter((t) => t.levelId === "side-quest");
export const levelOf = (tower: Tower) => levels.find((l) => l.id === tower.levelId);
export const towerById = (id: string) => towers.find((t) => t.id === id);
export const towerAnchor = (id: string) => `tower-${id}`;

/** The stops along the Campaign path: every Level, then the Side Quest, then the Fortress. */
export type CampaignStop =
  | { kind: "level"; level: Level; towers: Tower[] }
  | { kind: "side-quest"; towers: Tower[] }
  | { kind: "fortress"; towers: Tower[] };

export const campaignStops: CampaignStop[] = [
  ...levels.map((level): CampaignStop => ({ kind: "level", level, towers: towersForLevel(level.id) })),
  { kind: "side-quest", towers: sideQuests },
  { kind: "fortress", towers },
];

/** Index of the stop where a Tower stands. */
export const stopOfTower = (tower: Tower) =>
  tower.levelId === "side-quest"
    ? campaignStops.findIndex((s) => s.kind === "side-quest")
    : campaignStops.findIndex((s) => s.kind === "level" && s.level.id === tower.levelId);
