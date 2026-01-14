# Database Schema Design

This is the Convex schema for the platform's database (`convex/schema.ts`).

> **Note:** The platform is built with Convex, but the course material teaches the traditional T3 stack (Drizzle ORM + PostgreSQL + tRPC).

## Tables

### `users`

- `id`: varchar (primary key, from Clerk)
- `email`: varchar
- `full_name`: varchar
- `created_at`: timestamp
- `role`: enum ('student', 'admin')

### `courses`

- `id`: serial (pk)
- `slug`: varchar (unique, index)
- `title_en`: varchar
- `title_ar`: varchar
- `description_en`: text
- `description_ar`: text
- `is_published`: boolean

### `modules`

- `id`: serial (pk)
- `course_id`: fk -> courses.id
- `order_index`: integer
- `title_en`: varchar
- `title_ar`: varchar

### `lessons`

- `id`: serial (pk)
- `module_id`: fk -> modules.id
- `slug`: varchar
- `order_index`: integer
- `title_en`: varchar
- `title_ar`: varchar
- `content_en`: text (MDX/Markdown)
- `content_ar`: text (MDX/Markdown)
- `video_url`: varchar (optional)

### `user_progress`

- `id`: serial (pk)
- `user_id`: fk -> users.id
- `lesson_id`: fk -> lessons.id
- `completed_at`: timestamp
- `status`: enum ('started', 'completed')

## Relations

- Users <-> UserProgress (One-to-Many)
- Courses <-> Modules (One-to-Many)
- Modules <-> Lessons (One-to-Many)
- Lessons <-> UserProgress (One-to-Many)
