# Custom Domains & DNS

**Estimated Time:** 30 minutes  
**Prerequisites:** A deployed website, access to a domain registrar

---

## Introduction

Your website is live! But `random-words.netlify.app` doesn't exactly scream professional. It's time to connect a **custom domain** like `yourname.com`.

By the end of this lesson, you will:

- Understand how domain names and DNS work
- Know where to buy a domain
- Connect a custom domain to your hosted site
- Set up HTTPS for security

---

## How Domain Names Work

### The Problem

Computers use IP addresses to find each other:

```
142.250.185.78 ← This is Google
```

But humans can't remember numbers like that. That's why we have domain names!

### The Solution: DNS

**DNS (Domain Name System)** is like the internet's phone book. It translates:

```
google.com → 142.250.185.78
```

When you visit a website:

1. You type `google.com`
2. Your computer asks DNS: "What's the IP for google.com?"
3. DNS responds: "142.250.185.78"
4. Your browser connects to that IP address

---

## Anatomy of a Domain

```
https://www.example.com/page
└─┬─┘ └┬┘ └───┬───┘└┬┘ └─┬─┘
  │    │      │     │    │
  │    │      │     │    └── Path
  │    │      │     └── Top-Level Domain (TLD)
  │    │      └── Second-Level Domain (your unique name)
  │    └── Subdomain (www)
  └── Protocol (https)
```

### Parts You Control

| Part                | Example       | Description                      |
| ------------------- | ------------- | -------------------------------- |
| Second-Level Domain | `example`     | Your unique name (you buy this)  |
| Subdomains          | `www`, `blog` | Optional prefixes you can create |

### Parts You Don't Control

| Part | Example | Description                               |
| ---- | ------- | ----------------------------------------- |
| TLD  | `.com`  | Top-Level Domain (determined by registry) |

---

## Where to Buy a Domain

### Recommended Registrars

| Registrar          | Price Range   | Notes                          |
| ------------------ | ------------- | ------------------------------ |
| **Namecheap**      | $8-12/year    | Great prices, good UI          |
| **Cloudflare**     | At cost (~$9) | No markup, includes free DNS   |
| **Google Domains** | $12/year      | Simple, integrates with Google |
| **Porkbun**        | $6-10/year    | Very affordable, fun branding  |
| **GoDaddy**        | Varies        | Popular but watch for upsells  |

### Tips for Choosing a Domain

1. **Keep it short** - easier to type and remember
2. **Make it memorable** - unique is better than generic
3. **Avoid numbers and hyphens** - confusing when spoken
4. **Prefer .com** - most recognizable (but .dev, .io are fine for developers)
5. **Check social media** - make sure the name is available there too

### Domain Pricing

Domain prices depend on the TLD:

| TLD    | Typical Price | Good For             |
| ------ | ------------- | -------------------- |
| `.com` | $10-15/year   | Most websites        |
| `.dev` | $12-15/year   | Developer portfolios |
| `.io`  | $30-50/year   | Tech startups        |
| `.app` | $12-15/year   | Applications         |
| `.me`  | $10-15/year   | Personal sites       |
| `.co`  | $25-30/year   | Companies, startups  |

---

## DNS Records Explained

When connecting your domain, you'll encounter these record types:

### A Record

Points a domain to an IP address.

```
Type: A
Name: @
Value: 192.0.2.1
```

"When someone visits example.com, go to IP 192.0.2.1"

### CNAME Record

Points a domain to another domain (alias).

```
Type: CNAME
Name: www
Value: example.netlify.app
```

"When someone visits www.example.com, go to example.netlify.app"

### Common DNS Setup

```
example.com
├── A Record → IP Address (for root domain)
└── CNAME → platform.app (for www)

Or:
example.com
├── CNAME → platform.app (if platform supports ANAME/ALIAS)
└── www.example.com
    └── CNAME → platform.app
```

---

## Connecting a Domain to Vercel

### Step 1: Add Your Domain in Vercel

1. Go to your project dashboard
2. Click **"Settings"** → **"Domains"**
3. Enter your domain (e.g., `yourname.com`)
4. Click **"Add"**

### Step 2: Vercel Tells You What to Do

Vercel shows you the DNS records you need to add. Options:

**Option A: Use Vercel DNS (Recommended for beginners)**

- Change your nameservers at your registrar to Vercel's
- Vercel handles everything automatically

**Option B: Add DNS Records (Keep your current DNS)**

- Add the records Vercel shows you at your registrar

### Step 3: Update DNS at Your Registrar

If using Option B, add these records at your domain registrar:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 4: Wait for Propagation

DNS changes take time to spread across the internet:

- Usually 5-30 minutes
- Can take up to 48 hours (rare)

### Step 5: HTTPS is Automatic

Vercel automatically provisions an SSL certificate. Your site will be available at:

- `https://yourname.com`
- `https://www.yourname.com`

---

## Connecting a Domain to Netlify

### Step 1: Add Domain in Netlify

1. Go to your site dashboard
2. Click **"Domain settings"**
3. Click **"Add custom domain"**
4. Enter your domain and click **"Verify"**

### Step 2: Configure DNS

