# Implementation Plan

This document outlines the step-by-step execution plan for the "From Nope To Web" educational platform.

## Phase 1: scaffolding & Configuration (Day 1-2)

- [ ] **Initialize Project**: Setup Next.js 14+ with App Router.
  - [ ] Configure TypeScript (Strict Mode).
  - [ ] Configure Tailwind CSS.
  - [ ] Install shadcn/ui machinery.
- [ ] **Internationalization Setup**:
  - [ ] Install `next-intl`.
  - [ ] Configure middleware for locale detection (`/en`, `/ar`).
  - [ ] Create base dictionary files.
  - [ ] Test RTL switching (layout flipping).
- [ ] **Database & Backend Sync**:
  - [ ] Setup Convex (Database & Backend).
  - [ ] Initialize Convex project.
  - [ ] Define `users` table schema in `convex/schema.ts`.
  - [ ] Setup Convex React ClientProvider.
- [ ] **Authentication**:
  - [ ] Integrate Clerk.
  - [ ] Setup protected routes.
  - [ ] Create specific sign-in/sign-up pages (styled).

## Phase 2: Core UI & Design System (Day 3-4)

- [ ] **Design System Implementation**:
  - [ ] Define colors (CSS variables for dark/light mode).
  - [ ] Create Typography components (localized fonts).
  - [ ] Build key layout components: `Navbar`, `Sidebar`, `Footer`.
- [ ] **Marketing Pages**:
  - [ ] **Landing Page**: Hero section, Features, Curriculum preview.
    - _Focus: High-end aesthetics, gradients, animations._
  - [ ] **About Page**.
- [ ] **Dashboard Layout**:
  - [ ] Create the authenticated user shell.
  - [ ] Sidebar navigation with active states.

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

- [ ] **SEO**: Add metadata, sitemaps, open graph images.
- [ ] **Performance Audit**: Check Lighthouse scores.
- [ ] **Quality Assurance**: Test all user flows in both English and Arabic.
- [ ] **Deployment**: Final deploy to Vercel production.
