# Deployment and Development Workflow Guide

This guide covers the complete development workflow, from local setup to production deployment for the From Nope to Web platform.

## Table of Contents

- [Development Environment Setup](#development-environment-setup)
- [Local Development](#local-development)
- [Content Management](#content-management)
- [Testing](#testing)
- [Build Process](#build-process)
- [Deployment](#deployment)
- [Monitoring and Maintenance](#monitoring-and-maintenance)
- [CI/CD Pipeline](#cicd-pipeline)

## Development Environment Setup

### Prerequisites

- **Node.js**: Version 20.0 or higher
- **pnpm**: Recommended package manager (v10.26.2+)
- **Git**: For version control
- **VS Code**: Recommended IDE with extensions

### Required Accounts

1. **Convex**: Backend database and functions
2. **Clerk**: Authentication provider
3. **Vercel**: Hosting platform (production)
4. **GitHub**: Code repository

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kamkmgamer/from-nope-to-web.git
   cd from-nope-to-web
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment configuration**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables**
   Edit `.env.local` with your credentials:
   ```env
   # Convex
   CONVEX_DEPLOYMENT=https://your-convex-project.convex.cloud
   NEXT_PUBLIC_CONVEX_URL=https://your-convex-project.convex.cloud
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   
   # AI Service (Optional)
   OPENAI_API_KEY=sk-...
   ```

### IDE Setup

Install these VS Code extensions for optimal development:

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## Local Development

### Starting the Development Server

```bash
# Start both Next.js and Convex dev server
pnpm dev

# Or start individually
pnpm dev:next    # Next.js on port 3000
pnpm dev:convex  # Convex functions on port 3210
```

### Development Scripts

```bash
# Development
pnpm dev              # Start development servers
pnpm dev:turbo        # Start with Turbo (faster builds)

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix linting issues
pnpm format:check     # Check Prettier formatting
pnpm format:write     # Apply Prettier formatting
pnpm typecheck        # Run TypeScript checks
pnpm check            # Run all checks (lint + typecheck)

# Building
pnpm build            # Production build
pnpm preview          # Preview production build locally
```

### Database Management

```bash
# Convex development
npx convex dev        # Start Convex dev server
npx convex deploy      # Deploy to production Convex
npx convex dashboard   # Open Convex dashboard

# Content management
pnpm content:sync      # Sync Markdown files to seed data
pnpm content:push      # Push content to Convex database
pnpm content:refresh   # Sync and push content
```

### Hot Reloading

The development environment supports hot reloading for:
- **React Components**: Automatic UI updates
- **Tailwind CSS**: Instant style updates
- **Convex Functions**: Automatic backend recompilation
- **Content Changes**: Manual refresh required for Markdown content

## Content Management

### Course Content Structure

Course content is stored in the `Course material/` directory:

```
Course material/
├── course-1/
│   ├── module-1/
│   │   ├── lesson-1.md
│   │   ├── lesson-2.md
│   │   └── assets/
│   │       ├── image.png
│   │       └── diagram.svg
│   └── module-2/
└── course-2/
```

### Content Syncing Process

1. **Create/Edit Content**: Modify Markdown files in `Course material/`
2. **Sync to Seed Data**: Convert to TypeScript format
   ```bash
   pnpm content:sync
   ```
3. **Push to Database**: Update Convex with new content
   ```bash
   pnpm content:push
   ```

### Content Format

Each lesson follows this structure:

```markdown
---
title: "Lesson Title"
titleAr: "عنوان الدرس"
estimatedMinutes: 45
videoUrl: "https://example.com/video"
---

# Lesson Content

Content in GitHub Flavored Markdown format.
Supports tables, code blocks, and task lists.

## Arabic Content

المحتوى باللغة العربية يدعم هنا.
```

### Asset Management

- **Images**: Store in lesson-specific `assets/` folders
- **Videos**: Use external URLs (YouTube, Vimeo)
- **Diagrams**: SVG format preferred for scalability

## Testing

### Running Tests

```bash
# Unit tests
pnpm test

# Integration tests
pnpm test:integration

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

### Test Structure

```
src/
├── __tests__/
│   ├── components/
│   ├── pages/
│   └── utils/
├── e2e/
│   ├── auth.spec.ts
│   ├── courses.spec.ts
│   └── dashboard.spec.ts
```

### Testing Guidelines

1. **Unit Tests**: Test individual components and functions
2. **Integration Tests**: Test component interactions
3. **E2E Tests**: Test user workflows
4. **Accessibility Tests**: Verify WCAG compliance

## Build Process

### Production Build

```bash
# Full production build
pnpm build

# Build analysis
pnpm build:analyze    # Analyze bundle size
```

### Build Optimization

The build process includes:
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Remove unused code
- **Image Optimization**: Automatic image optimization
- **Font Optimization**: Subset fonts for performance
- **CSS Purging**: Remove unused Tailwind classes

### Environment-Specific Builds

```bash
# Development build (with debugging)
NODE_ENV=development pnpm build

# Production build (optimized)
NODE_ENV=production pnpm build

# Staging build
NODE_ENV=staging pnpm build
```

## Deployment

### Production Deployment (Vercel)

1. **Connect Repository**
   - Link GitHub repository to Vercel
   - Configure build settings

2. **Environment Variables**
   Set these in Vercel dashboard:
   ```
   CONVEX_DEPLOYMENT
   NEXT_PUBLIC_CONVEX_URL
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   CLERK_SECRET_KEY
   ```

3. **Deploy**
   ```bash
   # Automatic deployment on git push
   git push origin main
   
   # Manual deployment
   vercel --prod
   ```

### Convex Deployment

```bash
# Deploy to production
npx convex deploy

# Deploy with specific environment
npx convex deploy --env production

# Check deployment status
npx convex deployment status
```

### Preview Deployments

Vercel automatically creates preview deployments for:
- Pull requests
- Feature branches
- Direct commits to main branch

### Domain Configuration

1. **Custom Domain**: Configure in Vercel dashboard
2. **SSL Certificates**: Automatically managed by Vercel
3. **DNS Settings**: Update nameservers as needed

## Monitoring and Maintenance

### Application Monitoring

1. **Vercel Analytics**: Built-in performance monitoring
2. **Convex Dashboard**: Database and function monitoring
3. **Clerk Dashboard**: Authentication metrics
4. **Error Tracking**: Configure error reporting service

### Performance Monitoring

Key metrics to track:
- **Core Web Vitals**: LCP, FID, CLS
- **Bundle Size**: Monitor JavaScript bundle size
- **API Response Times**: Convex function performance
- **Database Queries**: Optimize slow queries

### Log Management

```bash
# View Convex logs
npx convex logs

# View deployment logs
vercel logs

# Local development logs
pnpm dev 2>&1 | tee dev.log
```

### Backup Strategy

1. **Database**: Convex provides automatic backups
2. **Content**: Git version control for course content
3. **Media**: CDN backup for static assets
4. **Configuration**: Environment variable backups

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run tests
        run: pnpm test
      
      - name: Run linting
        run: pnpm lint
      
      - name: Type check
        run: pnpm typecheck

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Deployment Stages

1. **Development**: Feature branches → Preview deployments
2. **Staging**: Main branch → Staging environment
3. **Production**: Manual approval → Production deployment

### Quality Gates

The pipeline enforces:
- **Test Coverage**: Minimum 80% coverage required
- **Linting**: No linting errors allowed
- **Type Safety**: No TypeScript errors
- **Bundle Size**: Alert on significant size increases

## Troubleshooting

### Common Issues

#### Build Failures

```bash
# Clear build cache
rm -rf .next
pnpm build

# Clear node modules
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Convex Issues

```bash
# Reset Convex development
npx convex dev --once

# Clear Convex cache
rm -rf .convex
npx convex dev
```

#### Environment Issues

```bash
# Verify environment variables
pnpm build:env-check

# Test environment setup
pnpm dev:env-test
```

### Performance Issues

1. **Slow Builds**: Enable Turbopack
2. **Large Bundle**: Analyze with `pnpm build:analyze`
3. **Slow API**: Check Convex function performance
4. **Memory Issues**: Increase Node.js memory limit

### Debugging Tools

```bash
# Next.js debugging
NODE_OPTIONS='--inspect' pnpm dev

# Convex debugging
npx convex dev --debug

# Bundle analysis
pnpm build:analyze
```

## Best Practices

### Development Workflow

1. **Feature Branches**: Create branches for new features
2. **Commit Messages**: Use conventional commit format
3. **Pull Requests**: Require code review
4. **Testing**: Write tests before deployment
5. **Documentation**: Update docs with changes

### Security Practices

1. **Environment Variables**: Never commit secrets
2. **Dependencies**: Regularly update packages
3. **Access Control**: Principle of least privilege
4. **Audit Logs**: Monitor access and changes
5. **Backups**: Regular backup verification

### Performance Optimization

1. **Code Splitting**: Lazy load non-critical components
2. **Image Optimization**: Use Next.js Image component
3. **Caching**: Implement appropriate caching strategies
4. **Monitoring**: Regular performance audits
5. **Bundle Analysis**: Monitor bundle size growth

This deployment guide ensures a smooth development experience and reliable production deployments for the From Nope to Web platform.
