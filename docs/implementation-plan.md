# Implementation Plan

This document outlines the step-by-step execution plan for the "From Nope To Web" educational platform.

## Phase 1: Scaffolding & Configuration (Day 1-2)

- [x] **Initialize Project**: Setup Next.js 15+ with App Router.
  - [x] Configure TypeScript (Strict Mode).
  - [x] Configure Tailwind CSS v4.
  - [x] Install shadcn/ui machinery.
- [x] **Internationalization Setup**:
  - [x] Install `next-intl` (package installed).
  - [x] Configure middleware for locale detection (`/en`, `/ar`).
  - [x] Create base dictionary files (en.json, ar.json).
  - [x] Test RTL switching (layout flipping) - verified working.
- [x] **Database & Backend Sync**:
  - [x] Setup Convex (Database & Backend).
  - [x] Initialize Convex project.
  - [x] Define `users` table schema in `convex/schema.ts`.
  - [x] Setup Convex React ClientProvider.
- [x] **Authentication**:
  - [x] Integrate Clerk (conditional wrapper implemented).
  - [x] Setup placeholder sign-in/sign-up pages (styled).
  - [ ] Setup protected routes (pending Clerk key configuration).

## Phase 2: Core UI & Design System (Day 3-4)

- [x] **Design System Implementation**:
  - [x] Define colors (CSS variables for dark/light mode) - Premium electric cyan/violet palette.
  - [x] Create Typography setup (Inter for English, IBM Plex Sans Arabic for Arabic).
  - [x] Build key layout components: `Navbar`, `Sidebar`, `Footer`.
  - [x] Create glass effects, glow utilities, and gradient components.
- [x] **Marketing Pages**:
  - [x] **Landing Page**: Hero section, Features, Courses preview, CTA section.
    - _Implemented: Editorial Codex aesthetic, serif + mono typography, vermillion accents._
  - [x] **About Page**: Hero, Story, Values, Timeline, Creator sections.
    - _Implemented: Full page with animated sections, bilingual support._
- [x] **Dashboard Layout**:
  - [x] Create the authenticated user shell with collapsible sidebar.
  - [x] Sidebar navigation with icons (Overview, My Courses, Progress, AI Tutor, Settings).
  - [x] Mobile-responsive slide-out menu.

## Phase 3: Course Engine (Day 5-8)

- [x] **Content Modeling**:
  - [x] Define schema for `courses`, `modules`, `lessons`.
  - [x] Create seed script to populate initial content.
- [x] **Course Viewer UI**:
  - [x] Sidebar for module navigation.
  - [x] Main content area for markdown rendering.
  - [x] "Next Lesson" / "Previous Lesson" navigation logic.
- [ ] **Progress Tracking**:
  - [x] Backend API to mark lesson as complete.
  - [ ] Visual progress bars on Dashboard and Course Viewer.

## Phase 4: Interactive Coding (Day 9-12)

- [ ] **Code Editor Component**:
  - [ ] Integrate Monaco Editor or similar (e.g., `@monaco-editor/react`).
  - [ ] Add theme switching support.
- [ ] **Sandpack Integration**:
  - [ ] Setup `Sandpack` for live React examples.
  - [ ] Create "Challenge" component (instructions left, code right, preview bottom).

## Phase 5: AI Integration (Day 13-15)

- [ ] **Cerebras Setup**:
  - [ ] Obtain API keys.
  - [ ] Create server-side route handler for chat.
- [ ] **Chat UI**:
  - [ ] Create floating chat widget or side-panel.
  - [ ] Implement streaming responses.
  - [ ] Add "context injection" (send current lesson content to AI system prompt).

## Phase 6: Polish & Launch (Day 16+)

- [x] **SEO**: Add metadata (title, description, keywords, OpenGraph) - Initial setup complete.
- [ ] **Performance Audit**: Check Lighthouse scores.
- [ ] **Quality Assurance**: Test all user flows in both English and Arabic.
- [ ] **Deployment**: Final deploy to Vercel production.

---

## Current Status

**Last Updated:** 2026-01-14

### Completed Components

| Component        | Location                                              | Description                                                |
| ---------------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| Design System    | `src/styles/globals.css`                              | Editorial Codex - warm cream, charcoal, vermillion accents |
| Navbar           | `src/components/layout/Navbar.tsx`                    | Animated, scroll-responsive with mobile menu               |
| Footer           | `src/components/layout/Footer.tsx`                    | Full footer with links and social icons                    |
| Hero Section     | `src/components/features/landing/HeroSection.tsx`     | Animated hero with code preview                            |
| Features Section | `src/components/features/landing/FeaturesSection.tsx` | 4 feature cards with number indicators                     |
| Courses Section  | `src/components/features/landing/CoursesSection.tsx`  | 4 course cards with bilingual titles                       |
| CTA Section      | `src/components/features/landing/CTASection.tsx`      | Conversion-focused call to action                          |
| Landing Page     | `src/app/page.tsx`                                    | Assembled marketing page                                   |
| Dashboard Layout | `src/app/dashboard/layout.tsx`                        | Collapsible sidebar, mobile responsive                     |
| Dashboard Page   | `src/app/dashboard/page.tsx`                          | Stats, courses, AI tutor CTA                               |
| Sign In Page     | `src/app/sign-in/[[...sign-in]]/page.tsx`             | Placeholder auth page                                      |
| Sign Up Page     | `src/app/sign-up/[[...sign-up]]/page.tsx`             | Placeholder auth page                                      |
| About Page       | `src/app/[locale]/about/page.tsx`                     | Full about page with Timeline, Values, Creator sections    |

### Next Steps

### Next Steps

1. **Course Content Expansion** (Current Focus)
   - [ ] Update `convex/seed.ts` with full curriculum (HTML to T3 Stack).
   - [ ] Create `src/app/[locale]/courses/page.tsx` (Course Catalog).
   - [ ] Create `src/app/[locale]/courses/[courseSlug]/page.tsx` (Course Overview).
   - [ ] Create `src/app/[locale]/courses/[courseSlug]/[lessonSlug]/page.tsx` (Lesson Viewer).
2. Configure Clerk API keys in `.env` (Done)
3. Implement code editor with Sandpack
