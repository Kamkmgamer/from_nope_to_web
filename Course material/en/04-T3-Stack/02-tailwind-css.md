# Tailwind CSS

Standard CSS is hard to maintain. You have to think of class names (`.sidebar-wrapper-left`) and jump between files.

**Tailwind** gives you pre-made classes. You style directly in your HTML.

## Basic Syntax

| Standard CSS               | Tailwind Class |
| :------------------------- | :------------- |
| `color: white;`            | `text-white`   |
| `background-color: black;` | `bg-black`     |
| `padding: 1rem;`           | `p-4`          |
| `border-radius: 0.25rem;`  | `rounded`      |
| `font-weight: 700;`        | `font-bold`    |

## Example

**CSS Way:**

```css
/* style.css */
.btn {
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
}
```

```jsx
<button className="btn">Click me</button>
```

**Tailwind Way:**

```jsx
<button className="rounded bg-blue-500 px-5 py-2 text-white">Click me</button>
```

## Responsive Design

Tailwind makes mobile-first design easy. Use prefixes like `md:` (medium screens) or `lg:` (large screens).

```jsx
<div className="bg-red-500 md:bg-blue-500 lg:bg-green-500">
  I change color based on screen size!
</div>
```

- **Default**: Red (Mobile)
- **md**: Blue (Tablets)
- **lg**: Green (Laptops)

## Hover States

Just use the `hover:` prefix.

```jsx
<button className="bg-blue-500 text-white hover:bg-blue-700">Hover me</button>
```

## Why it's great for T3

1. **Speed**: No context switching between files.
2. **Consistency**: You can't use a "slightly wrong" blue. You only have `blue-500`, `blue-600`, etc.
3. **Small files**: Tailwind removes unused styles automatically.
