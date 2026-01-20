# From Nope to Web

![Editorial Codex](https://img.shields.io/badge/Aesthetic-Editorial_Codex-b91c1c?style=flat-square)
![Next.js 15](https://img.shields.io/badge/Next.js-15-000000?style=flat-square)
![Convex](https://img.shields.io/badge/Convex-Backend-ed7c30?style=flat-square)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6c47ff?style=flat-square)
![Tailwind 4](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square)

A sophisticated, bilingual educational platform designed to take students from zero knowledge ("Nope") to full-stack web developers ("Web"). Built with a focus on premium aesthetics ("Editorial Codex"), high performance, and deep interactivity.

## 📖 Philosophy & Design

**From Nope to Web** isn't just a course; it's an experience. We reject the "generic SaaS" look in favor of a **Editorial Codex** aesthetic—combining the readability of a high-end magazine with the utility of technical documentation.

- **Typography**: _Instrument Serif_ for headlines, _Space Mono_ for code and data.
- **Palette**: Warm cream (`#FAF8F5`) and rich charcoal (`#1C1917`) with Vermillion accents.
- **Interaction**: Fluid animations powered by Framer Motion.

## 🛠️ Tech Stack

This project is built on the [T3 Stack](https://create.t3.gg/) principles but evolved for 2026 standards:

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server Components)
- **Backend & Database**: [Convex](https://convex.dev/) (Real-time, TypeScript-first)
- **Authentication**: [Clerk](https://clerk.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/) (Full RTL/LTR support for Arabic & English)
- **Content**: MDX/Markdown with GFM (GitHub Flavored Markdown) support via `react-markdown` & `remark-gfm`.
- **AI**: Integrated AI Tutor powered by Cerebras GLM-4.7.

## ✨ Key Features

- **Bilingual Experience**: Seamless switching between English (LTR) and Arabic (RTL) with localized UI and content.
- **Rich Content Rendering**: Custom Markdown renderer supporting tables, task lists, and syntax highlighting.
- **Real-time Dashboard**: Track progress, viewed lessons, and upcoming modules.
- **Content Syncing**: Automated scripts to sync local Markdown files (`Course material/`) with the Convex database.
- **Interactive Tutor**: AI-powered assistant context-aware of the current lesson.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/kamkmgamer/from-nope-to-web.git
    cd from-nope-to-web
    ```

2.  **Install dependencies**

    ```bash
    pnpm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file based on `.env.example`:

    ```bash
    cp .env.example .env.local
    ```

    Populate it with your keys:
    - `CONVEX_DEPLOYMENT`: Your Convex project URL
    - `NEXT_PUBLIC_CONVEX_URL`: Your public Convex URL
    - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk key
    - `CLERK_SECRET_KEY`: Clerk secret

4.  **Start Development Server**
    ```bash
    pnpm dev
    ```
    This command runs both the Next.js app (on port 3000) and the Convex dev backend.

### Content Management

Course content lives in the `Course material/` directory. To sync changes to the database:

```bash
# Sync files to seedData.ts and push to Convex
pnpm content:refresh
```

## 📂 Project Structure

```
├── .clerk/             # Clerk auth config
├── convex/             # Backend functions & schema
│   ├── auth.config.ts  # Auth setup
│   ├── courses.ts      # API endpoints
│   ├── schema.ts       # Database schema
│   └── seedData.ts     # Generated content seed
├── Course material/    # Source of truth for lessons (Markdown)
├── messages/           # i18n JSON strings (en.json, ar.json)
├── scripts/            # content-sync utilities
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # UI components (Atomic design)
│   ├── lib/            # Utilities
│   └── styles/         # Global styles & Tailwind
└── public/             # Static assets
```

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

### Core Documentation
- **[API Documentation](docs/api-documentation.md)** - Complete API reference for Convex functions and Next.js routes
- **[Component Library](docs/component-library.md)** - UI components with usage examples and props documentation
- **[Deployment Guide](docs/deployment-guide.md)** - Development workflow and deployment instructions
- **[Testing Guide](docs/testing-guide.md)** - Testing strategies, tools, and best practices
- **[Internationalization Guide](docs/internationalization-guide.md)** - i18n setup and bilingual development
- **[Troubleshooting & FAQ](docs/troubleshooting-faq.md)** - Common issues and solutions

### Architecture & Design
- **[Architecture Design](docs/architecture-design-document.md)** - High-level system architecture
- **[Database Schema](docs/database-schema.md)** - Data models and relationships
- **[Frontend Guidelines](docs/frontend-guidelines.md)** - UI/UX patterns and standards
- **[Implementation Plan](docs/implementation-plan.md)** - Development roadmap and milestones

### Requirements & Planning
- **[Product Requirements](docs/product-requirements-document.md)** - Feature specifications and user stories
- **[Software Requirements](docs/software-requirements-specification.md)** - Technical requirements and constraints

## 🤝 Contributing

1.  Fork the project
2.  Create your feature branch (`git checkout -b feat/amazing-feature`)
3.  Commit your changes (`git commit -m 'feat: add amazing feature'`)
4.  Push to the branch (`git push origin feat/amazing-feature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
