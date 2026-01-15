# Forms & Validation

Handling user input is a core part of web apps. In this lesson, we'll learn how to manage forms in React.

## Controlled Components

In HTML, form elements like `<input>` maintain their own state. In React, we want to keep that state in our component using `useState`. This is called a **Controlled Component**.

```jsx
import { useState } from "react";

function SimpleForm() {
  const [name, setName] = useState("");

  return (
    <form>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <p>Hello, {name}!</p>
    </form>
  );
}
```

### Why do this?

1. **Instant Validation**: You can check the input _as the user types_.
2. **Conditional Formatting**: Disable the submit button if the input is empty.
3. **One Source of Truth**: The state (`name`) is the only place the data lives.

## Handling Form Submission

You don't want the browser to refresh the page when you submit a form (the default HTML behavior). You want to handle it with JavaScript.

```jsx
function SubmitForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // STOP the page refresh
    alert(`Submitting: ${email}`);
    // Here you would send data to a server
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

## Basic Validation

Let's show an error if the password is too short.

```jsx
function PasswordForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return; // Stop here!
    }
    setError(""); // Clear error if valid
    alert("Password valid!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Set Password</button>
    </form>
  );
}
```

## Exercise

1. Create a Login form with `email` and `password`.
2. Disable the "Login" button if either field is empty.
3. Show an error if the email doesn't contain an "@" symbol.
