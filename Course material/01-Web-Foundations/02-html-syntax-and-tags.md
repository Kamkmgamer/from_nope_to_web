# HTML Syntax & Tags

**Estimated Time:** 30 minutes  
**Prerequisites:** How the Web Works

---

## Introduction

HTML (HyperText Markup Language) is the foundation of every webpage. It's not a programming language - it's a **markup language** that tells the browser how to structure content.

By the end of this lesson, you will:

- Understand HTML syntax and structure
- Know the most common HTML tags
- Be able to create a complete webpage from scratch

---

## Anatomy of an HTML Element

Every HTML element has the same basic structure:

```html
<tagname attribute="value">Content goes here</tagname>
```

Let's break this down:

| Part            | Description                  | Example         |
| --------------- | ---------------------------- | --------------- |
| **Opening tag** | Starts the element           | `<p>`           |
| **Attribute**   | Extra information (optional) | `class="intro"` |
| **Content**     | What appears on the page     | `Hello World`   |
| **Closing tag** | Ends the element             | `</p>`          |

### Example

```html
<p class="greeting">Hello, World!</p>
│ │ │ │ │ │ │ └── Closing tag │ │ └── Content │ └── Attribute └── Opening tag
```

### Self-Closing Tags

Some elements don't have content and don't need a closing tag:

```html
<br />
<!-- Line break -->
<hr />
<!-- Horizontal line -->
<img src="photo.jpg" alt="A photo" />
<input type="text" />
```

---

## The Basic HTML Document Structure

Every HTML page needs this skeleton:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Page Title</title>
  </head>
  <body>
    <!-- Your content goes here -->
  </body>
</html>
```

### What Each Part Does

| Element           | Purpose                                                     |
| ----------------- | ----------------------------------------------------------- |
| `<!DOCTYPE html>` | Tells the browser this is HTML5                             |
| `<html>`          | The root element containing everything                      |
| `<head>`          | Contains metadata (not visible on page)                     |
| `<meta charset>`  | Specifies character encoding (UTF-8 supports all languages) |
| `<meta viewport>` | Makes the page responsive on mobile                         |
| `<title>`         | The text shown in the browser tab                           |
| `<body>`          | Contains all visible content                                |

---

## Essential HTML Tags

### Headings (h1 - h6)

Headings create a hierarchy of titles. Use only ONE `<h1>` per page.

```html
<h1>Main Title (Largest)</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h4>Smaller Heading</h4>
<h5>Even Smaller</h5>
<h6>Smallest Heading</h6>
```

**Best Practice:** Use headings in order. Don't skip from `<h1>` to `<h4>`.

### Paragraphs

```html
<p>This is a paragraph of text. It can be as long as you need.</p>

<p>
  This is another paragraph. Browsers automatically add space between
  paragraphs.
</p>
```

### Text Formatting

```html
<strong>Bold text (important)</strong>
<em>Italic text (emphasized)</em>
<u>Underlined text</u>
<s>Strikethrough text</s>
<mark>Highlighted text</mark>
<small>Smaller text</small>

<p>You can <strong>mix</strong> and <em>match</em> these tags.</p>
```

### Line Break and Horizontal Rule

```html
<p>This is line one.<br />This is line two.</p>

<hr />
<!-- A horizontal line appears here -->
```

---

## Links (Anchor Tags)

Links connect pages together. They're what make the web a "web"!

```html
<!-- External link (to another website) -->
<a href="https://google.com">Go to Google</a>

<!-- Internal link (to another page on your site) -->
<a href="about.html">About Us</a>

<!-- Link to a section on the same page -->
<a href="#contact">Jump to Contact Section</a>

<!-- Open in new tab -->
<a href="https://google.com" target="_blank">Open Google in New Tab</a>

<!-- Email link -->
<a href="mailto:hello@example.com">Send us an email</a>

