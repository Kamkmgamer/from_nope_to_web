# CSS Selectors

**Estimated Time:** 30 minutes  
**Prerequisites:** HTML Syntax & Tags

---

## Introduction

CSS (Cascading Style Sheets) is what makes websites beautiful. While HTML defines the structure, CSS controls the visual appearance - colors, fonts, spacing, layouts, and more.

By the end of this lesson, you will:

- Understand how to add CSS to HTML
- Master the three types of selectors
- Know the most commonly used CSS properties

---

## Three Ways to Add CSS

### Method 1: Inline CSS (Not Recommended)

CSS directly in the HTML element using the `style` attribute.

```html
<p style="color: red; font-size: 18px;">This is red text.</p>
```

**Pros:** Quick for testing  
**Cons:** Hard to maintain, can't reuse styles

### Method 2: Internal CSS (Sometimes OK)

CSS inside a `<style>` tag in the document's `<head>`.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      p {
        color: red;
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <p>This is red text.</p>
  </body>
</html>
```

**Pros:** Styles are organized in one place  
**Cons:** Can't share between pages

### Method 3: External CSS (Best Practice ✅)

CSS in a separate `.css` file, linked in the `<head>`.

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <p>This is red text.</p>
  </body>
</html>
```

```css
/* styles.css */
p {
  color: red;
  font-size: 18px;
}
```

**Pros:**

- Separates concerns (HTML = content, CSS = style)
- One file can style multiple pages
- Browser can cache the CSS file (faster loading)

---

## CSS Syntax

Every CSS rule follows this pattern:

```css
selector {
  property: value;
  another-property: another-value;
}
```

### Example Breakdown

```css
h1 {
  color: blue;
  font-size: 32px;
  text-align: center;
}
```

| Part    | Description                                 |
| ------- | ------------------------------------------- |
| `h1`    | **Selector** - what elements to style       |
| `{ }`   | **Declaration block** - contains the styles |
| `color` | **Property** - what aspect to change        |
| `blue`  | **Value** - the new setting                 |
| `;`     | **Semicolon** - ends each declaration       |

---

## Types of Selectors

### 1. Element Selector

Targets ALL elements of that type on the page.

```css
/* All paragraphs will be gray */
p {
  color: gray;
}

/* All headings will be blue */
h1,
h2,
h3 {
  color: blue;
}
```

**Use when:** You want to style every instance of an element.

### 2. Class Selector (.)

Targets elements with a specific `class` attribute. **Most commonly used!**

```html
<p class="intro">This is the introduction.</p>
<p>This is a regular paragraph.</p>
<p class="intro">This also has the intro class.</p>
```

```css
.intro {
  font-size: 20px;
  font-weight: bold;
  color: navy;
}
```

**Key features:**

- Starts with a dot (`.`)
- Can be reused on multiple elements
- An element can have multiple classes

```html
<div class="card featured large">Multiple classes on one element!</div>
```

### 3. ID Selector (#)

Targets ONE specific element with a unique `id` attribute.

```html
<div id="header">Site header</div>
```

```css
#header {
  background-color: black;
  color: white;
  padding: 20px;
}
```

**Key features:**

- Starts with a hash (`#`)
- Should only be used once per page
- Higher specificity than classes

**Best practice:** Prefer classes over IDs for styling. IDs are better for JavaScript or anchor links.

---

## Combining Selectors

### Multiple Selectors (Comma)

Apply the same styles to multiple selectors:

```css
h1,
h2,
h3,
h4 {
  font-family: Arial, sans-serif;
  color: #333;
}
```

### Descendant Selector (Space)

Target elements inside other elements:

```html
<div class="card">
  <p>This paragraph is inside the card.</p>
</div>
<p>This paragraph is outside.</p>
```

```css
.card p {
  color: blue; /* Only paragraphs INSIDE .card */
}
```

### Direct Child (>)

Target only immediate children:

```css
.card > p {
  color: blue; /* Only direct child paragraphs */
}
```

### Element with Class

Target specific elements with a class:

```css
p.intro {
  font-size: 18px; /* Only paragraphs with class "intro" */
}
```

---

## Common CSS Properties

### Colors

```css
.element {
  color: red; /* Text color - named color */
  color: #ff0000; /* Hex code (same as red) */
  color: rgb(255, 0, 0); /* RGB (same as red) */
  color: rgba(255, 0, 0, 0.5); /* RGB with 50% opacity */

  background-color: #f0f0f0; /* Background color */
}
```

### Typography

