# Design System — Adarsh Kushwaha Portfolio (MASTER)

Synthesised from `ui-ux-pro-max` searches (2026-10-26). The `--design-system` run returned
"Scroll-Triggered Storytelling" for `personal portfolio creative`; style, color, type and motion
were then chosen from explicit `--domain` searches. Page overrides go in `pages/<page>.md`.

## Direction
- **Pattern:** Scroll-Triggered Storytelling — Intro hook → About → Impact → Skills → Journey →
  Work → Beyond → Contact (climax CTA). Every chapter readable with motion off.
- **Style:** Dark Mode (OLED) base + **Aurora UI** hero (slow 8–12s mesh-gradient loop) +
  **Bento Box Grid** for About / Work / Beyond. Light mode supported, dark is default.
- **Variance 7 · Motion 8 · Density 3** (spacious marketing page, complex choreography).

## Color tokens (HSL, in `src/index.css`)
| Role | Dark | Notes |
|---|---|---|
| background | `228 45% 4%` | near-black midnight |
| surface / surface-2 | `228 32% 7%` / `228 26% 10%` | card layers |
| foreground | `220 30% 96%` | |
| foreground-muted | `220 14% 68%` | ≥ 7:1 on background |
| primary (teal) | `170 85% 50%` | CTA, focus ring |
| violet | `258 90% 72%` | aurora + gradient partner |
| gold | `40 88% 66%` | warm accent, "human" chapters |

Gradient pair for headline words: teal → violet. Never raw hex in components.

## Typography
- Heading **Space Grotesk** (600–700, tracking −0.03em), body **DM Sans**, data/labels
  **JetBrains Mono** ("Tech Startup" pairing + mono for metrics).
- Body 16px min, line-height 1.6. Headline split-text only on headlines < 8 words.

## Motion (GSAP 3.15 + ScrollTrigger + SplitText, Lenis smooth scroll)
- Headline: SplitText chars, masked, `yPercent 110 → 0`, stagger 0.02, `expo.out`.
- Reveal: `[data-reveal]` batch, y 24 → 0, 0.7s `expo.out`, once.
- Timeline line: scroll-scrubbed `scaleY` (transform only, never width/height).
- Magnetic: max 2 focal elements per screen (hero CTAs), pull clamped ×0.3.
- Hover: 150–300ms; spotlight cards via CSS vars.
- `prefers-reduced-motion`: all GSAP runs inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`;
  content renders in its final state otherwise. Marquees stop and wrap.

## Rules
- Lucide SVG icons only — no emoji as icons.
- Touch targets ≥ 44px, visible focus ring (`ring-primary`), cursor-pointer on clickables.
- Deep links: projects open via `?project=<id>`.
- Responsive check: 375 / 768 / 1024 / 1440. No horizontal scroll.
