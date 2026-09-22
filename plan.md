# 3D Interactive Portfolio — Plan

Scope: redesign the **home/landing page only** (`src/pages/Index.tsx` and `src/components/portfolio/*`).
The Blog page (`src/pages/blog.tsx`) stays untouched. It imports none of the portfolio components, and the global theme tokens in `index.css` will not change.

---

## Guiding rule

**Game is the wrapper, numbers are the payload.** Every game element (move, level, tower) carries real data: architecture decisions and metrics. A recruiter skimming for 30 seconds must still see the SDE II signals. See `CONTEXT.md`.

---

## Feasibility

**Verdict: all of it can be built.** Three limits to know up front:

| Item | Feasible? | Limit |
|---|---|---|
| Hero 3D model that turns as you scroll, mobile responsive | ✅ | Mobile gets a lighter version of the model and no post-processing |
| Mortal Kombat–style skills arena | ✅ | Claude can't generate images. It can source free models (CC0 from Quaternius / Poly Pizza / Kenney, or Mixamo, which is free). A character that looks like you needs Meshy or Tripo (image-to-3D, free tier), run by you from your photo |
| Playable song | ⚠️ Partly | The song is copyrighted, so the MP3 can't be hosted. Use a Spotify or YouTube embed instead. Spotify plays a 30-second preview, or the full track if the visitor is logged in |
| Book click shows Dostoevsky quotes | ✅ | *Crime and Punishment* (Constance Garnett translation) is public domain |
| Letter-box contact form | ✅ | Same fields and same Web3Forms logic, new look |
| Blog page unchanged | ✅ | New styles stay inside the home page components |

---

## The Avatar (one character, whole site)

- One rigged 3D character appears across the site:
  - **Hero:** sits at the desk.
  - **Arena:** the fighter.
  - **Campaign:** walks the path.
- **Animations:** sit/type, stand-up, idle, fight stance, attack, walk (all from Mixamo, free).
- **Source now:** a free stylized character (Quaternius CC0 or Mixamo).
- **Later:** swap in your own avatar made with Meshy or Tripo from your photo, rigged in Mixamo. Same bone names and animation names, so the swap is one file.
- **Budget:** one GLB, under 1.5 MB after compression, with animations shared across sections.

---

## Page flow

```
HERO        Who I am + socials + 3D model (rotates on scroll)
  ↓
ABOUT       Intro card: "Engineer Behind the Pixels" + "Human Behind the Screen"
  ↓
ARENA       Fighter select → Stats → Arsenal → Tools
  ↓
CAMPAIGN    Levels (roles) → towers (projects) → full Fortress
  ↓
BEYOND      What I do when I'm quiet: revealed in pieces + interactive "Currently…" shelf
  ↓
LETTERBOX   Contact form as a letter
  ↓
"Made with ❤️ by Adarsh"
```

---

## Scroll budget

Scroll-locked (pinned) sections are kept short so a skimming recruiter never gets stuck.

| Section | Pinned? | Length |
|---|---|---|
| Hero | Short pin | ~1 screen (Avatar stands and turns) |
| About | No | Normal |
| Arena | No. Click-driven, fights are optional | Normal |
| Campaign | Pinned | ~4 screens max total, ~½ screen per Level |
| Beyond the Code | Light pin | ~2 screens |
| Letterbox | No | Normal |

- **Campaign level bar** (1 · 2 · 3 · 4 · 5 · 6 · 🏰): clickable, jumps to any Level or straight to the Fortress.
- **"Skip ↓" button** on every pinned section.
- Navbar anchors jump past pins.

---

## Sections

### 1. Hero: Frontend Engineer
- **Left:**
  - Label: "SDE II · Frontend Systems · Pune"
  - A quiet "📍 Pune · 🕐 local time" line. **No "Open for opportunities" badge** (see `CONTEXT.md` → What NOT to Say).
  - Your name.
  - Subtitle: *"I architect frontend systems that scale: 1.25L+ API calls a month, 200+ form variants from one schema, Lighthouse 60 → 95. I also mentor the engineers who build them with me."*
  - A small tag: "☕ fueled by filter coffee".
  - **See My Work** and **Download Resume** buttons, and all 5 social links (GitHub, LinkedIn, X, Instagram, Email).
