# How the Web Works

**Estimated Time:** 15 minutes  
**Prerequisites:** None - this is your starting point!

---

## Introduction

Welcome to your very first lesson in web development! Before we write any code, we need to understand how websites actually work. Think of it like learning to drive - before you get behind the wheel, you need to know what a car is, what the pedals do, and how roads work.

By the end of this lesson, you will understand:

- What happens when you visit a website
- The difference between a client and a server
- The three core technologies of the web

---

## The Restaurant Analogy

Imagine you're at a restaurant:

| Restaurant             | The Web                                         |
| ---------------------- | ----------------------------------------------- |
| **You (the customer)** | Your web browser (Chrome, Firefox, Safari)      |
| **The menu**           | The website's URL (like google.com)             |
| **The waiter**         | The internet connection                         |
| **The kitchen**        | The web server (a computer storing the website) |
| **Your food**          | The website files (HTML, CSS, JavaScript)       |

Here's what happens:

1. **You look at the menu** → You type a URL into your browser
2. **You tell the waiter your order** → Your browser sends a "request" over the internet
3. **The waiter goes to the kitchen** → The request travels to the server
4. **The kitchen prepares your food** → The server finds the right files
5. **The waiter brings your food** → The server sends files back to your browser
6. **You eat and enjoy** → Your browser displays the website

---

## The Client-Server Model

### What is a Client?

A **client** is any device that requests information. In web development, the client is usually:

- Your web browser (Chrome, Firefox, Safari, Edge)
- A mobile app
- Any software that connects to the internet to get data

**The client asks questions.**

### What is a Server?

A **server** is a computer that stores websites and responds to requests. When you visit google.com:

- Google has thousands of servers around the world
- These servers are just computers (very powerful ones) running 24/7
- They wait for requests and send back the appropriate files

**The server provides answers.**

### The Request-Response Cycle

```
┌──────────────┐                           ┌──────────────┐
│              │  1. REQUEST               │              │
│    CLIENT    │  "Give me google.com"     │    SERVER    │
│   (Browser)  │ ─────────────────────────>│   (Google)   │
│              │                           │              │
│              │  2. RESPONSE              │              │
│              │  HTML, CSS, JS files      │              │
│              │ <─────────────────────────│              │
└──────────────┘                           └──────────────┘
```

---

## What Happens When You Type google.com?

Let's break it down step by step:

### Step 1: You Type the URL

You type `google.com` in your browser's address bar and press Enter.

### Step 2: DNS Lookup

Your browser doesn't understand "google.com" - it needs a number! The **Domain Name System (DNS)** is like the internet's phone book. It converts:

```
google.com → 142.250.185.78
```

This number is called an **IP address** - every server has one.

### Step 3: The Request

Your browser creates an **HTTP request** and sends it to Google's server:

```
GET / HTTP/1.1
Host: google.com
User-Agent: Chrome/91.0
```

This basically says: "Hello Google! Please send me your homepage."

### Step 4: The Server Responds

Google's server receives your request and sends back:

```
HTTP/1.1 200 OK
Content-Type: text/html

<!DOCTYPE html>
<html>
  <head>...</head>
  <body>...</body>
</html>
```

### Step 5: The Browser Renders

Your browser receives the HTML, CSS, and JavaScript files and **renders** them - turning code into the beautiful, interactive page you see.

---

## The Three Languages of the Web

Every website you've ever visited uses these three technologies:

### 1. HTML (HyperText Markup Language)

**What it does:** Defines the structure and content of the page.

Think of HTML as the **skeleton** of a webpage. It tells the browser:

- "Here's a heading"
- "Here's a paragraph"
- "Here's an image"
- "Here's a button"

```html
<h1>Welcome to My Website</h1>
<p>This is a paragraph of text.</p>
<button>Click Me!</button>
```

### 2. CSS (Cascading Style Sheets)

**What it does:** Controls the visual appearance and layout.

Think of CSS as the **skin, clothes, and makeup**. It tells the browser:

- "Make the heading blue"
- "Use this font"
- "Put this element on the right side"
- "Add a shadow to this box"

```css
h1 {
  color: blue;
  font-size: 32px;
}
```

### 3. JavaScript

**What it does:** Adds interactivity and dynamic behavior.

Think of JavaScript as the **brain and muscles**. It tells the browser:

- "When the user clicks this button, show a message"
- "Validate this form before submitting"
- "Load more content when the user scrolls down"
- "Update this number every second"

```javascript
button.addEventListener("click", function () {
  alert("Hello, World!");
});
```

---

## Try It Yourself: Your First Webpage

Let's create your very first webpage!

### Step 1: Open a Text Editor

Use any text editor:

- **Notepad** (Windows)
- **TextEdit** (Mac - make sure it's in plain text mode)
- **VS Code** (recommended - it's free and powerful)

### Step 2: Write This Code

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Website</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>I just created my first website!</p>
    <p>This is so exciting!</p>
  </body>
</html>
```

### Step 3: Save the File

Save the file as `index.html` (make sure it ends with `.html`, not `.txt`).

### Step 4: Open in Browser

Double-click the file. It will open in your default web browser.

🎉 **Congratulations! You just created your first website!**

---

## Key Vocabulary

| Term           | Definition                                                        |
| -------------- | ----------------------------------------------------------------- |
| **Browser**    | Software that displays websites (Chrome, Firefox, Safari)         |
| **Server**     | A computer that stores and serves website files                   |
| **Client**     | Any device requesting information from a server                   |
| **URL**        | Uniform Resource Locator - the address of a webpage               |
| **DNS**        | Domain Name System - converts domain names to IP addresses        |
| **IP Address** | A unique number identifying a computer on the internet            |
| **HTTP**       | HyperText Transfer Protocol - the rules for transferring web data |
| **HTML**       | HyperText Markup Language - defines webpage structure             |
| **CSS**        | Cascading Style Sheets - defines webpage styling                  |
| **JavaScript** | Programming language that adds interactivity                      |
| **Render**     | The process of displaying a webpage from code                     |

---

## Exercises

### Exercise 1: Modify Your First Page

1. Open `index.html` in your text editor
2. Change "Hello, World!" to your name
3. Add another paragraph about yourself
4. Save and refresh your browser

### Exercise 2: Inspect a Website

1. Go to any website (like google.com)
2. Right-click anywhere on the page
3. Click "Inspect" or "Inspect Element"
4. Explore the HTML structure in the panel that opens

### Exercise 3: Research Questions

Answer these questions:

1. What browser do you use? What version is it?
2. What does "www" stand for?
3. What is the difference between HTTP and HTTPS?

---

## Summary

- Websites work on a **client-server model**: your browser (client) requests files from a server
- When you visit a URL, **DNS** converts the domain name to an IP address
- The server sends back **HTML, CSS, and JavaScript** files
- Your browser **renders** these files into the page you see
- **HTML** = Structure, **CSS** = Style, **JavaScript** = Interactivity

---

## What's Next?

In the next lesson, we'll dive deep into **HTML** - learning all the tags and how to structure a proper webpage. Get ready to build something real!

---

_Estimated completion time: 15 minutes_  
_Difficulty: Beginner_
