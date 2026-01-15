# TypeScript Basics

In JavaScript, you can do this:

```js
let name = "Alice";
name = 42; // JS says: "Sure, why not?"
```

This causes bugs. **TypeScript** stops you:

```ts
let name: string = "Alice";
name = 42; // Error: Type 'number' is not assignable to type 'string'.
```

## Setup

TypeScript files end in `.ts` or `.tsx` (for React).

## Basic Types

```ts
let name: string = "Ahmed";
let age: number = 25;
let isStudent: boolean = true;
let skills: string[] = ["HTML", "CSS"]; // Array of strings
```

## Interfaces (The most important part)

Interfaces define the "shape" of an object.

```ts
interface User {
  id: number;
  username: string;
  email?: string; // The '?' means it's optional
}

const user1: User = {
  id: 1,
  username: "coder123",
  // Email is optional, so we can skip it
};
```

## Functions

You must define what comes IN and what goes OUT.

```ts
function add(a: number, b: number): number {
  return a + b;
}

add(5, 10); // OK
add("5", 10); // Error!
```

## Generics (Advanced)

Sometimes you want a function to work with _any_ type, but still be safe.

```ts
function wrapInArray<T>(item: T): T[] {
  return [item];
}

const stringArray = wrapInArray("hello"); // Type is string[]
const numberArray = wrapInArray(100); // Type is number[]
```

## Why T3 Loves TypeScript

In T3, your **Database** generates Types.
If your database has a `User` table, you automatically get a `User` type in your frontend. You never have to manually write types for your data!
