# Functions in JavaScript

**Estimated Time:** 40 minutes  
**Prerequisites:** Variables

---

## Introduction

Functions are one of the most important concepts in programming. They let you write reusable code, break complex problems into smaller pieces, and keep your programs organized.

By the end of this lesson, you will:

- Understand what functions are and why they matter
- Create functions in multiple ways
- Work with parameters and return values
- Use arrow functions (modern syntax)

---

## What is a Function?

A **function** is a reusable block of code that performs a specific task. Think of it like a recipe:

| Recipe                           | Function                        |
| -------------------------------- | ------------------------------- |
| Name: "Chocolate Cake"           | Name: `calculateTotal`          |
| Ingredients: flour, sugar, cocoa | Parameters: `price`, `quantity` |
| Steps: mix, bake, frost          | Code: calculations              |
| Result: A cake                   | Return value: the total         |

### Why Use Functions?

1. **Reusability** - Write once, use many times
2. **Organization** - Break code into logical pieces
3. **Readability** - Give names to chunks of code
4. **Maintainability** - Fix bugs in one place

---

## Creating Functions

### Function Declaration

The traditional way to create a function:

```javascript
function greet() {
  console.log("Hello, World!");
}

// Calling the function
greet(); // Output: Hello, World!
greet(); // Output: Hello, World!
```

### Function Expression

Assign a function to a variable:

```javascript
const greet = function () {
  console.log("Hello, World!");
};

greet(); // Output: Hello, World!
```

### Arrow Function (Modern)

The concise, modern syntax (ES6+):

```javascript
const greet = () => {
  console.log("Hello, World!");
};

greet(); // Output: Hello, World!
```

---

## Parameters and Arguments

Functions can accept input values called **parameters**.

```javascript
//           ↓ parameter (placeholder)
function greet(name) {
  console.log(`Hello, ${name}!`);
}

//        ↓ argument (actual value)
greet("Alice"); // Output: Hello, Alice!
greet("Bob"); // Output: Hello, Bob!
```

### Multiple Parameters

```javascript
function introduce(name, age, city) {
  console.log(`I'm ${name}, ${age} years old, from ${city}.`);
}

introduce("Alice", 25, "New York");
// Output: I'm Alice, 25 years old, from New York.
```

### Default Parameters

Provide fallback values:

```javascript
function greet(name = "Guest") {
  console.log(`Hello, ${name}!`);
}

greet("Alice"); // Hello, Alice!
greet(); // Hello, Guest!
```

---

## Return Values

Functions can send back a result using `return`:

```javascript
function add(a, b) {
  return a + b;
}

const result = add(5, 3);
console.log(result); // 8

// Use directly in expressions
console.log(add(10, 20)); // 30
console.log(add(2, 3) * 2); // 10
```

### Important: Return Ends the Function

```javascript
function checkAge(age) {
  if (age < 18) {
    return "Too young";
    console.log("This never runs"); // Unreachable!
  }
  return "Old enough";
}

console.log(checkAge(15)); // 'Too young'
console.log(checkAge(21)); // 'Old enough'
```

### Functions Without Return

If no `return` statement, the function returns `undefined`:

```javascript
function sayHi() {
  console.log("Hi!");
}

const result = sayHi();
console.log(result); // undefined
```

---

## Arrow Functions Deep Dive

Arrow functions are the modern way to write functions:

### Basic Syntax

```javascript
// Traditional
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => {
  return a + b;
};
```

### Shortcuts

**One parameter - no parentheses needed:**

```javascript
const double = (x) => {
  return x * 2;
};
```

**One-line return - no braces or `return` needed:**

```javascript
const double = (x) => x * 2;
const add = (a, b) => a + b;
```

### Examples

```javascript
// Square a number
const square = (x) => x * x;
console.log(square(5)); // 25

// Check if even
const isEven = (n) => n % 2 === 0;
console.log(isEven(4)); // true
console.log(isEven(7)); // false

// Format price
const formatPrice = (price) => `$${price.toFixed(2)}`;
console.log(formatPrice(19.5)); // $19.50
```

### When to Use Which

| Type                 | Best For                         |
| -------------------- | -------------------------------- |
| Function Declaration | Named functions, hoisting needed |
| Function Expression  | Callbacks, more control          |
| Arrow Function       | Short callbacks, array methods   |

---

## Practical Examples

### Calculate Area

```javascript
function calculateRectangleArea(width, height) {
  return width * height;
}

function calculateCircleArea(radius) {
  return Math.PI * radius ** 2;
}

