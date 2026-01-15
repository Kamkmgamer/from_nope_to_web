# Deploying with GitHub Pages

**Estimated Time:** 25 minutes  
**Prerequisites:** GitHub account, Git installed, a simple website ready

---

## Introduction

GitHub Pages is the simplest way to host a website for free. If you have a GitHub account, you already have access to free hosting!

By the end of this lesson, you will:

- Create a GitHub repository
- Upload your website files
- Deploy using GitHub Pages
- Access your live website with a public URL

---

## Why GitHub Pages?

| Feature            | GitHub Pages                            |
| ------------------ | --------------------------------------- |
| **Price**          | 100% Free                               |
| **HTTPS**          | Included automatically                  |
| **Bandwidth**      | 100GB/month (more than enough to start) |
| **Custom Domain**  | Supported (we'll cover this later)      |
| **Learning Curve** | Very beginner-friendly                  |

**Perfect for:**

- Portfolios
- Personal blogs
- Project documentation
- Landing pages
- Any static website

**Limitations:**

- Static sites only (no backend/database)
- 1GB storage limit per repo
- 10 builds per hour limit

---

## Step-by-Step: Your First Deployment

### Step 1: Prepare Your Website Files

Make sure you have an `index.html` file - this is required! The name must be exactly `index.html`.

Your folder structure should look like this:

```
my-website/
├── index.html      ← REQUIRED!
├── styles.css
├── script.js
└── images/
    └── photo.jpg
```

### Step 2: Create a New Repository

1. Go to [github.com](https://github.com)
2. Click the **+** icon in the top right
3. Select **"New repository"**

Fill in the details:

| Field           | What to Enter                               |
| --------------- | ------------------------------------------- |
| Repository name | `my-first-website` (or any name you like)   |
| Description     | "My first hosted website" (optional)        |
| Visibility      | **Public** (required for free GitHub Pages) |
| Initialize      | Leave unchecked for now                     |

Click **"Create repository"**

### Step 3: Upload Your Files

#### Option A: Using GitHub's Web Interface (Easiest)

1. On your new repository page, click **"uploading an existing file"**
2. Drag and drop all your website files
3. Scroll down and click **"Commit changes"**

That's it! Your files are now on GitHub.

#### Option B: Using Git Commands (More Professional)

Open your terminal/command prompt in your website folder:

```bash
# Initialize Git in your folder
git init

# Add all files
git add .

# Create your first commit
git commit -m "Initial commit: my first website"

# Connect to your GitHub repository
# Replace YOUR-USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR-USERNAME/my-first-website.git

# Upload to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

This is where the magic happens!

1. Go to your repository on GitHub
2. Click **"Settings"** (tab at the top)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **"Save"**

### Step 5: Wait for Deployment

GitHub will build your website. This usually takes 1-2 minutes.

You'll see a message like:

> "Your site is live at https://YOUR-USERNAME.github.io/my-first-website/"

---

## 🎉 Congratulations!

Your website is now live on the internet! Anyone in the world can visit it.

Try these:

- Open the URL on your phone
- Send the link to a friend
- Post it on social media

---

## Understanding Your GitHub Pages URL

Your free URL follows this pattern:

```
https://YOUR-USERNAME.github.io/REPOSITORY-NAME/
```

**Examples:**

- `https://johndoe.github.io/portfolio/`
- `https://sarahsmith.github.io/my-first-website/`
- `https://developer123.github.io/project-name/`

### Special Case: User/Organization Site

If you name your repository `YOUR-USERNAME.github.io`, it becomes your main site:

```
https://YOUR-USERNAME.github.io/
```

This is perfect for a personal portfolio or main website.

---

## Making Updates

Every time you update your code and push to GitHub, your website automatically updates!

### Using the Web Interface

1. Go to your repository
2. Click on the file you want to edit
3. Click the pencil icon ✏️ to edit
4. Make your changes
5. Click **"Commit changes"**
6. Wait 1-2 minutes for the update

### Using Git (Professional Workflow)

```bash
# Make changes to your files
# Then:

git add .
git commit -m "Updated homepage design"
git push

# Your website updates automatically!
```

---

## Troubleshooting

### "404 - There isn't a GitHub Pages site here"

**Possible causes:**

1. **Wrong branch:** Make sure you selected `main` in Pages settings
2. **No index.html:** GitHub Pages requires an `index.html` at the root
3. **Still building:** Wait 1-2 minutes and refresh
4. **Repository is private:** Free GitHub Pages requires public repos

### "My CSS/images aren't loading"

**Cause:** Wrong file paths

**Fix:** Use relative paths, not absolute:

```html
<!-- ❌ Wrong -->
<link rel="stylesheet" href="/styles.css" />

<!-- ✅ Correct -->
<link rel="stylesheet" href="./styles.css" />
<!-- or -->
<link rel="stylesheet" href="styles.css" />
```

### "Changes aren't showing up"

1. Wait 1-2 minutes (builds take time)
2. Hard refresh your browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
3. Check the "Actions" tab for build status

---

## Viewing Build Status

1. Go to your repository
2. Click on **"Actions"** tab
3. You'll see your recent deployments

| Status        | Meaning                       |
| ------------- | ----------------------------- |
| 🟢 Green dot  | Deployment successful         |
| 🟡 Yellow dot | Building in progress          |
| 🔴 Red dot    | Build failed (check the logs) |

Click on any workflow run to see details and error messages.

---

## Try It Yourself: Deploy a Portfolio

Let's create and deploy a simple portfolio:

### 1. Create the Files

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Portfolio</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <header>
      <h1>Hi, I'm [Your Name] 👋</h1>
      <p>Aspiring Web Developer</p>
    </header>

    <main>
      <section class="about">
        <h2>About Me</h2>
        <p>I'm learning web development and this is my first hosted website!</p>
      </section>

      <section class="projects">
        <h2>My Projects</h2>
        <div class="project-card">
          <h3>This Portfolio</h3>
          <p>Built with HTML, CSS, and deployed on GitHub Pages</p>
        </div>
      </section>
    </main>

    <footer>
      <p>Made with ❤️ while learning to code</p>
    </footer>
  </body>
</html>
```

**styles.css:**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Segoe UI", system-ui, sans-serif;
  line-height: 1.6;
  color: #1a1a2e;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

header {
  text-align: center;
  padding: 60px 20px;
  color: white;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

main {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

section {
  background: white;
  padding: 30px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

h2 {
  color: #667eea;
  margin-bottom: 15px;
}

.project-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.project-card h3 {
  color: #333;
}

footer {
  text-align: center;
  padding: 30px;
  color: white;
}
```

### 2. Deploy It

Follow the steps from earlier:

1. Create a repository called `portfolio`
2. Upload your files
3. Enable GitHub Pages
4. Share your portfolio with the world!

---

## Key Vocabulary

| Term            | Definition                                          |
| --------------- | --------------------------------------------------- |
| **Repository**  | A folder on GitHub that contains your project files |
| **Commit**      | A saved snapshot of your changes                    |
| **Push**        | Uploading your commits to GitHub                    |
| **Branch**      | A version of your code (main is the default)        |
| **Static Site** | A website with only HTML, CSS, and JavaScript       |
| **Build**       | The process of preparing your site for deployment   |

---

## Exercises

### Exercise 1: Deploy Your Own Website

Take any website you've built during this course and deploy it to GitHub Pages.

### Exercise 2: Create a Special Repository

Create a repository named `YOUR-USERNAME.github.io` (your personal site) and add a simple landing page.

### Exercise 3: Practice the Git Workflow

1. Make a change to your deployed site
2. Commit the change with a descriptive message
3. Push to GitHub
4. Verify the change appears on your live site

---

## Summary

- **GitHub Pages** offers free hosting for static websites
- Create a repository, upload files, enable Pages in settings
- Your site goes live at `https://username.github.io/repo-name/`
- Every push to GitHub automatically updates your live site
- Perfect for portfolios, projects, and personal sites

---

## What's Next?

GitHub Pages is great for static sites, but what about React apps or Next.js projects? In the next lesson, we'll explore **Vercel** - a platform built specifically for modern web frameworks.

---

_Estimated completion time: 25 minutes_  
_Difficulty: Beginner_
