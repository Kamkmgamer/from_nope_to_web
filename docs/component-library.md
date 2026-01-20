# Component Library Documentation

This document covers the component library used in the From Nope to Web platform. The library follows atomic design principles and is built with TypeScript, Tailwind CSS, and Framer Motion for animations.

## Table of Contents

- [Design System](#design-system)
- [UI Components](#ui-components)
- [Feature Components](#feature-components)
- [Dashboard Components](#dashboard-components)
- [Layout Components](#layout-components)
- [Usage Guidelines](#usage-guidelines)
- [Theming and Styling](#theming-and-styling)

## Design System

### Typography

The application uses a custom typography system:

- **Headlines**: Instrument Serif (`font-display`)
- **Body Text**: Inter (`font-sans`)
- **Code/Mono**: Space Mono (`font-mono`)
- **Arabic**: IBM Plex Sans Arabic

### Color Palette

- **Primary**: Vermillion accents
- **Background**: Warm cream (`#FAF8F5`)
- **Foreground**: Rich charcoal (`#1C1917`)
- **Muted**: Subtle gray variants

### Spacing

Uses Tailwind's default spacing scale with custom semantic classes:
- `label-mono`: Monospace text styling
- `tag`: Tag/styling for status indicators
- `card-editorial`: Editorial card styling

## UI Components

### Button

A versatile button component with multiple variants and sizes.

```typescript
import { Button } from "~/components/ui/button";

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Hover me</Button>
<Button variant="link">Learn more</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <Icon />
</Button>

// As child (for Link components)
<Button asChild>
  <Link href="/courses">View Courses</Link>
</Button>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"default"` | Button style variant |
| `size` | `"default" \| "sm" \| "lg" \| "icon" \| "icon-sm" \| "icon-lg"` | `"default"` | Button size |
| `asChild` | `boolean` | `false` | Render as child element (for Link) |
| `className` | `string` | - | Additional CSS classes |
| `...buttonProps` | `React.ComponentProps<"button">` | - | Standard button props |

#### Variants

- **default**: Primary button with background color
- **destructive**: Red button for destructive actions
- **outline**: Outlined button with hover effects
- **secondary**: Subtle secondary button
- **ghost**: Transparent button with hover background
- **link**: Styled as a link with underline

### Card

Flexible card container with header, content, and footer sections.

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Course Title</CardTitle>
    <CardDescription>Course description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Get Started</Button>
  </CardFooter>
</Card>
```

#### Components

- **Card**: Main container with border and shadow
- **CardHeader**: Header section with title and description
- **CardTitle**: Title typography
- **CardDescription**: Muted description text
- **CardContent**: Main content area with padding
- **CardFooter**: Footer section for actions

#### Props

All components accept standard `div` props plus `className` for custom styling.

## Feature Components

### CourseCard

Dashboard card displaying course information with progress tracking.

```typescript
import { CourseCard } from "~/components/dashboard/CourseCard";

<CourseCard 
  course={{
    _id: "courses_123",
    slug: "intro-to-react",
    titleEn: "Introduction to React",
    titleAr: "مقدمة في ريأكت",
    descriptionEn: "Learn React fundamentals",
    descriptionAr: "تعلم أساسيات ريأكت",
    progressPercentage: 65,
    completedLessons: 13,
    totalLessons: 20
  }}
/>
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `course` | `CourseWithProgress` | ✅ | Course object with progress data |
| `className` | `string` | ❌ | Additional CSS classes |

#### Features

- **Bilingual Support**: Automatically displays in current locale
- **Progress Tracking**: Shows completion percentage and lesson count
- **Status Indicators**: Visual tags for completed/in-progress/not started
- **Hover Effects**: Smooth elevation on hover
- **Responsive**: Adapts to different screen sizes

### LandingHero

Hero section for the landing page with call-to-action.

```typescript
import { LandingHero } from "~/components/features/landing/LandingHero";

<LandingHero 
  title="From Nope to Web"
  subtitle="Master web development from scratch"
  ctaText="Get Started"
  onCtaClick={() => router.push('/courses')}
/>
```

## Dashboard Components

### ProgressBar

Animated progress bar with customizable sizes and labels.

```typescript
import { ProgressBar } from "~/components/dashboard/ProgressBar";

// Basic usage
<ProgressBar value={75} />

// With label and custom size
<ProgressBar 
  value={60} 
  showLabel 
  size="lg"
  label="Course Progress"
/>

// Custom styling
<ProgressBar 
  value={90} 
  className="w-64"
  showLabel
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | ✅ | Progress value (0-100) |
| `showLabel` | `boolean` | `false` | Show percentage label |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Progress bar height |
| `className` | `string` | - | Additional CSS classes |
| `label` | `string` | - | Custom label text |

#### Features

- **Smooth Animation**: Uses Framer Motion for fluid animations
- **Accessibility**: Proper ARIA attributes for screen readers
- **Auto-clamping**: Values automatically clamped to 0-100 range
- **Responsive**: Adapts to container width

### StatCard

Dashboard card for displaying statistics and metrics.

```typescript
import { StatCard } from "~/components/dashboard/StatCard";

<StatCard
  title="Total Courses"
  value="12"
  change="+2 this month"
  trend="up"
  icon={<BookOpen />}
/>
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ✅ | Card title |
| `value` | `string \| number` | ✅ | Main value to display |
| `change` | `string` | ❌ | Change description |
| `trend` | `"up" \| "down" \| "neutral"` | ❌ | Trend indicator |
| `icon` | `React.ReactNode` | ❌ | Icon component |
| `className` | `string` | ❌ | Additional CSS classes |

### CircularProgress

Circular progress indicator for dashboard metrics.

```typescript
import { CircularProgress } from "~/components/dashboard/CircularProgress";

<CircularProgress
  value={85}
  size="lg"
  strokeWidth={8}
  showLabel
  label="Completion"
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | ✅ | Progress value (0-100) |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Circle size |
| `strokeWidth` | `number` | `4` | Stroke width |
| `showLabel` | `boolean` | `false` | Show percentage in center |
| `label` | `string` | - | Custom label text |
| `className` | `string` | - | Additional CSS classes |

## Layout Components

### Header

Main application header with navigation and user menu.

```typescript
import { Header } from "~/components/layout/Header";

<Header
  title="Dashboard"
  showBackButton
  onBackClick={() => router.back()}
  actions={[
    { icon: <Settings />, label: "Settings", onClick: () => {} }
  ]}
/>
```

### Sidebar

Navigation sidebar with menu items and user profile.

```typescript
import { Sidebar } from "~/components/layout/Sidebar";

<Sidebar
  items={[
    { href: "/dashboard", label: "Dashboard", icon: <Home /> },
    { href: "/courses", label: "Courses", icon: <BookOpen /> },
    { href: "/profile", label: "Profile", icon: <User /> }
  ]}
  currentPath="/dashboard"
/>
```

## Usage Guidelines

### Component Composition

Follow atomic design principles:

1. **Atoms**: Basic UI elements (Button, Input)
2. **Molecules**: Simple component combinations (SearchBox, CardHeader)
3. **Organisms**: Complex component sections (Header, Sidebar)
4. **Templates**: Page layouts
5. **Pages**: Complete page implementations

### Internationalization

All components should support bilingual content:

```typescript
// Use next-intl hooks
const locale = useLocale();
const t = useTranslations("componentNamespace");

// Handle RTL/LTR
const isRTL = locale === "ar";

// Conditional content
const title = isRTL ? course.titleAr : course.titleEn;
```

### Accessibility Guidelines

- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast ratios

### Performance Considerations

- Use `React.memo()` for expensive components
- Implement proper loading states
- Optimize images and assets
- Use code splitting for large components
- Leverage Next.js optimizations

## Theming and Styling

### CSS Variables

The application uses CSS custom properties for theming:

```css
:root {
  --background: #faf8f5;
  --foreground: #1c1917;
  --primary: #dc2626;
  --secondary: #f5f5f4;
  --muted: #78716c;
  --accent: #ea580c;
}
```

### Tailwind Configuration

Custom Tailwind configuration extends the default theme:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ["Instrument Serif", "serif"],
        mono: ["Space Mono", "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
};
```

### Component Variants

Use `class-variance-authority` for component variants:

```typescript
const buttonVariants = cva(
  "base-styles",
  {
    variants: {
      variant: {
        default: "default-styles",
        destructive: "destructive-styles",
      },
      size: {
        sm: "small-styles",
        md: "medium-styles",
        lg: "large-styles",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);
```

## Animation Guidelines

### Framer Motion

Use Framer Motion for consistent animations:

```typescript
// Page transitions
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>

// Hover effects
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}

// Stagger animations
variants={{
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}}
```

### Animation Principles

- **Purposeful**: Animations should enhance UX, not distract
- **Consistent**: Use similar easing and durations
- **Performant**: Use `transform` and `opacity` for smooth 60fps
- **Accessible**: Respect `prefers-reduced-motion`

## Testing Components

### Unit Testing

```typescript
import { render, screen } from "@testing-library/react";
import { Button } from "~/components/ui/button";

describe("Button", () => {
  it("renders with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("applies variant classes", () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive");
  });
});
```

### Visual Testing

Use Storybook for component documentation and visual testing:

```typescript
// stories/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "~/components/ui/button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};
```

## Best Practices

### Code Organization

```
src/components/
├── ui/              # Basic UI components (Button, Input, Card)
├── layout/          # Layout components (Header, Sidebar)
├── features/        # Feature-specific components
├── dashboard/       # Dashboard-specific components
└── shared/          # Shared utilities and hooks
```

### Naming Conventions

- Use PascalCase for component names
- Use descriptive names that reflect purpose
- Group related components in directories
- Export components from `index.ts` files

### Props Design

- Use TypeScript interfaces for type safety
- Provide sensible defaults
- Make optional props truly optional
- Use discriminated unions for complex variants

### Performance

- Avoid unnecessary re-renders
- Use `React.memo()` for pure components
- Implement proper loading states
- Optimize bundle size with tree shaking

This component library is designed to be consistent, accessible, and maintainable while supporting the bilingual requirements of the From Nope to Web platform.
