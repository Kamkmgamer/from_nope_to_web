# Troubleshooting & FAQ

This comprehensive guide covers common issues, troubleshooting steps, and frequently asked questions for the From Nope to Web platform.

## Table of Contents

- [Common Issues](#common-issues)
- [Development Environment](#development-environment)
- [Build & Deployment](#build--deployment)
- [Authentication](#authentication)
- [Database & Backend](#database--backend)
- [Internationalization](#internationalization)
- [Performance](#performance)
- [Content Management](#content-management)
- [Browser Compatibility](#browser-compatibility)
- [FAQ](#faq)

## Common Issues

### Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| **Page not loading** | Clear browser cache and reload |
| **Build fails** | Delete `.next` folder and `node_modules` |
| **Styles not applying** | Check Tailwind class names and restart dev server |
| **API errors** | Verify environment variables are set correctly |
| **Translations missing** | Check message files and restart dev server |

### Error Messages

#### `Module not found: Can't resolve 'next-intl'`

**Cause**: Missing or corrupted `next-intl` dependency.

**Solution**:
```bash
pnpm install next-intl
# Or reinstall all dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### `Error: Convex deployment not found`

**Cause**: Incorrect Convex deployment URL in environment variables.

**Solution**:
1. Check `.env.local` for `CONVEX_DEPLOYMENT`
2. Verify URL matches your Convex project
3. Run `npx convex deploy` to get correct URL

#### `TypeError: Cannot read properties of undefined (reading 'useTranslations')`

**Cause**: Missing `next-intl` provider or incorrect setup.

**Solution**:
1. Ensure `next-intl` is configured in `next.config.js`
2. Check middleware setup in `src/middleware.ts`
3. Verify `i18n.ts` configuration

## Development Environment

### Installation Issues

#### Node.js Version Compatibility

**Issue**: "Unsupported Node.js version" error.

**Solution**:
```bash
# Check current version
node --version

# Should be 20.0 or higher
# If not, install correct version
nvm install 20
nvm use 20
```

#### pnpm Installation Problems

**Issue**: "pnpm command not found" or installation failures.

**Solution**:
```bash
# Install pnpm globally
npm install -g pnpm

# Or use corepack (Node.js 16.10+)
corepack enable
corepack prepare pnpm@latest --activate
```

### Development Server Issues

#### Port Already in Use

**Issue**: "Port 3000 is already in use" error.

**Solution**:
```bash
# Find process using port
lsof -ti:3000

# Kill process
kill -9 $(lsof -ti:3000)

# Or use different port
pnpm dev --port 3001
```

#### Hot Reloading Not Working

**Issue**: Changes not reflecting in browser.

**Solution**:
1. Check if file is in `src/` directory
2. Verify file extension is correct (`.tsx`, `.ts`, `.js`)
3. Restart development server:
   ```bash
   pnpm dev
   ```
4. Clear browser cache

#### Convex Dev Server Issues

**Issue**: Convex functions not updating.

**Solution**:
```bash
# Restart Convex dev server
npx convex dev --once

# Clear Convex cache
rm -rf .convex
npx convex dev
```

### Environment Variables

#### Missing Environment Variables

**Issue**: Application crashes on startup due to missing env vars.

**Solution**:
1. Copy example file:
   ```bash
   cp .env.example .env.local
   ```
2. Fill in required variables:
   ```env
   CONVEX_DEPLOYMENT=https://your-project.convex.cloud
   NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
3. Restart development server

#### Environment Variables Not Loading

**Issue**: Environment variables showing as `undefined`.

**Solution**:
1. Ensure file is named `.env.local` (not `.env`)
2. Check for typos in variable names
3. Verify no spaces around `=` signs
4. Restart development server

## Build & Deployment

### Build Failures

#### TypeScript Compilation Errors

**Issue**: Build fails with TypeScript errors.

**Common Solutions**:
```bash
# Check TypeScript errors
pnpm typecheck

# Fix common issues:
# 1. Missing imports
import { Component } from 'react';

# 2. Incorrect types
interface Props {
  title: string;  // Not: title: String
}

# 3. Missing return types
const handleClick = (): void => {
  // function body
};
```

#### ESLint Errors

**Issue**: Build fails due to linting errors.

**Solution**:
```bash
# Auto-fix linting issues
pnpm lint:fix

# Common fixes:
# 1. Unused imports
import { useState, useEffect } from 'react';
// Remove unused: useEffect

# 2. Missing semicolons
const message = "hello"  // Add semicolon

# 3. Inconsistent quotes
const text = 'hello'  // Use consistent quotes
```

#### Memory Issues During Build

**Issue**: Build fails with "JavaScript heap out of memory".

**Solution**:
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm build

# Or in package.json
"scripts": {
  "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
}
```

### Deployment Issues

#### Vercel Deployment Failures

**Issue**: Deployment fails on Vercel.

**Common Solutions**:
1. **Environment Variables**: Ensure all required env vars are set in Vercel dashboard
2. **Build Command**: Verify build command is `pnpm build`
3. **Node Version**: Set Node.js version to 20.x in Vercel settings
4. **Dependencies**: Check `package.json` for correct dependencies

#### Convex Deployment Issues

**Issue**: Convex functions not deploying correctly.

**Solution**:
```bash
# Check deployment status
npx convex deployment status

# Redeploy
npx convex deploy

# Check logs
npx convex logs
```

#### CORS Issues

**Issue**: API calls blocked by CORS policy.

**Solution**:
```typescript
// In API routes
export async function GET(request: Request) {
  return new Response('Hello', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
```

## Authentication

### Clerk Setup Issues

#### Clerk Components Not Rendering

**Issue**: Authentication components not showing up.

**Solution**:
1. Verify environment variables:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```
2. Check Clerk configuration in `.clerk/` directory
3. Ensure components are wrapped with `<ClerkProvider>`
4. Restart development server

#### Sign-In/Sign-Up Not Working

**Issue**: Users cannot sign in or sign up.

**Troubleshooting**:
1. Check Clerk dashboard for application status
2. Verify allowed redirect URLs in Clerk settings
3. Check network connectivity
4. Review browser console for errors

#### Session Management Issues

**Issue**: User sessions not persisting.

**Solution**:
```typescript
// Ensure proper Clerk provider setup
import { ClerkProvider } from '@clerk/nextjs';

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
}
```

## Database & Backend

### Convex Issues

#### Database Connection Errors

**Issue**: Cannot connect to Convex database.

**Solution**:
1. Check `CONVEX_DEPLOYMENT` URL
2. Verify network connectivity
3. Check Convex service status
4. Restart Convex dev server

#### Schema Mismatch Errors

**Issue**: Schema validation errors.

**Solution**:
```bash
# Check current schema
npx convex dev --dry-run

# Reset database (development only)
npx convex dev --reset

# Deploy schema changes
npx convex deploy
```

#### Query Performance Issues

**Issue**: Slow database queries.

**Optimization Tips**:
```typescript
// Use indexes for frequently queried fields
export default defineSchema({
  users: defineTable({
    email: v.string(),
  })
    .index("by_email", ["email"]),  // Add index
  
  courses: defineTable({
    slug: v.string(),
  })
    .index("by_slug", ["slug"]),  // Add index
});
```

### Data Sync Issues

#### Content Not Syncing

**Issue**: Course content not appearing in database.

**Solution**:
```bash
# Check sync script
pnpm content:sync

# Verify content structure
ls -la "Course material/"

# Push to database
pnpm content:push

# Check Convex dashboard for data
```

#### Translation Sync Issues

**Issue**: Arabic content not displaying correctly.

**Solution**:
1. Check `messages/ar.json` for correct translations
2. Verify UTF-8 encoding in message files
3. Test with different browsers
4. Check font loading for Arabic characters

## Internationalization

### Language Switching Issues

#### Language Not Changing

**Issue**: Language switcher not working.

**Solution**:
1. Check `i18n.ts` configuration
2. Verify middleware setup
3. Ensure `useRouter` from `next-intl/navigation` is used
4. Check browser console for routing errors

#### RTL Layout Issues

**Issue**: Arabic text not displaying correctly.

**Solution**:
```css
/* Ensure proper RTL support */
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

/* Use logical properties */
.element {
  margin-inline-start: 1rem;  /* Instead of margin-left */
  padding-inline-end: 2rem;  /* Instead of padding-right */
}
```

#### Translation Keys Missing

**Issue**: Translation keys showing as raw text.

**Solution**:
1. Check `messages/en.json` and `messages/ar.json`
2. Verify key names match exactly
3. Restart development server
4. Check for nested key structure

## Performance

### Slow Page Loads

#### Bundle Size Issues

**Issue**: Large JavaScript bundle causing slow loads.

**Solution**:
```bash
# Analyze bundle size
pnpm build:analyze

# Optimize imports
import { Button } from '~/components/ui/button'  // Tree-shakable
// Instead of: import * as UI from '~/components/ui'

# Use dynamic imports for large components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>Loading...</div>
});
```

#### Image Optimization

**Issue**: Large images slowing down pages.

**Solution**:
```typescript
import Image from 'next/image';

// Use Next.js Image component
<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={false}  // Load above the fold images first
/>
```

### Memory Leaks

#### Component Memory Issues

**Issue**: Memory usage increasing over time.

**Solution**:
```typescript
// Clean up effects
useEffect(() => {
  const timer = setInterval(() => {
    // some operation
  }, 1000);

  return () => {
    clearInterval(timer);  // Cleanup
  };
}, []);

// Remove event listeners
useEffect(() => {
  const handleClick = () => console.log('clicked');
  window.addEventListener('click', handleClick);

  return () => {
    window.removeEventListener('click', handleClick);
  };
}, []);
```

## Content Management

### Markdown Issues

#### Content Not Rendering

**Issue**: Markdown content not displaying.

**Solution**:
1. Check file paths in `Course material/`
2. Verify Markdown syntax is valid
3. Check frontmatter format:
   ```markdown
   ---
   title: "Lesson Title"
   titleAr: "عنوان الدرس"
   estimatedMinutes: 45
   ---
   ```
4. Run content sync script

#### Code Blocks Not Highlighting

**Issue**: Code blocks not showing syntax highlighting.

**Solution**:
```markdown
```typescript
// Specify language for syntax highlighting
const example = "Hello World";
```

// Instead of:
```
const example = "Hello World";
```
```

### Asset Management

#### Images Not Loading

**Issue**: Course images not displaying.

**Solution**:
1. Check image paths in Markdown files
2. Verify images are in correct `assets/` folders
3. Use relative paths: `./assets/image.jpg`
4. Check file extensions and case sensitivity

## Browser Compatibility

### Safari Issues

#### CSS Grid/Flexbox Issues

**Issue**: Layout broken in Safari.

**Solution**:
```css
/* Add Safari-specific prefixes */
.container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
}
```

#### Font Loading Issues

**Issue**: Custom fonts not loading in Safari.

**Solution**:
```css
/* Ensure proper font loading */
@font-face {
  font-family: 'Custom Font';
  src: url('/fonts/font.woff2') format('woff2'),
       url('/fonts/font.woff') format('woff');
  font-display: swap;  /* Important for Safari */
}
```

### Mobile Browser Issues

#### Touch Events

**Issue**: Touch interactions not working on mobile.

**Solution**:
```typescript
// Add touch event support
const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
  e.preventDefault();
  // Handle interaction
};

<button
  onClick={handleClick}
  onTouchStart={handleClick}  // Add touch support
>
  Click me
</button>
```

## FAQ

### General Questions

#### Q: How do I add a new language?
A: Currently, the platform supports English and Arabic. To add a new language:
1. Add locale to `src/i18n.ts`
2. Create `messages/[locale].json`
3. Update middleware configuration
4. Add language switcher option
5. Test thoroughly

#### Q: How do I reset my development environment?
A: Run these commands:
```bash
# Clean all caches and dependencies
rm -rf .next node_modules .convex
rm pnpm-lock.yaml

# Reinstall dependencies
pnpm install

# Restart development servers
pnpm dev
```

#### Q: Why are my changes not reflecting?
A: Common causes:
- Development server not restarted
- Browser cache needs clearing
- File not in `src/` directory
- Incorrect file extension
- Syntax errors preventing compilation

### Development Questions

#### Q: How do I debug Convex functions?
A: Use Convex's built-in debugging:
```bash
# View logs
npx convex logs

# Run with debug mode
npx convex dev --debug

# Use console.log in functions
export const myFunction = mutation({
  handler: async (ctx, args) => {
    console.log("Debug info:", args);
    // function logic
  },
});
```

#### Q: How do I add a new page?
A: Follow these steps:
1. Create file in `src/app/[locale]/new-page/page.tsx`
2. Add to `i18n.ts` pathnames if needed
3. Add navigation link
4. Add translations to message files
5. Test both languages

#### Q: How do I update course content?
A: Update course content:
1. Edit files in `Course material/`
2. Run `pnpm content:sync`
3. Run `pnpm content:push`
4. Verify changes in Convex dashboard

### Technical Questions

#### Q: What's the difference between `useTranslations` and `getTranslations`?
A: 
- `useTranslations`: Client-side hook for components
- `getTranslations`: Server-side function for metadata and SSR

#### Q: How do I optimize for Core Web Vitals?
A: Key optimizations:
- Use Next.js Image component
- Implement code splitting
- Optimize fonts
- Reduce bundle size
- Use proper caching strategies

#### Q: How do I handle form validation with i18n?
A: Use internationalized validation messages:
```typescript
import { useTranslations } from 'next-intl';

const validateForm = (data: FormData) => {
  const t = useTranslations('validation');
  
  return {
    email: data.email ? '' : t('required'),
    password: data.password.length >= 8 ? '' : t('passwordTooShort'),
  };
};
```

### Deployment Questions

#### Q: How do I set up custom domain?
A: Custom domain setup:
1. In Vercel dashboard, go to Domain settings
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate propagation
5. Test domain resolution

#### Q: How do I monitor production errors?
A: Set up error monitoring:
1. Use Vercel Analytics for basic monitoring
2. Integrate Sentry for detailed error tracking
3. Monitor Convex logs for backend issues
4. Set up alerts for critical errors

### Troubleshooting Steps

When encountering issues, follow these steps:

1. **Check Console**: Look for JavaScript errors
2. **Verify Environment**: Ensure all env vars are set
3. **Restart Services**: Clear caches and restart
4. **Check Network**: Verify internet connectivity
5. **Review Recent Changes**: Identify what changed
6. **Isolate Issue**: Test in minimal environment
7. **Check Documentation**: Review relevant docs
8. **Ask for Help**: Contact support if needed

### Getting Help

If you're still stuck:

1. **Check Documentation**: Review all available docs
2. **Search Issues**: Look for similar problems
3. **Community**: Ask in community forums
4. **GitHub Issues**: Report bugs or feature requests
5. **Support**: Contact support team

**Contact Information**:
- Email: support@khalil.mageed.net
- GitHub: https://github.com/kamkmgamer/from-nope-to-web/issues
- Documentation: https://docs.from-nope-to-web.com

This troubleshooting guide should help resolve most common issues with the From Nope to Web platform.