- **Right:** the Avatar at a desk with a laptop and a filter coffee mug.
- **Scroll behavior:** as you scroll, the Avatar stands up and turns toward the camera while the camera pulls back and tilts. That is the handoff to the next section.
- **Mobile:** the model sits above the text, smaller, with a slow automatic rotation. Social buttons are sized for tapping.

### 2. About: intro card
- **"The Engineer Behind the Pixels":** a large card with the portrait photo (`adarsh-portrait`) on the left, a short bio on the right, and 4 highlight chips (System Design, Pune-based, Mentorship, Shipping Culture).
- **"The Human Behind the Screen" = who you are right now:** the casual photo (`adarsh-casual`) as a tilting photo frame with its caption, 2 short lines, and a **"What I'm working on"** block. Hobbies and values move to Beyond the Code.
- **Motion:** the cards tilt with the mouse on desktop. Plain stacked cards on mobile.

### 3. Arena: skills as a fighting game (Mortal Kombat style)
- **Fighter select screen:** the Avatar as the fighter, on a stage with arena lighting. The name plate reads "ADARSH — The Pixel Warrior".
- **Stats panel:** six RPG attributes with a real spread, taken from the skills data:

  | Stat | Value | Evidence |
  |---|---|---|
  | Architecture | 90 | Module Federation, schema-driven forms |
  | Performance | 95 | Lighthouse 60 → 95 |
  | Leadership | 80 | Mentoring, bug density −40% |
  | State & Data | 85 | Zustand, React Query, GraphQL |
  | Testing | 60 | Vitest/RTL, Intermediate |
  | Backend | 55 | Node.js Basics, Intermediate |

- **Strengths ⚔️:** the top stats (Performance, Architecture, State & Data).
- **Weaknesses 🛡️:** the lowest stats (Testing, Backend), each with an honest one-line note on what you do about it, e.g. "Testing — 60: I ship with RTL coverage on critical flows, and I'm building toward test-first." At most one light joke across the list.
- **Inventory:** all 30 skills from `Skills.tsx` stay, as Arsenal and Tools items, each with its level badge (Expert / Advanced / Intermediate).
- **Arsenal:** your techniques (React, Zustand, Module Federation, performance work), used in fights as **Moves**.
- **Boss fights:** each Boss is a real engineering problem you beat. Its health bar starts at the "before" number. Pick a Boss, the Avatar uses a Move, and the bar drains to the "after" number.

  | Boss | Move | Before → After |
  |---|---|---|
  | Bundle Bloat | Code-Split Slash | 2.5 MB → 600 KB |
  | Slow LCP | Lighthouse Uppercut | 5.3 s → 1.2 s |
  | Form Chaos (200+ variants) | Schema-Driven Combo | N codebases → 1 |
  | Monolith | Module Federation Split | Independent deploys, 75% faster |
  | Crash Demon | Stability Shield | 96% → 99.3% crash-free |
  | This Site | Poster-First Strike | Current site's LCP (measured in Phase 0) → new site's LCP (measured in Phase 8) |

- **Arena vs Campaign:** the Arena answers "what can he do?" and the Campaign answers "where and how?". A Boss card shows the problem type and one headline number. Each Boss card links "⚔️ Fought at: <Level> → see Tower", which scrolls to the Tower that holds the full story.
- **Mobile:** tap a Boss to play the fight. The before/after numbers also appear as plain text, so nothing is hidden behind the animation.
- **Tools (gear inventory):** a grid of Vite/Webpack, Git, CI/CD, Vitest/RTL, Node.js and so on, each with a rarity color.

### 4. Campaign: journey + fortress (one section)
The career story and the things built during it are told together, in one pinned section.
- The Avatar walks, and the camera follows, a path through **levels**, one per role, oldest to newest.
- At each level, that role's projects rise beside the path as **towers**, each topped with a metric banner. A "LEVEL CLEARED" stamp drops in and the role card shows role, company, dates and key wins.
- At the end, the camera pulls back and reveals the **Fortress**: every tower together, lit up.
- Click a tower to zoom in and open the project details (context, architecture decision, trade-offs, all metrics, stack). Towers are the one place with the full story, and Arena Bosses link here.

