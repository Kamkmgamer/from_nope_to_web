# Deploying with Netlify

**Estimated Time:** 20 minutes  
**Prerequisites:** GitHub account, a website or web application ready to deploy

---

## Introduction

Netlify is another fantastic hosting platform that's beloved by developers. It's similar to Vercel but has some unique features that make it stand out.

By the end of this lesson, you will:

- Understand Netlify's unique features
- Deploy a website using Netlify
- Set up continuous deployment
- Use Netlify's built-in form handling

---

## Why Netlify?

| Feature                  | Description                              |
| ------------------------ | ---------------------------------------- |
| **Drag & Drop Deploy**   | Upload files directly without Git        |
| **Form Handling**        | Built-in forms without any backend code  |
| **Serverless Functions** | Run Node.js functions without a server   |
| **Split Testing**        | A/B test different versions of your site |
| **Great Free Tier**      | 100GB bandwidth, 300 build minutes/month |
| **Branch Deploys**       | Preview any branch automatically         |

---

## Netlify vs Vercel

Both are excellent! Here's when to choose each:

| Choose Netlify When...                | Choose Vercel When...              |
| ------------------------------------- | ---------------------------------- |
| You need built-in form handling       | You're building with Next.js       |
| You want drag & drop deployment       | You need advanced Next.js features |
| You need split testing                | You want simpler dashboard         |
| You prefer more customization options | You prefer auto-detection          |

**Truth is:** Both are great. Many developers use both for different projects!

---

## Step-by-Step: Deploy to Netlify

### Method 1: Drag & Drop (Fastest)

Perfect for static sites when you just want to get something online quickly.