console.log(calculateRectangleArea(10, 5)); // 50
console.log(calculateCircleArea(7).toFixed(2)); // 153.94
```

### Temperature Converter

```javascript
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function fahrenheitToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

console.log(celsiusToFahrenheit(0)); // 32
console.log(celsiusToFahrenheit(100)); // 212
console.log(fahrenheitToCelsius(98.6).toFixed(1)); // 37.0
```

### Validate Email

```javascript
function isValidEmail(email) {
  // Simple check - real validation is more complex
  return email.includes("@") && email.includes(".");
}

console.log(isValidEmail("test@example.com")); // true
console.log(isValidEmail("invalid-email")); // false
```

### Generate Random Number

```javascript
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomBetween(1, 10)); // Random number 1-10
console.log(randomBetween(1, 100)); // Random number 1-100
```

---

## Functions as First-Class Citizens

In JavaScript, functions are values. You can:

### Store in Variables

```javascript
const sayHello = function () {
  console.log("Hello!");
};
```

### Pass as Arguments (Callbacks)

```javascript
function doTwice(action) {
  action();
  action();
}

doTwice(() => console.log("Hi!"));
// Output:
// Hi!
// Hi!
```

### Return from Functions

```javascript
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

---

## Common Array Methods with Functions

Functions are used extensively with arrays:

### forEach - Do something with each item

```javascript
const names = ["Alice", "Bob", "Charlie"];

names.forEach((name) => {
  console.log(`Hello, ${name}!`);
});
// Hello, Alice!
// Hello, Bob!
// Hello, Charlie!
```

### map - Transform each item

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const prices = [10, 20, 30];
const formatted = prices.map((p) => `$${p}.00`);
console.log(formatted); // ['$10.00', '$20.00', '$30.00']
```

### filter - Keep items that pass a test

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

const ages = [15, 22, 18, 30, 16, 25];
const adults = ages.filter((age) => age >= 18);
console.log(adults); // [22, 18, 30, 25]
```

### find - Get first item that passes

```javascript
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const bob = users.find((user) => user.name === "Bob");
console.log(bob); // { id: 2, name: 'Bob' }
```

### reduce - Combine all items

```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((total, n) => total + n, 0);
console.log(sum); // 15

const prices = [10.99, 5.49, 3.99];
const total = prices.reduce((sum, price) => sum + price, 0);
console.log(total.toFixed(2)); // 20.47
```

---

## Scope

Scope determines where variables can be accessed.

### Local Scope

Variables inside a function are only accessible inside:

```javascript
function greet() {
  const message = "Hello!"; // Local variable
  console.log(message); // ✅ Works
}

greet();
console.log(message); // ❌ Error: message is not defined
```

### Global Scope

Variables outside functions are accessible everywhere:

```javascript
const globalMessage = "Hello!"; // Global variable

function greet() {
  console.log(globalMessage); // ✅ Works
}

greet();
console.log(globalMessage); // ✅ Works
```

### Best Practice

Avoid global variables when possible. Keep variables as local as you can.

---

## Exercises

### Exercise 1: Calculator Functions

Create functions for basic math operations:

- `add(a, b)`
- `subtract(a, b)`
- `multiply(a, b)`
- `divide(a, b)` (handle division by zero!)

### Exercise 2: String Utilities

Create these utility functions:

- `capitalize(str)` - Capitalize first letter
- `reverse(str)` - Reverse a string
- `countVowels(str)` - Count vowels in a string

### Exercise 3: Array Operations

Create functions that work with arrays:

- `sum(numbers)` - Sum all numbers
- `average(numbers)` - Get the average
- `max(numbers)` - Find the maximum

### Exercise 4: Password Validator

Create a function `validatePassword(password)` that returns an object:

```javascript
{
  isValid: true/false,
  errors: ['error1', 'error2']
}
```

Rules:

- At least 8 characters
- Contains a number
- Contains an uppercase letter

---

## Summary

- **Functions** are reusable blocks of code
- **Parameters** are placeholders; **arguments** are actual values
- **Return** sends a value back (and ends the function)
- **Arrow functions** provide concise syntax
- Functions are **first-class citizens** - treat them like values
- Array methods like `map`, `filter`, `reduce` use functions as callbacks
- **Scope** determines where variables are accessible

---

## What's Next?

Now that you understand functions, let's learn about **Control Flow** - making decisions with if/else and loops!

---

_Estimated completion time: 40 minutes_  
_Difficulty: Beginner_
