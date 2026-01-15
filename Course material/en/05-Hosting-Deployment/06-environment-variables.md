# Environment Variables

**Estimated Time:** 20 minutes  
**Prerequisites:** Basic understanding of deployment, experience with React or Next.js

---

## Introduction

Your app needs to connect to an API. The API requires a secret key. Where do you put that key?

If you put it directly in your code and push to GitHub... **anyone can see it!** This is a massive security problem.

The solution? **Environment Variables.**

By the end of this lesson, you will:

- Understand what environment variables are
- Know how to use them locally
- Set them up in production
- Keep your secrets safe

---

## What Are Environment Variables?

Environment variables are **values stored outside your code** that your application can access. They're like a secret note that only your app can read.

### Why Use Them?

1. **Security** - Keys and passwords aren't in your code
2. **Flexibility** - Different values for development vs production
3. **Convenience** - Change configuration without changing code

### Common Use Cases

| Variable              | Example Value                 | Purpose                        |
| --------------------- | ----------------------------- | ------------------------------ |
| `DATABASE_URL`        | `postgresql://...`            | Database connection string     |
| `API_KEY`             | `sk_live_abc123...`           | Third-party API authentication |
| `STRIPE_SECRET_KEY`   | `sk_test_...`                 | Payment processing             |
| `NEXT_PUBLIC_API_URL` | `https://api.example.com`     | API endpoint                   |
| `NODE_ENV`            | `development` or `production` | Environment type               |

---

## The Problem: Exposed Secrets

### ❌ The Wrong Way

```javascript
// DON'T DO THIS!
const API_KEY = "sk_live_abc123xyz789";

fetch(`https://api.example.com?key=${API_KEY}`);
```

Why this is terrible:

- The key is in your source code
- It gets pushed to GitHub
- Anyone can see it
- **Bots scan GitHub for exposed keys** and exploit them within minutes!

### ✅ The Right Way

```javascript
// Do this instead!
const API_KEY = process.env.API_KEY;

fetch(`https://api.example.com?key=${API_KEY}`);
```

The key exists only in your environment, not your code.

---

## Using Environment Variables Locally

### Step 1: Create a `.env` File

In your project root, create a file called `.env`:

```
API_KEY=your_secret_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
MY_SECRET=super_secret_value
```

**Rules:**

- No spaces around `=`
- No quotes needed (usually)
- One variable per line
- Use ALL_CAPS with underscores

### Step 2: Add `.env` to `.gitignore`

**CRITICAL:** Never commit your `.env` file!

Add this to your `.gitignore`:

```
# Environment Variables
.env
.env.local
.env*.local
```

### Step 3: Access Variables in Your Code

#### In Node.js

```javascript
const apiKey = process.env.API_KEY;
console.log(apiKey); // your_secret_key_here
```

#### In React (Vite)

Variables must start with `VITE_`:

```
VITE_API_URL=https://api.example.com
```

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

#### In Next.js

Two types of variables:

**Server-only (secure):**

```
API_SECRET=super_secret
```

```javascript
// Only works in API routes or getServerSideProps
const secret = process.env.API_SECRET;
```

**Client-safe (public):**

```
NEXT_PUBLIC_API_URL=https://api.example.com
```

```javascript
// Works anywhere, but visible to users!
const url = process.env.NEXT_PUBLIC_API_URL;
```

---

## Environment Files

### Common `.env` File Types

| File               | Purpose                             | Committed? |
| ------------------ | ----------------------------------- | ---------- |
| `.env`             | Default/shared variables            | Sometimes  |
| `.env.local`       | Local overrides (your machine only) | ❌ Never   |
| `.env.development` | Development-specific                | ✅ Maybe   |
| `.env.production`  | Production-specific                 | ✅ Maybe   |
| `.env.example`     | Template showing required variables | ✅ Yes     |

### Creating an `.env.example`

Help other developers know what variables are needed:

```
# API Configuration
# Get your key at https://api.example.com
API_KEY=

# Database
DATABASE_URL=

# Authentication (optional)
AUTH_SECRET=
```

This file shows the structure without revealing actual values.

---

## Production Environment Variables

### In Vercel

1. Go to your project dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - **Name:** `API_KEY`
   - **Value:** `your_actual_secret`
   - **Environment:** Production (and/or Preview, Development)
4. Click **Save**
5. **Redeploy** your site (changes require redeploy!)

### In Netlify

1. Go to your site dashboard
2. Click **Site settings** → **Environment variables**
3. Click **Add a variable**
4. Enter name and value
5. Redeploy

### In GitHub Actions (CI/CD)

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add your secret

```yaml
# In your workflow file
env:
  API_KEY: ${{ secrets.API_KEY }}
