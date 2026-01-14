# JavaScript Variables

**Estimated Time:** 30 minutes  
**Prerequisites:** HTML & CSS Basics

---

## Introduction

Welcome to JavaScript! This is where the magic happens. While HTML structures content and CSS styles it, JavaScript makes it **interactive** - responding to clicks, validating forms, updating content without reloading, and so much more.

By the end of this lesson, you will:

- Understand what variables are and why we need them
- Know the difference between `let`, `const`, and `var`
- Work with different data types
- Perform basic operations

---

## What is JavaScript?

JavaScript is a **programming language** that runs in the browser (and now also on servers with Node.js). It allows you to:

- Respond to user actions (clicks, typing, scrolling)
- Validate form input before sending
- Update content dynamically
- Create animations and visual effects
- Fetch data from servers
- Build complete web applications

### Adding JavaScript to HTML

```html
<!-- Method 1: Inline (avoid for real projects) -->
<button onclick="alert('Hello!')">Click me</button>

<!-- Method 2: Internal script -->
<script>
  console.log("Hello from JavaScript!");
</script>

<!-- Method 3: External file (best practice ✅) -->
<script src="script.js"></script>
```

**Best practice:** Use external files and place `<script>` tags at the end of `<body>` or use the `defer` attribute.

---

## What is a Variable?

A **variable** is like a labeled container that stores data. Think of it as a box with a name tag.

```javascript
// Creating a variable
let age = 25;
//  │   │    └─ Value (what's stored in the box)
//  │   └─ Name (the label on the box)
//  └─ Keyword (tells JavaScript to create a variable)
```

### Why Do We Need Variables?

Variables let us:

- Store information for later use
- Give meaningful names to data
- Update values as the program runs
- Perform calculations and operations

```javascript
// Without variables (hard to understand)
console.log(100 - 18 - 25 - 30);

// With variables (clear and readable)
let totalBudget = 100;
let foodCost = 18;
let transportCost = 25;
let entertainmentCost = 30;

let remaining = totalBudget - foodCost - transportCost - entertainmentCost;
console.log(remaining); // 27
```

---

## `let` vs `const` vs `var`

### `const` - Constant (Can't Be Reassigned)

Use when the value should **never change**.

```javascript
const PI = 3.14159;
const MAX_USERS = 100;
const WEBSITE_URL = "https://example.com";

// Trying to reassign throws an error
PI = 3; // ❌ ERROR: Assignment to constant variable
```

### `let` - Can Be Reassigned

Use when the value **will change**.

```javascript
let score = 0;
score = 10; // ✅ OK
score = 50; // ✅ OK

let userName = "Guest";
userName = "John"; // ✅ OK
```

### `var` - The Old Way (Avoid!)

`var` is the original way to declare variables. It has confusing scoping rules.

```javascript
var oldStyle = "avoid this";

// Problems with var:
// 1. Can be redeclared (leads to bugs)
var x = 10;
var x = 20; // No error, but confusing!

// 2. Function scoped, not block scoped
if (true) {
  var leaked = "visible outside!";
}
console.log(leaked); // Works (but shouldn't)
```

### The Golden Rule

**Use `const` by default. Use `let` only when you need to reassign.**

```javascript
const name = "Alice"; // Won't change
const birthYear = 1995; // Won't change
let age = 29; // Will change (birthday!)
let score = 0; // Will change (during game)
```

---

## Data Types

JavaScript has several built-in data types.

### 1. String (Text)

```javascript
const greeting = "Hello, World!"; // Single quotes
const name = "Alice"; // Double quotes
const message = `Welcome, ${name}!`; // Template literal (backticks)

// String properties and methods
console.log(greeting.length); // 13
console.log(name.toUpperCase()); // 'ALICE'
console.log(name.toLowerCase()); // 'alice'
```

### 2. Number (Integers and Decimals)

```javascript
const age = 25; // Integer
const price = 19.99; // Decimal
const negative = -10; // Negative
const million = 1_000_000; // Underscore for readability

// Special numbers
const inf = Infinity;
const notANumber = NaN; // Result of invalid math operations
```

### 3. Boolean (True or False)

```javascript
const isLoggedIn = true;
const hasPermission = false;

// Often from comparisons
const isAdult = age >= 18; // true
const isExpensive = price > 100; // false
```

### 4. Undefined (No Value Assigned)

```javascript
let futureValue;
console.log(futureValue); // undefined
```

### 5. Null (Intentionally Empty)

```javascript
const emptyValue = null; // "No value on purpose"
```

### 6. Object (Collection of Key-Value Pairs)

```javascript
const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com",
  isActive: true,
};

console.log(user.name); // 'Alice'
console.log(user["age"]); // 25
```

### 7. Array (Ordered List)

```javascript
const colors = ["red", "green", "blue"];
const numbers = [1, 2, 3, 4, 5];

console.log(colors[0]); // 'red' (first item)
console.log(colors.length); // 3
```

### Checking Types

```javascript
typeof "hello"; // 'string'
typeof 42; // 'number'
typeof true; // 'boolean'
typeof undefined; // 'undefined'
typeof null; // 'object' (this is a famous JavaScript bug!)
typeof {}; // 'object'
typeof []; // 'object'
```