1. Go to [netlify.com](https://netlify.com)
2. Sign up or log in
3. Go to **Sites** → **Add new site** → **Deploy manually**
4. Drag your project folder onto the dropzone

That's it! You'll get a URL like `random-name-abc123.netlify.app`

### Method 2: GitHub Integration (Recommended)

For automatic deployments whenever you push code.

#### Step 1: Sign Up with GitHub

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Sign up"**
3. Choose **"GitHub"**
4. Authorize Netlify

#### Step 2: Import Your Project

1. Click **"Add new site"**
2. Select **"Import an existing project"**
3. Choose **"GitHub"**
4. Select your repository

#### Step 3: Configure Build Settings

Netlify usually auto-detects these, but here's what they mean:

| Setting           | Description                      | Example                   |
| ----------------- | -------------------------------- | ------------------------- |
| Branch to deploy  | Which branch triggers production | `main` or `master`        |
| Build command     | Command to build your site       | `npm run build`           |
| Publish directory | Where the built files are        | `dist`, `build`, or `out` |

**Common settings by framework:**

| Framework        | Build Command   | Publish Directory |
| ---------------- | --------------- | ----------------- |
| Static HTML      | (leave empty)   | `.` or `/`        |
| React (Vite)     | `npm run build` | `dist`            |
| React (CRA)      | `npm run build` | `build`           |
| Next.js (static) | `npm run build` | `out`             |
| Vue              | `npm run build` | `dist`            |

#### Step 4: Deploy

Click **"Deploy site"** and watch the build logs.

After 30-60 seconds, your site is live!

---

## Netlify Forms (Free Feature!)

This is one of Netlify's killer features. Add a form to your site without any backend!

### How It Works

1. Add the `netlify` attribute to any HTML form
2. Netlify automatically handles submissions
3. View submissions in your Netlify dashboard

### Example

```html
<form name="contact" method="POST" data-netlify="true">
  <p>
    <label>Name: <input type="text" name="name" /></label>
  </p>
  <p>
    <label>Email: <input type="email" name="email" /></label>
  </p>
  <p>
    <label>Message: <textarea name="message"></textarea></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
```

That's all you need! When someone submits this form:

1. Netlify captures the data
2. You can view it in Dashboard → Forms
3. Optionally set up email notifications

### Viewing Submissions

1. Go to your site's dashboard
2. Click **"Forms"** in the sidebar
3. View all submissions with timestamps

### Spam Protection

Add a honeypot field for extra spam protection:

```html
<form
  name="contact"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
>
  <!-- Hidden field - bots will fill this, humans won't -->
  <p hidden>
    <label>Don't fill this if you're human: <input name="bot-field" /></label>
  </p>

  <!-- Your regular form fields -->
  <p>
    <label>Email: <input type="email" name="email" /></label>
  </p>
  <button type="submit">Send</button>
</form>
```

---

## Netlify Functions (Serverless)

Need a bit of backend logic? Netlify Functions lets you write serverless functions.

### Create a Function

1. Create a folder called `netlify/functions/` in your project
2. Add a JavaScript file

**netlify/functions/hello.js:**

```javascript
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello from Netlify Functions!",
    }),
  };
};
```

3. Deploy your site
4. Access at `https://yoursite.netlify.app/.netlify/functions/hello`

### Real-World Use Cases

- Sending emails
- Connecting to APIs with secret keys
- Processing payments
- Database operations

---

## Deploy Previews

Like Vercel, Netlify creates preview URLs for branches and pull requests.

### How It Works

1. Push code to a non-main branch
2. Netlify automatically builds it
3. Get a preview URL like: `deploy-preview-123--yoursite.netlify.app`

### Pull Request Integration

When you create a PR on GitHub:

1. Netlify posts a comment with the preview URL
2. Reviewers can test changes before merging
3. Preview updates with each new commit

---

## Changing Your Site Name

Don't like `random-letters-123.netlify.app`?

1. Go to **Site settings** → **General**
2. Click **"Change site name"**
3. Enter your preferred name
4. Your site is now at `your-chosen-name.netlify.app`

---

## Setting Up Redirects

Need to redirect old URLs? Create a `_redirects` file in your publish directory:

```
# Old page to new page
/old-page    /new-page

# Redirect with status code
/moved       /new-location   301

# Proxying (hide the origin URL)
/api/*       https://api.example.com/:splat   200
```

Or use `netlify.toml` for more advanced configurations:

```toml
[[redirects]]
  from = "/old-page"
  to = "/new-page"
  status = 301
```

---

## Troubleshooting

### Build Failed

Check the deploy log for errors. Common issues:

**1. Wrong build command**

```
Error: npm run build failed
```

Make sure the command in `package.json` scripts matches

**2. Wrong publish directory**

```
Site deploy failed - didn't find any deploy files
```

Check if your build outputs to the expected folder

**3. Missing dependencies**

```
Cannot find module 'xyz'
```

Add missing packages: `npm install xyz`

### Environment Variables

If your app needs environment variables:

1. Go to **Site settings** → **Environment variables**
2. Add your variables
3. Trigger a new deploy

### Forms Not Working

Make sure:

1. The `data-netlify="true"` attribute is on the form
2. Form has a `name` attribute
3. You've deployed after adding the form

---

## Try It Yourself

### Exercise 1: Deploy with Drag & Drop

1. Create a simple HTML/CSS site
2. Drag & drop it to Netlify
3. Share the URL!

### Exercise 2: Add a Contact Form

1. Add a Netlify form to your site
2. Deploy
3. Submit a test message
4. View it in the dashboard

### Exercise 3: Create a Serverless Function

1. Create `netlify/functions/api.js`
2. Return your name and favorite color as JSON
3. Deploy and test the endpoint

---

## Key Vocabulary

| Term               | Definition                                   |
| ------------------ | -------------------------------------------- |
| **Netlify Forms**  | Built-in form handling without backend code  |
| **Deploy Preview** | Automatic deployment of branches for testing |
| **Function**       | Serverless backend code that runs on Netlify |
| **Redirect**       | Sending visitors from one URL to another     |
| **Build Log**      | Record of what happened during deployment    |

---

## Summary

- **Netlify** is great for any static site or JAMstack application
- **Drag & drop** deployment is the fastest way to get started
- **GitHub integration** enables automatic continuous deployment
- **Netlify Forms** handles form submissions without backend code
- **Functions** let you run serverless backend code
- Free tier is generous enough for most personal projects

---

## What's Next?

You can now deploy to Netlify or Vercel, but your URLs look like `random-words.netlify.app`. In the next lesson, we'll learn how to connect a **custom domain** like `yourname.com`!

---

_Estimated completion time: 20 minutes_  
_Difficulty: Beginner_
