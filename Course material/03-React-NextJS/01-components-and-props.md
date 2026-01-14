# React Components & Props

**Estimated Time:** 45 minutes  
**Prerequisites:** JavaScript Variables

---

## Introduction

React is a JavaScript library for building user interfaces. It's used by companies like Facebook, Instagram, Netflix, and Airbnb. React makes it easy to create interactive, dynamic web applications by breaking the UI into reusable **components**.

By the end of this lesson, you will:

- Understand what components are and why they matter
- Create your own function components
- Pass data to components using props
- Build a real, reusable component

---

## What is a Component?

A **component** is a reusable piece of UI. Think of it like LEGO blocks - you build small pieces and combine them to create something amazing.

### The Traditional Way (Without Components)

```html
<!-- Repeating the same code over and over -->
<div class="card">
  <img src="alice.jpg" />
  <h3>Alice</h3>
  <p>Frontend Developer</p>
</div>

<div class="card">
  <img src="bob.jpg" />
  <h3>Bob</h3>
  <p>Backend Developer</p>
</div>

<div class="card">
  <img src="charlie.jpg" />
  <h3>Charlie</h3>
  <p>Designer</p>
</div>
```

**Problems:**

- Lots of repeated code
- Hard to maintain (change in one place = change everywhere)
- Error-prone

### The React Way (With Components)

```jsx
// Define ONCE
function UserCard({ name, role, image }) {
  return (
    <div className="card">
      <img src={image} />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}

// Use MANY times
function App() {
  return (
    <div>
      <UserCard name="Alice" role="Frontend Developer" image="alice.jpg" />
      <UserCard name="Bob" role="Backend Developer" image="bob.jpg" />
      <UserCard name="Charlie" role="Designer" image="charlie.jpg" />
    </div>
  );
}
```

**Benefits:**

- Write once, use everywhere
- Easy to maintain
- Consistent design
- Easy to understand

---

## Your First Component

A React component is just a JavaScript function that returns JSX (HTML-like code).

```jsx
// This is a component!
function Welcome() {
  return <h1>Hello, World!</h1>;
}
```

### Rules for Components

1. **Name must start with a capital letter** (Welcome, not welcome)
2. **Must return JSX** (the HTML-like syntax)
3. **Must return a single root element** (wrap multiple elements in a `<div>` or `<>`)

```jsx
// ✅ Good - single root element
function Good() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );
}

// ✅ Also good - using Fragment (<>)
function AlsoGood() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}

// ❌ Bad - multiple root elements
function Bad() {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>
  );
}
```

---

## JSX: JavaScript + XML

JSX lets you write HTML-like code inside JavaScript. It's not actually HTML - it gets converted to JavaScript.

### Key Differences from HTML

| HTML                 | JSX                        |
| -------------------- | -------------------------- |
| `class="..."`        | `className="..."`          |
| `for="..."`          | `htmlFor="..."`            |
| `onclick="..."`      | `onClick={...}`            |
| `style="color: red"` | `style={{ color: 'red' }}` |

### Embedding JavaScript in JSX

Use curly braces `{}` to include JavaScript expressions:

```jsx
function Greeting() {
  const name = "Alice";
  const hour = new Date().getHours();

  return (
    <div>
      {/* Comments in JSX look like this */}
      <h1>Hello, {name}!</h1>
      <p>The current hour is {hour}.</p>
      <p>2 + 2 = {2 + 2}</p>
      <p>It's {hour < 12 ? "morning" : "afternoon"}.</p>
    </div>
  );
}
```

---

## Props: Passing Data to Components

**Props** (short for "properties") are how you pass data from a parent component to a child component. Think of them like function arguments.

### Basic Props

```jsx
// Child component receives props
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Parent component passes props
function App() {
  return (
    <div>
      <Greeting name="Alice" />
      <Greeting name="Bob" />
      <Greeting name="Charlie" />
    </div>
  );
}
```

### Multiple Props

```jsx
function UserCard({ name, age, email, isActive }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <p>Status: {isActive ? "✅ Active" : "❌ Inactive"}</p>
    </div>
  );
}

function App() {
  return (
    <UserCard
      name="Alice Johnson"
      age={28}
      email="alice@example.com"
      isActive={true}
    />
  );
}
```

### Props Syntax Explained

```jsx
// When using the component:
<Component
  stringProp="text" // String - use quotes
  numberProp={42} // Number - use braces
  booleanProp={true} // Boolean - use braces
  arrayProp={[1, 2, 3]} // Array - use braces
  objectProp={{ key: "val" }} // Object - double braces!
  functionProp={() => alert("hi")} // Function - use braces
/>;

// Inside the component:
function Component({ stringProp, numberProp, booleanProp }) {
  // Use them like regular variables
}
```

---

## Props are Read-Only

You **cannot modify** props inside a component. They flow one way: parent → child.

```jsx
function Broken({ name }) {
  name = "Changed"; // ❌ Don't do this!
  return <h1>{name}</h1>;
}
```

If you need to change data, we use **state** (covered in the next lesson).

---

## Default Props

Provide default values if props aren't passed:

