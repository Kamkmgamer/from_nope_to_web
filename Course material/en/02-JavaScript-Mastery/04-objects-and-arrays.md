# Objects and Arrays

**Estimated Time:** 40 minutes  
**Prerequisites:** Variables, Functions, Control Flow

---

## Introduction

In the real world, data comes in complex structures. A user has a name, email, and preferences. A shopping cart has multiple items, each with a price and quantity. Objects and arrays let us organize related data together.

By the end of this lesson, you will:

- Create and manipulate objects
- Work with arrays and their methods
- Combine objects and arrays for complex data
- Destructure data for cleaner code

---

## Objects

An **object** is a collection of related data and functions. It uses key-value pairs.

### Creating Objects

```javascript
// Object literal (most common)
const person = {
  firstName: "Alice",
  lastName: "Johnson",
  age: 25,
  isStudent: false,
  email: "alice@example.com",
};

// Keys are also called properties
```

### Accessing Properties

```javascript
// Dot notation (preferred)
console.log(person.firstName); // 'Alice'
console.log(person.age); // 25

// Bracket notation (for dynamic keys or special characters)
console.log(person["lastName"]); // 'Johnson'

const key = "email";
console.log(person[key]); // 'alice@example.com'
```

### Modifying Objects

```javascript
// Change a value
person.age = 26;

// Add a new property
person.phone = "555-1234";

// Delete a property
delete person.isStudent;
```

### Methods (Functions in Objects)

```javascript
const calculator = {
  add: function (a, b) {
    return a + b;
  },

  // Shorthand syntax (ES6)
  subtract(a, b) {
    return a - b;
  },

  // Arrow function
  multiply: (a, b) => a * b,
};

console.log(calculator.add(5, 3)); // 8
console.log(calculator.subtract(10, 4)); // 6
console.log(calculator.multiply(4, 5)); // 20
```

### The `this` Keyword

Inside an object method, `this` refers to the object itself:

```javascript
const person = {
  firstName: "Alice",
  lastName: "Johnson",

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  introduce() {
    console.log(`Hi, I'm ${this.getFullName()}`);
  },
};

person.introduce(); // 'Hi, I'm Alice Johnson'
```

**Warning:** Arrow functions don't have their own `this`. Use regular functions for methods.

---

## Checking Object Properties

```javascript
const user = { name: "Alice", email: "alice@example.com" };

// Check if property exists
console.log("name" in user); // true
console.log("phone" in user); // false

// Get all keys
console.log(Object.keys(user)); // ['name', 'email']

// Get all values
console.log(Object.values(user)); // ['Alice', 'alice@example.com']

// Get key-value pairs
console.log(Object.entries(user));
// [['name', 'Alice'], ['email', 'alice@example.com']]
```

---

## Arrays

An **array** is an ordered list of values. Items are accessed by their index (position), starting at 0.

### Creating Arrays

```javascript
// Array literal (most common)
const fruits = ["apple", "banana", "cherry"];
const numbers = [1, 2, 3, 4, 5];
const mixed = ["hello", 42, true, null];

// Empty array
const empty = [];
```

### Accessing Elements

```javascript
const colors = ["red", "green", "blue"];

console.log(colors[0]); // 'red' (first item)
console.log(colors[1]); // 'green'
console.log(colors[2]); // 'blue' (last item)
console.log(colors[3]); // undefined (doesn't exist)

// Array length
console.log(colors.length); // 3

// Last item
console.log(colors[colors.length - 1]); // 'blue'
```

### Modifying Arrays

```javascript
const fruits = ["apple", "banana", "cherry"];

// Change an item
fruits[1] = "blueberry";
// ['apple', 'blueberry', 'cherry']

// Add to end
fruits.push("date");
// ['apple', 'blueberry', 'cherry', 'date']

// Remove from end
const last = fruits.pop();
// last = 'date', fruits = ['apple', 'blueberry', 'cherry']

// Add to beginning
fruits.unshift("avocado");
// ['avocado', 'apple', 'blueberry', 'cherry']

// Remove from beginning
const first = fruits.shift();
// first = 'avocado', fruits = ['apple', 'blueberry', 'cherry']
```

---

## Essential Array Methods

### Finding Items

```javascript
const fruits = ["apple", "banana", "cherry", "banana"];

// Check if exists
fruits.includes("banana"); // true
fruits.includes("grape"); // false

