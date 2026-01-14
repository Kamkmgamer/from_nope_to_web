# React useEffect Hook

**Estimated Time:** 40 minutes  
**Prerequisites:** Components & Props, State with useState

---

## Introduction

Components often need to do more than just render UI. They need to:

- Fetch data from an API
- Set up event listeners
- Start timers
- Sync with external systems

These are called **side effects**, and `useEffect` is how we handle them in React.

By the end of this lesson, you will:

- Understand what side effects are
- Use `useEffect` to run code at the right time
- Control when effects run with dependencies
- Clean up effects properly

---

## What is a Side Effect?

A **side effect** is anything that interacts with the outside world or happens "on the side" of rendering:

- Fetching data from an API
- Updating the document title
- Setting up subscriptions or listeners
- Using timers (setTimeout, setInterval)
- Logging to the console
- Saving to localStorage

```jsx
// This is a side effect - it changes something outside React
document.title = "New Title";

// This is also a side effect - it talks to the outside world
fetch("https://api.example.com/data");
```

---

## The useEffect Hook

`useEffect` runs code after React has rendered the component.

### Basic Syntax

```jsx
import { useEffect } from "react";

function MyComponent() {
  useEffect(() => {
    // This code runs AFTER the component renders
    console.log("Component rendered!");
  });

  return <div>Hello</div>;
}
```

### With Dependencies

```jsx
useEffect(() => {
  // Effect code
}, [dependency1, dependency2]);
```

The **dependency array** controls when the effect runs:

| Dependencies       | Runs When                         |
| ------------------ | --------------------------------- |
| None (no array)    | After EVERY render                |
| `[]` (empty array) | Only on FIRST render (mount)      |
| `[value]`          | On mount AND when `value` changes |

---

## Common Patterns

### Run Once on Mount

```jsx
function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data when component mounts
    fetch("/api/user")
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []); // Empty array = run once

  if (!user) return <div>Loading...</div>;

  return <div>Hello, {user.name}!</div>;
}
```

### Run When Something Changes

```jsx
function SearchResults({ searchTerm }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch new results when searchTerm changes
    fetch(`/api/search?q=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setResults(data));
  }, [searchTerm]); // Run when searchTerm changes

  return (
    <ul>
      {results.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
```

### Update Document Title

```jsx
function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <h1>{title}</h1>;
}
```

---

## Cleanup Function

Some effects need cleanup when the component unmounts or before the effect runs again. Return a function from `useEffect`:

```jsx
useEffect(() => {
  // Setup
  const handleResize = () => {
    console.log("Window resized!");
  };

  window.addEventListener("resize", handleResize);

  // Cleanup function
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

### When Cleanup Runs

| Scenario                 | Cleanup Runs |
| ------------------------ | ------------ |
| Component unmounts       | Yes          |
| Before effect runs again | Yes          |
| Initial mount            | No           |

### Common Cleanup Examples

#### Timer Cleanup

```jsx
function Countdown({ seconds }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemaining((r) => r - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Clean up timer
  }, []);

  return <div>{remaining} seconds left</div>;
}
```

#### Subscription Cleanup

```jsx
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Subscribe to chat room
    const connection = connectToRoom(roomId);

    connection.onMessage((msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Unsubscribe when leaving room
    return () => connection.disconnect();
  }, [roomId]);

  return <MessageList messages={messages} />;
}
```

---

## Fetching Data

A complete data fetching pattern:

```jsx
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Handling Race Conditions

When fetching based on user input, cancel outdated requests:

```jsx
function Search({ query }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const search = async () => {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();

      if (!cancelled) {
        setResults(data);
      }
    };

    if (query) {
      search();
    }

    return () => {
      cancelled = true; // Ignore results from outdated searches
    };
  }, [query]);

  return <ResultsList results={results} />;
}
```

---

## Multiple useEffects

You can use multiple `useEffect` hooks to separate concerns:

```jsx
function Dashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Effect 1: Fetch user data
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then(setUser);
  }, [userId]);

  // Effect 2: Subscribe to notifications
  useEffect(() => {
    const unsubscribe = subscribeToNotifications(userId, setNotifications);
    return () => unsubscribe();
  }, [userId]);

  // Effect 3: Update document title
  useEffect(() => {
    if (user) {
      document.title = `Dashboard - ${user.name}`;
    }
  }, [user]);

  return (
    <div>
      <UserInfo user={user} />
      <NotificationList notifications={notifications} />
    </div>
  );
}
```

---

## Common Mistakes

### 1. Missing Dependencies

```jsx
// ❌ Bad: Using state without declaring dependency
function Broken({ searchTerm }) {
  useEffect(() => {
    fetch(`/api/search?q=${searchTerm}`);
  }, []); // Missing searchTerm!
}

// ✅ Good: Include all used values
function Fixed({ searchTerm }) {
  useEffect(() => {
    fetch(`/api/search?q=${searchTerm}`);
  }, [searchTerm]);
}
```

### 2. Infinite Loop

```jsx
// ❌ Bad: Setting state without dependencies causes infinite loop
function Broken() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([1, 2, 3]); // Triggers re-render, which runs effect again...
  }); // No dependency array!
}

// ✅ Good: Add empty array for mount-only
function Fixed() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([1, 2, 3]);
  }, []); // Only runs once
}
```

### 3. Stale Closures

```jsx
// ⚠️ Problem: count is always 0 inside the interval
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1); // count is always 0!
    }, 1000);

    return () => clearInterval(interval);
  }, []);
}

// ✅ Solution: Use functional update
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => c + 1); // Always uses latest value
    }, 1000);

    return () => clearInterval(interval);
  }, []);
}
```

---

## Practical Example: Clock

```jsx
function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup: stop timer when component unmounts
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="clock">
      <h2>{time.toLocaleTimeString()}</h2>
    </div>
  );
}
```

---

## Practical Example: Local Storage Sync

```jsx
function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem("theme") || "light";
  });

  // Sync to localStorage when theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <button onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
      Current theme: {theme}
    </button>
  );
}
```

---

## Practical Example: Window Size

```jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

// Usage
function ResponsiveComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      Window: {width} x {height}
      {width < 768 && <p>Mobile view</p>}
    </div>
  );
}
```

---

## Exercises

### Exercise 1: Document Title

Create a component that:

- Has an input field
- Updates the document title as you type

### Exercise 2: Debounced Search

Create a search component that:

- Waits 500ms after typing stops before searching
- Shows loading state while fetching
- Displays results

### Exercise 3: Online Status

Create a hook that:

- Tracks if the user is online/offline
- Uses `window.addEventListener` for 'online' and 'offline' events
- Properly cleans up listeners

---

## Summary

- **Side effects** are code that interacts with the outside world
- **useEffect** runs after rendering
- **Dependency array** controls when effects run:
  - No array → every render
  - Empty `[]` → only on mount
  - `[values]` → when values change
- **Cleanup functions** prevent memory leaks
- Return a function from useEffect to clean up
- Always include all values used inside the effect in dependencies
- Use functional updates (`setCount(c => c + 1)`) to avoid stale closures

---

## What's Next?

You've mastered the essential React hooks! Next, learn about **Context** for sharing state across components without prop drilling.

---

_Estimated completion time: 40 minutes_  
_Difficulty: Intermediate_
