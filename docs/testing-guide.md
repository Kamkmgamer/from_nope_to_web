# Testing Guide

This comprehensive guide covers testing strategies, tools, and best practices for the From Nope to Web platform.

## Table of Contents

- [Testing Strategy](#testing-strategy)
- [Testing Tools and Setup](#testing-tools-and-setup)
- [Unit Testing](#unit-testing)
- [Integration Testing](#integration-testing)
- [End-to-End Testing](#end-to-end-testing)
- [Component Testing](#component-testing)
- [API Testing](#api-testing)
- [Accessibility Testing](#accessibility-testing)
- [Performance Testing](#performance-testing)
- [Test Data Management](#test-data-management)
- [Continuous Integration](#continuous-integration)

## Testing Strategy

### Testing Pyramid

We follow the testing pyramid approach:

```
    E2E Tests (10%)
   ─────────────────
  Integration Tests (20%)
 ─────────────────────────
Unit Tests (70%)
```

### Test Categories

1. **Unit Tests**: Fast, isolated tests for individual functions/components
2. **Integration Tests**: Test interactions between components
3. **E2E Tests**: Complete user workflows
4. **Visual Tests**: UI consistency and regression
5. **Accessibility Tests**: WCAG compliance verification

### Coverage Requirements

- **Unit Tests**: Minimum 80% line coverage
- **Integration Tests**: Critical user paths covered
- **E2E Tests**: All major user workflows
- **Accessibility**: 100% WCAG 2.1 AA compliance

## Testing Tools and Setup

### Core Testing Stack

```json
{
  "jest": "^29.0.0",           // Test runner
  "@testing-library/react": "^13.0.0",  // React testing utilities
  "@testing-library/jest-dom": "^5.0.0",  // DOM matchers
  "@testing-library/user-event": "^14.0.0",  // User interaction simulation
  "playwright": "^1.40.0",    // E2E testing
  "jest-axe": "^7.0.0",       // Accessibility testing
  "@storybook/test-runner": "^0.16.0",  // Visual testing
  "msw": "^1.0.0"             // API mocking
}
```

### Configuration Files

#### Jest Configuration

```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
```

#### Jest Setup

```javascript
// jest.setup.js
import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll } from 'vitest'
import { setupServer } from 'msw/node'
import { handlers } from './src/__tests__/mocks/handlers'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock Convex
jest.mock('@/convex/_generated/api', () => ({
  api: {
    courses: {
      list: jest.fn(),
      getBySlug: jest.fn(),
    },
    userProgress: {
      getUserProgress: jest.fn(),
      startLesson: jest.fn(),
    },
  },
}))

// Mock next-intl
jest.mock('next-intl', () => ({
  useLocale: () => 'en',
  useTranslations: () => (key: string) => key,
}))

// Setup MSW server
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

## Unit Testing

### Component Testing

#### Basic Component Test

```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../ui/button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-destructive')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders as child when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )
    expect(screen.getByRole('link')).toBeInTheDocument()
  })
})
```

#### Complex Component Test

```typescript
// src/components/dashboard/__tests__/CourseCard.test.tsx
import { render, screen } from '@testing-library/react'
import { CourseCard } from '../CourseCard'
import type { CourseWithProgress } from '@/convex/dashboard'

const mockCourse: CourseWithProgress = {
  _id: 'courses_123',
  slug: 'intro-to-react',
  titleEn: 'Introduction to React',
  titleAr: 'مقدمة في ريأكت',
  descriptionEn: 'Learn React fundamentals',
  descriptionAr: 'تعلم أساسيات ريأكت',
  progressPercentage: 65,
  completedLessons: 13,
  totalLessons: 20,
}

describe('CourseCard', () => {
  it('displays course information correctly', () => {
    render(<CourseCard course={mockCourse} />)
    
    expect(screen.getByText('Introduction to React')).toBeInTheDocument()
    expect(screen.getByText('Learn React fundamentals')).toBeInTheDocument()
  })

  it('shows correct progress percentage', () => {
    render(<CourseCard course={mockCourse} />)
    
    expect(screen.getByText('65%')).toBeInTheDocument()
    expect(screen.getByText('13 / 20 lessons')).toBeInTheDocument()
  })

  it('displays correct status tag', () => {
    render(<CourseCard course={mockCourse} />)
    
    expect(screen.getByText('In Progress')).toBeInTheDocument()
  })

  it('shows completed status for 100% progress', () => {
    const completedCourse = { ...mockCourse, progressPercentage: 100 }
    render(<CourseCard course={completedCourse} />)
    
    expect(screen.getByText('Completed')).toBeInTheDocument()
  })

  it('renders correct CTA button text', () => {
    render(<CourseCard course={mockCourse} />)
    
    expect(screen.getByText('Continue')).toBeInTheDocument()
  })
})
```

### Hook Testing

```typescript
// src/hooks/__tests__/useUserProgress.test.tsx
import { renderHook, act } from '@testing-library/react'
import { useUserProgress } from '../useUserProgress'
import { api } from '@/convex/_generated/api'

// Mock Convex hooks
jest.mock('@/convex/react', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}))

describe('useUserProgress', () => {
  it('returns user progress data', () => {
    const mockProgress = [
      { lessonId: 'lesson_1', status: 'completed' },
      { lessonId: 'lesson_2', status: 'started' },
    ]

    ;(require('@/convex/react').useQuery as jest.Mock).mockReturnValue(mockProgress)

    const { result } = renderHook(() => useUserProgress('user_123'))

    expect(result.current.progress).toEqual(mockProgress)
    expect(result.current.isLoading).toBe(false)
  })

  it('handles lesson completion', async () => {
    const mockCompleteLesson = jest.fn()
    ;(require('@/convex/react').useMutation as jest.Mock).mockReturnValue([
      mockCompleteLesson,
      { loading: false },
    ])

    const { result } = renderHook(() => useUserProgress('user_123'))

    await act(async () => {
      await result.current.completeLesson('lesson_1')
    })

    expect(mockCompleteLesson).toHaveBeenCalledWith({
      userId: 'user_123',
      lessonId: 'lesson_1',
    })
  })
})
```

### Utility Function Testing

```typescript
// src/lib/__tests__/utils.test.ts
import { formatProgress, calculateCompletionPercentage } from '../utils'

describe('formatProgress', () => {
  it('formats progress percentage correctly', () => {
    expect(formatProgress(75)).toBe('75%')
    expect(formatProgress(0)).toBe('0%')
    expect(formatProgress(100)).toBe('100%')
  })

  it('handles edge cases', () => {
    expect(formatProgress(-5)).toBe('0%')
    expect(formatProgress(150)).toBe('100%')
  })
})

describe('calculateCompletionPercentage', () => {
  it('calculates percentage correctly', () => {
    expect(calculateCompletionPercentage(5, 10)).toBe(50)
    expect(calculateCompletionPercentage(0, 10)).toBe(0)
    expect(calculateCompletionPercentage(10, 10)).toBe(100)
  })

  it('handles division by zero', () => {
    expect(calculateCompletionPercentage(5, 0)).toBe(0)
  })
})
```

## Integration Testing

### Component Integration

```typescript
// src/__tests__/integration/CourseFlow.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CoursePage } from '@/app/[locale]/courses/[slug]/page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Mock API responses
const mockCourse = {
  _id: 'courses_123',
  slug: 'intro-to-react',
  titleEn: 'Introduction to React',
  modules: [
    {
      _id: 'modules_1',
      titleEn: 'Getting Started',
      lessons: [
        { _id: 'lesson_1', titleEn: 'What is React?', contentEn: '...' },
      ],
    },
  ],
}

describe('Course Flow Integration', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
  })

  it('displays course content and allows navigation', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CoursePage params={{ slug: 'intro-to-react' }} />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Introduction to React')).toBeInTheDocument()
    })

    // Test lesson navigation
    const lessonLink = screen.getByText('What is React?')
    fireEvent.click(lessonLink)

    await waitFor(() => {
      expect(screen.getByText('...')).toBeInTheDocument()
    })
  })
})
```

### API Integration

```typescript
// src/__tests__/integration/api.test.ts
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { getCourses } from '@/lib/api'

