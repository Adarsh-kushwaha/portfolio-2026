# Spec: 3D Interactive Portfolio (home page)

Labels: `ready-for-agent`
Related: `plan.md`, `CONTEXT.md` (glossary), `docs/adr/0001-poster-first-3d-loading.md`

## Problem Statement

Adarsh's portfolio home page is a conventional stack of 2D sections. It doesn't stand out to the people it is meant for: hiring managers at product companies and good startups, evaluating him for SDE II roles. It also has structural problems:

- The same content repeats across sections. Projects appear in both Journey and Work. Cooking, books, music and Pune each appear in two or three places.
- The Hero has no hiring signal. Its subtitle is personality copy with no numbers.
- The Hero shows an "Open for opportunities" badge, which his own positioning rules forbid.
- Skill levels are almost all "Expert/Advanced", so they read as flat and unconvincing.

He wants a memorable, game-flavoured 3D site that still lets a recruiter skimming for 30 seconds see the SDE II signals, and that stays fast on mid-range phones.

## Solution

A redesigned home page with a **Game Wrapper** around real **Payload**: every game element carries real architecture decisions and before/after metrics. One **Avatar** runs through the site. The Blog page is unchanged.

Page flow:
1. **Hero:** positioning label "SDE II · Frontend Systems · Pune", a subtitle full of metrics, socials, and the Avatar at a desk. The Avatar stands and turns as you scroll.
2. **About:** "The Engineer Behind the Pixels" intro card with the portrait, and **Human Behind the Screen** (casual photo, 2 lines, "What I'm working on").
3. **Arena:** a fighting-game character screen with six **Stats**, strengths and **Weaknesses** taken from the Stats, an **Arsenal** of **Moves**, a **Tools** inventory, and **Boss** fights. In a Boss fight, a real problem's health bar drains from its before number to its after number.
4. **Campaign:** the Avatar walks a path of **Levels** (roles, oldest to newest). **Towers** (projects) and **Outposts** (early-role wins) rise along the path, with a **Side Quest** (Call Pulse) off it, ending at the full **Fortress**.
5. **Beyond the Code:** a quiet mood where personal content appears in pieces. It includes the interactive **Currently Shelf**: the book shows *Crime and Punishment* quotes, and the vinyl plays the song through Spotify.
6. **Letterbox:** the contact form styled as a letter. Same fields and same Web3Forms submission. On success, an envelope drops into the letterbox.
7. A one-line footer: "Made with ❤️ by Adarsh".

The Hero is a poster image first. The 3D loads during idle time after first paint. Low-end devices, reduced-motion users and browsers without WebGL get a complete 2D site.

## User Stories

### Recruiter / hiring manager
1. As a recruiter, I want the Hero to state "SDE II · Frontend Systems · Pune", so that I know his level and focus instantly.
2. As a recruiter, I want the Hero subtitle to contain real scale numbers (1.25L+ API calls/month, 200+ form variants, Lighthouse 60 → 95), so that I can judge his impact in seconds.
3. As a recruiter, I want the Resume download and "See My Work" buttons in the Hero, so that I can act without scrolling.
4. As a recruiter, I want every social link (GitHub, LinkedIn, X, Instagram, Email) in the Hero, so that I can check his profiles right away.
5. As a recruiter, I want the Hero text to appear before any 3D loads, so that I'm never stuck looking at a spinner.
6. As a recruiter, I want each Boss card to show a problem and its before/after number, so that I see measurable impact without playing anything.
7. As a recruiter, I want each Boss card to link to the Tower where the problem was solved, so that I can read the full story in context.
8. As a recruiter, I want each Tower to show context, the architecture decision, trade-offs, all metrics and the stack, so that I can judge his technical judgement.
9. As a recruiter, I want the Campaign to show which role each project was built in, so that I can see his growth from SDE I to SDE II.
10. As a recruiter, I want side work (Call Pulse) clearly separated from employer work, so that the levels are accurate.
11. As a recruiter, I want a clickable level bar in the Campaign, so that I can jump to the latest role or the Fortress.
12. As a recruiter, I want a "Skip ↓" button on every pinned section, so that scroll-locking never traps me.
13. As a recruiter, I want navbar links to About, Arena, Campaign, Beyond and Letterbox, so that I can go straight to what I care about.
14. As a recruiter, I want honest Weaknesses taken from real low Stats, so that the profile reads as credible and self-aware.
15. As a recruiter, I want Stats that have a real spread (e.g. Performance 95, Backend 55), so that the numbers mean something.
16. As a recruiter, I want the "This Site" Boss to show this site's real LCP before and after, so that I can see he practices what he claims.
17. As a recruiter, I want the site to stay quick when I run Lighthouse on it, so that the performance claims hold up.

