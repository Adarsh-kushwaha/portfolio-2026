# 01: Test harness + baseline LCP

**What to build:** A working test setup and a record of the current site's performance, before anything changes. The home page gets a smoke test through the single seam from the spec: the home page rendered in jsdom, where there is no WebGL. The current site's LCP gets measured and saved, because it is the "before" number for the This Site Boss.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Vitest runs in a jsdom environment with jest-dom matchers available; `npm run test` passes
- [ ] A smoke test renders the home page and finds the Hero heading and the Blog link
- [ ] The current site's mobile LCP and Lighthouse score (production build) are recorded in the repo as the This Site Boss "before" values
- [ ] The Blog page still builds and renders unchanged
