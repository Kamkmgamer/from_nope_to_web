# State with useState

**Estimated Time:** 45 minutes  
**Prerequisites:** Components & Props

---

## Introduction

Props let you pass data into components, but what if you need data that **changes over time**? What if you want to track how many times a button was clicked, or whether a menu is open, or what text the user typed?

That's where **state** comes in.

By the end of this lesson, you will:

- Understand what state is and when to use it
- Use the `useState` hook to add state to components
- Handle user input with state
- Know the rules of hooks

---

## The Problem with Regular Variables

Let's try to build a counter with a regular variable:

```jsx
function Counter() {
  let count = 0;

  function handleClick() {
    count = count + 1;
    console.log(count); // This logs correctly: 1, 2, 3...
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

**What happens:** The button logs increasing numbers in the console, but the screen always shows "Count: 0".

**Why:** When `count` changes, React doesn't know about it. React only re-renders when **state** changes.

---

## The Solution: useState

`useState` is a **React Hook** that lets you add state to function components.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  //     │       │               └─ Initial value
  //     │       └─ Function to update the state
  //     └─ Current state value

  function handleClick() {
    setCount(count + 1); // Updates state AND triggers re-render!
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

Now when you click, the screen updates! 🎉

---

## How useState Works

### The Syntax

```jsx
const [stateValue, setStateFunction] = useState(initialValue);
```

| Part               | Description                    |
| ------------------ | ------------------------------ |
| `stateValue`       | The current value of the state |
| `setStateFunction` | Function to update the state   |
| `initialValue`     | What the state starts as       |

### Naming Convention

By convention, we name the setter function with "set" + the state name:

```jsx
const [count, setCount] = useState(0);
const [name, setName] = useState("");
const [isOpen, setIsOpen] = useState(false);
const [items, setItems] = useState([]);
const [user, setUser] = useState(null);
```

---

## Examples of useState

### Toggle (Boolean State)

```jsx
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return <button onClick={() => setIsOn(!isOn)}>{isOn ? "ON" : "OFF"}</button>;
}
```

### Text Input (String State)

```jsx
function NameInput() {
  const [name, setName] = useState("");

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Hello, {name || "stranger"}!</p>
    </div>
  );
}
```

### Counter (Number State)

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

---

## Multiple State Variables

A component can have multiple state variables:

```jsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    console.log("Logging in:", { email, password, rememberMe });
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <label>
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        Remember me
      </label>

      <button type="submit">Log In</button>
    </form>
  );
}
```

---

## State with Objects

When your state is an object, you must create a **new object** when updating:

```jsx
function Profile() {
  const [user, setUser] = useState({
    name: "Alice",
    age: 25,
    email: "alice@example.com",
  });

  const updateName = (newName) => {
    // ✅ Correct: Create new object with spread operator
    setUser({
      ...user, // Copy all existing properties
      name: newName, // Override the name
    });

    // ❌ Wrong: Mutating the existing object
    // user.name = newName;
    // setUser(user);
  };

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>

      <input value={user.name} onChange={(e) => updateName(e.target.value)} />
    </div>
  );
}
```

---

## State with Arrays

Same principle - always create a **new array**:

```jsx
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", done: false },
    { id: 2, text: "Build a project", done: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  // Add a new todo
  const addTodo = () => {
    if (!newTodo.trim()) return;

    setTodos([
      ...todos, // Keep existing todos
      { id: Date.now(), text: newTodo, done: false }, // Add new one
    ]);
    setNewTodo(""); // Clear input
  };

  // Toggle a todo's done status
  const toggleTodo = (id) => {
    setTodos(
      todos.map(
        (todo) =>
          todo.id === id
            ? { ...todo, done: !todo.done } // Toggle this one
            : todo, // Keep others unchanged
      ),
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <div>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              style={{
                textDecoration: todo.done ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Functional Updates

When the new state depends on the previous state, use a function:

```jsx
// ⚠️ Might be buggy with rapid clicks
setCount(count + 1);

// ✅ Always reliable
setCount((prevCount) => prevCount + 1);
```

### Why This Matters

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // This increments by 1, not 3!
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);

    // This correctly increments by 3
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  return <button onClick={handleClick}>+3</button>;
}
```

---

## Controlled Components

In React, form inputs should be **controlled** by state:

```jsx
function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Computed property name
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />

      <button type="submit">Send</button>
    </form>
  );
}
```

---

## Rules of Hooks

React hooks have strict rules:

### 1. Only Call Hooks at the Top Level

```jsx
// ✅ Good
function Component() {
  const [count, setCount] = useState(0);

  // ...
}

// ❌ Bad - inside a condition
function Component({ show }) {
  if (show) {
    const [count, setCount] = useState(0); // Error!
  }
}

// ❌ Bad - inside a loop
function Component() {
  for (let i = 0; i < 5; i++) {
    const [count, setCount] = useState(0); // Error!
  }
}
```

### 2. Only Call Hooks from React Functions

```jsx
// ✅ Good - inside a component
function MyComponent() {
  const [count, setCount] = useState(0);
}

// ✅ Good - inside a custom hook
function useCustomHook() {
  const [count, setCount] = useState(0);
  return count;
}

// ❌ Bad - regular JavaScript function
function regularFunction() {
  const [count, setCount] = useState(0); // Error!
}
```

---

## Practical Example: Accordion

```jsx
function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <button
            className="accordion-header"
            onClick={() => toggleItem(index)}
          >
            {item.title}
            <span>{openIndex === index ? "▼" : "▶"}</span>
          </button>

          {openIndex === index && (
            <div className="accordion-content">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// Usage
function App() {
  const faqItems = [
    {
      title: "What is React?",
      content: "A JavaScript library for building UIs.",
    },
    {
      title: "Why use React?",
      content: "It makes building interactive UIs easy.",
    },
    { title: "Is React hard?", content: "Not if you follow a good tutorial!" },
  ];

  return <Accordion items={faqItems} />;
}
```

---

## Exercises

### Exercise 1: Like Button

Create a `LikeButton` component that:

- Shows a heart icon (❤️ or 🤍)
- Toggles between liked/not liked when clicked
- Shows the current like count

### Exercise 2: Character Counter

Create a `TextArea` component that:

- Has a text input area
- Shows character count below it
- Changes color when approaching the 280 character limit
- Disables typing after 280 characters

### Exercise 3: Shopping Cart

Create a mini shopping cart:

- List of products with "Add to Cart" buttons
- Cart showing added items with quantities
- Ability to increase/decrease quantity
- Remove items from cart
- Show total price

---

## Summary

- **State** is data that changes over time and triggers re-renders
- **useState** returns `[value, setValue]` for managing state
- Always **create new objects/arrays** when updating state
- Use **functional updates** when new state depends on previous state
- **Controlled components** sync form inputs with state
- Follow the **Rules of Hooks**: top-level only, React functions only

---

## What's Next?

Now you understand how to make interactive components! The next step is learning **useEffect** for side effects like fetching data, and then exploring more advanced patterns like **Context** for sharing state across components.

---

_Estimated completion time: 45 minutes_  
_Difficulty: Intermediate_
