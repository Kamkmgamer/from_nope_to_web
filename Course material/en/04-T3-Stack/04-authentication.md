# Authentication: BetterAuth & NextAuth

Authentication (AuthN) is checking **who** a user is. Authorization (AuthZ) is checking **what** they can do.

In T3, we don't build login forms from scratch. We use libraries.

## Option A: Auth.js (NextAuth)

The standard for Next.js apps.

### Features

- **OAuth**: Login with Google, GitHub, Discord easily.
- **Session Handling**: Automatically manages cookies and security.

### Usage

In `src/server/auth.ts`:

```ts
export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};
```

In your component:

```tsx
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Welcome, {session.user.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return <button onClick={() => signIn()}>Sign in</button>;
}
```

## Option B: BetterAuth

A newer, more flexible alternative.

### Why BetterAuth?

- **More Control**: Easier to customize the database schema.
- **Type Safety**: Even better integration with TypeScript.
- **Email/Password**: Easier to set up custom email/password flows (which NextAuth discourages).

### Conceptual Flow

1. User clicks "Login with Google".
2. App redirects to Google.
3. User approves.
4. Google sends a secret code back to your App.
5. App verifies code and creates a **Session** (cookie).
6. User provides that cookie on every request to prove who they are.

## Security Rule

**NEVER** store passwords in plain text. Always let the libraries handle encryption.