<!-- Phone link -->
<a href="tel:+1234567890">Call us</a>
```

### The `target` Attribute

| Value    | Behavior                    |
| -------- | --------------------------- |
| `_self`  | Opens in same tab (default) |
| `_blank` | Opens in new tab            |

---

## Images

Images make your pages visual and engaging.

```html
<img src="photo.jpg" alt="Description of the image" />
```

### Required Attributes

| Attribute | Purpose                                      |
| --------- | -------------------------------------------- |
| `src`     | The path to the image file                   |
| `alt`     | Alternative text (for accessibility and SEO) |

### Image Examples

```html
<!-- Local image (in same folder) -->
<img src="dog.jpg" alt="A happy golden retriever" />

<!-- Image in a subfolder -->
<img src="images/cat.png" alt="A sleeping cat" />

<!-- Image from the internet -->
<img src="https://example.com/photo.jpg" alt="A beautiful sunset" />

<!-- With width and height -->
<img src="logo.png" alt="Company Logo" width="200" height="100" />
```

**Important:** Always include the `alt` attribute! It helps:

- Screen readers for blind users
- Search engines understand your images
- Display text if the image fails to load

---

## Lists

### Unordered Lists (Bullet Points)

```html
<ul>
  <li>Apples</li>
  <li>Bananas</li>
  <li>Oranges</li>
</ul>
```

Output:

- Apples
- Bananas
- Oranges

### Ordered Lists (Numbered)

```html
<ol>
  <li>Preheat the oven</li>
  <li>Mix the ingredients</li>
  <li>Bake for 30 minutes</li>
</ol>
```

Output:

1. Preheat the oven
2. Mix the ingredients
3. Bake for 30 minutes

### Nested Lists

```html
<ul>
  <li>
    Fruits
    <ul>
      <li>Apples</li>
      <li>Bananas</li>
    </ul>
  </li>
  <li>
    Vegetables
    <ul>
      <li>Carrots</li>
      <li>Broccoli</li>
    </ul>
  </li>
</ul>
```

---

## Containers: Divs and Spans

### The `<div>` Element

A `<div>` is a **block-level container**. It takes up the full width and starts on a new line.

```html
<div>
  <h2>Section Title</h2>
  <p>This paragraph is inside the div.</p>
</div>
```

### The `<span>` Element

A `<span>` is an **inline container**. It flows with the text.

```html
<p>My favorite color is <span style="color: blue;">blue</span>.</p>
```

### When to Use Each

| Element  | Use Case                              |
| -------- | ------------------------------------- |
| `<div>`  | Group block elements, create sections |
| `<span>` | Style a portion of text               |

---

## Semantic HTML

Semantic elements describe their meaning, making your code clearer and more accessible.

### Why Semantic HTML Matters

```html
<!-- Bad: Unclear what this is -->
<div class="header">...</div>

<!-- Good: Clear and meaningful -->
<header>...</header>
```

### Common Semantic Elements

```html
<header>Site header, logo, navigation</header>

<nav>Navigation links</nav>

<main>Main content of the page</main>

<section>A themed section of content</section>

<article>Self-contained content (blog post, news article)</article>

<aside>Sidebar, related content</aside>

<footer>Site footer, copyright, links</footer>
```

### Example Page Structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Blog</title>
  </head>
  <body>
    <header>
      <h1>My Blog</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>

    <main>
      <article>
        <h2>My First Post</h2>
        <p>This is my first blog post!</p>
      </article>

      <article>
        <h2>My Second Post</h2>
        <p>Another great post here.</p>
      </article>
    </main>

    <aside>
      <h3>About Me</h3>
      <p>I'm a web developer learning HTML.</p>
    </aside>

    <footer>
      <p>&copy; 2024 My Blog. All rights reserved.</p>
    </footer>
  </body>
</html>
```

---

## Tables

Tables display data in rows and columns.

```html
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
      <th>City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>25</td>
      <td>New York</td>
    </tr>
    <tr>
      <td>Bob</td>
      <td>30</td>
      <td>London</td>
    </tr>
  </tbody>
</table>
```

### Table Elements

