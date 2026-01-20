# Internationalization Guide

This comprehensive guide covers the internationalization (i18n) setup and best practices for the From Nope to Web platform, which supports English (LTR) and Arabic (RTL) languages.

## Table of Contents

- [Overview](#overview)
- [Setup and Configuration](#setup-and-configuration)
- [Language Files Structure](#language-files-structure)
- [Implementation Patterns](#implementation-patterns)
- [RTL/LTR Support](#rtlltr-support)
- [Content Management](#content-management)
- [Best Practices](#best-practices)
- [Testing](#testing)
- [Performance Considerations](#performance-considerations)

## Overview

The From Nope to Web platform is designed as a truly bilingual educational platform, treating both English and Arabic as first-class languages. The internationalization system handles:

- **Route-based language switching** (`/en/...`, `/ar/...`)
- **Automatic text direction** (LTR for English, RTL for Arabic)
- **Localized content** for all UI elements and course materials
- **Cultural adaptation** for dates, numbers, and formatting
- **SEO optimization** for both languages

### Supported Languages

| Language | Code | Direction | Status |
|----------|------|-----------|---------|
| English | `en` | LTR | Primary |
| Arabic | `ar` | RTL | Primary |

## Setup and Configuration

### Next.js Configuration

```typescript
// next.config.js
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

module.exports = withNextIntl(nextConfig);
```

### i18n Configuration

```typescript
// src/i18n.ts
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/courses': {
      en: '/courses',
      ar: '/الدورات'
    },
    '/dashboard': {
      en: '/dashboard',
      ar: '/لوحة-التحكم'
    }
  }
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
```

### Middleware Setup

```typescript
// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
```

### Request Configuration

```typescript
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'UTC',
    now: new Date(),
  };
});
```

## Language Files Structure

### File Organization

```
messages/
├── en.json          # English translations
├── ar.json          # Arabic translations
└── common/          # Shared translations (if needed)
    ├── navigation.json
    ├── errors.json
    └── forms.json
```

### Translation Key Structure

The translation files follow a hierarchical structure:

```json
{
  "namespace": {
    "component": {
      "element": "Translation text",
      "withParams": "Hello {name}",
      "pluralization": {
        "zero": "No items",
        "one": "1 item",
        "other": "{count} items"
      }
    }
  }
}
```

### Complete Translation Structure

Based on the actual translation files, here's the complete structure:

```json
{
  "navigation": {
    "home": "Home",
    "features": "Features",
    "roadmap": "Roadmap",
    "about": "About",
    "getStarted": "Get Started"
  },
  "hero": {
    "label": "Bilingual Web Development Education",
    "titlePrefix": "From",
    "titleNope": "Nope",
    "titleMiddle": "to",
    "titleHighlight": "Web Developer",
    "subtitle": "A structured path from complete beginner to confident full-stack developer. Learn React, Next.js, and T3 stack.",
    "english": "English",
    "arabic": "العربية",
    "ctaPrimary": "Start Learning",
    "ctaSecondary": "View Roadmap"
  },
  "dashboard": {
    "sidebar": {
      "overview": "Overview",
      "courses": "Courses",
      "tutor": "AI Tutor",
      "settings": "Settings"
    },
    "courses": {
      "title": "My Courses",
      "subtitle": "Track your progress and continue learning",
      "inProgress": "In Progress",
      "notStarted": "Not Started",
      "completed": "Completed",
      "lessons": "lessons",
      "continue": "Continue",
      "start": "Start",
      "review": "Review",
      "progressLabel": "{progress}% complete"
    }
  }
}
```

## Implementation Patterns

### Using Translations in Components

```typescript
// Basic usage
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations('dashboard.courses');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  );
}
```

### Dynamic Translations with Parameters

```typescript
// With parameters
function ProgressIndicator({ progress }) {
  const t = useTranslations('dashboard.courses');
  
  return (
    <span>{t('progressLabel', { progress: 75 })}</span>
  );
}

// Output: "75% complete" (English) or "75% مكتمل" (Arabic)
```

### Pluralization

```typescript
// Plural forms
function ItemCount({ count }) {
  const t = useTranslations('common.items');
  
  return (
    <span>{t('pluralization', { count })}</span>
  );
}

// English: "1 item", "2 items", "No items"
// Arabic: "عنصر واحد", "عنصران", "العناصر"
```

### Language-Aware Content

```typescript
// Bilingual content selection
import { useLocale } from 'next-intl';

function CourseCard({ course }) {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  const title = isRTL ? course.titleAr : course.titleEn;
  const description = isRTL ? course.descriptionAr : course.descriptionEn;
  
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
```

### Navigation with Internationalization

```typescript
// Internationalized navigation
import { Link } from '@/i18n/navigation';

function Navigation() {
  return (
    <nav>
      <Link href="/courses">Courses</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
```

## RTL/LTR Support

### CSS Direction Handling

The platform uses Tailwind CSS with logical properties for RTL/LTR support:

```css
/* Logical properties instead of directional ones */
.element {
  /* Instead of margin-left */
  margin-inline-start: 1rem;
  
  /* Instead of padding-right */
  padding-inline-end: 2rem;
  
  /* Instead of border-left */
  border-inline-start: 1px solid;
  
  /* Instead of text-align: left */
  text-align: start;
}
```

### Tailwind RTL Classes

```typescript
// Tailwind's RTL modifier
<div className="ms-4 me-2">  // margin-start: 1rem, margin-end: 0.5rem
  <span className="text-start">Start-aligned text</span>
  <div className="border-s-2">Start border</div>
```

### Conditional Styling

```typescript
// Component-level RTL handling
function LocalizedComponent() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  return (
    <div className={cn(
      "flex items-center gap-4",
      isRTL && "flex-row-reverse"
    )}>
      <Icon className={cn("size-4", isRTL && "rotate-180")} />
      <Text />
    </div>
  );
}
```

### Icon Direction

```typescript
// Icon rotation for RTL
function ArrowIcon() {
  const locale = useLocale();
  const isRTL = locale === 'ar';
  
  return (
    <ArrowRight className={cn(
      "size-4 transition-transform",
      isRTL && "rotate-180"
    )} />
  );
}
```

## Content Management

### Course Content Structure

Course materials support bilingual content:

```typescript
// Lesson content structure
interface Lesson {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;  // Markdown content
  contentAr: string;  // Arabic Markdown content
  videoUrl?: string;
  estimatedMinutes?: number;
}
```

### Markdown Content

```markdown
---
title: "Introduction to React"
titleAr: "مقدمة في ريأكت"
estimatedMinutes: 45
---

# Introduction to React

React is a JavaScript library for building user interfaces...

# مقدمة في ريأكت

ريأكت هي مكتبة جافاسكريبت لبناء واجهات المستخدم...
```

### Content Syncing

The content sync process handles bilingual content:

```typescript
// scripts/sync-content.mjs
function processLesson(lessonPath) {
  const content = fs.readFileSync(lessonPath, 'utf8');
  const frontmatter = matter(content);
  
  return {
    slug: path.basename(lessonPath, '.md'),
    titleEn: frontmatter.data.title,
    titleAr: frontmatter.data.titleAr,
    contentEn: frontmatter.content,
    contentAr: extractArabicContent(frontmatter.content),
  };
}
```

### Database Schema

```typescript
// Convex schema for bilingual content
lessons: defineTable({
  moduleId: v.id("modules"),
  slug: v.string(),
  titleEn: v.string(),
  titleAr: v.string(),
  contentEn: v.string(),
  contentAr: v.string(),
  videoUrl: v.optional(v.string()),
  estimatedMinutes: v.optional(v.number()),
  isPublished: v.boolean(),
})
```

## Best Practices

### Translation Guidelines

1. **Consistent Terminology**: Use the same terms across all content
2. **Cultural Adaptation**: Consider cultural context, not just literal translation
3. **UI Constraints**: Account for text expansion/contraction in different languages
4. **Technical Terms**: Maintain consistency for technical terms
5. **User Testing**: Test with native speakers of both languages

### Code Organization

```typescript
// Organize translations by feature
const translations = {
  // Navigation
  'nav.home': 'Home',
  'nav.courses': 'Courses',
  
  // Dashboard
  'dashboard.title': 'Dashboard',
  'dashboard.courses.title': 'My Courses',
  
  // Forms
  'form.submit': 'Submit',
  'form.cancel': 'Cancel',
};
```

### Performance Optimization

```typescript
// Lazy load translations
const loadTranslations = async (locale: string) => {
  const translations = await import(`../messages/${locale}.json`);
  return translations.default;
};

// Cache translations
const translationCache = new Map<string, any>();
```

### Error Handling

```typescript
// Fallback for missing translations
function safeTranslate(key: string, fallback?: string) {
  try {
    return t(key);
  } catch (error) {
    console.warn(`Missing translation: ${key}`);
    return fallback || key;
  }
}
```

### SEO Optimization

```typescript
// Internationalized metadata
export async function generateMetadata({ params }) {
  const locale = params.locale;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/courses`,
      languages: {
        'en': '/en/courses',
        'ar': '/ar/courses'
      }
    }
  };
}
```

## Testing

### Unit Testing

```typescript
// Test internationalization components
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

const renderWithIntl = (component, locale = 'en') => {
  const messages = require(`../messages/${locale}.json`);
  
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {component}
    </NextIntlClientProvider>
  );
};

test('renders correct translation', () => {
  renderWithIntl(<MyComponent />, 'en');
  expect(screen.getByText('Courses')).toBeInTheDocument();
  
  renderWithIntl(<MyComponent />, 'ar');
  expect(screen.getByText('الدورات')).toBeInTheDocument();
});
```

### RTL Testing

```typescript
// Test RTL layout
test('applies correct direction', () => {
  renderWithIntl(<MyComponent />, 'ar');
  
  const container = screen.getByTestId('container');
  expect(container).toHaveAttribute('dir', 'rtl');
});
```

### Visual Testing

```typescript
// Storybook with i18n
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    locale: 'en',
  },
};

export const English = {
  args: {
    children: 'Click me',
  },
};

export const Arabic = {
  args: {
    children: 'اضغط هنا',
  },
  parameters: {
    locale: 'ar',
  },
};
```

## Performance Considerations

### Bundle Optimization

```typescript
// Code split translations
const EnglishMessages = () => import('../messages/en.json');
const ArabicMessages = () => import('../messages/ar.json');

// Dynamic loading based on locale
const loadMessages = (locale: string) => {
  switch (locale) {
    case 'en': return EnglishMessages();
    case 'ar': return ArabicMessages();
    default: return EnglishMessages();
  }
};
```

### Caching Strategy

```typescript
// Cache translations in production
const translationCache = new Map<string, any>();

export async function getMessages(locale: string) {
  if (translationCache.has(locale)) {
    return translationCache.get(locale);
  }
  
  const messages = await import(`../messages/${locale}.json`);
  translationCache.set(locale, messages.default);
  
  return messages.default;
}
```

### Preloading

```typescript
// Preload critical translations
useEffect(() => {
  const preloadTranslations = async () => {
    const currentLocale = locale;
    const otherLocale = currentLocale === 'en' ? 'ar' : 'en';
    
    // Preload other language for faster switching
    import(`../messages/${otherLocale}.json`);
  };
  
  preloadTranslations();
}, [locale]);
```

## Advanced Features

### Language Detection

```typescript
// Browser language detection
function detectBrowserLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language || navigator.languages?.[0];
  const shortLang = browserLang?.split('-')[0];
  
  return ['en', 'ar'].includes(shortLang) ? shortLang : 'en';
}
```

### URL Localization

```typescript
// Localized URLs
const localizedUrls = {
  '/courses': {
    en: '/courses',
    ar: '/الدورات'
  },
  '/dashboard': {
    en: '/dashboard',
    ar: '/لوحة-التحكم'
  }
};

function getLocalizedUrl(path: string, locale: string): string {
  return localizedUrls[path]?.[locale] || path;
}
```

### Date and Number Formatting

```typescript
// Localized formatting
import { formatDate, formatNumber } from 'next-intl';

function formatLocalDate(date: Date, locale: string) {
  return formatDate(date, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }, { locale });
}

function formatLocalNumber(number: number, locale: string) {
  return formatNumber(number, {
    style: 'decimal',
    maximumFractionDigits: 2,
  }, { locale });
}
```

This internationalization guide ensures that the From Nope to Web platform provides a truly bilingual experience, treating both English and Arabic as first-class languages with proper RTL/LTR support and cultural adaptation.