### Visitor experience
18. As a visitor, I want the Avatar to stand up from the desk and turn as I scroll away from the Hero, so that the page feels alive and connected.
19. As a visitor, I want the same Avatar in the Hero, Arena and Campaign, so that the site tells one story about one person.
20. As a visitor, I want to pick a Boss and watch the Avatar use a Move on it, so that exploring skills feels like a game.
21. As a visitor, I want a Move card to show when a Move is used, so that I learn what the technique is.
22. As a visitor, I want to browse all 30 skills as Arsenal and Tools items with level badges, so that nothing from the old skills list is lost.
23. As a visitor, I want Towers to rise as the Avatar reaches each Level, so that the career reads as progress.
24. As a visitor, I want a "LEVEL CLEARED" stamp as each Level completes, so that milestones feel rewarding.
25. As a visitor, I want the camera to pull back at the end of the Campaign to show the whole Fortress, so that I see everything he built at once.
26. As a visitor, I want to click a Tower to zoom in and open its details, so that I can go deeper on one project.
27. As a visitor, I want Beyond the Code to change mood (dim warm light, slower motion), so that it feels different from the work sections.
28. As a visitor, I want personal pieces (quiet-time hobbies, thoughts and values, fun facts, a Sunday in Pune) to appear one after another, so that I get to know him gradually.
29. As a visitor, I want to click the book on the Currently Shelf to see a *Crime and Punishment* quote, and get a new quote on each click, so that the shelf is playful.
30. As a visitor, I want each quote stamped "Read in Pune, Maharashtra" with the local time, so that it feels personal.
31. As a visitor, I want to click the vinyl to see it spin and the song start in a compact Spotify player, so that I can hear what he's listening to.
32. As a visitor, I want the Spotify player to stay visible if my browser blocks autoplay, so that one more tap still plays the song.
33. As a visitor, I want personal content to appear only in Beyond the Code, so that I don't read the same hobby three times.
34. As a visitor, I want Human Behind the Screen to show what he's working on right now, so that I get a current snapshot.
35. As a visitor, I want the portrait and the casual photo presented as tilting frames, so that the photos fit the 3D feel.
36. As a visitor, I want the theme toggle to switch the page between light and dark, so that I can read comfortably.
37. As a visitor, I want the 3D scenes to keep their own lighting whatever the theme, so that they always look intended.

### Letterbox (contact)
38. As a visitor, I want the contact form styled as a letter ("Dear Adarsh," … "— Yours, [name]"), so that writing to him feels personal.
39. As a visitor, I want subject chips ("How did you build this site?", "Let's work together", "Just saying hi"), so that starting a message is easy.
40. As a visitor, I want to see the letter fold into an envelope and drop into a letterbox with its flag raised after I send, so that I know it went through.
41. As a visitor, I want clear error and rate-limit messages, so that I know when to retry.
42. As a visitor, I want name, email, subject and message fields that are validated, so that my message reaches him properly.
43. As a visitor, I want his social links and "📍 Pune · 🕐 local time" beside the form, so that I have other ways to reach him.

### Mobile, low-end and accessibility
44. As a mobile visitor, I want the Avatar above the Hero text, smaller and rotating slowly, so that the Hero fits my screen.
45. As a mobile visitor, I want social buttons sized for tapping, so that I don't mis-tap.
46. As a mobile visitor, I want the Campaign as a vertical timeline of Level cards with stacked Tower cards, so that it works without a camera path.
47. As a mobile visitor, I want to tap a Boss to play its fight and also read its numbers as text, so that nothing is hidden behind animation.
48. As a visitor on a low-end device or Save-Data, I want the site to stay in 2D with the poster image, so that it doesn't freeze my phone or use my data.
49. As a visitor whose browser has no WebGL, I want a complete 2D version with all content, so that I miss nothing.
50. As a visitor with reduced motion on, I want pins, camera paths and heavy animation turned off, so that the site is comfortable to use.
51. As a keyboard user, I want every 3D interaction (Bosses, Towers, book, vinyl) available as a focusable button, so that I can use everything without a mouse.
52. As a screen-reader user, I want all Payload (Stats, Boss metrics, Tower details, role details) available as real text, so that the content is accessible.
53. As a search engine, I want the content rendered as real HTML, so that the page is indexable.

### Owner (Adarsh)
54. As the owner, I want the Blog page and its route unchanged, so that existing posts and links keep working.
55. As the owner, I want to replace the placeholder Avatar with my own photo-based avatar by swapping one model file, so that I can personalize it later without rework.
56. As the owner, I want all section content (roles, projects, Bosses, Stats, quotes, hobbies) kept as plain data, so that I can update it without touching the scenes.
57. As the owner, I want the unused Testimonials placeholder removed, so that no fake data ships.
58. As the owner, I want the SDE I start date corrected so that it no longer overlaps the internship, so that my timeline is accurate.