const server = setupServer(
  rest.get('/api/courses', (req, res, ctx) => {
    return res(
      ctx.json([
        { _id: '1', titleEn: 'Course 1' },
        { _id: '2', titleEn: 'Course 2' },
      ])
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('API Integration', () => {
  it('fetches courses successfully', async () => {
    const courses = await getCourses()
    expect(courses).toHaveLength(2)
    expect(courses[0].titleEn).toBe('Course 1')
  })

  it('handles API errors', async () => {
    server.use(
      rest.get('/api/courses', (req, res, ctx) => {
        return res(ctx.status(500))
      })
    )

    await expect(getCourses()).rejects.toThrow()
  })
})
```

## End-to-End Testing

### Playwright Configuration

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './src/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### E2E Test Examples

#### Authentication Flow

```typescript
// src/e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('user can sign up and sign in', async ({ page }) => {
    await page.goto('/')

    // Sign up
    await page.click('[data-testid="sign-up-button"]')
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.fill('[data-testid="name-input"]', 'Test User')
    await page.click('[data-testid="sign-up-submit"]')

    // Verify successful sign up
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible()

    // Sign out
    await page.click('[data-testid="user-menu"]')
    await page.click('[data-testid="sign-out"]')

    // Sign in
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="sign-in-submit"]')

    // Verify successful sign in
    await expect(page.locator('[data-testid="dashboard"]')).toBeVisible()
  })
})
```

#### Course Navigation

```typescript
// src/e2e/courses.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Course Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Sign in before each test
    await page.goto('/sign-in')
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.click('[data-testid="sign-in-submit"]')
  })

  test('user can browse courses and start learning', async ({ page }) => {
    await page.goto('/courses')

    // Browse courses
    await expect(page.locator('[data-testid="course-list"]')).toBeVisible()
    const firstCourse = page.locator('[data-testid="course-card"]').first()
    await expect(firstCourse).toBeVisible()

    // View course details
    await firstCourse.click()
    await expect(page.locator('[data-testid="course-title"]')).toBeVisible()

    // Start first lesson
    await page.click('[data-testid="start-lesson"]')
    await expect(page.locator('[data-testid="lesson-content"]')).toBeVisible()

    // Mark lesson as complete
    await page.click('[data-testid="complete-lesson"]')
    await expect(page.locator('[data-testid="progress-updated"]')).toBeVisible()
  })

  test('progress is tracked across sessions', async ({ page }) => {
    await page.goto('/courses/intro-to-react')
    await page.click('[data-testid="start-lesson"]')
    await page.click('[data-testid="complete-lesson"]')

    // Refresh page and verify progress
    await page.reload()
    await expect(page.locator('[data-testid="lesson-completed"]')).toBeVisible()
  })
})
```

#### Internationalization

```typescript
// src/e2e/i18n.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Internationalization', () => {
  test('language switching works correctly', async ({ page }) => {
    await page.goto('/')

    // Test English (default)
    await expect(page.locator('text=From Nope to Web')).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')

    // Switch to Arabic
    await page.click('[data-testid="language-switcher"]')
    await page.click('[data-testid="lang-ar"]')

    // Verify Arabic content
    await expect(page.locator('text=من لا شيء إلى الويب')).toBeVisible()
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')

    // Test RTL layout
    const header = page.locator('[data-testid="header"]')
    await expect(header).toHaveCSS('text-align', 'right')
  })
})
```

## Component Testing

### Storybook Integration

```typescript
// src/components/ui/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and sizes.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Delete',
  },
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <PlusIcon />
        Add Item
      </>
    ),
  },
}
```

### Visual Regression Testing

```typescript
// src/components/__tests__/visual/Button.visual.test.tsx
import { test, expect } from '@playwright/test'

