# Context & Global State

So far, we've passed data from parent to child using **props**. But what if you need to pass data to a component 10 levels deep? Or what if _every_ component needs to know if the user is logged in?

Passing props down layer-by-layer is called **Prop Drilling**, and it gets annoying fast.

The solution is **Context**.

## What is Context?

Think of Context like a "teleportation circle". You put data in at the top of your app, and any component inside can grab it without passing it through parents.

## Step 1: Create the Context

```jsx
import { createContext } from "react";

// Create the context
export const ThemeContext = createContext("light"); // 'light' is default
```

## Step 2: Provide the Data

Wrap your app (or a section of it) in the Provider.

```jsx
import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    // We are "Providing" the theme value to everyone inside
    <ThemeContext.Provider value={theme}>
      <Navbar />
      <MainContent />
    </ThemeContext.Provider>
  );
}
```

## Step 3: Consume the Data

Any component inside the Provider can now "hook" into the data.

```jsx
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Navbar() {
  // Grab the data directly!
  const theme = useContext(ThemeContext);

  return (
    <nav style={{ background: theme === "dark" ? "black" : "white" }}>
      I am a {theme} navbar
    </nav>
  );
}
```

## When to use Context?

- **User Authentication**: Is the user logged in? Who are they?
- **Theme**: Dark mode or Light mode?
- **Language**: English or Arabic?
- **Global Settings**: Volume, notifications, etc.

**Don't over-use it!** For simple parent-child communication, Props are still better because they make components easier to reuse.

## Exercise

1. Create a `UserContext` that holds a username.
2. Wrap your App in a Provider.
3. Create a `Profile` component deep in your tree that displays "Welcome, [username]".