## Implementation Decisions

### Architecture
- **One shared WebGL canvas.** A single full-screen canvas sits behind the DOM, and each section draws its scene through a drei `View` tied to that section's DOM box. The page uses one WebGL context, and all text stays real HTML.
- **Libraries:**
  - `three` with `@react-three/fiber` v8 and `@react-three/drei` v9. These versions are pinned because the project is on React 18.
  - `gsap` + `ScrollTrigger` for pinned timelines, synced with the existing Lenis dependency.
  - `framer-motion` for DOM animation.
  - `@react-three/postprocessing` on desktop only.
- **Poster first, 3D on idle** (ADR 0001):
  - The Hero renders HTML plus a pre-rendered WebP poster.
  - The 3D bundle and the Avatar GLB load after first paint, during idle time, and crossfade over the poster.
  - There is no blocking loader.
- **Render mode.** One app-level decision, `"3d" | "2d"`, made once from: WebGL support, `prefers-reduced-motion`, `Save-Data`, connection speed, and CPU core count. Every section reads this mode and renders either its 3D scene plus HTML overlay, or its 2D layout. The 2D layout must show the same content as the 3D one.
- **Scenes load lazily.** Each section's scene is lazy-loaded when it gets close to the viewport. Arena and Campaign reuse the Avatar GLB already loaded for the Hero.
- **Scroll budget:**
  - Hero: short pin (~1 screen).
  - Campaign: pinned, ~4 screens total.
  - Beyond the Code: light pin (~2 screens).
  - About, Arena and Letterbox: not pinned.
  - Every pin has a Skip control, and the Campaign has a clickable level bar.

### Content modules
Content is plain typed data, kept separate from rendering. It is migrated from the current section components.
- **Levels:** role, company, period, type, wins, and the Towers/Outposts belonging to that Level. The SDE I period is corrected to start Jul 2023 (⚠️ confirm with owner).
- **Towers:** a project with context, architecture decision, trade-offs, metrics, stack, the Level it belongs to (or Side Quest), and a banner metric.
- **Bosses:** name, Move name, before and after values, a headline, and a link to a Tower (optional for the "This Site" Boss).
  - Bundle Bloat: 2.5 MB → 600 KB
  - Slow LCP: 5.3 s → 1.2 s
  - Form Chaos: N codebases → 1
  - Monolith: independent deploys, 75% faster
  - Crash Demon: 96% → 99.3% crash-free
  - This Site: before value measured in Phase 0, after value measured in Phase 8
- **Stats:** Architecture 90, Performance 95, Leadership 80, State & Data 85, Testing 60, Backend 55. Strengths are the top 3; Weaknesses are the bottom 2, each with an honest note.
- **Arsenal / Tools:** all 30 existing skills, classified as either technique (Arsenal) or gear (Tools), each with its level badge.
- **Beyond pieces:** quiet-time hobbies, thoughts and values, fun facts, a Sunday in Pune.
- **Currently Shelf:** 8–10 quotes from the Garnett translation of *Crime and Punishment*, and the Spotify track ID.

### Sections
- **Hero:**
  - Label "SDE II · Frontend Systems · Pune" and "📍 Pune · 🕐 local time".
  - No "Open for opportunities" badge.
  - Subtitle: "I architect frontend systems that scale: 1.25L+ API calls a month, 200+ form variants from one schema, Lighthouse 60 → 95. I also mentor the engineers who build them with me."
  - A "☕ fueled by filter coffee" tag, the CTAs, and 5 social links.
- **About:**
  - The engineer card with the portrait and 4 highlight chips.
  - Human Behind the Screen with the casual photo, 2 lines, and "What I'm working on" (draft ⚠️: "Scaling the Campaign Management System at Bajaj Finserv Health, and levelling up my weakest stat: moving toward test-first with Vitest + RTL.").
  - No hobbies or values here.
- **Arena:**
  - Driven by clicks, not scroll.
  - Picking a Boss plays an Avatar Move animation and drains the Boss health bar from its before value to its after value.
  - Each Boss card links to its Tower by scrolling to it.
- **Campaign:**
  - The Avatar walks a path of Levels, oldest to newest: Verstile, MiBi, Coding Sheep, BFH Intern, SDE I, SDE II.
  - Towers rise at their Level, Outposts mark early roles, and Call Pulse is a Side Quest branch.
  - The Campaign ends with the Fortress reveal.
  - Clicking a Tower opens its detail panel.
- **Beyond the Code:**
  - HTML piece cards over a light 3D particle background.
  - Book click: shows the next quote, stamped "Read in Pune, Maharashtra" with live local time.
  - Vinyl click: the vinyl spins, a compact Spotify embed appears, and the page calls `togglePlay()` through the Spotify iFrame API. The embed stays visible in case the browser blocks playback.
