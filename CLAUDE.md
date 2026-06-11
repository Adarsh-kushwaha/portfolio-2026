# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick Start

**Development server:**
```bash
npm run dev
# Server runs at http://localhost:8080
```

**Build for production:**
```bash
npm run build
```

**Linting:**
```bash
npm run lint
```

**Testing:**
```bash
npm run test          # Run tests once
npm run test:watch   # Watch mode
```

## Architecture Overview

### Stack
- **Framework:** React 18 with TypeScript
- **Build:** Vite 5 with SWC
- **Routing:** React Router v6
- **Data Fetching:** React Query (TanStack Query)
- **UI Component Library:** shadcn/ui (Radix UI + Tailwind CSS)
- **Styling:** Tailwind CSS 3.4 with custom config
- **Forms:** React Hook Form + Zod validation
- **Testing:** Vitest with React Testing Library
- **Linting:** ESLint 9 with TypeScript support

### Directory Structure

```
src/
├── pages/               # Route-level pages (Index, Blog, NotFound)
├── components/
│   ├── ui/             # shadcn/ui components (from Radix UI)
│   ├── portfolio/      # Custom portfolio-specific components
│   └── NavLink.tsx     # Navigation link wrapper
├── hooks/
│   ├── use-mobile.tsx           # Mobile viewport detection
│   ├── use-toast.ts            # Toast notification hook
│   ├── use-toast.tsx           # Toast UI integration
│   └── use-medium-blogs.ts     # Medium blog data fetching
├── lib/
│   └── utils.ts        # Utility helpers (clsx/cn merger)
├── assets/             # Static images and files
├── App.tsx             # Root with routing and providers
├── main.tsx            # Entry point
└── index.css          # Global Tailwind styles
```

### Key Patterns

**Route Definition:** Routes are defined in `App.tsx` using React Router v6. New routes must be added before the catch-all `"*"` route.

**Component Structure:** 
- shadcn/ui components live in `src/components/ui/` and are imported via the `@/components/ui` alias
- Portfolio-specific components live in `src/components/portfolio/`
- Use the `cn()` utility from `@/lib/utils` to merge Tailwind classes

**Data Fetching:** 
- Uses React Query for caching, synchronization, and background updates
- Custom hook `useMediumBlogs` in `src/hooks/use-medium-blogs.ts` fetches blog posts
- Queries are configured in `App.tsx` with a `QueryClient` instance

**Forms:** 
- Use React Hook Form for form state management
- Zod schemas for runtime validation
- shadcn/ui form wrapper components for consistency

**Styling:** 
- Tailwind CSS with CSS variables for theming (dark mode active by default in HTML)
- Base color is slate; CSS variables configured in `tailwind.config.ts`
- Don't add custom CSS — use Tailwind utilities or extend the config

### Environment Variables

Create a `.env` file (see `.env.example`):
```
VITE_WEB3FORMS_ACCESS_KEY=your_access_key_here
```

Access in code via `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY`.

## Common Tasks

**Add a new page:**
1. Create file in `src/pages/MyPage.tsx`
2. Add route in `App.tsx` before the `"*"` catch-all
3. Export as default component

**Add a new component:**
1. Create in `src/components/portfolio/` for custom logic, or use shadcn/ui for UI components
2. Import shadcn components via `@/components/ui` alias
3. Style with Tailwind; extend config if needed

**Add a custom hook:**
1. Create in `src/hooks/useMyHook.ts` (or `.tsx`)
2. Export as named export
3. Use `useQuery` from React Query for async operations

**Add shadcn/ui components:**
```bash
npx shadcn-ui@latest add button  # Adds to src/components/ui/
```

## Notes

- TypeScript strict mode is partially relaxed (`noImplicitAny: false`, `strictNullChecks: false`) — consider tightening as codebase matures
- ESLint disables `@typescript-eslint/no-unused-vars` to allow temporary experimental code
- Component tagger runs in development mode to label components for design system collaboration
- Vercel deployment configured via `vercel.json`
