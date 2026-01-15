# Deploying with Vercel

**Estimated Time:** 25 minutes  
**Prerequisites:** GitHub account, a React or Next.js project (or any modern framework)

---

## Introduction

While GitHub Pages is great for static HTML sites, modern web applications built with React, Next.js, or Vue need something more powerful. Enter **Vercel** - a platform built by the creators of Next.js.

By the end of this lesson, you will:

- Understand why Vercel is ideal for modern web apps
- Connect Vercel to your GitHub account
- Deploy a React/Next.js application
- Set up automatic deployments

---

## Why Vercel?

| Feature                  | Description                                   |
| ------------------------ | --------------------------------------------- |
| **Built for Next.js**    | Created by the same company that made Next.js |
| **Zero Configuration**   | Detects your framework automatically          |
| **Instant Deploys**      | Every git push triggers a new deployment      |
| **Preview URLs**         | Every branch gets its own preview deployment  |
| **Free Tier**            | Generous free plan perfect for learning       |
| **Edge Network**         | Fast loading worldwide via CDN                |
| **Serverless Functions** | Run backend code without managing servers     |

---

## Vercel vs GitHub Pages

| Feature             | GitHub Pages             | Vercel                     |
| ------------------- | ------------------------ | -------------------------- |
| Static Sites        | ✅ Yes                   | ✅ Yes                     |
| React Apps          | ⚠️ Manual build required | ✅ Automatic               |
| Next.js             | ❌ No SSR support        | ✅ Full support            |
| API Routes          | ❌ No                    | ✅ Serverless Functions    |
| Preview Deployments | ❌ No                    | ✅ Every PR gets a preview |
| Build Speed         | Slow                     | Very Fast                  |

**Use GitHub Pages for:** Simple HTML/CSS sites  
**Use Vercel for:** React, Next.js, Vue, Svelte, or any modern framework

---

## Step-by-Step: Deploy to Vercel

### Step 1: Prepare Your Project

Make sure your project is pushed to GitHub. Your repository should have either:

- A React app (created with Vite or Create React App)
- A Next.js application
- Any other supported framework

**Supported Frameworks:**

- Next.js
- React (Vite, CRA)
- Vue
- Nuxt
- Svelte
- SvelteKit
- Astro
- And many more!

### Step 2: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub

Using GitHub login is best because it enables automatic deployments!

### Step 3: Import Your Project

1. On the Vercel dashboard, click **"Add New..."**
2. Select **"Project"**
3. You'll see a list of your GitHub repositories
4. Find your project and click **"Import"**

If you don't see your repository:

- Click **"Adjust GitHub App Permissions"**
- Grant Vercel access to the specific repository

### Step 4: Configure Your Project

Vercel will automatically detect your framework! Review the settings:

| Setting              | What It Does                              |
| -------------------- | ----------------------------------------- |
| **Project Name**     | The name shown in your dashboard          |
| **Framework**        | Auto-detected (Next.js, React, etc.)      |
| **Root Directory**   | Usually leave as `.` (the project root)   |
| **Build Command**    | Auto-detected (e.g., `npm run build`)     |
| **Output Directory** | Auto-detected (e.g., `.next` for Next.js) |

For most projects, you can leave all settings as-is!

### Step 5: Deploy!

Click **"Deploy"** and watch the magic happen:

1. Vercel clones your repository
2. Installs dependencies (`npm install`)
3. Builds your project (`npm run build`)
4. Deploys to their edge network

This usually takes 30-60 seconds.

### Step 6: Your Site is Live! 🎉

You'll get a URL like:

```
https://your-project-name.vercel.app
```

You can also get a custom URL or connect your own domain (covered later).

---

## Automatic Deployments