test.describe('Button Visual Tests', () => {
  test('button variants match snapshots', async ({ page }) => {
    await page.goto('/iframe.html?id=ui-button--default')
    
    const button = page.locator('[data-testid="button"]')
    await expect(button).toHaveScreenshot('button-default.png')
  })

  test('button states match snapshots', async ({ page }) => {
    await page.goto('/iframe.html?id=ui-button--default')
    
    const button = page.locator('[data-testid="button"]')
    
    // Hover state
    await button.hover()
    await expect(button).toHaveScreenshot('button-hover.png')
    
    // Active state
    await button.click()
    await expect(button).toHaveScreenshot('button-active.png')
  })
})
```

## API Testing

### Convex Function Testing

```typescript
// convex/__tests__/courses.test.ts
import { defineTestConvex } from 'convex-test'
import schema from '../schema'

const testConvex = defineTestConvex({
  schema,
})

describe('Courses API', () => {
  test('can create and retrieve courses', async () => {
    const { ctx } = await testConvex.build()
    
    // Create course
    const courseId = await ctx.db.insert('courses', {
      slug: 'test-course',
      titleEn: 'Test Course',
      titleAr: 'دورة اختبار',
      descriptionEn: 'Test description',
      descriptionAr: 'وصف اختبار',
      order: 1,
      isPublished: true,
    })

    // Retrieve course
    const course = await ctx.db.get(courseId)
    expect(course?.titleEn).toBe('Test Course')
  })

  test('can query published courses only', async () => {
    const { ctx } = await testConvex.build()
    
    // Create published and unpublished courses
    await ctx.db.insert('courses', {
      slug: 'published-course',
      titleEn: 'Published Course',
      descriptionEn: 'Published',
      order: 1,
      isPublished: true,
    })

    await ctx.db.insert('courses', {
      slug: 'unpublished-course',
      titleEn: 'Unpublished Course',
      descriptionEn: 'Unpublished',
      order: 2,
      isPublished: false,
    })

    // Query published courses
    const publishedCourses = await ctx.runQuery(api.courses.list)
    expect(publishedCourses).toHaveLength(1)
    expect(publishedCourses[0].slug).toBe('published-course')
  })
})
```

### API Route Testing

```typescript
// src/app/api/__tests__/tutor.test.ts
import { createMocks } from 'node-mocks-http'
import handler from '../tutor/route'