// Find index (first occurrence)
fruits.indexOf("banana"); // 1
fruits.indexOf("grape"); // -1 (not found)

// Find index (last occurrence)
fruits.lastIndexOf("banana"); // 3
```

### Adding/Removing Items

```javascript
const animals = ["cat", "dog", "bird"];

// Add at index 1
animals.splice(1, 0, "rabbit");
// ['cat', 'rabbit', 'dog', 'bird']

// Remove 2 items starting at index 1
const removed = animals.splice(1, 2);
// removed = ['rabbit', 'dog']
// animals = ['cat', 'bird']
```

### Combining and Slicing

```javascript
// Combine arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
// [1, 2, 3, 4, 5, 6]

// Or using concat
const combined2 = arr1.concat(arr2);

// Get a portion (doesn't modify original)
const numbers = [0, 1, 2, 3, 4, 5];
numbers.slice(2); // [2, 3, 4, 5] (from index 2 to end)
numbers.slice(1, 4); // [1, 2, 3] (index 1 to 3, not 4!)
numbers.slice(-2); // [4, 5] (last 2 items)
```

---

## Array Transformation Methods

These create NEW arrays (don't modify the original).

### map - Transform Each Item

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

const squared = numbers.map((n) => n ** 2);
console.log(squared); // [1, 4, 9, 16, 25]

// With objects
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];

const names = users.map((user) => user.name);
console.log(names); // ['Alice', 'Bob']
```

### filter - Keep Matching Items

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens); // [2, 4, 6, 8, 10]

const bigNumbers = numbers.filter((n) => n > 5);
console.log(bigNumbers); // [6, 7, 8, 9, 10]

// With objects
const users = [
  { name: "Alice", age: 25, active: true },
  { name: "Bob", age: 17, active: true },
  { name: "Charlie", age: 30, active: false },
];

const adults = users.filter((user) => user.age >= 18);
const activeUsers = users.filter((user) => user.active);
```

### reduce - Combine Into One Value

```javascript
const numbers = [1, 2, 3, 4, 5];

// Sum
const sum = numbers.reduce((total, n) => total + n, 0);
console.log(sum); // 15

// Product
const product = numbers.reduce((result, n) => result * n, 1);
console.log(product); // 120

// Count items
const fruits = ["apple", "banana", "apple", "cherry", "apple"];
const counts = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(counts); // { apple: 3, banana: 1, cherry: 1 }
```

### find - Get First Match

```javascript
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const user = users.find((u) => u.id === 2);
console.log(user); // { id: 2, name: 'Bob' }

const notFound = users.find((u) => u.id === 99);
console.log(notFound); // undefined
```

### every and some - Test Conditions

```javascript
const numbers = [2, 4, 6, 8];

// every - ALL must pass
numbers.every((n) => n % 2 === 0); // true (all are even)
numbers.every((n) => n > 5); // false (not all > 5)

// some - AT LEAST ONE must pass
numbers.some((n) => n > 5); // true (6 and 8 are > 5)
numbers.some((n) => n > 10); // false (none > 10)
```

---

## Sorting

### Sort Strings

```javascript
const fruits = ["cherry", "apple", "banana"];
fruits.sort();
console.log(fruits); // ['apple', 'banana', 'cherry']

// Reverse
fruits.reverse();
console.log(fruits); // ['cherry', 'banana', 'apple']
```

### Sort Numbers (tricky!)

```javascript
const numbers = [10, 5, 40, 25, 1000];

// This doesn't work as expected!
numbers.sort();
console.log(numbers); // [10, 1000, 25, 40, 5] (sorted as strings!)

// Use a compare function
numbers.sort((a, b) => a - b); // Ascending
console.log(numbers); // [5, 10, 25, 40, 1000]

