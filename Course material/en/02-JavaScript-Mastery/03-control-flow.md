# Control Flow: Conditions and Loops

**Estimated Time:** 35 minutes  
**Prerequisites:** Variables, Functions

---

## Introduction

Control flow determines the order in which code runs. Instead of executing line by line from top to bottom, we can make decisions (conditions) and repeat actions (loops).

By the end of this lesson, you will:

- Make decisions with if/else statements
- Use comparison and logical operators
- Repeat code with for, while, and for...of loops
- Avoid infinite loops and common mistakes

---

## Comparison Operators

Before we can make decisions, we need to compare values:

| Operator | Meaning          | Example   | Result |
| -------- | ---------------- | --------- | ------ |
| `===`    | Strict equal     | `5 === 5` | `true` |
| `!==`    | Strict not equal | `5 !== 3` | `true` |
| `>`      | Greater than     | `10 > 5`  | `true` |
| `<`      | Less than        | `3 < 5`   | `true` |
| `>=`     | Greater or equal | `5 >= 5`  | `true` |
| `<=`     | Less or equal    | `3 <= 5`  | `true` |

### == vs ===

```javascript
// == tries to convert types (loose equality)
5 == "5"; // true (string converted to number)
0 == false; // true
null == undefined; // true

// === checks value AND type (strict equality)
5 === "5"; // false (number vs string)
0 === false; // false (number vs boolean)

// Always use === for predictable results!
```

---

## Logical Operators

Combine multiple conditions:

| Operator | Meaning | Example                    |
| -------- | ------- | -------------------------- |
| `&&`     | AND     | `true && true` → `true`    |
| `\|\|`   | OR      | `false \|\| true` → `true` |
| `!`      | NOT     | `!true` → `false`          |

```javascript
const age = 25;
const hasLicense = true;

// AND: Both must be true
const canDrive = age >= 16 && hasLicense; // true

// OR: At least one must be true
const canEnter = age >= 21 || hasVIPPass;

// NOT: Inverts the value
const isMinor = !(age >= 18); // false
```

---

## If Statements

Execute code only if a condition is true:

```javascript
const age = 20;

if (age >= 18) {
  console.log("You are an adult");
}
```

### If...Else

```javascript
const age = 15;

if (age >= 18) {
  console.log("You are an adult");
} else {
  console.log("You are a minor");
}
```

### If...Else If...Else

```javascript
const score = 85;

if (score >= 90) {
  console.log("A - Excellent!");
} else if (score >= 80) {
  console.log("B - Good!");
} else if (score >= 70) {
  console.log("C - Average");
} else if (score >= 60) {
  console.log("D - Below Average");
} else {
  console.log("F - Failing");
}
// Output: B - Good!
```

### Nested If Statements

```javascript
const isLoggedIn = true;
const isAdmin = false;

if (isLoggedIn) {
  if (isAdmin) {
    console.log("Welcome, Admin!");
  } else {
    console.log("Welcome, User!");
  }
} else {
  console.log("Please log in");
}
```

---

## Ternary Operator

A shorthand for simple if/else:

```javascript
// Traditional if/else
let message;
if (age >= 18) {
  message = "Adult";
} else {
  message = "Minor";
}

// Ternary operator (same thing, one line)
const message = age >= 18 ? "Adult" : "Minor";
//              condition ? if-true : if-false
```

### Practical Uses

```javascript
// Display status
const status = isOnline ? "Online" : "Offline";

// Greeting
const greeting = hour < 12 ? "Good morning" : "Good afternoon";

// Plural handling
const itemText = count === 1 ? "item" : "items";
console.log(`You have ${count} ${itemText}`);
```

---

## Switch Statement

When comparing one value against many options:

```javascript
const day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of work week");
    break;
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
    console.log("Midweek");
    break;
  case "Friday":
    console.log("TGIF!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend!");
    break;
  default:
    console.log("Invalid day");
}
```

**Important:** Don't forget `break`! Without it, execution falls through to the next case.

---

## For Loop

Repeat code a specific number of times:

```javascript
// Basic structure
for (initialization; condition; update) {
  // code to repeat
}

// Count 1 to 5
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// Output: 1, 2, 3, 4, 5

// Count down
for (let i = 5; i >= 1; i--) {
  console.log(i);
}
// Output: 5, 4, 3, 2, 1

// Skip by 2
for (let i = 0; i <= 10; i += 2) {
  console.log(i);
}
// Output: 0, 2, 4, 6, 8, 10
```

### Looping Through Arrays

```javascript
const fruits = ["apple", "banana", "cherry"];

for (let i = 0; i < fruits.length; i++) {
  console.log(`${i}: ${fruits[i]}`);
}
// Output:
// 0: apple
// 1: banana
// 2: cherry
```

---

## For...Of Loop

Modern way to loop through iterable items (arrays, strings):

```javascript
const fruits = ["apple", "banana", "cherry"];

for (const fruit of fruits) {
  console.log(fruit);
}
// Output:
// apple
// banana
// cherry

// Works with strings too
const word = "Hello";
for (const char of word) {
  console.log(char);
}
// H, e, l, l, o
```

### When to Use Which