| Level | Role | Towers / wins |
|---|---|---|
| 1 | Co-Founder, Verstile (Jul 2020 – Sep 2021) | Outpost: 10+ websites delivered |
| 2 | WordPress Dev, MiBi Services (Aug – Oct 2020) | Outpost: MVP job portal |
| 3 | Frontend Intern, Coding Sheep (Oct – Dec 2022) | Outpost: reusable UI components |
| 4 | Frontend Intern, Bajaj Finserv Health (Jan – Jun 2023) | Outpost: payment screen ~2s → ~500ms |
| 5 | SDE I, Bajaj Finserv Health | Tower: Lab Booking Portal (Module Federation) |
| 6 | SDE II, Bajaj Finserv Health (Nov 2024 – now) | Towers: Campaign Management System, Claim Portal, Performance Optimization, Real-Time Analytics Dashboard |
| Side quest | Off the main path (personal / freelance) | Tower: Call Pulse — AI Analytics Platform |

- **Side quest:** Call Pulse stands as its own tower on a branch off the main path, not inside any Bajaj Finserv Health level.
- **Outposts** are small structures for early roles that have no enterprise project. Short levels with 1–2 wins.
- **Mobile:** a vertical timeline. Each level card has its towers as stacked project cards below it. Same stamp animation, no 3D camera path.

### 5. Beyond the Code: in pieces
- The mood goes quiet: dim warm light, slower motion, soft floating particles.
- Content shows up **piece by piece** as you scroll, like fragments of thought:
  - **What I do when I'm quiet:** long walks at Tamini Ghat, cooking Kadhai Paneer, making YouTube videos, indie music.
  - **What I think about:** the 4 values (Empathy First, Obsessive Craft, Always Learning, Collaboration), rewritten as short thoughts.
  - **What I love:** fun facts / "Ask me about…".
  - **A Sunday in Pune:** a small timeline of the day.
- Each piece floats in, settles, then fades as the next one arrives.
- **"Currently…" shelf (interactive):**
  - 📖 **Reading:** clicking the book opens it and shows a *Crime and Punishment* quote. Each click shows the next one. Stamped "Read in Pune, Maharashtra · 🕐 local time".
  - 🎵 **Listening:** clicking the vinyl spins it, slides out a compact Spotify embed (80 px) below it, and calls `togglePlay()` through the Spotify iFrame API. If the browser blocks playback, the visible embed takes one more tap. Visitors who aren't logged in hear a 30-second preview.
- Beyond the Code owns all personal content (hobbies, values, reading, music, Pune life). Nothing personal is repeated in About or the Letterbox.

### 6. Letterbox: contact
- The form is styled as a letter on paper, starting with "Dear Adarsh," and ending with "— Yours, [name]".
- Fields stay the same (name, email, subject, message), with the same Web3Forms submission and the same success, error and rate-limit states.
- Clickable subject chips: *"How did you build this site?"*, *"Let's work together"*, *"Just saying hi"*.
- On submit, the letter folds into an envelope, drops into a 3D letterbox, and the flag goes up. That's the success animation.
- "Find me on" social links stay.
- One line: "📍 Pune, Maharashtra · 🕐 live local time".
- The Letterbox is contact only. The "Currently…" shelf moved to Beyond the Code.

### 7. Footer
- The full footer is removed. Only a single line stays: **"Made with ❤️ by Adarsh"**.

### Navbar
- Same bar and theme toggle. **The toggle changes only the HTML** (text, cards, letter paper, navbar). 3D scenes keep their own fixed dark lighting, framed like screens. Anchor links are updated to About, Arena, Campaign, Beyond and Letterbox.
- The Blog link stays a route link, and the Blog page itself is not changed.

---

## Tech

| Package | Purpose |
|---|---|
| `three`, `@react-three/fiber@8`, `@react-three/drei@9` | 3D core (v8/v9 because the project is on React 18) |
| `gsap` + `ScrollTrigger` | Pinned, scroll-driven timelines (hero rotation, Campaign path and tower build) |
| `lenis` (already installed) | Smooth scroll, synced with ScrollTrigger |
| `framer-motion` (already installed) | DOM animation (cards, pieces, letter fold) |
| `@react-three/postprocessing` | Glow/bloom, desktop only |
| `gltf-transform` (CLI, dev only) | Compress models (Draco/Meshopt, KTX2 textures) |

**Architecture**
- One fixed full-screen `<Canvas>` behind the DOM, with each section drawn through its own drei `<View>` tied to that section's DOM box. The page uses a single WebGL context, and the text stays real HTML, which keeps SEO, accessibility and the form working.
- Each section's 3D scene is lazy-loaded (`React.lazy` + `Suspense`) when it gets close to the viewport.