| Element   | Purpose                      |
| --------- | ---------------------------- |
| `<table>` | Creates the table            |
| `<thead>` | Table header section         |
| `<tbody>` | Table body section           |
| `<tr>`    | Table row                    |
| `<th>`    | Header cell (bold, centered) |
| `<td>`    | Data cell                    |

---

## Forms (Introduction)

Forms collect user input.

```html
<form action="/submit" method="POST">
  <label for="name">Your Name:</label>
  <input type="text" id="name" name="name" required />

  <label for="email">Your Email:</label>
  <input type="email" id="email" name="email" required />

  <label for="message">Message:</label>
  <textarea id="message" name="message" rows="4"></textarea>

  <button type="submit">Send Message</button>
</form>
```

### Common Input Types

```html
<input type="text" />
<!-- Single-line text -->
<input type="email" />
<!-- Email (has validation) -->
<input type="password" />
<!-- Hidden text -->
<input type="number" />
<!-- Numbers only -->
<input type="checkbox" />
<!-- Checkbox -->
<input type="radio" />
<!-- Radio button -->
<input type="date" />
<!-- Date picker -->
<input type="file" />
<!-- File upload -->
<textarea></textarea>
<!-- Multi-line text -->
<select>
  <!-- Dropdown -->
  <option>Option 1</option>
  <option>Option 2</option>
</select>
```

---

## Comments

Comments are notes for developers. They don't appear on the page.

```html
<!-- This is a comment -->

<!--
  This is a
  multi-line comment
-->

<p>This is visible</p>
<!-- <p>This is hidden</p> -->
```

---

## Complete Example: Personal Profile Page

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>John Doe - Web Developer</title>
  </head>
  <body>
    <header>
      <h1>John Doe</h1>
      <p>Web Developer & Designer</p>
    </header>

    <nav>
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
    </nav>

    <main>
      <section id="about">
        <h2>About Me</h2>
        <img src="profile.jpg" alt="Photo of John Doe" width="200" />
        <p>
          Hello! I'm <strong>John Doe</strong>, a passionate web developer from
          <em>San Francisco</em>. I love creating beautiful and functional
          websites.
        </p>
        <p>When I'm not coding, you can find me hiking or reading.</p>
      </section>

      <section id="skills">
        <h2>My Skills</h2>
        <ul>
          <li>HTML & CSS</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>Node.js</li>
        </ul>
      </section>

      <section id="contact">
        <h2>Contact Me</h2>
        <p>Email: <a href="mailto:john@example.com">john@example.com</a></p>
        <p>
          GitHub:
          <a href="https://github.com/johndoe" target="_blank">@johndoe</a>
        </p>
      </section>
    </main>

    <footer>
      <hr />
      <p>&copy; 2024 John Doe. All rights reserved.</p>
    </footer>
  </body>
</html>
```

---

## Exercises

### Exercise 1: Create Your Profile Page

Create a personal profile page with:

- Your name as an `<h1>`
- A paragraph introducing yourself
- A list of your hobbies
- Links to your social media

### Exercise 2: Build a Recipe Page

Create a recipe page with:

- Recipe name as heading
- An image of the dish
- Ingredients as an unordered list
- Instructions as an ordered list

### Exercise 3: Create a Simple Form

Build a contact form with:

- Name input
- Email input
- Message textarea
- Submit button

---

## Summary

- HTML elements have **opening tags, content, and closing tags**
- Every page needs the basic structure: `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`
- Use **semantic elements** (`<header>`, `<nav>`, `<main>`, `<footer>`) for clarity
- Always include **alt text** on images
- Use the right element for the job:
  - `<h1>`-`<h6>` for headings
  - `<p>` for paragraphs
  - `<a>` for links
  - `<ul>`/`<ol>` for lists

---

## What's Next?

Now that you understand HTML, it's time to make it beautiful with **CSS**! In the next lesson, we'll learn how to add colors, fonts, layouts, and more.

---

_Estimated completion time: 30 minutes_  
_Difficulty: Beginner_
