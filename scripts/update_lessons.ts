
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";

const CONVEX_URL = "https://precise-dragon-572.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

// Rich lesson content definitions
const lessonContent: Record<string, { contentEn: string; contentAr: string }> = {
  "how-web-works": {
    contentEn: `
# How the Web Works

Welcome to your first lesson! Before we write any code, let's understand how websites actually work.

## What Happens When You Visit a Website?

Imagine ordering food at a restaurant:
1. **You (the Customer)** = Your Browser (Chrome, Firefox, Safari)
2. **The Waiter** = The Internet
3. **The Kitchen** = The Server (a computer storing the website)

When you type \`google.com\`:
1. Your browser asks "Where is google.com?" (DNS lookup)
2. The internet finds Google's server address
3. Your browser sends a **request**: "Give me the homepage!"
4. Google's server sends back HTML, CSS, and JavaScript files
5. Your browser reads these files and draws the page

## The Three Languages of the Web

Every website uses three core technologies:

| Language | Purpose | Analogy |
|----------|---------|---------|
| **HTML** | Structure & Content | The skeleton/bones |
| **CSS** | Styling & Layout | The skin, clothes, makeup |
| **JavaScript** | Interactivity | The muscles & brain |

## Your First HTML Page

Create a file called \`index.html\` and paste this:

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>I just made my first website!</p>
  </body>
</html>
\`\`\`

Double-click the file to open it in your browser. Congratulations! 🎉

## Key Takeaways
- Browsers request files from servers
- HTML structures content, CSS styles it, JavaScript adds behavior
- You can create websites with just a text editor!

## Homework
1. Create your own \`index.html\` file
2. Change the text inside \`<h1>\` and \`<p>\`
3. Try adding a second paragraph
`,
    contentAr: `
# كيف يعمل الويب

مرحباً بك في درسك الأول! قبل كتابة أي كود، دعنا نفهم كيف تعمل المواقع.

## ماذا يحدث عند زيارة موقع؟

تخيل طلب الطعام في مطعم:
1. **أنت (الزبون)** = متصفحك (Chrome, Firefox, Safari)
2. **النادل** = الإنترنت
3. **المطبخ** = الخادم (كمبيوتر يخزن الموقع)

## اللغات الثلاث للويب

| اللغة | الغرض | التشبيه |
|-------|-------|---------|
| **HTML** | الهيكل والمحتوى | الهيكل العظمي |
| **CSS** | التنسيق والتخطيط | الجلد والملابس |
| **JavaScript** | التفاعلية | العضلات والدماغ |

## الواجب
1. أنشئ ملف \`index.html\` خاص بك
2. غير النص داخل \`<h1>\` و \`<p>\`
`
  },

  "html-syntax": {
    contentEn: `
# HTML Syntax & Tags

Now let's learn the grammar of HTML!

## Anatomy of an HTML Element

\`\`\`html
<tagname attribute="value">Content</tagname>
\`\`\`

- **Opening tag**: \`<tagname>\`
- **Content**: Text or other elements
- **Closing tag**: \`</tagname>\`
- **Attributes**: Extra information (optional)

## Essential HTML Tags

### Headings (h1-h6)
\`\`\`html
<h1>Main Title (biggest)</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>
<!-- h4, h5, h6 get progressively smaller -->
\`\`\`

### Paragraphs and Text
\`\`\`html
<p>This is a paragraph of text.</p>
<strong>Bold text</strong>
<em>Italic text</em>
<br> <!-- Line break (no closing tag!) -->
\`\`\`

### Links
\`\`\`html
<a href="https://google.com">Click here to go to Google</a>
<a href="about.html">Go to About page</a>
\`\`\`

### Images
\`\`\`html
<img src="photo.jpg" alt="Description of image">
<!-- Note: img has no closing tag! -->
\`\`\`

### Lists
\`\`\`html
<!-- Unordered (bullet points) -->
<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>

<!-- Ordered (numbered) -->
<ol>
  <li>Step one</li>
  <li>Step two</li>
</ol>
\`\`\`

### Divs and Spans (Containers)
\`\`\`html
<div>
  A div is a block container (takes full width)
</div>
<span>A span is inline (flows with text)</span>
\`\`\`

## Complete Example

\`\`\`html
<!DOCTYPE html>
<html>
<head>
  <title>My Profile</title>
</head>
<body>
  <h1>John Doe</h1>
  <img src="profile.jpg" alt="My photo">
  
  <h2>About Me</h2>
  <p>I am learning <strong>web development</strong>!</p>
  
  <h2>My Hobbies</h2>
  <ul>
    <li>Coding</li>
    <li>Reading</li>
    <li>Gaming</li>
  </ul>
  
  <p>Contact me at <a href="mailto:john@email.com">john@email.com</a></p>
</body>
</html>
\`\`\`

## Homework
1. Create a personal profile page with your name
2. Add an "About Me" section with 2-3 paragraphs
3. Add a list of your hobbies
4. Add a link to your favorite website
`,
    contentAr: `
# بناء جملة HTML والوسوم

## تشريح عنصر HTML

\`\`\`html
<اسم_الوسم سمة="قيمة">المحتوى</اسم_الوسم>
\`\`\`

## الوسوم الأساسية

### العناوين (h1-h6)
### الفقرات والنصوص
### الروابط
### الصور
### القوائم

## الواجب
1. أنشئ صفحة ملف شخصي باسمك
2. أضف قسم "عني" مع 2-3 فقرات
3. أضف قائمة بهواياتك
`
  },

  "css-selectors": {
    contentEn: `
# CSS Selectors

CSS = Cascading Style Sheets. It makes HTML beautiful!

## How to Add CSS

### Method 1: Inline (Not Recommended)
\`\`\`html
<p style="color: red;">Red text</p>
\`\`\`

### Method 2: Internal (In the head)
\`\`\`html
<head>
  <style>
    p { color: red; }
  </style>
</head>
\`\`\`

### Method 3: External (Best Practice ✅)
\`\`\`html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
\`\`\`

## CSS Syntax

\`\`\`css
selector {
  property: value;
  another-property: another-value;
}
\`\`\`

## Types of Selectors

### 1. Element Selector
Targets ALL elements of that type:
\`\`\`css
p {
  color: blue;
}
h1 {
  font-size: 32px;
}
\`\`\`

### 2. Class Selector (.)
Targets elements with a specific class. **Most commonly used!**
\`\`\`html
<p class="warning">This is a warning!</p>
<p class="warning">Another warning!</p>
<p>This is normal.</p>
\`\`\`
\`\`\`css
.warning {
  color: orange;
  font-weight: bold;
}
\`\`\`

### 3. ID Selector (#)
Targets ONE unique element:
\`\`\`html
<div id="header">...</div>
\`\`\`
\`\`\`css
#header {
  background-color: navy;
  color: white;
}
\`\`\`

### 4. Combining Selectors
\`\`\`css
/* Element with class */
p.highlight { background: yellow; }

/* Multiple selectors, same style */
h1, h2, h3 { font-family: Arial; }

/* Descendant (nested) */
.card p { margin: 10px; }
\`\`\`

## Common CSS Properties

\`\`\`css
/* Colors */
color: red;              /* Text color */
background-color: #f0f0f0; /* Background */

/* Text */
font-size: 16px;
font-weight: bold;
text-align: center;

/* Spacing */
margin: 10px;            /* Outside spacing */
padding: 20px;           /* Inside spacing */

/* Borders */
border: 1px solid black;
border-radius: 8px;      /* Rounded corners */

/* Size */
width: 100%;
height: 200px;
\`\`\`

## Homework
1. Create a \`styles.css\` file
2. Style your profile page from the last lesson
3. Use at least 3 different selectors
4. Change colors, fonts, and spacing
`,
    contentAr: `
# محددات CSS

CSS = أوراق الأنماط المتتالية. تجعل HTML جميلاً!

## كيفية إضافة CSS

### الطريقة 1: مضمنة (غير مستحسنة)
### الطريقة 2: داخلية (في head)
### الطريقة 3: خارجية (أفضل ممارسة ✅)

## أنواع المحددات

### 1. محدد العنصر
### 2. محدد الفئة (.)
### 3. محدد المعرف (#)

## الواجب
1. أنشئ ملف \`styles.css\`
2. نسق صفحة ملفك الشخصي
`
  },

  "box-model": {
    contentEn: `
# The CSS Box Model

Every HTML element is a rectangular box. Understanding this is CRUCIAL!

## The Four Layers

Imagine a picture frame:
1. **Content** - The picture itself
2. **Padding** - The mat board around the picture
3. **Border** - The frame itself
4. **Margin** - Space between frames on the wall

\`\`\`
+---------------------------+
|         MARGIN            |
|  +---------------------+  |
|  |      BORDER         |  |
|  |  +---------------+  |  |
|  |  |   PADDING     |  |  |
|  |  |  +---------+  |  |  |
|  |  |  | CONTENT |  |  |  |
|  |  |  +---------+  |  |  |
|  |  +---------------+  |  |
|  +---------------------+  |
+---------------------------+
\`\`\`

## Setting Box Model Properties

\`\`\`css
.box {
  /* Content size */
  width: 200px;
  height: 100px;
  
  /* Padding (inside) */
  padding: 20px;
  /* Or individually: */
  padding-top: 10px;
  padding-right: 15px;
  padding-bottom: 10px;
  padding-left: 15px;
  /* Shorthand: top right bottom left */
  padding: 10px 15px 10px 15px;
  
  /* Border */
  border: 2px solid black;
  
  /* Margin (outside) */
  margin: 30px;
}
\`\`\`

## The box-sizing Property

By default, width/height only applies to content:
- Total width = content + padding + border

This is confusing! Fix it with:
\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\`
Now width includes padding and border. Much easier!

## Practical Example

\`\`\`css
.card {
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 16px;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
\`\`\`

## Homework
1. Create 3 cards on a page
2. Give each different padding and margin values
3. Add borders and shadows
4. Experiment with \`box-sizing\`
`,
    contentAr: `
# نموذج صندوق CSS

كل عنصر HTML هو صندوق مستطيل. فهم هذا أمر بالغ الأهمية!

## الطبقات الأربع

1. **المحتوى** - الصورة نفسها
2. **الحشو** - المساحة حول الصورة
3. **الحدود** - الإطار نفسه
4. **الهوامش** - المسافة بين الإطارات

## الواجب
1. أنشئ 3 بطاقات على صفحة
2. أعط كل واحدة قيم حشو وهوامش مختلفة
`
  },

  "variables": {
    contentEn: `
# JavaScript Variables

Welcome to JavaScript! This is where we add LOGIC to our websites.

## What is a Variable?

A variable is like a labeled box that stores information.

\`\`\`js
// Creating a variable
let age = 25;
let name = "Alice";
let isStudent = true;
\`\`\`

## let vs const

### \`let\` - Can be changed
\`\`\`js
let score = 0;
score = 10;  // ✅ OK
score = 50;  // ✅ OK
\`\`\`

### \`const\` - Cannot be changed
\`\`\`js
const PI = 3.14159;
PI = 3;  // ❌ ERROR!

const birthYear = 1995;
birthYear = 2000;  // ❌ ERROR!
\`\`\`

**Rule of thumb**: Use \`const\` by default. Only use \`let\` if you need to reassign.

## Data Types

\`\`\`js
// String (text) - use quotes
const greeting = "Hello, World!";
const name = 'Alice';  // single or double quotes

// Number (integers and decimals)
const age = 25;
const price = 19.99;
const negative = -10;

// Boolean (true or false)
const isLoggedIn = true;
const hasPermission = false;

// Undefined (no value assigned)
let futureValue;
console.log(futureValue);  // undefined

// Null (intentionally empty)
const emptyValue = null;
\`\`\`

## String Operations

\`\`\`js
const firstName = "John";
const lastName = "Doe";

// Concatenation (old way)
const fullName = firstName + " " + lastName;

// Template literals (modern way) ✅
const greeting = \`Hello, \${firstName}!\`;
const message = \`My name is \${firstName} \${lastName}\`;
\`\`\`

## Number Operations

\`\`\`js
const a = 10;
const b = 3;

console.log(a + b);  // 13 (addition)
console.log(a - b);  // 7  (subtraction)
console.log(a * b);  // 30 (multiplication)
console.log(a / b);  // 3.33... (division)
console.log(a % b);  // 1  (remainder/modulo)
\`\`\`

## Try It Yourself

Open your browser's console (F12 → Console tab) and run:

\`\`\`js
const myName = "Your Name";
const myAge = 25;

console.log(\`Hi! I'm \${myName} and I'm \${myAge} years old.\`);
\`\`\`

## Homework
1. Create variables for your name, age, and favorite color
2. Log a sentence using template literals
3. Calculate your age in months and days
4. Try changing a \`const\` - what happens?
`,
    contentAr: `
# متغيرات JavaScript

مرحباً بك في JavaScript! هذا حيث نضيف المنطق لمواقعنا.

## ما هو المتغير؟

المتغير مثل صندوق مسمى يخزن المعلومات.

## let مقابل const

### \`let\` - يمكن تغييره
### \`const\` - لا يمكن تغييره

**قاعدة**: استخدم \`const\` افتراضياً. استخدم \`let\` فقط إذا كنت بحاجة لإعادة التعيين.

## الواجب
1. أنشئ متغيرات لاسمك وعمرك ولونك المفضل
2. اطبع جملة باستخدام template literals
`
  },

  "components-props": {
    contentEn: `
# React Components & Props

React is a JavaScript library for building user interfaces.

## What is a Component?

A component is a reusable piece of UI. Think of it like LEGO blocks!

\`\`\`jsx
// A simple component
function Welcome() {
  return <h1>Hello, World!</h1>;
}
\`\`\`

## Creating Components

\`\`\`jsx
// Function component (modern way ✅)
function Button() {
  return (
    <button className="btn">
      Click me
    </button>
  );
}

// Using the component
function App() {
  return (
    <div>
      <Button />
      <Button />
      <Button />
    </div>
  );
}
\`\`\`

## Props: Passing Data to Components

Props are like function arguments for components.

\`\`\`jsx
// Component that accepts props
function Greeting({ name, age }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>You are {age} years old.</p>
    </div>
  );
}

// Using the component with props
function App() {
  return (
    <div>
      <Greeting name="Alice" age={25} />
      <Greeting name="Bob" age={30} />
    </div>
  );
}
\`\`\`

## Props are Read-Only

You cannot modify props inside a component:
\`\`\`jsx
function Broken({ name }) {
  name = "Changed";  // ❌ Don't do this!
  return <h1>{name}</h1>;
}
\`\`\`

## Children Prop

\`\`\`jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

// Usage
function App() {
  return (
    <Card title="Welcome">
      <p>This is inside the card!</p>
      <button>Click me</button>
    </Card>
  );
}
\`\`\`

## Practical Example: Product Card

\`\`\`jsx
function ProductCard({ name, price, imageUrl, inStock }) {
  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p className="price">\${price}</p>
      {inStock ? (
        <button>Add to Cart</button>
      ) : (
        <span className="sold-out">Sold Out</span>
      )}
    </div>
  );
}

function Shop() {
  return (
    <div className="products">
      <ProductCard 
        name="Cool Sneakers" 
        price={99.99} 
        imageUrl="/shoes.jpg"
        inStock={true}
      />
      <ProductCard 
        name="Vintage Watch" 
        price={249.99} 
        imageUrl="/watch.jpg"
        inStock={false}
      />
    </div>
  );
}
\`\`\`

## Homework
1. Create a \`UserProfile\` component with name, bio, and avatar props
2. Create a \`Button\` component that accepts text and color props
3. Build a list of 3 products using your \`ProductCard\`
`,
    contentAr: `
# مكونات React والخصائص

React هي مكتبة JavaScript لبناء واجهات المستخدم.

## ما هو المكون؟

المكون هو قطعة قابلة لإعادة الاستخدام من واجهة المستخدم. فكر فيه مثل مكعبات ليغو!

## الخصائص: تمرير البيانات للمكونات

الخصائص مثل وسائط الدوال للمكونات.

## الواجب
1. أنشئ مكون \`UserProfile\` مع خصائص الاسم والسيرة والصورة
2. أنشئ مكون \`Button\` يقبل خصائص النص واللون
`
  },

  "use-state": {
    contentEn: `
# State with useState

State allows components to "remember" things and update the UI.

## The Problem

Normal variables don't update the screen:
\`\`\`jsx
function Counter() {
  let count = 0;  // This won't work!
  
  function handleClick() {
    count = count + 1;
    console.log(count);  // Logs correctly but...
  }
  
  return <button onClick={handleClick}>{count}</button>;
  // Screen always shows 0 😢
}
\`\`\`

## The Solution: useState

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  function handleClick() {
    setCount(count + 1);  // Updates AND re-renders!
  }
  
  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
\`\`\`

## How useState Works

\`\`\`jsx
const [value, setValue] = useState(initialValue);
//     ↑       ↑                    ↑
//  current  function to       starting
//  value    update it          value
\`\`\`

## Multiple State Variables

\`\`\`jsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  return (
    <form>
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label>
        <input 
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
        />
        Remember me
      </label>
    </form>
  );
}
\`\`\`

## State with Objects

\`\`\`jsx
function Profile() {
  const [user, setUser] = useState({
    name: 'Alice',
    age: 25,
    email: 'alice@email.com'
  });
  
  function updateName(newName) {
    // Must create NEW object, don't mutate!
    setUser({
      ...user,        // Copy existing properties
      name: newName   // Override name
    });
  }
  
  return (
    <div>
      <p>Name: {user.name}</p>
      <button onClick={() => updateName('Bob')}>
        Change to Bob
      </button>
    </div>
  );
}
\`\`\`

## State with Arrays

\`\`\`jsx
function TodoList() {
  const [todos, setTodos] = useState([
    'Learn React',
    'Build a project'
  ]);
  
  function addTodo() {
    setTodos([...todos, 'New todo']);
  }
  
  function removeTodo(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }
  
  return (
    <div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index)}>❌</button>
          </li>
        ))}
      </ul>
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
}
\`\`\`

## Rules of Hooks

1. Only call hooks at the **top level** (not inside loops/conditions)
2. Only call hooks from **React functions** (components or custom hooks)

## Homework
1. Build a counter that can increment and decrement
2. Create a toggle button (Show/Hide content)
3. Build a simple todo list with add and delete
`,
    contentAr: `
# الحالة مع useState

الحالة تسمح للمكونات بـ"تذكر" الأشياء وتحديث واجهة المستخدم.

## المشكلة

المتغيرات العادية لا تحدث الشاشة.

## الحل: useState

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      تم النقر {count} مرات
    </button>
  );
}
\`\`\`

## الواجب
1. ابنِ عداداً يمكنه الزيادة والنقصان
2. أنشئ زر تبديل (إظهار/إخفاء المحتوى)
3. ابنِ قائمة مهام بسيطة مع الإضافة والحذف
`
  }
};

async function updateLessons() {
  console.log("📚 Updating lessons with rich content...\n");
  
  for (const [slug, content] of Object.entries(lessonContent)) {
    const lesson = await client.query(api.lessons.getBySlug, { slug });
    
    if (!lesson) {
      console.log(`⚠️ Lesson "${slug}" not found, skipping...`);
      continue;
    }
    
    console.log(`✏️ Updating: ${lesson.titleEn}`);
    
    await client.mutation(api.lessons.update, {
      id: lesson._id,
      contentEn: content.contentEn,
      contentAr: content.contentAr,
    });
    
    console.log(`   ✅ Done!`);
  }
  
  console.log("\n🎉 All lessons updated!");
}

updateLessons().catch(console.error);
