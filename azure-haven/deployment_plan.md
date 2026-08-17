x   # Deployment Plan: Azure Haven → GitHub → Vercel

## 0. What you need before starting
- A GitHub account
- A Vercel account (sign up at vercel.com — easiest to use "Continue with GitHub" so the two are linked automatically)
- Node.js 18.18+ installed locally (check with `node -v`)
- Git installed locally (check with `git --version`)

---

## 1. Push the project to GitHub

Open a terminal in the `azure-haven` folder (the one containing `package.json`).

```bash
cd azure-haven
git init
git add .
git commit -m "Initial commit: Azure Haven landing page"
```

Create a `.gitignore` if it isn't already there (it should be, but double check):

```
node_modules
.next
.env*.local
```

Create the empty repo on GitHub:
1. Go to github.com → **New repository**
2. Name it `azure-haven` (or whatever you like)
3. Leave it **empty** — no README, no .gitignore, no license (you already have these locally)
4. Copy the repo URL it gives you

Connect and push:

```bash
git branch -M main
git remote add origin https://github.com/<your-username>/azure-haven.git
git push -u origin main
```

---

## 2. Import the project into Vercel

1. Go to vercel.com/new
2. Under "Import Git Repository," select your `azure-haven` repo (authorize GitHub access if it's your first time)
3. Vercel auto-detects **Next.js** — leave the defaults:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build` (default)
   - **Output Directory:** (default, leave blank — Vercel handles this for Next.js)
   - **Install Command:** `npm install` (default)
4. **Environment Variables:** none required for this project as built — skip this step
5. Click **Deploy**

Vercel will install dependencies, run the build, and give you a live URL like `azure-haven-yourname.vercel.app` within a minute or two.

---

## 3. Verify the deployment
Once live, check:
- Hero image and all Unsplash placeholder images load (Vercel respects the `remotePatterns` already set in `next.config.js` for `images.unsplash.com`, so this should work out of the box)
- Mobile menu opens/closes correctly on a phone-width browser
- The booking form, nav anchor links (`#rooms`, `#dining`, etc.) scroll to the right sections
- Lighthouse/PageSpeed score (Vercel's dashboard has a built-in Speed Insights tab you can enable for free)

---

## 4. Set up automatic deployments (this is the main benefit of the GitHub connection)
This is already active by default once you import from GitHub — no extra setup needed:
- **Push to `main`** → auto-deploys to production URL
- **Push to any other branch, or open a Pull Request** → Vercel creates a unique **preview URL** for that branch, so you can review changes before merging (great for showing clients a draft before it goes live)

Recommended workflow going forward:
```bash
git checkout -b update-room-prices
# make your edits
git add .
git commit -m "Update room pricing"
git push origin update-room-prices
```
Open a PR on GitHub → Vercel comments on the PR with a preview link → merge to `main` when approved → production updates automatically.

---

## 5. Connect a custom domain (optional, e.g. azurehaven.com)
1. In the Vercel project → **Settings → Domains** → add `azurehaven.com`
2. Vercel gives you DNS records to add:
   - If the domain is registered elsewhere (Namecheap, GoDaddy, etc.): add the **A record** and/or **CNAME** Vercel shows you, in that registrar's DNS panel
   - If you want Vercel to manage DNS entirely, update the domain's nameservers to Vercel's
3. SSL (HTTPS) is issued automatically — no extra step

---

## 6. Ongoing maintenance notes
- **Real photography:** swap the Unsplash placeholder URLs in `sections/*.tsx` for the resort's actual photos before calling this production-ready. If you host images yourself (not on Unsplash), add that domain to `remotePatterns` in `next.config.js` or the build will fail on unrecognized image hosts.
- **Environment variables:** if you later add a booking API, contact form backend, or analytics key, add them in Vercel under **Settings → Environment Variables** (and locally in `.env.local`, which is already git-ignored).
- **Rollbacks:** every deployment in Vercel is kept and instantly rollback-able from the **Deployments** tab if a push breaks something.
- **Cost:** Vercel's Hobby (free) tier is sufficient for this site's traffic level; upgrade to Pro only if you need commercial usage terms, more bandwidth, or team collaboration.

---

## Quick reference
| Step | Where |
|---|---|
| Push code | `git push origin main` |
| Live URL | `<project>.vercel.app` (shown after first deploy) |
| Preview URLs | Auto-generated per branch/PR |
| Custom domain | Vercel → Settings → Domains |
| Env vars | Vercel → Settings → Environment Variables |
| Rollback | Vercel → Deployments → "..." → Promote to Production |