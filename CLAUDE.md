# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # ESLint
npx tsc --noEmit # Type check (no test runner configured yet)
```

## Architecture

**Next.js App Router** project with TypeScript and TailwindCSS 4.

### Key Structure
- `app/` — App Router pages and layouts
  - `(auth)/login` and `(auth)/register` — auth route group (pages exist, logic not yet implemented)
  - `layout.tsx` — root layout with Geist fonts
  - `globals.css` — TailwindCSS 4 + shadcn theme variables (OKLch color space, CSS custom properties for light/dark mode)
- `components/ui/` — shadcn components (Radix Nova style, neutral base, CSS variables)
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)

### Path Aliases
`@/*` maps to the project root.

### shadcn Configuration
`components.json` configures shadcn with RSC enabled, Lucide icons, and aliases for `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`.

### CI/CD
- CI runs on the `develop` branch: install → lint → type check → build
- Deploy triggers on `master`: build → Vercel (deployment step is commented out, requires `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` secrets)

### Current State
Early-stage project. Auth pages are scaffolded but empty. No database, ORM, or auth library is integrated yet.
