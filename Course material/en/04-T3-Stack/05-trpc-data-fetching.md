# tRPC: Type-Safe APIs

This is the "Secret Sauce" of the T3 stack.

Traditionally, your frontend calls an API URL:
`fetch('/api/users/1')` -- BUT, does the API return `name` or `fullName`? You have to guess or read documentation.

With **tRPC**, your backend is just a function you import.

## 1. The Backend (Router)

Define your functions in the backend.

```ts
// src/server/api/routers/user.ts
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const userRouter = router({
  // Define a procedure called "greeting"
  greeting: publicProcedure
    .input(z.object({ name: z.string() })) // Validate input types
    .query(({ input }) => {
      return {
        text: `Hello ${input.name}`,
      };
    }),
});
```

## 2. The Frontend (Client)

Call the function like it's a local library.

```tsx
// src/app/page.tsx
import { api } from "@/trpc/react";

export default function Home() {
  // Look! Autocomplete works here.
  // If you typo "greeting", red lines appear.
  const hello = api.user.greeting.useQuery({ name: "Client" });

  if (!hello.data) return <div>Loading...</div>;

  return <div>{hello.data.text}</div>;
}
```

## Why is this revolutionary?

1. **No API Documentation**: The code IS the documentation.
2. **Refactoring is Safe**: Rename `greeting` to `hello` in the backend -> Frontend turns red -> You fix it -> Done.
3. **Input Validation**: Uses `Zod` libraries to ensure data is correct at the server door.

## Summary

tRPC removes the wall between Frontend and Backend code. It allows you to move extremely fast while being confident you didn't break anything.