describe('/api/tutor', () => {
  test('returns AI response for valid request', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        message: 'What is React?',
        lessonId: 'intro-to-react',
        language: 'en',
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const response = JSON.parse(res._getData())
    expect(response.response).toContain('React')
  })

  test('validates required fields', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        message: 'What is React?',
        // Missing lessonId
      },
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(400)
    const response = JSON.parse(res._getData())
    expect(response.error).toBe('Missing required fields')
  })
})
```

## Accessibility Testing

### Automated Accessibility Tests

```typescript
// src/components/__tests__/accessibility/Button.a11y.test.tsx
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Button } from '../ui/button'

expect.extend(toHaveNoViolations)

describe('Button Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have proper ARIA attributes', () => {
    render(<Button disabled>Disabled Button</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  it('should support keyboard navigation', () => {
    render(<Button>Click me</Button>)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('tabindex', '0')
  })
})
```

### E2E Accessibility Testing

```typescript
// src/e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await injectAxe(page)
  })

  test('homepage meets accessibility standards', async ({ page }) => {
    await page.goto('/')
    await checkA11y(page)
  })

  test('course page is accessible', async ({ page }) => {
    await page.goto('/courses/intro-to-react')
    await checkA11y(page, null, {
      detailedReport: true,
      detailedReportOptions: { html: true },
    })
  })

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/courses')
    
    // Tab through navigation
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()
    
    // Enter to activate
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(/\/courses\/.+/)
  })
})
```

## Performance Testing

### Bundle Analysis

```typescript
// scripts/analyze-bundle.js
const { analyze } = require('@next/bundle-analyzer')

async function analyzeBundle() {
  const results = await analyze('./.next/static/chunks/')
  
  console.log('Bundle Analysis Results:')
  console.log(`Total size: ${results.totalSize} bytes`)
  console.log(`Largest chunk: ${results.largestChunk.name} (${results.largestChunk.size} bytes)`)
  
  // Alert on large chunks
  results.chunks.forEach(chunk => {
    if (chunk.size > 100000) { // 100KB
      console.warn(`Large chunk detected: ${chunk.name} (${chunk.size} bytes)`)
    }
  })
}

