# API Documentation

This document covers all API endpoints and functions in the From Nope to Web platform, including Convex backend functions and Next.js API routes.

## Table of Contents

- [Convex Backend API](#convex-backend-api)
  - [Courses API](#courses-api)
  - [User Progress API](#user-progress-api)
  - [Authentication](#authentication)
- [Next.js API Routes](#nextjs-api-routes)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)

## Convex Backend API

The backend is built using Convex, which provides type-safe database queries and mutations. All functions are auto-generated and available through the Convex client.

### Courses API

#### Queries

##### `list`
Get all published courses, ordered by their `order` field.

```typescript
// Usage
const courses = await convex.query(api.courses.list);
```

**Returns:** Array of course objects with fields:
- `_id`: string
- `slug`: string
- `titleEn`: string
- `titleAr`: string
- `descriptionEn`: string
- `descriptionAr`: string
- `order`: number
- `isPublished`: boolean
- `imageUrl?:`: string

##### `listAll`
Get all courses including unpublished ones (admin only).

```typescript
// Usage
const allCourses = await convex.query(api.courses.listAll);
```

**Returns:** Same as `list` but includes unpublished courses.

##### `getBySlug`
Get a single course by its slug.

```typescript
// Usage
const course = await convex.query(api.courses.getBySlug, { 
  slug: "intro-to-web-dev" 
});
```

**Args:**
- `slug`: string - The course slug

**Returns:** Course object or `null` if not found.

##### `get`
Get a single course by its ID.

```typescript
// Usage
const course = await convex.query(api.courses.get, { 
  id: "courses_1234567890" 
});
```

**Args:**
- `id`: Id<"courses"> - The Convex document ID

**Returns:** Course object or `null` if not found.

##### `getWithContent`
Get a course with all its modules and published lessons.

```typescript
// Usage
const courseWithContent = await convex.query(api.courses.getWithContent, { 
  slug: "intro-to-web-dev" 
});
```

**Args:**
- `slug`: string - The course slug

**Returns:** Course object with additional `modules` array:
```typescript
{
  ...course,
  modules: Array<{
    _id: string;
    courseId: string;
    order: number;
    titleEn: string;
    titleAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    lessons: Array<{
      _id: string;
      moduleId: string;
      slug: string;
      order: number;
      titleEn: string;
      titleAr: string;
      contentEn: string;
      contentAr: string;
      videoUrl?: string;
      estimatedMinutes?: number;
      isPublished: boolean;
    }>;
  }>;
}
```

#### Mutations

##### `create`
Create a new course (admin only).

```typescript
// Usage
const courseId = await convex.mutation(api.courses.create, {
  slug: "new-course",
  titleEn: "New Course",
  titleAr: "دورة جديدة",
  descriptionEn: "Course description",
  descriptionAr: "وصف الدورة",
  order: 1,
  imageUrl: "https://example.com/image.jpg"
});
```

**Args:**
- `slug`: string - Unique course slug
- `titleEn`: string - English title
- `titleAr`: string - Arabic title
- `descriptionEn`: string - English description
- `descriptionAr`: string - Arabic description
- `order`: number - Display order
- `imageUrl?`: string - Optional course image URL

**Returns:** The new course document ID.

##### `update`
Update an existing course.

```typescript
// Usage
await convex.mutation(api.courses.update, {
  id: "courses_1234567890",
  titleEn: "Updated Title",
  isPublished: true
});
```

**Args:**
- `id`: Id<"courses"> - Course ID
- `slug?`: string - Optional new slug
- `titleEn?`: string - Optional new English title
- `titleAr?`: string - Optional new Arabic title
- `descriptionEn?`: string - Optional new English description
- `descriptionAr?`: string - Optional new Arabic description
- `order?`: number - Optional new order
- `isPublished?`: boolean - Optional published status
- `imageUrl?`: string - Optional new image URL

**Returns:** Promise<void>

##### `remove`
Delete a course and all its modules and lessons (admin only).

```typescript
// Usage
await convex.mutation(api.courses.remove, {
  id: "courses_1234567890"
});
```

**Args:**
- `id`: Id<"courses"> - Course ID to delete

**Returns:** Promise<void>

**Note:** This cascades and deletes all associated modules and lessons.

### User Progress API

#### Queries

##### `getUserProgress`
Get progress for a specific user across all courses.

```typescript
// Usage
const progress = await convex.query(api.userProgress.getUserProgress, {
  userId: "users_1234567890"
});
```

**Args:**
- `userId`: Id<"users"> - User ID

**Returns:** Array of progress objects with lesson and course details.

##### `getLessonProgress`
Get progress for a specific lesson and user.

```typescript
// Usage
const progress = await convex.query(api.userProgress.getLessonProgress, {
  userId: "users_1234567890",
  lessonId: "lessons_1234567890"
});
```

**Args:**
- `userId`: Id<"users"> - User ID
- `lessonId`: Id<"lessons"> - Lesson ID

**Returns:** Progress object or `null` if not found.

#### Mutations

##### `startLesson`
Mark a lesson as started for a user.

```typescript
// Usage
await convex.mutation(api.userProgress.startLesson, {
  userId: "users_1234567890",
  lessonId: "lessons_1234567890"
});
```

**Args:**
- `userId`: Id<"users"> - User ID
- `lessonId`: Id<"lessons"> - Lesson ID

**Returns:** Promise<void>

##### `completeLesson`
Mark a lesson as completed for a user.

```typescript
// Usage
await convex.mutation(api.userProgress.completeLesson, {
  userId: "users_1234567890",
  lessonId: "lessons_1234567890"
});
```

**Args:**
- `userId`: Id<"users"> - User ID
- `lessonId`: Id<"lessons"> - Lesson ID

**Returns:** Promise<void>

### Authentication

Authentication is handled by Clerk and synchronized with Convex through the auth configuration. Users are automatically created/updated in Convex when they authenticate.

#### Auth Flow

1. User signs in/up through Clerk
2. Clerk middleware validates the session
3. Convex auth middleware syncs user data
4. User context is available in all Convex functions

#### User Schema

```typescript
{
  clerkId: string;      // Clerk user ID
  email: string;        // User email
  fullName?: string;    // Optional full name
  imageUrl?: string;    // Optional profile image
  role: "student" | "admin";
  createdAt: number;    // Unix timestamp
}
```

## Next.js API Routes

### AI Tutor API

#### `POST /api/tutor`

AI-powered tutoring endpoint that provides contextual assistance based on the current lesson.

```typescript
// Request body
{
  message: string;      // User's question
  lessonId?: string;    // Optional lesson context
  language?: "en" | "ar"; // Response language
}

// Response
{
  response: string;     // AI response
  timestamp: number;    // Unix timestamp
}
```

**Example:**
```javascript
const response = await fetch('/api/tutor', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'What is React?',
    lessonId: 'intro-to-react',
    language: 'en'
  })
});

const { response } = await response.json();
```

### Content Export API

#### `GET /api/export/pdf`

Export lesson content as PDF.

```typescript
// Query parameters
{
  lessonId: string;     // Lesson ID to export
  language: "en" | "ar"; // Content language
}

// Response
// PDF file download
```

#### `GET /api/export/markdown`

Export lesson content as Markdown file.

```typescript
// Query parameters
{
  lessonId: string;     // Lesson ID to export
  language: "en" | "ar"; // Content language
}

// Response
// Markdown file download
```

## Usage Examples

### Frontend Integration

```typescript
// In a React component
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function CourseList() {
  const courses = useQuery(api.courses.list);
  const startLesson = useMutation(api.userProgress.startLesson);

  const handleStartLesson = async (lessonId: string) => {
    await startLesson({ lessonId, userId: currentUser.id });
  };

  return (
    <div>
      {courses?.map(course => (
        <div key={course._id}>
          <h2>{course.titleEn}</h2>
          <p>{course.descriptionEn}</p>
        </div>
      ))}
    </div>
  );
}
```

### Server-side Usage

```typescript
// In a Next.js page
import { getConvexClient } from "@/lib/convex";
import { api } from "@/convex/_generated/api";

export default async function CoursePage({ params }) {
  const convex = getConvexClient();
  const course = await convex.query(api.courses.getBySlug, { 
    slug: params.slug 
  });

  if (!course) {
    notFound();
  }

  return <CourseDetail course={course} />;
}
```

## Error Handling

### Convex Errors

Convex provides built-in error handling with the following error types:

- `ConvexError`: Custom application errors
- `NotFoundError`: Document not found
- `ValidationError`: Invalid input data

```typescript
try {
  const course = await convex.query(api.courses.getBySlug, { slug });
} catch (error) {
  if (error instanceof ConvexError) {
    console.error("Application error:", error.data);
  } else if (error instanceof NotFoundError) {
    console.error("Course not found");
  }
}
```

### API Route Errors

API routes return appropriate HTTP status codes:

- `200`: Success
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

```typescript
// Error response format
{
  error: string;        // Error message
  code: string;         // Error code
  details?: any;        // Additional error details
}
```

## Rate Limiting

API routes implement rate limiting to prevent abuse:

- `/api/tutor`: 10 requests per minute per user
- `/api/export/*`: 5 requests per minute per user

Rate limits are enforced using IP-based tracking and user authentication when available.

## Caching

### Convex Caching

Convex automatically caches query results. The cache is invalidated when:

- Underlying data changes
- Cache TTL expires (default: 5 minutes)
- Manual cache invalidation

### API Route Caching

Export endpoints use CDN caching with appropriate cache headers:

```typescript
// Cache headers for PDF/Markdown exports
Cache-Control: public, max-age=3600, s-maxage=86400
```

## Security

### Authentication

- All Convex mutations require authentication
- API routes use Clerk middleware for auth validation
- Admin operations require `role: "admin"`

### Data Validation

- All inputs are validated using Convex schemas
- API routes use Zod for request validation
- SQL injection protection through Convex's query builder

### CORS

API routes are configured to allow requests from the application domain only in production.
