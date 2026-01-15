# Next.js Fundamentals

React is a library for building UIs. **Next.js** is a **Framework** built ON TOP of React. It adds super-powers that you need for a real website, like Routing, SEO, and fast loading.

## 1. File-Based Routing

In standard React, you need to install a router library. In Next.js, the **file system IS the router**.

If you create a file at `src/app/about/page.tsx`, the URL is `your-site.com/about`.

- `src/app/page.tsx` -> `/` (Home)
- `src/app/contact/page.tsx` -> `/contact`
- `src/app/blog/first-post/page.tsx` -> `/blog/first-post`

## 2. Server vs Client Components

This is the biggest change in modern Next.js (App Router).

### Server Components (Default)

- Render on the **Server**.
- Send plain HTML to the browser.
- **Pros**: Fast, great for SEO, secure (can read database directly!).
- **Cons**: Cannot use `useState`, `useEffect`, or `onClick`.

```tsx
// This is a Server Component. It can access the database!
export default async function Page() {
  const data = await db.query("SELECT * FROM users");
  return <div>{data.name}</div>;
}
```

### Client Components

- Render in the Browser (like standard React).
- You must add `'use client'` at the very top of the file.
- **Pros**: Interactive! Can use state and effects.
- **Cons**: Slower initial load.

```tsx
"use client"; // This magic line makes it a Client Component

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## 3. Link Component

Never use `<a>` tags for internal links! They cause a full page refresh. Use `<Link>` instead.

```tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
```

## 4. Layouts

A `layout.tsx` file defines UI that is shared across multiple pages (like a specific Navbar or Footer). It wraps the pages inside it.

```tsx
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children} {/* This is where the page content goes */}
        <Footer />
      </body>
    </html>
  );
}
```

## Exercise

1. Create a simplified Next.js app structure on your computer (folders only).
2. Create an "About" page.
3. Decide which components would need `'use client'` (e.g., a Like button vs a Blog Post reader).