**Loading strategy: poster first, then 3D**
- The Hero renders instantly as HTML text plus a **poster image**: a pre-rendered WebP still of the Avatar at the desk, about 60 KB. LCP is the text or the poster, never the 3D.
- The 3D code and the Avatar GLB load **after first paint, during idle time**, then crossfade over the poster.
- **Low-end detection** (few CPU cores, `Save-Data`, or a slow connection via `navigator.connection`) keeps the poster, and the whole site runs in 2D mode.
- Once loaded, the Arena and Campaign reuse the same GLB, so nothing downloads twice.
- No blocking loader screen. It replaces the earlier `useProgress` loader idea.

**Guardrails**
- `prefers-reduced-motion`, or no WebGL support: static images plus the 2D layout.
- Mobile: lower device pixel ratio, no post-processing, simpler scenes.
- Asset budget: under 3 MB of 3D models in total, under 1 MB for the hero.
- Photos converted from PNG to WebP/AVIF (about 2.3 MB → about 300 KB).
- Follow CLAUDE.md: Tailwind utilities only, no custom CSS files.

**Cleanup**
- Delete `Testimonials.tsx`. It isn't rendered and it holds placeholder data.

---

## Phases

Each phase is one commit, reviewed on the dev server (`npm run dev`) before moving to the next.

| # | Phase | Output |
|---|---|---|
| 0 | Assets | Source the free Avatar + Mixamo animations and prop models, optimize photos, pick 8–10 Dostoevsky quotes, get the Spotify track ID, render the Hero poster, measure the current site's LCP (the "before" for the This Site Boss) |
| 1 | Foundation | Install packages, shared canvas + `View` system, Lenis + ScrollTrigger sync, poster-first loading, low-end detection, 2D fallback |
| 2 | Hero | Scroll-driven 3D model, intro, socials, mobile layout |
| 3 | About | Intro card + Human Behind the Screen + "What I'm working on" |
| 4 | Arena | Fighter select, stats, strengths/weaknesses, arsenal, tools (biggest phase) |
| 5 | Campaign | Level path, towers rising per role, final Fortress reveal, project detail panel |
| 6 | Beyond the Code | Pieces revealed on scroll, interactive "Currently…" shelf |
| 7 | Letterbox | Letter form, envelope animation, one-line footer |
| 8 | Polish | Mobile pass, accessibility (keyboard access to 3D interactions), Lighthouse 85+ on mobile, SEO meta, Vercel preview |

**Rough effort:** 4–6 working sessions. The Arena and the Campaign take the most time.

---

## Decisions made by default

The user chose to take the recommended option on everything still open. Items marked ⚠️ are guesses based on repo data, and need a quick check before that phase ships.

| Topic | Decision |
|---|---|
| Music | Spotify iFrame API. Clicking the vinyl opens a compact embed and calls `togglePlay()`. The track is looked up in Phase 0 |
| Loading ADR | Written: `docs/adr/0001-poster-first-3d-loading.md` |
| ⚠️ "What I'm working on" | Draft: *"Scaling the Campaign Management System at Bajaj Finserv Health, and levelling up my weakest stat: moving toward test-first with Vitest + RTL."* It ties in with the Testing 60 Weakness |
| ⚠️ SDE I start date | Assumed **Jul 2023** (after the intern role ends in Jun 2023). `Journey.tsx` gets fixed during the Campaign phase |
| Beyond the Code pieces | Each piece is an HTML card that animates in and out, over a light 3D particle background. No heavy per-piece 3D models |
| Letterbox 3D | Only the letterbox and envelope are 3D, rendered after submit. The form itself stays plain HTML, so it is accessible and works in 2D mode |
| Navbar anchors | `#about`, `#arena`, `#campaign`, `#beyond`, `#letterbox`. The old `#journey`, `#work`, `#human`, `#connect` are removed |
| Accessibility | Every 3D interaction (Boss fights, Towers, Currently Shelf) has a keyboard-focusable HTML button, and all its data is readable as text. `prefers-reduced-motion` turns off pins and camera paths |
| Testimonials | `Testimonials.tsx` is deleted (not rendered, placeholder data) |
| Dostoevsky quotes | 8–10 quotes from the Garnett translation of *Crime and Punishment*, picked in Phase 0 |