```

---

## Security Best Practices

### ✅ DO

1. **Use `.env.example`** to document required variables
2. **Add `.env*` to `.gitignore`** before your first commit
3. **Use different values** for development and production
4. **Rotate keys regularly** if possible
5. **Use secrets managers** for team projects

### ❌ DON'T

1. **Never commit `.env` files** with real values
2. **Never hardcode secrets** in source code
3. **Never console.log secrets** (especially in production)
4. **Never put secrets in `NEXT_PUBLIC_`** prefix unless intentional

### If You Accidentally Expose a Secret

**Act immediately:**

1. **Revoke the key** in the service's dashboard
2. **Generate a new key**
3. **Update your environment variables**
4. **Remove from Git history** (complicated - Google "remove secrets from git history")
5. **Learn from it** - set up better practices

---

## Different Values for Different Environments

### Development vs Production

**.env.development:**

```
API_URL=http://localhost:3001
STRIPE_KEY=sk_test_xxx
DEBUG=true
```

**.env.production:**

```
API_URL=https://api.mysite.com
STRIPE_KEY=sk_live_xxx
DEBUG=false
```

### Loading Order (Next.js)

1. `.env.local` (always loaded, never committed)
2. `.env.[environment].local` (environment-specific local)
3. `.env.[environment]` (development or production)
4. `.env` (default)

Later files override earlier ones.

---

## Debugging Environment Variables

### Check If Variables Are Loaded

```javascript
console.log("API_KEY exists:", !!process.env.API_KEY);
console.log("NODE_ENV:", process.env.NODE_ENV);
```

**Note:** Never log the actual value of secrets!

### Common Issues

#### Variable is `undefined`

1. Check the variable name (case-sensitive!)
2. Make sure `.env` is in the project root
3. Restart your development server
4. Check if you need a prefix (`VITE_`, `NEXT_PUBLIC_`)

#### Variable works locally but not in production

1. Add it to your hosting platform's environment variables
2. Redeploy after adding
3. Check if you're using the right prefix for client-side access

#### `.env` file is being committed

1. Add to `.gitignore`
2. Remove from tracking: `git rm --cached .env`
3. Commit the removal

---

## Framework-Specific Examples

### Vite (React, Vue)

```bash
# .env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=My App
```

```javascript
// In your code
const apiUrl = import.meta.env.VITE_API_URL;
const appTitle = import.meta.env.VITE_APP_TITLE;
```

### Next.js

```bash
# .env.local
# Server-only
DATABASE_URL=postgresql://...
API_SECRET=xxx

# Client-accessible
NEXT_PUBLIC_API_URL=https://api.example.com
```

```javascript
// Server-side only (API routes, getServerSideProps)
const dbUrl = process.env.DATABASE_URL;

// Works everywhere (but exposed to client!)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

### Create React App

```bash
# .env
REACT_APP_API_URL=https://api.example.com
```

```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

---

## Try It Yourself

### Exercise 1: Create a Secure Setup

1. Create a `.env.example` file listing your required variables
2. Create a `.env.local` file with actual values
3. Add `.env*` to `.gitignore`
4. Test that variables load correctly

### Exercise 2: Set Up Production Variables

1. Deploy a project to Vercel or Netlify
2. Add environment variables in the dashboard
3. Verify they work in production

### Exercise 3: Audit Your Code

1. Search your codebase for any hardcoded secrets
2. Move them to environment variables
3. Check your Git history for accidentally committed secrets

---

## Key Vocabulary

| Term                     | Definition                                               |
| ------------------------ | -------------------------------------------------------- |
| **Environment Variable** | A value defined outside your code, accessible at runtime |
| **`.env` File**          | A file containing environment variables locally          |
| **Secrets**              | Sensitive values like API keys and passwords             |
| **`process.env`**        | Object in Node.js containing environment variables       |
| **Runtime**              | When your code is actually executing                     |
| **Prefix**               | Required start of variable name (e.g., `VITE_`)          |

---

## Summary

- **Environment variables** store configuration outside your code
- Use a **`.env` file** for local development
- **Never commit** `.env` files with real secrets
- Add secrets to your **hosting platform's dashboard** for production
- Different frameworks have **different prefixes** for client-side access
- **Restart your server** after changing environment variables
- Create **`.env.example`** to help other developers

---

## Course Complete! 🎉

You've now learned everything you need to:

1. ✅ Understand what hosting means
2. ✅ Deploy static sites with GitHub Pages
3. ✅ Deploy modern apps with Vercel
4. ✅ Deploy with Netlify and use forms
5. ✅ Connect custom domains
6. ✅ Keep your secrets safe with environment variables

**Your websites are now ready to be seen by the world!**

### What's Next?

- Build and deploy your portfolio
- Create projects and deploy them for practice
- Explore more advanced hosting topics:
  - CI/CD pipelines
  - Docker containers
  - Database hosting
  - Monitoring and analytics

---

_Estimated completion time: 20 minutes_  
_Difficulty: Intermediate_
