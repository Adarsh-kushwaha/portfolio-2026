# CONTEXT.md

Portfolio positioning and domain language for Adarsh Kushwaha's SDE II portfolio.

## Terms & Concepts

### SDE II Profile
**Who we're positioning to:** Product-based companies + good startups. Not looking for "any role" — but for opportunities where engineering culture and ownership matter.

**Why this matters:** SDE II is mid-level ownership. Not "I can code features," but "I can architect systems, make trade-offs, and grow others."

### Core Positioning Pillars

**1. System Architecture (not Feature Shipping)**
- **Example:** Campaign Management System — chose Zustand over Redux because granular state subscriptions would explode complexity. Virtualized tables handle 100K+ records at 60fps.
- **What we show:** Architectural thinking (why we chose X, what breaks without it), not just implementation.

**2. Scale with Numbers**
- **Examples:** 1.25L+ API calls/month, 200+ form variants, 20K+ daily submissions, 10K+ monthly bookings.
- **What we show:** This isn't a side project. This is production scale. Real business impact.

**3. Measurable Impact**
- **Examples:** 76% bundle reduction, LCP 5.3s → 1.2s, Lighthouse 60 → 95, crash-free rate 96% → 99.3%, bug density -40%.
- **What we show:** Not "we optimized performance" but concrete before/after numbers that matter.

**4. People Leadership**
- **Example:** Mentored juniors, reduced team-wide bug density by 40%.
- **What we show:** SDE II grows others. Visible impact on team quality, not just personal output.

**5. Technical Judgment**
- **Example:** Schema-driven form framework enabling 200+ variants with single codebase (vs. N separate codebases).
- **What we show:** We make architectural choices that scale. We don't just code; we abstract wisely.

### What NOT to Say Directly
- No "Open for opportunities" badge or status in the Hero.
- "I'm looking for an SDE II role" — we show this through demonstrated complexity + ownership.
- "I'm open to remote work" — implied by "Pune-based" + context.
- "I want to grow" — shown through SDE I → SDE II trajectory + mentoring.

### Language Choices
- **"Architect"** not "build" (ownership mindset)
- **"System"** not "feature" (scope signal)
- **"Schema-driven"** not "dynamic forms" (technical depth)
- **"Module Federation"** not "splitting code" (architecture term)
- **Zustand over Redux** not "chose a library" (explains why, not just what)

## Game Theme Language

**Game Wrapper**:
The game-style presentation (arena, levels, fortress) around the portfolio content. It is decoration only, and never replaces the signal.
_Avoid_: Game mode (as the goal)

**Payload**:
The real hiring signal inside every game element: architecture decisions, scale numbers, before/after metrics. Every game element must carry one.
_Rule_: A recruiter skimming for 30 seconds must still see the SDE II signals without playing anything.

**Stat** (Arena):
One of six RPG attributes (Architecture, Performance, Leadership, State & Data, Testing, Backend) with a 0–100 value backed by evidence from real work.
_Avoid_: Skill category bars

**Weakness** (Arena):
An honest, real engineering trade-off, taken from the lowest Stats. At most one light joke across the whole list.
_Avoid_: Joke weaknesses as the main content

**Avatar**:
The single 3D character representing Adarsh across the whole site: at the desk in the Hero, the fighter in the Arena, the walker in the Campaign. It starts as a free placeholder and is later replaced by one made from his photo.
_Avoid_: Model, fighter, character (as separate things)

**Arsenal**:
Adarsh's techniques and skills (React, Zustand, Module Federation, performance work). Each one used in a fight is a Move.
_Avoid_: Weapons, skills list

**Move**:
One Arsenal technique used against a Boss, named in game style (e.g. Lighthouse Uppercut).

**Tools**:
Gear, not techniques: build, version control, CI and test tooling (Vite, Git, CI/CD, Vitest).
_Avoid_: Arsenal (for tooling)

**Boss**:
A real engineering problem Adarsh beat, shown as an enemy whose health bar is the before/after metric. It carries one headline number and links to the Tower where the fight happened; the full story lives only in the Tower.
_Avoid_: Enemy, bug (generic)