Netlify gives you two options:

**Option A: Use Netlify DNS (Recommended)**

1. Click "Set up Netlify DNS"
2. Add your domain
3. Update nameservers at your registrar

**Option B: External DNS**
Add these records at your registrar:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

### Step 3: Automatic HTTPS

Netlify provisions a Let's Encrypt SSL certificate automatically.

---

## Connecting a Domain to GitHub Pages

### Step 1: Add CNAME File

Create a file called `CNAME` (no extension) in your repository root:

```
yourname.com
```

Just your domain, nothing else!

### Step 2: Add DNS Records

At your registrar, add:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: yourusername.github.io
```

### Step 3: Enable HTTPS in GitHub

1. Go to repository **Settings** → **Pages**
2. Check **"Enforce HTTPS"**

---

## Common DNS Configurations

### Root Domain Only

You want: `example.com` (without www)

```
Type: A
Name: @
Value: [platform IP address]
```

### WWW Subdomain

You want: `www.example.com`

```
Type: CNAME
Name: www
Value: your-site.platform.app
```

### Both (Recommended)

You want both to work:

```
# Root domain
Type: A
Name: @
Value: [platform IP address]

# WWW subdomain
Type: CNAME
Name: www
Value: your-site.platform.app
```

Most platforms automatically redirect www to non-www (or vice versa).

---

## Troubleshooting

### "DNS Not Configured Correctly"

1. Check record types are correct (A vs CNAME)
2. Verify values are exact
3. Wait longer (DNS can take 48 hours)
4. Clear your browser cache

### Check DNS Propagation

Use these tools to see if your DNS is working:

- [whatsmydns.net](https://whatsmydns.net)
- [dnschecker.org](https://dnschecker.org)

Enter your domain and see if it resolves correctly around the world.

### "Not Secure" Warning

Your SSL certificate hasn't been issued yet. Wait 10-30 minutes after DNS is configured.

### Mixed Content Warnings

If your site shows as "partially secure":

- Some resources are loading over HTTP instead of HTTPS
- Find and change `http://` to `https://` in your code

---

## HTTPS & SSL Explained

### Why HTTPS Matters

- **Encryption:** Data between user and server is encrypted
- **Trust:** Browsers show a padlock icon
- **SEO:** Google ranks HTTPS sites higher
- **Required:** Some browser features only work over HTTPS

### How SSL Certificates Work

```
1. Browser connects to your site
2. Server presents SSL certificate
3. Browser verifies certificate is valid
4. Encrypted connection established
5. Padlock shows in browser! 🔒
```

### Free SSL with Let's Encrypt

Vercel, Netlify, and GitHub Pages all use **Let's Encrypt** - a free certificate authority. Your HTTPS certificate:

- Is issued automatically
- Renews automatically
- Is trusted by all browsers
- Costs you nothing

---

## Email Setup (Bonus)

Want `you@yourdomain.com`? That's separate from hosting!

### Options

1. **Google Workspace** - $6/month per user
2. **Zoho Mail** - Free for up to 5 users
3. **Fastmail** - $5/month
4. **ImprovMX** - Free forwarding to existing email

### MX Records

Email requires MX (Mail Exchanger) records:

```
Type: MX
Name: @
Value: mx1.emailprovider.com
Priority: 10
```

This is separate from your website DNS records.

---

## Try It Yourself

### Exercise 1: Research Domain Names

1. Go to [namecheap.com](https://namecheap.com) or [porkbun.com](https://porkbun.com)
2. Search for a domain you'd like
3. Note the price and availability

### Exercise 2: Connect a Domain (If You Have One)

1. Purchase a domain
2. Connect it to your deployed site
3. Verify HTTPS is working

### Exercise 3: Check DNS Propagation

1. After updating DNS, go to [whatsmydns.net](https://whatsmydns.net)
2. Enter your domain
3. Watch it propagate across the world!

---

## Key Vocabulary

| Term                | Definition                                        |
| ------------------- | ------------------------------------------------- |
| **Domain Name**     | Human-readable address for a website              |
| **DNS**             | System that converts domain names to IP addresses |
| **Registrar**       | Company where you buy domains                     |
| **A Record**        | Points a domain to an IP address                  |
| **CNAME Record**    | Points a domain to another domain (alias)         |
| **Nameserver**      | Server that holds your DNS records                |
| **SSL Certificate** | Digital certificate that enables HTTPS            |
| **TLD**             | Top-Level Domain (.com, .dev, .io)                |
| **Propagation**     | Time for DNS changes to spread globally           |

---

## Summary

- **Domain names** make websites human-readable
- **DNS** translates domains to IP addresses
- Buy domains from registrars like **Namecheap, Cloudflare, or Porkbun**
- Connect domains using **A records** and **CNAME records**
- **HTTPS** is automatic and free with modern hosting platforms
- DNS changes take **minutes to hours** to propagate

---

## What's Next?

Your site is live with a custom domain! But what about API keys, database passwords, and other secrets? In the next lesson, we'll learn about **Environment Variables** - keeping your secrets safe in production.

---

_Estimated completion time: 30 minutes_  
_Difficulty: Intermediate_
