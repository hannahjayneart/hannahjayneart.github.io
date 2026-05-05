# hannahjayne.art

Static site hosted on GitHub Pages at <https://hannahjayne.art>. Two surfaces under one domain:

- **`/`** — Coming-soon page for **Hannah's Handiworks** (online art store). Email signup goes to Buttondown.
- **`/resume`** — Landing page for **Hannah Roach**'s resume, with two downloadable PDFs:
  - **`/resume.pdf`** — color version, best for screen.
  - **`/resume-print.pdf`** — black & white version, best for printing.

The two surfaces use distinct visual identities (different palettes, fonts, tone) and share only the domain.

## Repository layout

```
.
├── index.html                  # Coming-soon page (Hannah's Handiworks)
├── 404.html                    # Custom 404 page
├── resume/
│   └── index.html              # Resume landing page (two cards → PDFs)
├── resume.pdf                  # Color resume PDF (built artifact, committed)
├── resume-print.pdf            # B&W resume PDF (built artifact, committed)
├── assets/
│   ├── coming-soon.css         # Styles for index.html and 404.html
│   └── resume-landing.css      # Styles for /resume page
├── src/                        # Resume PDF source (input to build script)
│   ├── resume.css              # Shared layout for both versions
│   ├── resume.color.css        # Color palette overrides
│   ├── resume.bw.css           # B&W palette overrides
│   ├── resume-color.html       # Color resume markup
│   └── resume-bw.html          # B&W resume markup
├── scripts/
│   └── build-pdfs.mjs          # Headless Chromium → PDFs (and favicon-32.png)
├── favicon.svg                 # Asterisk-flower glyph (hot pink on cream)
├── favicon-32.png              # 32×32 PNG fallback (built artifact, committed)
├── CNAME                       # Custom domain config (hannahjayne.art)
├── .nojekyll                   # GH Pages: skip Jekyll, serve files as-is
└── package.json                # Node dev deps + build script
```

## Common tasks

### Update copy on the coming-soon page

Edit **`index.html`** (text content) and/or **`assets/coming-soon.css`** (styles). Open the file in a browser to verify, then commit and push.

### Update resume content

The two HTML files in `src/` are the source of truth:
- **`src/resume-color.html`** — color version
- **`src/resume-bw.html`** — B&W version

Both files contain the same content; only the CSS link, footer eyebrow, and footer cross-link differ. To update: edit both files (search-replace across both is usually the right move), then re-build PDFs:

```bash
npm install              # one-time, if you haven't already
npx playwright install chromium   # one-time
npm run build:pdfs
```

Verify the resulting `resume.pdf` and `resume-print.pdf` look correct, then commit:

```bash
git add src/ resume.pdf resume-print.pdf
git commit -m "Update resume content"
git push
```

### Plug in the Buttondown handle

After signing up at <https://buttondown.com>, find your username (e.g., `hannahjayneart`) and search-replace **`HANDLE`** in `index.html`:

```bash
# Replace `your-handle` with your actual username:
sed -i '' 's/HANDLE/your-handle/g' index.html   # macOS
sed -i 's/HANDLE/your-handle/g' index.html      # Linux
```

On Windows, open `index.html` in any editor and find/replace `HANDLE` → `your-handle` (two occurrences). Commit and push.

### Update DNS (one-time, when first setting up the custom domain)

At your domain registrar for `hannahjayne.art`, set:

| Type | Host | Value |
|------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `hannahjayneart.github.io` |

Then in GitHub: **Settings → Pages → Custom domain** → enter `hannahjayne.art`. Wait for the certificate to provision (a few minutes), then tick **Enforce HTTPS**.

DNS propagation can take up to 48 hours but typically kicks in within minutes.

## Local preview

To preview pages locally with absolute paths working (`/assets/...`, `/resume.pdf`, etc.):

```bash
npx http-server . -p 8080
# Then visit http://localhost:8080/
```

`http-server` is a one-liner served via `npx`; no install needed.

## Deployment

GitHub Pages auto-deploys on push to `main`:

```bash
git push origin main
```

Wait 30–90 seconds, then check <https://hannahjayne.art>. If you don't see your changes:
- Hard-refresh (Cmd/Ctrl + Shift + R).
- Check **Settings → Pages** for build status.
- Check the **Actions** tab for deployment logs.

## Tech stack

- **HTML5 + CSS3**, no JavaScript on any served page.
- **GitHub Pages** for hosting (`main` branch, root directory).
- **Buttondown** for the email signup form (free tier, embed via plain HTML).
- **Node 20+** and **Playwright** for PDF generation (devDep only — never shipped).
- **Google Fonts**: DM Sans + JetBrains Mono (resume); Caprasimo + Fraunces + Inter + Bricolage Grotesque (coming-soon).