---

## String Operations

### Concatenation (Joining Strings)

```javascript
// Old way (using +)
const firstName = "John";
const lastName = "Doe";
const fullName = firstName + " " + lastName;
console.log(fullName); // 'John Doe'

// Modern way (Template Literals) ✅
const greeting = `Hello, ${firstName} ${lastName}!`;
console.log(greeting); // 'Hello, John Doe!'
```

### Template Literals (Backticks)

Template literals are incredibly useful:

```javascript
const name = "Alice";
const age = 25;

// Include expressions
const message = `${name} is ${age} years old.`;

// Multi-line strings
const poem = `
  Roses are red,
  Violets are blue,
  JavaScript is awesome,
  And so are you!
`;

// Calculations inside
const price = 19.99;
const tax = 0.08;
const total = `Total: $${(price * (1 + tax)).toFixed(2)}`;
console.log(total); // 'Total: $21.59'
```

### Common String Methods

```javascript
const text = "  Hello, World!  ";

text.length; // 17
text.trim(); // 'Hello, World!' (removes whitespace)
text.toUpperCase(); // '  HELLO, WORLD!  '
text.toLowerCase(); // '  hello, world!  '
text.includes("World"); // true
text.startsWith("  He"); // true
text.endsWith("!  "); // true
text.replace("World", "JS"); // '  Hello, JS!  '
text.split(","); // ['  Hello', ' World!  ']
```

---

## Number Operations

### Basic Arithmetic

```javascript
const a = 10;
const b = 3;

a + b; // 13   (addition)
a - b; // 7    (subtraction)
a * b; // 30   (multiplication)
a / b; // 3.33 (division)
a % b; // 1    (modulo/remainder)
a ** b; // 1000 (exponentiation: 10³)
```

### Increment and Decrement

```javascript
let count = 0;
count++; // count is now 1
count++; // count is now 2
count--; // count is now 1

// Shorthand operators
let score = 100;
score += 10; // score = score + 10  → 110
score -= 5; // score = score - 5   → 105
score *= 2; // score = score * 2   → 210
score /= 3; // score = score / 3   → 70
```

### Common Math Functions

```javascript
Math.round(4.7); // 5 (round to nearest integer)
Math.floor(4.7); // 4 (round down)
Math.ceil(4.1); // 5 (round up)
Math.abs(-5); // 5 (absolute value)
Math.min(1, 2, 3); // 1 (minimum)
Math.max(1, 2, 3); // 3 (maximum)
Math.random(); // 0.123... (random between 0 and 1)

// Random integer between 1 and 10
Math.floor(Math.random() * 10) + 1;
```

---

## The Console

The console is your best friend for testing and debugging.

```javascript
console.log("Hello!"); // Print a message
console.log(name, age); // Print multiple values
console.log(`Age: ${age}`); // Use template literals

console.error("Something wrong!"); // Red error message
console.warn("Be careful!"); // Yellow warning
console.table([1, 2, 3]); // Display as table
```

### Try It Now!

Open your browser's console:

1. Press `F12` or right-click → "Inspect"
2. Click the "Console" tab
3. Type this and press Enter:

```javascript
const myName = "Your Name Here";
console.log(`Hello, ${myName}! Welcome to JavaScript!`);
```

---

## Exercises

### Exercise 1: Personal Info

Create variables for:

- Your first name
- Your last name
- Your age
- Your favorite color

Then log a sentence using template literals:
"Hi, I'm [firstName] [lastName], I'm [age] years old, and I love [color]!"

### Exercise 2: Simple Calculator

Create two number variables and log:

- Their sum
- Their difference
- Their product
- Their quotient

### Exercise 3: Age in Different Units

Given your age in years:

- Calculate age in months
- Calculate age in days (assume 365 days/year)
- Calculate age in hours

### Exercise 4: Temperature Converter

Create a variable with temperature in Celsius.
Convert it to Fahrenheit using: `F = (C × 9/5) + 32`

---

## Common Mistakes

### 1. Reassigning a `const`

```javascript
const name = "Alice";
name = "Bob"; // ❌ ERROR!
```

### 2. Using a Variable Before Declaring

```javascript
console.log(age); // ❌ ERROR: age is not defined
let age = 25;
```

### 3. Confusing `=` and `==`

```javascript
let x = 5; // Assignment (sets x to 5)
x == 5; // Comparison (checks if x equals 5)
x === 5; // Strict comparison (checks type too) ✅
```

### 4. String + Number Confusion

```javascript
"5" + 3; // '53' (string concatenation!)
"5" - 3; // 2 (JavaScript converts to number)
Number("5"); // 5 (explicit conversion)
```

---

## Summary

- **Variables** store data for later use
- Use **`const`** by default, **`let`** when reassignment is needed
- **Avoid `var`** - it has confusing scoping rules
- JavaScript has 7 data types: String, Number, Boolean, Undefined, Null, Object, Array
- Use **template literals** (\`${variable}\`) for string interpolation
- The **console** is essential for testing and debugging

---

## What's Next?

Now that you understand variables and data types, let's learn about **Functions** - reusable blocks of code that make programming powerful and organized!

---

_Estimated completion time: 30 minutes_  
_Difficulty: Beginner_