numbers.sort((a, b) => b - a); // Descending
console.log(numbers); // [1000, 40, 25, 10, 5]
```

### Sort Objects

```javascript
const users = [
  { name: "Charlie", age: 35 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];

// Sort by age
users.sort((a, b) => a.age - b.age);

// Sort by name
users.sort((a, b) => a.name.localeCompare(b.name));
```

---

## Destructuring

Extract values from arrays and objects into variables.

### Array Destructuring

```javascript
const colors = ["red", "green", "blue"];

// Traditional
const first = colors[0];
const second = colors[1];

// Destructuring
const [first, second, third] = colors;
console.log(first); // 'red'
console.log(second); // 'green'

// Skip items
const [, , third] = colors;
console.log(third); // 'blue'

// Default values
const [a, b, c, d = "yellow"] = colors;
console.log(d); // 'yellow'

// Rest pattern
const [head, ...tail] = colors;
console.log(head); // 'red'
console.log(tail); // ['green', 'blue']
```

### Object Destructuring

```javascript
const person = {
  name: "Alice",
  age: 25,
  city: "New York",
};

// Traditional
const name = person.name;
const age = person.age;

// Destructuring
const { name, age, city } = person;
console.log(name); // 'Alice'
console.log(city); // 'New York'

// Rename variables
const { name: userName, age: userAge } = person;
console.log(userName); // 'Alice'

// Default values
const { name, country = "USA" } = person;
console.log(country); // 'USA'

// Nested destructuring
const user = {
  info: {
    firstName: "Alice",
    lastName: "Johnson",
  },
};

const {
  info: { firstName, lastName },
} = user;
```

---

## Spread Operator

The `...` spread operator expands arrays and objects.

### With Arrays

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combine arrays
const combined = [...arr1, ...arr2];
// [1, 2, 3, 4, 5, 6]

// Copy an array (creates a new array)
const copy = [...arr1];

// Add items
const withMore = [0, ...arr1, 4];
// [0, 1, 2, 3, 4]
```

### With Objects

```javascript
const defaults = {
  theme: "dark",
  language: "en",
  notifications: true,
};

const userSettings = {
  theme: "light",
};

// Merge objects (later properties override)
const settings = { ...defaults, ...userSettings };
// { theme: 'light', language: 'en', notifications: true }

// Copy with modifications
const updatedUser = {
  ...user,
  age: 26,
};
```

---

## Practical Examples

### Shopping Cart

```javascript
const cart = [
  { name: "Shirt", price: 29.99, quantity: 2 },
  { name: "Jeans", price: 59.99, quantity: 1 },
  { name: "Shoes", price: 89.99, quantity: 1 },
];

// Total price
const total = cart.reduce((sum, item) => {
  return sum + item.price * item.quantity;
}, 0);
console.log(`Total: $${total.toFixed(2)}`); // Total: $209.96

// Item count
const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
console.log(`${itemCount} items`); // 4 items

// Most expensive item
const mostExpensive = cart.reduce((max, item) =>
  item.price > max.price ? item : max,
);
console.log(mostExpensive.name); // 'Shoes'
```

### User Management

```javascript
const users = [
  { id: 1, name: "Alice", role: "admin", active: true },
  { id: 2, name: "Bob", role: "user", active: false },
  { id: 3, name: "Charlie", role: "user", active: true },
  { id: 4, name: "Diana", role: "admin", active: true },
];

// Get active admins
const activeAdmins = users
  .filter((user) => user.active && user.role === "admin")
  .map((user) => user.name);
console.log(activeAdmins); // ['Alice', 'Diana']

// Find user by ID
const findUser = (id) => users.find((u) => u.id === id);

// Update user
const updateUser = (id, updates) => {
  return users.map((user) => (user.id === id ? { ...user, ...updates } : user));
};

// Delete user
const deleteUser = (id) => users.filter((user) => user.id !== id);
```

---

## Exercises

### Exercise 1: Book Library

Create an array of book objects with title, author, and year. Write functions to:

- Get all books by a specific author
- Get books published after a certain year
- Sort books by year

### Exercise 2: Grade Book

Given an array of student objects with names and scores, write functions to:

- Calculate class average
- Find the highest and lowest scores
- Get students who passed (score >= 60)

### Exercise 3: Inventory System

Create an inventory system where you can:

- Add new products
- Update quantity
- Remove products with 0 quantity
- Calculate total inventory value

---

## Summary

- **Objects** store key-value pairs, accessed with dot or bracket notation
- **Arrays** store ordered lists, accessed by index (starting at 0)
- `.map()` transforms, `.filter()` selects, `.reduce()` combines
- **Destructuring** extracts values into variables
- **Spread operator** (`...`) copies and merges arrays/objects
- Always create new arrays/objects instead of modifying originals (immutability)

---

## What's Next?

You now have a solid JavaScript foundation! Next, learn about **Asynchronous JavaScript** - handling things that take time like API calls and file operations.

---

_Estimated completion time: 40 minutes_  
_Difficulty: Beginner to Intermediate_
