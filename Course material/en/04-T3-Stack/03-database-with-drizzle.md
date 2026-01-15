# Databases with Drizzle ORM

Applications need to store data permanently. We use a **Database** (like PostgreSQL or SQLite) and an **ORM** (Object Relational Mapper) to talk to it.

We recommend **Drizzle ORM** because it's fast, lightweight, and type-safe.

## 1. Schema Definition

You define your database tables in TypeScript.

```ts
// src/db/schema.ts
import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  isAdmin: boolean("is_admin").default(false),
});
```

## 2. Using the Database

Now you can read and write data using normal TypeScript code.

### Insert (Create)

```ts
await db.insert(users).values({
  name: "Sarah",
  email: "sarah@example.com",
});
```

### Select (Read)

```ts
const allUsers = await db.select().from(users);
// result type is AUTOMATICALY: { id: number, name: string... }[]
```

### Where Clause (Filter)

```ts
import { eq } from "drizzle-orm";

const sarah = await db
  .select()
  .from(users)
  .where(eq(users.email, "sarah@example.com"));
```

## Setup Steps within T3

1. **Install**: `npm install drizzle-orm postgres`
2. **Config**: Connect to your database URL (usually provided by a host like Neon or Supabase).
3. **Push**: Run `npx drizzle-kit push` to create the tables in the real database.

## Why Drizzle?

- **It's just TypeScript**: If you misspell 'email' as 'emial', your code won't compile.
- **SQL-like**: It looks very similar to raw SQL, so you learn database concepts as you use it.
