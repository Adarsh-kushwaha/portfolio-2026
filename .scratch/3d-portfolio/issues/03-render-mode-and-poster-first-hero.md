# 03: Render mode + shared canvas + poster-first Hero (tracer bullet)

**What to build:** The first complete 3D path. The Hero shows the new copy with a poster image right away. The Avatar at the desk then fades in, drawn on a shared canvas, after first paint. Devices that can't handle 3D (no WebGL, reduced motion, Save-Data, slow connection, few CPU cores) stay on the 2D poster version. Follows ADR 0001.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Hero shows "SDE II · Frontend Systems · Pune", "📍 Pune · 🕐 local time", the metric subtitle, the ☕ tag, both call-to-action buttons and 5 social links; there is **no** "Open for opportunities" badge
- [ ] The poster WebP is visible on first paint; no loader blocks the page
- [ ] The free Avatar GLB (with Mixamo animations, under 1.5 MB) loads during idle time on a single shared canvas and crossfades over the poster
- [ ] One app-level render mode decides "3d" or "2d"; tests stub each trigger (WebGL, reduced motion, Save-Data, connection, core count) and see the 2D Hero
- [ ] Mobile: the Avatar sits above the text and rotates slowly; the social buttons are sized for tapping
- [ ] Credits required by the model licenses are recorded
