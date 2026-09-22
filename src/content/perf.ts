/**
 * Measured mobile LCP of this site (Lighthouse, production build). See docs/perf-baseline.md.
 * `after` is filled in once the redesign ships.
 */
export const sitePerf: {
  before: { lcp: string; score: number };
  after: { lcp: string; score: number; remaining: number } | null;
} = {
  before: { lcp: "10.8 s", score: 70 },
  after: null,
};
