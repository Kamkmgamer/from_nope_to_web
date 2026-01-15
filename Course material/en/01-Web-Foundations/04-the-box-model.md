# The CSS Box Model

**Estimated Time:** 25 minutes  
**Prerequisites:** CSS Selectors

---

## Introduction

Every single element in HTML is a rectangular box. Even circles are boxes with very rounded corners! Understanding the **Box Model** is crucial for controlling layout and spacing.

By the end of this lesson, you will:

- Understand the four layers of the box model
- Master margin, padding, and border
- Know the difference between `content-box` and `border-box`

---

## The Four Layers

Every element has four layers, from inside to outside:

```
┌─────────────────────────────────────────────────────────┐
│                        MARGIN                           │
│   ┌─────────────────────────────────────────────────┐   │
│   │                    BORDER                       │   │
│   │   ┌─────────────────────────────────────────┐   │   │
│   │   │              PADDING                    │   │   │
│   │   │   ┌─────────────────────────────────┐   │   │   │
│   │   │   │           CONTENT               │   │   │   │
│   │   │   │   (text, images, child elements) │   │   │   │
│   │   │   └─────────────────────────────────┘   │   │   │
│   │   │                                         │   │   │
│   │   └─────────────────────────────────────────┘   │   │
│   │                                                 │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Picture Frame Analogy

Think of it like a picture in a frame:

| Box Model Part | Picture Frame Equivalent             |
| -------------- | ------------------------------------ |
| **Content**    | The photograph itself                |
| **Padding**    | The white mat board around the photo |
| **Border**     | The wooden frame                     |
| **Margin**     | The space between frames on the wall |

---

## Content

The content is the actual text, image, or child elements inside the element.

```css
.box {
  width: 300px; /* Content width */
  height: 200px; /* Content height */
}
```

---

## Padding

Padding is the space **inside** the border, between the border and the content.

```css
.box {
  /* All four sides the same */
  padding: 20px;

  /* Top/bottom, left/right */
  padding: 10px 20px;

  /* Top, right, bottom, left (clockwise) */
  padding: 10px 20px 15px 25px;

  /* Individual sides */
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 15px;
  padding-left: 25px;
}
```

### Padding Visualization

```
┌──────────────────────┐
│                      │ ← padding-top: 20px
│   ┌──────────────┐   │
│   │   Content    │   │ ← padding-left: 20px
│   └──────────────┘   │
│                      │ ← padding-bottom: 20px
└──────────────────────┘
```

---

## Border

The border is a line around the padding and content.

```css
.box {
  /* Shorthand: width style color */
  border: 2px solid black;

  /* Individual properties */
  border-width: 2px;
  border-style: solid; /* solid, dashed, dotted, double, none */
  border-color: black;

  /* Individual sides */
  border-top: 3px dashed red;
  border-bottom: 1px solid gray;

  /* Rounded corners */
  border-radius: 8px; /* All corners */
  border-radius: 50%; /* Perfect circle */
  border-radius: 10px 0 10px 0; /* Top-left, top-right, bottom-right, bottom-left */
}
```

### Border Styles

| Style    | Appearance   |
| -------- | ------------ |
| `solid`  | ───────────  |
| `dashed` | - - - - - -  |
| `dotted` | ············ |
| `double` | ═══════════  |
| `none`   | (invisible)  |

---

## Margin

Margin is the space **outside** the border, between this element and neighboring elements.

```css
.box {
  /* Same syntax as padding */
  margin: 20px; /* All sides */
  margin: 10px 20px; /* Top/bottom, left/right */
  margin: 10px 20px 15px 25px; /* Top, right, bottom, left */

  /* Center horizontally */
  margin: 0 auto;

  /* Individual sides */
  margin-top: 10px;
  margin-bottom: 20px;
}
```

### Margin Collapse

**Important:** Vertical margins collapse (they don't add up, the larger one wins).

```css
.box1 {
  margin-bottom: 20px;
}
.box2 {
  margin-top: 30px;
}
/* Gap between them is 30px, NOT 50px */
```

### Negative Margins

Margins can be negative, pulling elements closer:

```css
.overlap {
  margin-top: -20px; /* Overlaps with element above */
}
```

---

## The Width Problem

By default, `width` only applies to the **content**, not including padding and border.

```css
.box {
  width: 300px;
  padding: 20px;
  border: 10px solid black;
}
```

**Actual width on screen:**

- Content: 300px
- - Padding left: 20px
- - Padding right: 20px
- - Border left: 10px
- - Border right: 10px
- = **360px total!**

This is confusing and makes layout hard.

---

## Box-Sizing: The Solution

The `box-sizing` property changes how width/height are calculated.

### Default: `content-box`

Width/height = content only.

```css
.box {
  box-sizing: content-box; /* Default behavior */
  width: 300px;
  padding: 20px;
  border: 10px;
  /* Total width = 300 + 40 + 20 = 360px */
}
```

### Better: `border-box`

Width/height = content + padding + border.

```css
.box {
  box-sizing: border-box; /* Much easier! */
  width: 300px;
  padding: 20px;
  border: 10px;
  /* Total width = 300px (content shrinks to fit) */
}
```

### Best Practice: Apply Globally

Most developers add this to every project:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

This makes all elements use `border-box`, which is much more intuitive.

---

## Box Shadow

Add shadows to create depth:

```css
.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /*          │  │   │    └─ Color with transparency
              │  │   └─ Blur radius
              │  └─ Vertical offset
              └─ Horizontal offset */

  /* Multiple shadows */
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.1);

  /* Inset shadow (inside the box) */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