**Human Behind the Screen**:
The personal half of About: who Adarsh is right now (photo, 2 lines, what he's working on). No hobbies or values.

**Beyond the Code**:
The section that owns all personal content: hobbies, thoughts, values, a Sunday in Pune, and the Currently shelf. Revealed in pieces.
_Avoid_: The Human (ambiguous with Human Behind the Screen)

**Currently Shelf**:
The interactive "what I'm reading / listening to" objects inside Beyond the Code.

**Letterbox**:
The contact section, styled as a letter. Contact only.
_Avoid_: Contact form, Connect

**Campaign**:
The single section that tells the career story and shows what was built, as a path through Levels ending at the Fortress.
_Avoid_: Journey and Fortress as separate sections

**Level**:
One role in the Campaign, ordered oldest to newest. Each Level has one or more Towers or Outposts.

**Tower**:
One enterprise project, shown at the Level (role) where it was built. Carries a metric banner (its Payload).
_Avoid_: Project card (in the Campaign context)

**Outpost**:
A small structure for an early role with no enterprise project. It carries 1–2 wins.

**Side Quest**:
A Tower off the main Campaign path for work done outside any listed role (e.g. Call Pulse). It keeps the Levels accurate to what was built in each role.

**Fortress**:
All Towers seen together at the end of the Campaign: the sum of what was built.

## Portfolio Structure

### Hero
- Title: "SDE II · Frontend Systems · Pune"
- Subtitle mentions: "scalable frontend systems," "1.25L+ API calls/month," "mentoring teams," "optimization from bundle to Lighthouse"
- CTA: "See My Work" → scrolls to systems, not personal projects

### About
- Professional: Growth trajectory SDE I → SDE II, architectural thinking, measurable impact
- Personal: Pune-based, interested in companies where culture + learning matter
- Highlights: System Design, Mentorship, Shipping Culture (not "Design-first")

### Skills
- Organized by capability, not tools: State Management, Architecture, Performance
- Levels reflect actual depth: Zustand/React Query "Advanced," not "Intermediate"
- Added: GraphQL, Module Federation, Schema-Driven Forms (SDE II signals)

### Work (Featured Projects)
- **1. Campaign Management System** — Zustand choice, 1.25L+ calls/month, architectural thinking
- **2. Claim Portal (Schema-Driven Forms)** — Framework design, 200+ variants, single codebase
- **3. Performance Optimization** — Concrete numbers (76%, 5.3s → 1.2s, Lighthouse 60 → 95)
- **4. Real-Time Analytics Dashboard** — GraphQL optimization, 25% API reduction
- **5. Lab Booking (Microfrontend)** — Module Federation, 10K+ bookings, independent deploys
- **6. Call Pulse (AI Analytics)** — Full-stack thinking, 5K-8K daily recordings, 97% accuracy

### Journey (Timeline)
- Current role: "SDE II – Frontend" with specific achievements (Campaign System, Claim Portal, Performance, Mentorship)
- Previous role: "SDE I – Frontend" with ownership examples (Lab Booking, Security, Codebase Takeover)
- Emphasis on: What you architected, what trade-offs you made, what metrics improved

## Design Decisions

### Why These Projects (not personal projects)
Personal projects (NFTZone, PixBook) don't demonstrate SDE II thinking. They show you can code, not that you can architect systems at scale. Prioritizing enterprise work signals: "I'm ready for this level."

### Why Numbers Matter
"Built a campaign system" → hiring manager doesn't know scale. "1.25L+ calls/month" → hiring manager knows this is production, not CRUD.

### Why "Architecture" Over "UI"
SDE II isn't "I make beautiful things." It's "I make systems that scale." Zustand vs. Redux, Module Federation vs. monolith, schema-driven vs. hardcoded — these are architecture decisions, not design choices.

### Why No "Looking for SDE II" Banner
Hiring managers will infer your level from your work. Saying it looks unsure. Showing it looks confident.