Here's the beautiful part: **every time you push to GitHub, Vercel automatically deploys!**

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Make       │     │   Push to    │     │   Vercel     │
│   Changes    │ ──► │   GitHub     │ ──► │   Deploys    │
│              │     │              │     │   Automatically│
└──────────────┘     └──────────────┘     └──────────────┘
```

### Production vs Preview Deployments

| Type           | Trigger                  | URL                              |
| -------------- | ------------------------ | -------------------------------- |
| **Production** | Push to `main` branch    | `your-project.vercel.app`        |
| **Preview**    | Push to any other branch | `your-project-abc123.vercel.app` |
| **Preview**    | Open a Pull Request      | Comment added to PR with link    |

This means you can:

1. Create a new branch
2. Make changes
3. Push to GitHub
4. Get a preview URL to test
5. Merge to main when ready
6. Production updates automatically!

---

## Deploying a Next.js App

Let's create and deploy a simple Next.js app:

### 1. Create a New Next.js Project

```bash
npx create-next-app@latest my-nextjs-app
cd my-nextjs-app
```

### 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial Next.js app"
git branch -M main

# Create a new repo on GitHub first, then:
git remote add origin https://github.com/YOUR-USERNAME/my-nextjs-app.git
git push -u origin main
```

### 3. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Select your `my-nextjs-app` repository
3. Click Deploy

That's it! Your Next.js app is now live with:

- Server-side rendering working
- API routes functioning
- Automatic HTTPS
- Global CDN distribution

---

## Deploying a Vite React App

### 1. Create a Vite Project

```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
```

### 2. Push to GitHub and Deploy

Same process as above:

1. Push to GitHub
2. Import to Vercel
3. Deploy!

Vercel automatically detects Vite and configures everything correctly.

---

## The Vercel Dashboard

Your Vercel dashboard shows:

### Project Overview

- Current deployment status
- Recent commits and their deploy status
- Performance analytics

### Deployments Tab

Lists all your deployments:

- Production deployments (from `main`)
- Preview deployments (from branches/PRs)
- Each has its own URL you can visit

### Settings Tab

Configure:

- Custom domains
- Environment variables
- Build settings
- Team members

---

## Rollbacks

Made a mistake? Vercel keeps all your deployments!

### How to Rollback

1. Go to your project dashboard
2. Click on **"Deployments"** tab
3. Find the working deployment
4. Click the **"..."** menu
5. Select **"Promote to Production"**

Your site instantly reverts to the selected version!

---

## Troubleshooting

### Build Failed

Check the build logs by clicking on the failed deployment. Common issues:

**1. Missing dependencies**

```
Error: Cannot find module 'xyz'
```

Make sure all dependencies are in `package.json`

**2. Build errors**

```
Type error: Property 'x' does not exist
```

Fix TypeScript errors locally first with `npm run build`

**3. Wrong Node version**
Add an `engines` field to `package.json`:

```json
{
  "engines": {
    "node": "18.x"
  }
}
```

### Environment Variables Not Working

Environment variables must be added in Vercel dashboard:

1. Go to Settings → Environment Variables
2. Add your variables
3. Redeploy (changes require a new deployment)

---

## Vercel CLI (Optional)

You can also deploy from the command line:

### Install the CLI

```bash
npm i -g vercel
```

### Login

```bash
vercel login
```

### Deploy

```bash
vercel
```

This is useful for:

- Deploying without Git
- Testing builds locally
- Debugging deployment issues

---

## Try It Yourself

### Exercise 1: Deploy an Existing Project

Take a React or Next.js project you've built and deploy it to Vercel.

### Exercise 2: Test Preview Deployments

1. Create a new branch: `git checkout -b test-feature`
2. Make a visible change
3. Push: `git push origin test-feature`
4. Check Vercel for your preview URL

### Exercise 3: Explore the Dashboard

- View your deployment logs
- Check analytics
- Explore the settings

---

## Key Vocabulary

| Term                      | Definition                                           |
| ------------------------- | ---------------------------------------------------- |
| **Continuous Deployment** | Automatic deployment on every code change            |
| **Preview Deployment**    | A temporary deployment for testing before production |
| **Edge Network**          | Servers distributed globally for fast loading        |
| **Serverless Function**   | Backend code that runs without managing a server     |
| **Rollback**              | Reverting to a previous deployment                   |

---

## Summary

- **Vercel** is the best platform for React and Next.js applications
- Connect your GitHub account for **automatic deployments**
- Every push to `main` deploys to production
- Every branch/PR gets a **preview deployment**
- Easy **rollbacks** if something goes wrong
- Generous **free tier** for personal projects

---

## What's Next?

In the next lesson, we'll explore **Netlify** - another popular platform with some unique features like form handling and serverless functions.

---

_Estimated completion time: 25 minutes_  
_Difficulty: Beginner to Intermediate_
