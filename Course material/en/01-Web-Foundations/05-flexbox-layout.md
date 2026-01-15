# Flexbox Layout

**Estimated Time:** 35 minutes  
**Prerequisites:** The Box Model

---

## Introduction

Before Flexbox, centering elements and creating layouts was incredibly frustrating. Flexbox (Flexible Box Layout) solves these problems elegantly.

By the end of this lesson, you will:

- Understand how Flexbox works
- Create horizontal and vertical layouts
- Align and distribute items perfectly
- Build responsive layouts without media queries

---

## What is Flexbox?

Flexbox is a one-dimensional layout system. "One-dimensional" means it handles layout in one direction at a time - either as a row OR a column.

### The Two Key Concepts

1. **Flex Container** - The parent element with `display: flex`
2. **Flex Items** - The direct children of the flex container

```html
<div class="container">
  <!-- Flex Container -->
  <div class="item">1</div>
  <!-- Flex Item -->
  <div class="item">2</div>
  <!-- Flex Item -->
  <div class="item">3</div>
  <!-- Flex Item -->
</div>
```

```css
.container {
  display: flex; /* This makes it a flex container */
}
```

---

## Main Axis vs Cross Axis

Flexbox has two axes:

### Row Direction (default):

```
Main Axis →
┌─────────────────────────────────────────────┐
│  ┌─────┐  ┌─────┐  ┌─────┐                 │ │ Cross
│  │  1  │  │  2  │  │  3  │                 │ │ Axis
│  └─────┘  └─────┘  └─────┘                 │ │ ↓
└─────────────────────────────────────────────┘
```

### Column Direction:

```
│ Main Axis
│ ↓
┌───────────────────┐
│      ┌─────┐      │ Cross Axis →
│      │  1  │      │
│      └─────┘      │
│      ┌─────┐      │
│      │  2  │      │
│      └─────┘      │
│      ┌─────┐      │
│      │  3  │      │
│      └─────┘      │
└───────────────────┘
```

---

## Container Properties

These go on the parent (flex container).

### flex-direction

Controls the direction of the main axis:

```css
.container {
  display: flex;
  flex-direction: row; /* Default: left to right */
  flex-direction: row-reverse; /* Right to left */
  flex-direction: column; /* Top to bottom */
  flex-direction: column-reverse; /* Bottom to top */
}
```

### justify-content

Aligns items along the **main axis**:

```css
.container {
  display: flex;
  justify-content: flex-start; /* Pack at start (default) */
  justify-content: flex-end; /* Pack at end */
  justify-content: center; /* Center items */
  justify-content: space-between; /* Equal space between, none at edges */
  justify-content: space-around; /* Equal space around each item */
  justify-content: space-evenly; /* Truly equal spacing */
}
```

Visual representation (row direction):

```
flex-start:     [1][2][3]           |
flex-end:                    [1][2][3]
center:              [1][2][3]
space-between:  [1]     [2]     [3]
space-around:    [1]   [2]   [3]
space-evenly:   [1]   [2]   [3]
```

### align-items

Aligns items along the **cross axis**:

```css
.container {
  display: flex;
  align-items: stretch; /* Stretch to fill (default) */
  align-items: flex-start; /* Align to top */
  align-items: flex-end; /* Align to bottom */
  align-items: center; /* Center vertically */
  align-items: baseline; /* Align text baselines */
}
```

### gap

Adds space between items (the modern way!):

```css
.container {
  display: flex;
  gap: 20px; /* Equal gap in all directions */
  gap: 10px 20px; /* row-gap, column-gap */
  row-gap: 10px; /* Vertical gap only */
  column-gap: 20px; /* Horizontal gap only */
}
```

### flex-wrap

Controls whether items wrap to new lines:

```css
.container {
  display: flex;
  flex-wrap: nowrap; /* All on one line (default) */
  flex-wrap: wrap; /* Wrap to next line */
  flex-wrap: wrap-reverse; /* Wrap upwards */
}
```

---

## Item Properties

These go on the children (flex items).

### flex-grow

How much an item should grow relative to siblings:

```css
.item {
  flex-grow: 0; /* Don't grow (default) */
  flex-grow: 1; /* Grow equally with other flex-grow: 1 items */
  flex-grow: 2; /* Grow twice as much as flex-grow: 1 items */
}
```