```css
.element {
  font-family: Arial, Helvetica, sans-serif; /* Font stack */
  font-size: 16px; /* Size in pixels */
  font-size: 1.5rem; /* Size relative to root */
  font-weight: bold; /* bold, normal, or 100-900 */
  font-style: italic; /* italic or normal */

  text-align: center; /* left, center, right, justify */
  text-decoration: underline; /* underline, line-through, none */
  text-transform: uppercase; /* uppercase, lowercase, capitalize */

  line-height: 1.5; /* Space between lines */
  letter-spacing: 1px; /* Space between letters */
}
```

### Spacing (Box Model)

```css
.element {
  /* Margin = Outside space (between elements) */
  margin: 10px; /* All sides */
  margin: 10px 20px; /* Top/bottom, left/right */
  margin: 10px 20px 15px 25px; /* Top, right, bottom, left */
  margin-top: 10px; /* Individual side */

  /* Padding = Inside space (between content and border) */
  padding: 20px;
  padding: 10px 20px;

  /* Border */
  border: 1px solid black;
  border-radius: 8px; /* Rounded corners */
}
```

### Size

```css
.element {
  width: 300px; /* Fixed width */
  width: 50%; /* Percentage of parent */
  max-width: 1200px; /* Maximum width */
  min-width: 200px; /* Minimum width */

  height: 200px;
  min-height: 100vh; /* At least full viewport height */
}
```

### Display & Positioning

```css
.element {
  display: block; /* Takes full width, new line */
  display: inline; /* Flows with text */
  display: inline-block; /* Inline but can have width/height */
  display: none; /* Hide completely */

  position: relative; /* Relative to normal position */
  position: absolute; /* Relative to positioned parent */
  position: fixed; /* Relative to viewport */
}
```

---

## Specificity: Which Styles Win?

When multiple rules target the same element, CSS uses **specificity** to decide which wins.

```
Inline styles    > ID selectors   > Class selectors > Element selectors
(style="...")      (#id)            (.class)          (tag)
   1000              100               10                 1
```

### Example

```html
<p id="special" class="intro">Hello</p>
```

```css
p {
  color: black;
} /* Specificity: 1 */
.intro {
  color: blue;
} /* Specificity: 10 */
#special {
  color: red;
} /* Specificity: 100 */
```

**Result:** The text is **red** because `#special` has the highest specificity.

### The `!important` Override

```css
p {
  color: blue !important; /* Overrides everything (avoid using!) */
}
```

**Warning:** Using `!important` makes CSS hard to debug. Only use as a last resort.

---

## Pseudo-Classes

Target elements in specific states:

```css
/* When mouse hovers over element */
.button:hover {
  background-color: darkblue;
}

/* When element is clicked */
.button:active {
  background-color: navy;
}

/* When input is focused */
input:focus {
  border-color: blue;
  outline: none;
}

/* First and last child */
li:first-child {
  font-weight: bold;
}
li:last-child {
  color: gray;
}

/* Every other row */
tr:nth-child(even) {
  background: #f5f5f5;
}
```

---

## Practical Example: Styling a Card

```html
<div class="card">
  <img src="product.jpg" alt="Product" class="card-image" />
  <div class="card-content">
    <h3 class="card-title">Product Name</h3>
    <p class="card-description">This is a great product for everyone.</p>
    <span class="card-price">$29.99</span>
    <button class="card-button">Add to Cart</button>
  </div>
</div>
```

```css
.card {
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
}

.card-description {
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.card-price {
  display: block;
  margin: 12px 0;
  font-size: 24px;
  font-weight: bold;
  color: #2563eb;
}

.card-button {
  width: 100%;
  padding: 12px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.card-button:hover {
  background-color: #1d4ed8;
}
```

---

## Exercises

### Exercise 1: Style Your Profile Page

Take the HTML profile page from the previous lesson and add CSS:

- Change the font to Arial or another font
- Add a background color to the header
- Style the navigation links with hover effects
- Add spacing between sections

### Exercise 2: Create a Styled Button

Create a button with these styles:

- Background color of your choice
- White text
- Padding of 12px 24px
- Rounded corners
- Different color on hover

### Exercise 3: Specificity Challenge

Given this HTML:

```html
<p id="main" class="text large">Hello World</p>
```

Write CSS rules using element, class, and ID selectors to turn the text:

1. First red (using element)
2. Then blue (using class)
3. Finally green (using ID)

---

## Summary

- Use **external CSS files** for best practice
- The **three selectors**: element (`p`), class (`.intro`), ID (`#main`)
- **Classes** are the most commonly used and reusable
- **Specificity** determines which styles apply when there are conflicts
- Use **pseudo-classes** like `:hover` for interactive states

---

## What's Next?

Now that you can select elements and apply styles, let's learn about the **CSS Box Model** - understanding how spacing, borders, and sizing really work!

---

_Estimated completion time: 30 minutes_  
_Difficulty: Beginner_