| Loop Type  | Best For                        |
| ---------- | ------------------------------- |
| `for`      | When you need the index         |
| `for...of` | Simple iteration over values    |
| `forEach`  | Array method, no break/continue |

---

## For...In Loop

Loop through object keys:

```javascript
const person = {
  name: "Alice",
  age: 25,
  city: "New York",
};

for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}
// Output:
// name: Alice
// age: 25
// city: New York
```

**Note:** Don't use `for...in` with arrays - use `for...of` instead.

---

## While Loop

Repeat while a condition is true:

```javascript
let count = 0;

while (count < 5) {
  console.log(count);
  count++; // Don't forget this!
}
// Output: 0, 1, 2, 3, 4
```

### Use Cases for While

```javascript
// Random number until we get 6
let dice;
let rolls = 0;

while (dice !== 6) {
  dice = Math.floor(Math.random() * 6) + 1;
  rolls++;
  console.log(`Rolled: ${dice}`);
}
console.log(`Got 6 after ${rolls} rolls!`);
```

---

## Do...While Loop

Runs at least once, then checks condition:

```javascript
let input;

do {
  input = prompt("Enter a number greater than 10:");
} while (input <= 10);

console.log(`You entered: ${input}`);
```

---

## Break and Continue

### break - Exit the loop entirely

```javascript
for (let i = 1; i <= 10; i++) {
  if (i === 5) {
    break; // Stop at 5
  }
  console.log(i);
}
// Output: 1, 2, 3, 4
```

### continue - Skip to next iteration

```javascript
for (let i = 1; i <= 5; i++) {
  if (i === 3) {
    continue; // Skip 3
  }
  console.log(i);
}
// Output: 1, 2, 4, 5
```

---

## Avoiding Infinite Loops

An infinite loop runs forever and crashes your program:

```javascript
// ❌ Infinite loop - condition never becomes false
while (true) {
  console.log("Forever...");
}

// ❌ Infinite loop - forgot to update counter
let i = 0;
while (i < 10) {
  console.log(i);
  // Forgot i++!
}

// ✅ Fixed
let i = 0;
while (i < 10) {
  console.log(i);
  i++; // Update the counter!
}
```

---

## Practical Examples

### Find an Item

```javascript
function findUser(users, name) {
  for (const user of users) {
    if (user.name === name) {
      return user; // Found it!
    }
  }
  return null; // Not found
}

const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];

console.log(findUser(users, "Bob")); // { name: 'Bob', age: 30 }
console.log(findUser(users, "David")); // null
```

### Count Occurrences

```javascript
function countLetter(str, letter) {
  let count = 0;
  for (const char of str.toLowerCase()) {
    if (char === letter.toLowerCase()) {
      count++;
    }
  }
  return count;
}

console.log(countLetter("Hello World", "l")); // 3
```

### FizzBuzz (Classic Interview Question)

```javascript
for (let i = 1; i <= 100; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}
```

### Build a Menu

```javascript
function displayMenu(options) {
  console.log("\n--- Menu ---");
  for (let i = 0; i < options.length; i++) {
    console.log(`${i + 1}. ${options[i]}`);
  }
  console.log("------------\n");
}

displayMenu(["View Profile", "Settings", "Log Out"]);
// --- Menu ---
// 1. View Profile
// 2. Settings
// 3. Log Out
// ------------
```

---

## Truthy and Falsy Values

In conditions, values are automatically converted to `true` or `false`:

### Falsy Values (evaluate to false)

```javascript
false
0
'' (empty string)
null
undefined
NaN
```

### Truthy Values (everything else)

```javascript
true
1, -1, 3.14 (any non-zero number)
'hello' (any non-empty string)
[] (empty array - this surprises people!)
{} (empty object)
```

### Practical Use

```javascript
const username = "";

if (username) {
  console.log(`Welcome, ${username}`);
} else {
  console.log("Please enter a username");
}

// Shorter with logical OR
const displayName = username || "Guest";
```

---

## Exercises

### Exercise 1: Grade Calculator

Create a function that takes a score (0-100) and returns the letter grade with a message:

- A (90-100): "Excellent!"
- B (80-89): "Good job!"
- C (70-79): "Not bad"
- D (60-69): "Need improvement"
- F (0-59): "Failed"

### Exercise 2: Sum of Numbers

Write a function that sums all numbers from 1 to n using a loop.

### Exercise 3: Find the Largest

Create a function that takes an array and returns the largest number.

### Exercise 4: Reverse a String

Use a loop to reverse a string character by character.

---

## Summary

- **Comparison operators** (`===`, `!==`, `>`, `<`) compare values
- **Logical operators** (`&&`, `||`, `!`) combine conditions
- **if/else** executes code based on conditions
- **Ternary operator** is shorthand for simple if/else
- **for** loops run a specific number of times
- **for...of** iterates over values in arrays
- **while** loops run while a condition is true
- **break** exits a loop; **continue** skips to the next iteration
- Always ensure loops will eventually end!

---

## What's Next?

Now you can write logic! Let's learn about **Objects and Arrays** - the data structures that hold and organize information.

---

_Estimated completion time: 35 minutes_  
_Difficulty: Beginner_
