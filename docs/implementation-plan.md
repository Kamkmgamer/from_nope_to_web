# Implementation Plan

This document outlines the step-by-step execution plan for the "From Nope To Web" educational platform.

## Phase 1: Scaffolding & Configuration (Day 1-2)

- [x] **Initialize Project**: Setup Next.js 14+ with App Router.
  - [x] Configure TypeScript (Strict Mode).
  - [x] Configure Tailwind CSS v4.
  - [x] Install shadcn/ui machinery.
- [ ] **Internationalization Setup**:
  - [x] Install `next-intl` (package installed).
  - [ ] Configure middleware for locale detection (`/en`, `/ar`).
  - [ ] Create base dictionary files.
  - [ ] Test RTL switching (layout flipping).
- [ ] **Database & Backend Sync**:
  - [ ] Setup Convex (Database & Backend).
  - [ ] Initialize Convex project.
  - [ ] Define `users` table schema in `convex/schema.ts`.
  - [ ] Setup Convex React ClientProvider.
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
    - _Implemented: High-end aesthetics, animated gradients, staggered animations._
  - [ ] **About Page**.
- [x] **Dashboard Layout**:
  - [x] Create the authenticated user shell with collapsible sidebar.
  - [x] Sidebar navigation with icons (Overview, My Courses, Progress, AI Tutor, Settings).
  - [x] Mobile-responsive slide-out menu.

## Phase 3: Course Engine (Day 5-8)

- [ ] **Content Modeling**:
  - [ ] Define schema for `courses`, `modules`, `lessons`.
  - [ ] Create seed script to populate initial content.
- [ ] **Course Viewer UI**:
  - [ ] Sidebar for module navigation.
  - [ ] Main content area for MDX rendering.
  - [ ] "Next Lesson" / "Previous Lesson" navigation logic.
- [ ] **Progress Tracking**:
  - [ ] Backend API to mark lesson as complete.
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
| Design System    | `src/styles/globals.css`                              | Premium dark/light theme with electric cyan/violet palette |
| Navbar           | `src/components/layout/Navbar.tsx`                    | Animated, scroll-responsive with mobile menu               |
| Footer           | `src/components/layout/Footer.tsx`                    | Full footer with links and social icons                    |
| Hero Section     | `src/components/features/landing/HeroSection.tsx`     | Animated hero with code preview                            |
| Features Section | `src/components/features/landing/FeaturesSection.tsx` | 6 feature cards with icons                                 |
| Courses Section  | `src/components/features/landing/CoursesSection.tsx`  | 4 course cards with bilingual titles                       |
| CTA Section      | `src/components/features/landing/CTASection.tsx`      | Conversion-focused call to action                          |
| Landing Page     | `src/app/page.tsx`                                    | Assembled marketing page                                   |
| Dashboard Layout | `src/app/dashboard/layout.tsx`                        | Collapsible sidebar, mobile responsive                     |
| Dashboard Page   | `src/app/dashboard/page.tsx`                          | Stats, courses, AI tutor CTA                               |
| Sign In Page     | `src/app/sign-in/[[...sign-in]]/page.tsx`             | Placeholder auth page                                      |
| Sign Up Page     | `src/app/sign-up/[[...sign-up]]/page.tsx`             | Placeholder auth page                                      |

### Next Steps

1. Configure Clerk API keys in `.env`
2. Setup Convex backend
3. Implement i18n middleware and locale routing
4. Build course viewer components
