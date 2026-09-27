# Publishing this site

This site is fully static (just HTML, CSS, and JS — no server, database, or
build step), so it can be hosted for free on almost any static-hosting
platform. Below is a full walkthrough for GitHub Pages (recommended, free,
and simple), followed by quick alternatives.

---

## Option A: GitHub Pages (step-by-step)

### Prerequisites
- A free GitHub account: https://github.com/join
- Git installed on your computer (check with `git --version` in a
  terminal). If it's not installed: https://git-scm.com/downloads

### Step 1 — Create a new repository
1. Go to https://github.com/new
2. Name the repository whatever you like, e.g. `hallownest-portfolio`.
   - If you want the site to live at `https://<your-username>.github.io`
     directly (no sub-path), name the repository exactly
     `<your-username>.github.io`.
3. Set it to **Public** (GitHub Pages on free accounts requires a public
   repo, unless you have GitHub Pro/Team/Enterprise).
4. Leave "Add a README" unchecked (we already have one) and click
   **Create repository**.

### Step 2 — Add your files to the repository
From inside the `hallownest-site` folder (containing `index.html`,
`style.css`, `script.js`, `README.md`), open a terminal there and run:

```bash
git init
git add .
git commit -m "Initial commit: Hallownest Archives portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Replace `<your-username>` and `<repo-name>` with your actual GitHub
username and the repository name you chose in Step 1.

> If you'd rather not use the command line, you can instead go to your new
> repository's page on GitHub, click **"uploading an existing file"**, and
> drag in `index.html`, `style.css`, and `script.js` directly through the
> web interface.

### Step 3 — Enable GitHub Pages
1. On your repository's GitHub page, click **Settings** (top menu).
2. In the left sidebar, click **Pages**.
3. Under "Build and deployment" → **Source**, choose **Deploy from a
   branch**.
4. Under **Branch**, select `main` and folder `/ (root)`, then click
   **Save**.
5. Wait about 30–60 seconds. Refresh the page — GitHub will show a green
   banner with your live URL, typically:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```
   (or `https://<your-username>.github.io/` if you named the repo
   `<your-username>.github.io`).

### Step 4 — Verify it
Open the URL from Step 3 in your browser. You should see the save-file
menu, animated background, and working navigation. Test the music and SVG
upload buttons too.

### Making future updates
Whenever you edit the files locally, push the changes and GitHub Pages
will redeploy automatically within a minute or so:
```bash
git add .
git commit -m "Update site content"
git push
```

### Using a custom domain (optional)
1. In the same **Settings → Pages** screen, under "Custom domain", enter
   your domain (e.g. `www.yourname.dev`) and save.
2. At your domain registrar, add a `CNAME` record pointing your domain (or
   subdomain) to `<your-username>.github.io`.
3. GitHub Pages provides free HTTPS certificates automatically once the DNS
   record is verified (this can take up to 24 hours).

---

## Option B: Netlify (drag-and-drop, no Git required)
1. Go to https://app.netlify.com/drop
2. Drag your `hallownest-site` folder directly onto the page.
3. Netlify uploads and deploys it instantly, giving you a live URL like
   `https://random-name-123.netlify.app`.
4. Optional: create a free account to keep the site permanently, rename the
   subdomain, or connect a custom domain.

## Option C: Vercel
1. Go to https://vercel.com and sign up (GitHub login supported).
2. Click **Add New → Project**, then **Import** your GitHub repository (or
   use the Vercel CLI: `npx vercel` from inside the project folder).
3. Since this is a static site with no build step, leave the build command
   blank and set the output directory to `.` (the project root).
4. Deploy — Vercel gives you a live URL immediately and redeploys on every
   `git push`.

## Option D: Cloudflare Pages
1. Go to https://pages.cloudflare.com and sign up.
2. Click **Create a project → Connect to Git**, select your GitHub
   repository.
3. Leave the build command empty and set the output directory to `/`.
4. Deploy — Cloudflare gives you a `*.pages.dev` URL and free HTTPS.

## Option E: Surge.sh (CLI, very fast)
```bash
npm install -g surge
cd hallownest-site
surge
```
Follow the prompts (email/password on first use) — Surge deploys the
current folder and gives you a live URL in seconds.

---

## Which should you pick?

| Platform         | Git required? | Custom domain (free) | Best for |
|------------------|---------------|-----------------------|----------|
| GitHub Pages     | Yes           | Yes                   | Portfolio tied to your GitHub profile |
| Netlify (drop)   | No            | Yes                   | Fastest possible first deploy |
| Vercel           | Optional      | Yes                   | If you might add build tooling later |
| Cloudflare Pages | Yes           | Yes                   | Best global CDN performance |
| Surge.sh         | No            | Paid tiers only       | Quick CLI deploys / sharing drafts |

For a personal portfolio like this one, **GitHub Pages** is the most common
choice since it's free, keeps the site version-controlled alongside your
code, and pairs naturally with a developer portfolio.