```jsx
// Using default parameters (recommended)
function Button({ text = 'Click me', color = 'blue' }) {
  return (
    <button style={{ backgroundColor: color }}>
      {text}
    </button>
  );
}

// Usage
<Button />                        // Uses defaults
<Button text="Submit" />          // Custom text, default color
<Button text="Cancel" color="gray" /> // Both custom
```

---

## Children Prop

The `children` prop contains anything placed between component tags:

```jsx
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">{children}</div>
    </div>
  );
}

// Usage
function App() {
  return (
    <Card title="Welcome">
      <p>This paragraph is passed as children!</p>
      <button>And this button too!</button>
    </Card>
  );
}
```

This is powerful for creating **wrapper** or **container** components.

---

## Practical Example: Building a Product Card

Let's build a real, reusable product card component:

```jsx
function ProductCard({ name, price, image, rating, inStock }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />

      <div className="product-info">
        <h3 className="product-name">{name}</h3>

        <div className="product-rating">
          {"⭐".repeat(rating)}
          {"☆".repeat(5 - rating)}
        </div>

        <p className="product-price">${price.toFixed(2)}</p>

        {inStock ? (
          <button className="add-to-cart">Add to Cart</button>
        ) : (
          <p className="sold-out">Sold Out</p>
        )}
      </div>
    </div>
  );
}

// Usage
function Shop() {
  return (
    <div className="product-grid">
      <ProductCard
        name="Wireless Headphones"
        price={79.99}
        image="/headphones.jpg"
        rating={4}
        inStock={true}
      />
      <ProductCard
        name="Smart Watch"
        price={199.99}
        image="/watch.jpg"
        rating={5}
        inStock={true}
      />
      <ProductCard
        name="Vintage Camera"
        price={299.99}
        image="/camera.jpg"
        rating={3}
        inStock={false}
      />
    </div>
  );
}
```

---

## Conditional Rendering

Show different content based on conditions:

### Using Ternary Operator

```jsx
function Greeting({ isLoggedIn, name }) {
  return (
    <div>
      {isLoggedIn ? <h1>Welcome back, {name}!</h1> : <h1>Please log in.</h1>}
    </div>
  );
}
```

### Using && (Logical AND)

```jsx
function Notification({ hasMessage, message }) {
  return <div>{hasMessage && <p className="notification">{message}</p>}</div>;
}
```

### Using Early Return

```jsx
function AdminPanel({ isAdmin }) {
  if (!isAdmin) {
    return <p>Access denied.</p>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      {/* Admin content */}
    </div>
  );
}
```

---

## Rendering Lists

Use `.map()` to render arrays of data:

```jsx
function TodoList() {
  const todos = [
    { id: 1, text: "Learn React", done: true },
    { id: 2, text: "Build a project", done: false },
    { id: 3, text: "Get a job", done: false },
  ];

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.done ? "✅" : "⬜"} {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

### The `key` Prop

When rendering lists, always include a unique `key` prop:

```jsx
// ✅ Good - using unique ID
{
  items.map((item) => <Item key={item.id} data={item} />);
}

// ⚠️ OK for static lists - using index
{
  items.map((item, index) => <Item key={index} data={item} />);
}

// ❌ Bad - no key
{
  items.map((item) => <Item data={item} />);
}
```

---

## Component Composition

Break down complex UIs into smaller components:

```jsx
// Small, focused components
function Avatar({ src, name }) {
  return <img src={src} alt={name} className="avatar" />;
}

function UserInfo({ name, email }) {
  return (
    <div className="user-info">
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
}

function FollowButton({ isFollowing, onClick }) {
  return (
    <button onClick={onClick}>{isFollowing ? "Unfollow" : "Follow"}</button>
  );
}

// Composed together
function UserCard({ user, isFollowing, onFollowClick }) {
  return (
    <div className="user-card">
      <Avatar src={user.avatar} name={user.name} />
      <UserInfo name={user.name} email={user.email} />
      <FollowButton isFollowing={isFollowing} onClick={onFollowClick} />
    </div>
  );
}
```

---

## Exercises

### Exercise 1: Greeting Component

Create a `Greeting` component that:

- Accepts `name` and `timeOfDay` props
- Displays "Good [morning/afternoon/evening], [name]!"
- Shows a different emoji based on time (🌅 morning, ☀️ afternoon, 🌙 evening)

### Exercise 2: Product Badge

Create a `Badge` component that:

- Accepts `text` and `variant` props
- Variant can be "success", "warning", or "error"
- Displays with appropriate colors

### Exercise 3: User Profile Card

Create a `ProfileCard` component with:

- Avatar image
- Name and bio
- List of skills (passed as an array)
- "Contact" button

---

## Summary

- **Components** are reusable pieces of UI
- Components are **functions** that return **JSX**
- **Props** pass data from parent to child
- Props are **read-only** - you can't modify them
- Use **curly braces** `{}` for JavaScript expressions in JSX
- Use **`.map()`** with **`key`** to render lists
- **Compose** small components into larger ones

---

## What's Next?

Now that you understand components and props, let's add **interactivity** with **State and useState** - the next lesson will teach you how to make components remember and update data!

---

_Estimated completion time: 45 minutes_  
_Difficulty: Beginner to Intermediate_