analyzeBundle()
```

### Performance Testing with Lighthouse

```typescript
// src/e2e/performance.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Performance', () => {
  test('homepage meets performance standards', async ({ page }) => {
    await page.goto('/')
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle')
    
    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByType('paint')[0].startTime,
        firstContentfulPaint: performance.getEntriesByType('paint')[1].startTime,
      }
    })
    
    // Assert performance thresholds
    expect(metrics.firstContentfulPaint).toBeLessThan(2000) // 2s
    expect(metrics.domContentLoaded).toBeLessThan(3000) // 3s
    expect(metrics.loadComplete).toBeLessThan(5000) // 5s
  })
})
```

## Test Data Management

### Fixtures and Factories

```typescript
// src/__tests__/fixtures/courses.ts
import type { CourseWithProgress } from '@/convex/dashboard'

export const createCourse = (overrides: Partial<CourseWithProgress> = {}): CourseWithProgress => ({
  _id: 'courses_123',
  slug: 'test-course',
  titleEn: 'Test Course',
  titleAr: 'دورة اختبار',
  descriptionEn: 'Test description',
  descriptionAr: 'وصف اختبار',
  progressPercentage: 0,
  completedLessons: 0,
  totalLessons: 10,
  ...overrides,
})

export const createCourses = (count: number): CourseWithProgress[] => 
  Array.from({ length: count }, (_, i) => 
    createCourse({
      _id: `courses_${i}`,
      slug: `course-${i}`,
      titleEn: `Course ${i}`,
      titleAr: `دورة ${i}`,
    })
  )
```

### Database Seeding

```typescript
// scripts/seed-test-db.ts
import { defineTestConvex } from 'convex-test'
import schema from '../convex/schema'
import { createCourses } from '../src/__tests__/fixtures/courses'

async function seedTestDatabase() {
  const testConvex = defineTestConvex({ schema })
  const { ctx } = await testConvex.build()
  
  // Seed courses
  const courses = createCourses(5)
  for (const course of courses) {
    await ctx.db.insert('courses', {
      slug: course.slug,
      titleEn: course.titleEn,
      titleAr: course.titleAr,
      descriptionEn: course.descriptionEn,
      descriptionAr: course.descriptionAr,
      order: 1,
      isPublished: true,
    })
  }
  
  console.log('Test database seeded successfully')
}

seedTestDatabase().catch(console.error)
```

## Continuous Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run unit tests
        run: pnpm test:unit --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  integration-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run integration tests
        run: pnpm test:integration

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Install Playwright
        run: pnpm exec playwright install --with-deps
      
      - name: Run E2E tests
        run: pnpm test:e2e
      
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/

  accessibility-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      
      - name: Run accessibility tests
        run: pnpm test:a11y
```

### Quality Gates

```typescript
// scripts/check-coverage.ts
import { readFileSync } from 'fs'
import { execSync } from 'child_process'

interface CoverageReport {
  total: {
    lines: { covered: number; total: number }
    functions: { covered: number; total: number }
    branches: { covered: number; total: number }
    statements: { covered: number; total: number }
  }
}

function checkCoverage() {
  const coverageReport = JSON.parse(readFileSync('./coverage/coverage-summary.json')) as CoverageReport
  
  const thresholds = {
    lines: 80,
    functions: 80,
    branches: 75,
    statements: 80,
  }
  
  for (const [metric, threshold] of Object.entries(thresholds)) {
    const coverage = coverageReport.total[metric as keyof typeof thresholds]
    const percentage = (coverage.covered / coverage.total) * 100
    
    if (percentage < threshold) {
      console.error(`Coverage for ${metric} is ${percentage.toFixed(2)}%, below threshold of ${threshold}%`)
      process.exit(1)
    }
  }
  
  console.log('All coverage thresholds met')
}

checkCoverage()
```

This comprehensive testing guide ensures robust, maintainable, and high-quality code for the From Nope to Web platform.