```
/* All items flex-grow: 1 */
┌────────────┬────────────┬────────────┐
│     1      │     2      │     3      │
└────────────┴────────────┴────────────┘

/* Item 2 has flex-grow: 2 */
┌────────┬────────────────┬────────┐
│   1    │        2       │   3    │
└────────┴────────────────┴────────┘
```

### flex-shrink

How much an item should shrink when space is limited:

```css
.item {
  flex-shrink: 1; /* Shrink equally (default) */
  flex-shrink: 0; /* Don't shrink */
  flex-shrink: 2; /* Shrink twice as much */
}
```

### flex-basis

The starting size before growing/shrinking:

```css
.item {
  flex-basis: auto; /* Use natural size (default) */
  flex-basis: 200px; /* Start at 200px */
  flex-basis: 30%; /* Start at 30% of container */
  flex-basis: 0; /* Start at 0, grow from there */
}
```

### The flex Shorthand

Combines grow, shrink, and basis:

```css
.item {
  flex: 1; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0% */
  flex: 0 0 200px; /* Don't grow, don't shrink, stay at 200px */
  flex: 2 1 auto; /* Grow double, normal shrink, auto basis */
}
```

### align-self

Override align-items for a single item:

```css
.special-item {
  align-self: flex-end; /* This item at the bottom */
}
```

### order

Change display order without changing HTML:

```css
.item1 {
  order: 3;
}
.item2 {
  order: 1;
}
.item3 {
  order: 2;
}
/* Displays as: item2, item3, item1 */
```

---

## Common Patterns

### Center Everything (Vertically and Horizontally)

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
}
```

This is the **easiest way to center** anything in CSS!

### Navigation Bar

```html
<nav class="navbar">
  <a href="/" class="logo">Logo</a>
  <ul class="nav-links">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
```

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #333;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}
```

### Card Grid

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 300px; /* Grow, shrink, min-width 300px */
  /* Cards will be at least 300px and fill available space */
}
```

### Sidebar Layout

```html
<div class="layout">
  <aside class="sidebar">Sidebar</aside>
  <main class="content">Main Content</main>
</div>
```

```css
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  flex: 0 0 250px; /* Fixed width sidebar */
  background: #f0f0f0;
}

.content {
  flex: 1; /* Takes remaining space */
  padding: 2rem;
}
```

### Footer at Bottom

```css
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1; /* Grows to push footer down */
}

footer {
  /* Stays at bottom */
}
```

---

## Practical Example: Product Card Layout

```html
<div class="product-grid">
  <article class="product-card">
    <img src="product1.jpg" alt="Product 1" />
    <div class="product-info">
      <h3>Product Name</h3>
      <p>Description here</p>
      <div class="product-footer">
        <span class="price">$99.99</span>
        <button>Add to Cart</button>
      </div>
    </div>
  </article>
  <!-- More cards... -->
</div>
```

```css
.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 24px;
}

.product-card {
  flex: 1 1 280px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.product-info p {
  flex: 1; /* Push footer to bottom */
  color: #666;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2563eb;
}
```

---

## Exercises

### Exercise 1: Center a Box

Create a page with a centered box (both horizontally and vertically).

### Exercise 2: Navigation Bar

Build a responsive navbar with:

- Logo on the left
- Navigation links on the right
- All items vertically centered

### Exercise 3: Holy Grail Layout

Create a layout with:

- Header at top
- Footer at bottom (even with little content)
- Main content area with sidebar

---

## Summary

- **Flex container** (`display: flex`) enables Flexbox on children
- **Main axis** = direction of flex-direction (row = horizontal)
- **Cross axis** = perpendicular to main axis
- **justify-content** = main axis alignment
- **align-items** = cross axis alignment
- **gap** = spacing between items
- **flex: 1** makes items grow equally
- Flexbox makes centering trivially easy!

---

## What's Next?

Flexbox handles one-dimensional layouts. For two-dimensional layouts (rows AND columns), we use **CSS Grid** - but Flexbox handles 90% of layout needs!

---

_Estimated completion time: 35 minutes_  
_Difficulty: Beginner to Intermediate_