- **Letterbox:**
  - Keeps the current Web3Forms submission, including its success, error and rate-limit states.
  - Styled as a letter, with subject chips.
  - Only the envelope and letterbox are 3D, shown after a successful submit.
- **Footer:** one line only.
- **Navbar:** anchors `#about`, `#arena`, `#campaign`, `#beyond`, `#letterbox`, plus the Blog route. The theme toggle changes only the HTML; 3D scenes keep fixed dark lighting.
- **Removed:** the Testimonials placeholder component. The old Journey, Work and TheHuman sections are replaced by Campaign and Beyond the Code.

### Assets
- **Avatar:** one GLB, under 1.5 MB after compression, from a free source (Quaternius CC0 or Mixamo). Mixamo animations: sit/type, stand-up, idle, fight stance, attack, walk. Bone and animation names stay stable so a photo-based avatar can replace it later.
- **Props:** CC0 props from Poly Pizza, Kenney or Quaternius. Total 3D budget under 3 MB.
- **Photos:** portrait and casual photos converted from PNG to WebP/AVIF.
- **Credits:** any credit a license requires appears in the page's credit line.
- **Styling:** Tailwind utilities only, no custom CSS files (per CLAUDE.md). Global theme tokens are unchanged, so the Blog page is unaffected.

## Testing Decisions

- **One seam: the home page rendered in 2D render mode** (Vitest + React Testing Library in jsdom, where there is no WebGL, so the 2D path is the natural test path). Tests check what a visitor or recruiter can see and do, never scene internals, animation timing or component structure.
- **What makes a good test here:** it asserts visible text, accessible roles and names, links and their targets, and the results of user actions (click, type, submit). It must keep passing if the 3D implementation is rewritten.
- **Behaviour covered through this seam:**
  - The Hero shows the positioning label, the metric subtitle, 5 social links and the Resume link, and does **not** show "Open for opportunities".
  - Every Boss shows its before and after values as text and links to the correct Tower.
  - Every Tower is reachable and shows its metrics. Call Pulse is marked as a Side Quest.
  - Levels appear oldest to newest, with non-overlapping periods.
  - The Stats show six values, and the Weaknesses are the two lowest.
  - All 30 skills appear in the Arsenal or Tools with level badges.
  - Book button: each click shows a different quote, with the Pune stamp.
  - Vinyl button: the Spotify embed appears. The Spotify API is stubbed at the network/global boundary.
  - Letterbox:
    - A subject chip fills in the subject.
    - Validation errors appear for invalid input.
    - A successful submit (`fetch` stubbed) shows the success state.
    - A 429 response shows the rate-limit state.
    - Other failures show the error state.
  - Navbar anchors match the section IDs, and the Blog link points to the Blog route.
  - Personal content (hobbies, quotes, music) appears only in Beyond the Code.
- **Render-mode selection is tested through the same seam.** Stub `matchMedia` for reduced motion, `navigator.connection`, `hardwareConcurrency`, and WebGL context creation, then assert that the page renders the 2D layout.
- **Prior art:** none. The repo has no tests yet. The `test` script exists, but Vitest isn't configured with a jsdom environment or a jest-dom setup file, so adding that config is part of this work.
- **Not unit-tested:** 3D scenes, camera paths and animation timing. These are checked manually on the dev server each phase. The Phase 8 polish covers Lighthouse mobile 85+ and a keyboard walkthrough.

## Out of Scope

- The Blog page, its route, and the Medium data hook.
- Light-mode variants of the 3D scenes.
- Creating the photo-based avatar (the owner does this later with Meshy/Tripo + Mixamo; the site only has to accept the swap).
- Hosting copyrighted audio. Music is only a Spotify embed, with a 30-second preview for visitors who aren't logged in.
- Changing the Web3Forms backend or the form's fields.
- Global theme token changes.
- Testimonials.

## Further Notes

- Build phases (one commit each, reviewed on the dev server): 0 Assets → 1 Foundation → 2 Hero → 3 About → 4 Arena → 5 Campaign → 6 Beyond the Code → 7 Letterbox → 8 Polish. See `plan.md`.
- ⚠️ The owner must confirm two items before they ship: the "What I'm working on" draft line, and the SDE I start date (assumed Jul 2023).
- Use the glossary terms from `CONTEXT.md` everywhere: Game Wrapper, Payload, Avatar, Arena, Stat, Weakness, Arsenal, Move, Tools, Boss, Campaign, Level, Tower, Outpost, Side Quest, Fortress, Human Behind the Screen, Beyond the Code, Currently Shelf, Letterbox.