---

## Overflow

Control what happens when content is larger than the box:

```css
.box {
  width: 200px;
  height: 100px;
  overflow: hidden; /* Hide overflow */
  overflow: scroll; /* Always show scrollbars */
  overflow: auto; /* Scrollbars only when needed */
  overflow: visible; /* Show overflow (default) */

  /* Control separately */
  overflow-x: auto; /* Horizontal overflow */
  overflow-y: hidden; /* Vertical overflow */
}
```

---

## Practical Example: Card Component

```html
<div class="card">
  <img src="product.jpg" alt="Product" class="card-image" />
  <div class="card-body">
    <h3 class="card-title">Premium Widget</h3>
    <p class="card-text">This is an amazing widget that does everything.</p>
    <button class="card-button">Buy Now</button>
  </div>
</div>
```

```css
/* Apply border-box globally */
* {
  box-sizing: border-box;
}

.card {
  width: 320px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden; /* Clips the image to rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover; /* Maintain aspect ratio */
}

.card-body {
  padding: 20px; /* Space inside the content area */
}

.card-title {
  margin: 0 0 12px 0; /* No top margin, 12px bottom */
  font-size: 20px;
}

.card-text {
  margin: 0 0 16px 0;
  color: #6b7280;
  line-height: 1.6;
}

.card-button {
  width: 100%;
  padding: 12px 24px; /* Inner spacing */
  margin: 0; /* No outer spacing */
  border: none;
  border-radius: 8px;
  background: #3b82f6;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.card-button:hover {
  background: #2563eb;
}
```

---

## DevTools: Your Best Friend

Every browser has built-in developer tools that show the box model:

1. Right-click any element on a webpage
2. Click "Inspect" or "Inspect Element"
3. Look at the box model diagram in the Styles panel

The diagram shows:

- Blue = Content
- Green = Padding
- Orange/Yellow = Border
- Orange (outer) = Margin

You can hover over elements to see their box model visualized on the page!

---

## Exercises

### Exercise 1: Spacing Practice

Create a box with:

- 200px width
- 20px padding
- 2px solid gray border
- 10px border radius
- 30px margin

Calculate the total width, then verify with DevTools.

### Exercise 2: Three Cards

Create a row of three cards:

- Each card is 300px wide
- 20px gap between cards
- 16px padding inside each card
- Box shadow
- Hover effect that adds more shadow

### Exercise 3: Centered Container

Create a centered container:

- Maximum width of 1200px
- 20px padding on left and right
- Automatically centered with `margin: 0 auto`

---

## Summary

- **Content** = The actual stuff inside the element
- **Padding** = Space inside the border (push content inward)
- **Border** = The frame around the element
- **Margin** = Space outside the border (push other elements away)
- Always use `box-sizing: border-box` for easier calculations
- Use `overflow` to control what happens when content doesn't fit
- Use DevTools to visualize and debug the box model

---

## What's Next?

Now that you understand spacing, let's explore **Flexbox** - a powerful way to create layouts and align elements!

---

_Estimated completion time: 25 minutes_  
_Difficulty: Beginner_
