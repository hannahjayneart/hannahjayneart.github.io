# hannahjayne.art Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a two-purpose static site at `hannahjayne.art` — a coming-soon page for "Hannah's Handiworks" with Buttondown email signup, and resume hosting at `/resume` with two downloadable US Letter PDFs (color + B&W) generated from hand-authored HTML.

**Architecture:** Plain static HTML/CSS served verbatim by GitHub Pages. Zero build step for the live site. Resume PDFs generated locally via Node + Playwright (headless Chromium) from source HTML files in `src/`, then committed alongside the site files. No JavaScript on any served page.

**Tech Stack:** HTML5, CSS3, Google Fonts (DM Sans, JetBrains Mono, Caveat, Caprasimo, Fraunces, Inter, Bricolage Grotesque), GitHub Pages, Buttondown (form embed), Node 20+, Playwright (devDep only).

**Spec:** `docs/superpowers/specs/2026-05-05-hannahjayne-art-design.md` — read it before starting.

---

## Pre-flight context for the implementing engineer

**You are working in:** `C:\Users\Chase\Repos\Personal\hannahjayne-art` (Windows; PowerShell or Bash both work).

**Repo state at start of this plan:**
- Git initialized on `main` branch.
- One existing commit (`4a6386e`) containing only the spec at `docs/superpowers/specs/2026-05-05-hannahjayne-art-design.md`.
- The `Claude Design Exports/` folder contains design references — **do not modify**. The two HTML files in there are React-rendered exports we are *not* using as runtime artifacts; they're a visual reference for the rebuilt resume layout.

**Brand identities (do not blur):**
- *Hannah's Handiworks* (store) → cream `#FFF4E0`, hot pink `#E63E62`, Caveat / Caprasimo / Fraunces / Bricolage Grotesque / Inter. Used on `index.html` and `404.html` only.
- *Hannah Roach* (resume) → cream `#F4EFE0`, deep purple `#3B1F6B`, lime `#B8DC2E`, hot pink `#FF3D8A`, ink `#0E0A1F`. DM Sans + JetBrains Mono. Used on `resume/index.html`, `src/resume-*.html`, and the resume PDFs.

**Manual verification, not automated tests:** The spec explicitly excludes test infrastructure. Verification steps below are: (a) open the file in a browser, eyeball it, and (b) for build artifacts, check file existence and size. No `npm test`, no Vitest, no Jest.

**Frequent commits:** Each task ends with a commit. Don't batch.

---

## Task 1: Repo skeleton files

Create the five tiny configuration files that don't depend on anything else: `.gitignore`, `.nojekyll`, `CNAME`, plus a stub `README.md` and `package.json` we'll fill in later.

**Files:**
- Create: `.gitignore`
- Create: `.nojekyll` (empty)
- Create: `CNAME`
- Create: `README.md` (stub)
- Create: `package.json`

- [ ] **Step 1: Create `.gitignore`**

```gitignore
# Dependencies
node_modules/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor / OS
.vscode/
.idea/
.DS_Store
Thumbs.db
desktop.ini

# Playwright
test-results/
playwright-report/
playwright/.cache/

# Local env / secrets
.env
.env.local
```

- [ ] **Step 2: Create `.nojekyll` (empty file)**

```bash
# Bash
touch .nojekyll
```

```powershell
# PowerShell
New-Item .nojekyll -ItemType File
```

- [ ] **Step 3: Create `CNAME`**

Single line, no trailing newline-only-line:

```
hannahjayne.art
```

- [ ] **Step 4: Create stub `README.md`**

```markdown
# hannahjayne.art

Static site hosted on GitHub Pages. Two surfaces:

- `/` — Coming-soon page for Hannah's Handiworks (online art store).
- `/resume` — Hannah Roach's resume, with two downloadable PDFs.

Implementation in progress. See `docs/superpowers/specs/2026-05-05-hannahjayne-art-design.md` for the full design spec, and `docs/superpowers/plans/2026-05-05-hannahjayne-art-website.md` for the implementation plan.
```

- [ ] **Step 5: Create `package.json`**

```json
{
  "name": "hannahjayne-art",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "description": "Static site for hannahjayne.art (Hannah's Handiworks coming-soon + Hannah Roach resume hosting).",
  "scripts": {
    "build:pdfs": "node scripts/build-pdfs.mjs"
  },
  "devDependencies": {
    "playwright": "^1.49.0"
  }
}
```

- [ ] **Step 6: Verify files exist with correct content**

Run:
```bash
ls -la .gitignore .nojekyll CNAME README.md package.json
cat CNAME
```

Expected:
- All five files exist.
- `CNAME` contains exactly `hannahjayne.art` (one line).
- `.nojekyll` is empty (0 bytes is fine).

- [ ] **Step 7: Commit**

```bash
git add .gitignore .nojekyll CNAME README.md package.json
git commit -m "Add repo skeleton: .gitignore, .nojekyll, CNAME, stub README, package.json"
```

---

## Task 2: Favicon files

Create the two favicon assets. The favicon is a single 6-petal asterisk-flower glyph (lifted from the design system) in hot pink on cream.

**Files:**
- Create: `favicon.svg`
- Create: `favicon-32.png`

- [ ] **Step 1: Create `favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="64" height="64">
  <rect width="60" height="60" fill="#FFF4E0"/>
  <g>
    <ellipse cx="30" cy="14" rx="7" ry="13" fill="#E63E62" transform="rotate(0 30 30)"/>
    <ellipse cx="30" cy="14" rx="7" ry="13" fill="#E63E62" transform="rotate(60 30 30)"/>
    <ellipse cx="30" cy="14" rx="7" ry="13" fill="#E63E62" transform="rotate(120 30 30)"/>
    <ellipse cx="30" cy="14" rx="7" ry="13" fill="#E63E62" transform="rotate(180 30 30)"/>
    <ellipse cx="30" cy="14" rx="7" ry="13" fill="#E63E62" transform="rotate(240 30 30)"/>
    <ellipse cx="30" cy="14" rx="7" ry="13" fill="#E63E62" transform="rotate(300 30 30)"/>
    <circle cx="30" cy="30" r="5" fill="#FFFFFF"/>
  </g>
</svg>
```

- [ ] **Step 2: Generate `favicon-32.png` from the SVG**

Using ImageMagick (recommended, install via `winget install ImageMagick.ImageMagick` or `choco install imagemagick`):
```bash
magick favicon.svg -resize 32x32 -background "#FFF4E0" -alpha remove favicon-32.png
```

If ImageMagick isn't available, alternatives:
- Open `favicon.svg` in any image editor (e.g., online tool like cloudconvert.com), export as 32×32 PNG with `#FFF4E0` background.
- Use Python: `pip install cairosvg` then `python -c "import cairosvg; cairosvg.svg2png(url='favicon.svg', write_to='favicon-32.png', output_width=32, output_height=32)"`.

- [ ] **Step 3: Verify both favicons**

Open `favicon.svg` in a browser (drag-and-drop the file). Expected: a hot-pink 6-petal flower with white center on a cream square background.

Run:
```bash
ls -la favicon.svg favicon-32.png
```

Expected: both files exist; PNG is roughly 200–600 bytes; SVG is roughly 600–800 bytes.

- [ ] **Step 4: Commit**

```bash
git add favicon.svg favicon-32.png
git commit -m "Add favicon: hot-pink asterisk-flower glyph (SVG + 32px PNG fallback)"
```

---

## Task 3: Color resume source files

Build the color version of the resume in plain HTML + CSS at US Letter dimensions. This task creates three files and verifies them as one rendered piece.

**Files:**
- Create: `src/resume.css` — shared layout, typography, asterisk-flower SVG primitive (used by both color and B&W versions)
- Create: `src/resume.color.css` — color palette overrides
- Create: `src/resume-color.html` — vibrant resume markup with content inlined

**Layout target:** Single Letter page (8.5″ × 11″ → 816px × 1056px @ 96dpi). Two-column body grid: left sidebar (skills + personal) ~33%, right main (education + experience) ~67%. Header band on top with curved bottom mask, dashed-border footer card at bottom.

**Color palette (from spec § 7.4):** background cream `#F4EFE0`, ink `#0E0A1F`, header band purple `#3B1F6B` with white text, lime accent `#B8DC2E`, hot pink `#FF3D8A`. Decorative asterisk-flowers mix lime and hot-pink.

- [ ] **Step 1: Create `src/resume.css` (shared layout + typography)**

```css
/* src/resume.css — shared layout for both color and B&W resume versions.
   Palette is overridden by src/resume.color.css or src/resume.bw.css. */

@page {
  size: letter;
  margin: 0;
}

* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  background: var(--paper);
}

body {
  font-family: 'DM Sans', sans-serif;
  color: var(--ink);
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

.slide {
  position: relative;
  width: 816px;
  height: 1056px;
  background: var(--bg);
  overflow: hidden;
  margin: 0 auto;
}

@media print {
  .slide { page-break-inside: avoid; break-inside: avoid; }
}

/* ── Header band ─────────────────────────────────────────── */

.band {
  position: relative;
  background: var(--bandBg);
  color: var(--bandFg);
  padding: 44px 56px 70px;
  height: 320px;
  mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 816 400' preserveAspectRatio='none'><path d='M0,0 H816 V382 Q782,372 748,382 T680,382 T612,382 T544,382 T476,382 T408,382 T340,382 T272,382 T204,382 T136,382 T68,382 T0,382 Z' fill='black'/></svg>");
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
  -webkit-mask-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 816 400' preserveAspectRatio='none'><path d='M0,0 H816 V382 Q782,372 748,382 T680,382 T612,382 T544,382 T476,382 T408,382 T340,382 T272,382 T204,382 T136,382 T68,382 T0,382 Z' fill='black'/></svg>");
  -webkit-mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
}

.band__eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.8;
}

.band__name {
  margin: 18px 0 0;
  font-size: 92px;
  font-weight: 700;
  line-height: 0.94;
  letter-spacing: -0.025em;
}

.band__name span { display: block; }

.band__flower {
  position: absolute;
  top: 14px;
  right: 56px;
  width: 42px;
  height: 42px;
  transform: rotate(20deg);
}

/* ── Body grid (sidebar + main) ──────────────────────────── */

.body {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 36px;
  padding: 24px 56px 0;
}

.section {
  margin-bottom: 26px;
}

.section__num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: 0.14em;
  display: inline-block;
  margin-right: 8px;
}

.section__title {
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 0 0 10px;
  display: inline-block;
}

.section__title-wrap {
  border-bottom: 1.5px solid var(--ink);
  padding-bottom: 6px;
  margin-bottom: 12px;
}

/* Skills + Personal in sidebar */

.skills {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 12.5px;
  line-height: 1.55;
}

.skills li { margin-bottom: 6px; }

.personal {
  font-size: 12px;
  line-height: 1.7;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
}

.personal div { margin-bottom: 2px; }

/* Education entries */

.education__entry {
  margin-bottom: 14px;
}

.education__school {
  font-weight: 700;
  font-size: 14px;
}

.education__date {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--accent);
  font-weight: 500;
  letter-spacing: 0.04em;
  margin-top: 1px;
}

.education__degree {
  font-size: 12.5px;
  margin-top: 1px;
  opacity: 0.8;
}

/* Experience entries */

.experience__entry {
  margin-bottom: 14px;
}

.experience__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

.experience__company {
  font-weight: 700;
  font-size: 14.5px;
}

.experience__role {
  font-style: italic;
  font-size: 12.5px;
  color: var(--accent);
}

.experience__dates {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.experience__bullets {
  margin: 4px 0 0;
  padding: 0 0 0 16px;
  font-size: 11.5px;
  line-height: 1.45;
}

.experience__bullets li { margin-bottom: 2px; }

/* ── Footer card (dashed border, mono, with cross-link) ─── */

.foot {
  position: absolute;
  bottom: 28px;
  left: 56px;
  right: 56px;
  border: 1.5px dashed var(--ink);
  background: var(--paper);
  color: var(--ink);
  font-family: 'JetBrains Mono', monospace;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.foot__eyebrow {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.foot__msg {
  font-size: 11px;
  letter-spacing: 0.02em;
}

.foot__msg a {
  color: inherit;
  text-decoration: none;
  font-weight: 700;
}

.foot__page {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  opacity: 0.7;
}
```

- [ ] **Step 2: Create `src/resume.color.css` (color palette)**

```css
/* src/resume.color.css — vibrant palette for the colored resume. */

:root {
  --bg: #F4EFE0;       /* page background (cream) */
  --paper: #FFFFFF;    /* footer card background */
  --ink: #0E0A1F;      /* primary text */
  --accent: #3B1F6B;   /* deep purple — section nums, dates, role */
  --pop: #B8DC2E;      /* lime accent (flowers) */
  --hot: #FF3D8A;      /* hot pink accent (flowers) */
  --bandBg: #3B1F6B;   /* header band background — deep purple */
  --bandFg: #FFFFFF;   /* header band text — white */
}

/* Decorative flower mix: petals pop, center hot */
.band__flower--a ellipse { fill: var(--pop); }
.band__flower--a circle { fill: var(--hot); }
```

- [ ] **Step 3: Create `src/resume-color.html` (full vibrant resume)**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Hannah Roach — Resume</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="resume.css">
  <link rel="stylesheet" href="resume.color.css">
</head>
<body>
  <article class="slide">

    <header class="band">
      <div class="band__eyebrow">Resume · 2026</div>
      <h1 class="band__name"><span>Hannah</span><span>Roach</span></h1>
      <svg class="band__flower band__flower--a" viewBox="0 0 60 60" aria-hidden="true">
        <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(0 30 30)"/>
        <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(60 30 30)"/>
        <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(120 30 30)"/>
        <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(180 30 30)"/>
        <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(240 30 30)"/>
        <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(300 30 30)"/>
        <circle cx="30" cy="30" r="5"/>
      </svg>
    </header>

    <main class="body">

      <aside>
        <section class="section">
          <div class="section__title-wrap"><span class="section__num">01</span><h2 class="section__title">Skills</h2></div>
          <ul class="skills">
            <li>Experience collaborating in a team environment</li>
            <li>Experience with customer support</li>
            <li>Learns new skills quickly</li>
            <li>Proficient in Microsoft Office</li>
            <li>Experience scanning and copying documents</li>
          </ul>
        </section>

        <section class="section">
          <div class="section__title-wrap"><h2 class="section__title">Personal</h2></div>
          <div class="personal">
            <div>hjroach01@gmail.com</div>
            <div>502-523-7203</div>
            <div>Louisville, KY</div>
          </div>
        </section>
      </aside>

      <div>
        <section class="section">
          <div class="section__title-wrap"><span class="section__num">02</span><h2 class="section__title">Education</h2></div>

          <div class="education__entry">
            <div class="education__school">Campbellsville University</div>
            <div class="education__date">Graduated 2021</div>
            <div class="education__degree">Bachelor of Arts in Liberal Arts</div>
          </div>

          <div class="education__entry">
            <div class="education__school">Assumption High School</div>
            <div class="education__date">Graduated 2015</div>
            <div class="education__degree">High School Curriculum</div>
          </div>
        </section>

        <section class="section">
          <div class="section__title-wrap"><span class="section__num">03</span><h2 class="section__title">Experience</h2></div>

          <div class="experience__entry">
            <div class="experience__head">
              <div><span class="experience__company">Pitaya</span> · <span class="experience__role">Store Manager</span></div>
              <span class="experience__dates">Nov 2025 – Present</span>
            </div>
            <ul class="experience__bullets">
              <li>Manage inventory across product categories, including ordering &amp; stock tracking</li>
              <li>Oversee building operations, coordinating vendors for maintenance, repairs, and supply procurement</li>
              <li>Recruit, hire, train, and supervise a small team of employees, handling scheduling and performance management</li>
            </ul>
          </div>

          <div class="experience__entry">
            <div class="experience__head">
              <div><span class="experience__company">Hey Dude</span> · <span class="experience__role">Assistant Store Manager</span></div>
              <span class="experience__dates">May 2023 – Nov 2025</span>
            </div>
            <ul class="experience__bullets">
              <li>Money handling and management of employees</li>
              <li>Maintaining a clean and organized sales floor</li>
              <li>Communicating sales goals and promotions from corporate to employees / customers</li>
            </ul>
          </div>

          <div class="experience__entry">
            <div class="experience__head">
              <div><span class="experience__company">Journeys</span> · <span class="experience__role">Co-Manager</span></div>
              <span class="experience__dates">Dec 2022 – Apr 2023</span>
            </div>
            <ul class="experience__bullets">
              <li>Knowledge of current fashion trends</li>
              <li>Money and employee management</li>
              <li>Sales knowledge with abilities to upsell customers with socks and accessories</li>
            </ul>
          </div>

          <div class="experience__entry">
            <div class="experience__head">
              <div><span class="experience__company">Fleur de Tea</span> · <span class="experience__role">Barista</span></div>
              <span class="experience__dates">Nov 2021 – Nov 2022</span>
            </div>
            <ul class="experience__bullets">
              <li>Interacted with customers and filled orders in fast-paced environment</li>
              <li>Collaborated with team members to maintain a productive and positive work environment</li>
              <li>Responsible for handling and counting money</li>
            </ul>
          </div>
        </section>
      </div>

    </main>

    <div class="foot">
      <div class="foot__eyebrow">↳ Filter: Vibrant Colors</div>
      <div class="foot__msg">View the printer-friendly version at <a href="https://hannahjayne.art/resume-print.pdf">hannahjayne.art/resume-print.pdf</a></div>
      <div class="foot__page">p. 01 / 01</div>
    </div>

  </article>
</body>
</html>
```

- [ ] **Step 4: Verify in browser**

Open `src/resume-color.html` in a browser (drag-and-drop or `start src\resume-color.html` on Windows / `open src/resume-color.html` on macOS).

Expected, in order:
- Cream `#F4EFE0` background.
- Deep-purple header band on top with curved (wavy) bottom edge.
- "Resume · 2026" eyebrow in mono, top-left of band.
- "Hannah" / "Roach" stacked huge on two lines, in white.
- Lime+pink asterisk flower in top-right of band.
- Two-column body: left sidebar with "01 Skills" + "Personal" sections; right main column with "02 Education" + "03 Experience" sections.
- Four experience entries (Pitaya, Hey Dude, Journeys, Fleur de Tea) in chronological-newest-first order.
- Dashed-border footer card near bottom: "↳ Filter: Vibrant Colors" left · cross-link middle · "p. 01 / 01" right.
- Whole layout fits in 816×1056 — content does not overflow vertically. If it does, **make a note for Task 5's verification step** (we may need tighter line-heights once the B&W version is also visible).

- [ ] **Step 5: Commit**

```bash
git add src/resume.css src/resume.color.css src/resume-color.html
git commit -m "Add color resume source: shared resume.css + color palette + content HTML"
```

---

## Task 4: B&W resume source files

Create the B&W version. The HTML body content is identical to the color version; only the CSS link, footer eyebrow, and footer link text/href differ. The CSS palette overrides background/ink/header band to white-and-black.

**Files:**
- Create: `src/resume.bw.css` — B&W palette overrides
- Create: `src/resume-bw.html` — B&W resume markup (identical content, different chrome)

**B&W palette (from spec § 7.5):** background `#FFFFFF`, ink `#000000`, header band `#FFFFFF` (with black text — overrides the purple), single-color flowers (no mixed grays).

- [ ] **Step 1: Create `src/resume.bw.css`**

```css
/* src/resume.bw.css — monochrome palette for the print-friendly resume. */

:root {
  --bg: #FFFFFF;
  --paper: #FFFFFF;
  --ink: #000000;
  --accent: #000000;   /* mono — no separate accent color */
  --pop: #000000;
  --hot: #000000;
  --bandBg: #FFFFFF;   /* white band over white page */
  --bandFg: #000000;   /* black band text */
}

/* The band background is white-on-white, so add a thin ink edge that
   follows the masked curve — gives the otherwise-invisible band visible
   structure where it meets the body. */
.band {
  border-bottom: 1.5px solid var(--ink);
}

/* Flower in B&W: ink petals; center is white (matches the white band, so
   the center reads as a "hole" in the petals — same silhouette as the
   color version, just monochrome). */
.band__flower--a ellipse { fill: var(--ink); }
.band__flower--a circle { fill: var(--bg); }
```

- [ ] **Step 2: Create `src/resume-bw.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Hannah Roach — Resume (B&amp;W)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="resume.css">
  <link rel="stylesheet" href="resume.bw.css">
</head>
<body>
  <article class="slide">

    <header class="band">
      <div class="band__eyebrow">Resume · 2026</div>
      <h1 class="band__name"><span>Hannah</span><span>Roach</span></h1>
      <svg class="band__flower band__flower--a" viewBox="0 0 60 60" aria-hidden="true">
        <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(0 30 30)"/>
        <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(60 30 30)"/>
        <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(120 30 30)"/>
        <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(180 30 30)"/>
        <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(240 30 30)"/>
        <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(300 30 30)"/>
        <circle cx="30" cy="30" r="5"/>
      </svg>
    </header>

    <main class="body">

      <aside>
        <section class="section">
          <div class="section__title-wrap"><span class="section__num">01</span><h2 class="section__title">Skills</h2></div>
          <ul class="skills">
            <li>Experience collaborating in a team environment</li>
            <li>Experience with customer support</li>
            <li>Learns new skills quickly</li>
            <li>Proficient in Microsoft Office</li>
            <li>Experience scanning and copying documents</li>
          </ul>
        </section>

        <section class="section">
          <div class="section__title-wrap"><h2 class="section__title">Personal</h2></div>
          <div class="personal">
            <div>hjroach01@gmail.com</div>
            <div>502-523-7203</div>
            <div>Louisville, KY</div>
          </div>
        </section>
      </aside>

      <div>
        <section class="section">
          <div class="section__title-wrap"><span class="section__num">02</span><h2 class="section__title">Education</h2></div>

          <div class="education__entry">
            <div class="education__school">Campbellsville University</div>
            <div class="education__date">Graduated 2021</div>
            <div class="education__degree">Bachelor of Arts in Liberal Arts</div>
          </div>

          <div class="education__entry">
            <div class="education__school">Assumption High School</div>
            <div class="education__date">Graduated 2015</div>
            <div class="education__degree">High School Curriculum</div>
          </div>
        </section>

        <section class="section">
          <div class="section__title-wrap"><span class="section__num">03</span><h2 class="section__title">Experience</h2></div>

          <div class="experience__entry">
            <div class="experience__head">
              <div><span class="experience__company">Pitaya</span> · <span class="experience__role">Store Manager</span></div>
              <span class="experience__dates">Nov 2025 – Present</span>
            </div>
            <ul class="experience__bullets">
              <li>Manage inventory across product categories, including ordering &amp; stock tracking</li>
              <li>Oversee building operations, coordinating vendors for maintenance, repairs, and supply procurement</li>
              <li>Recruit, hire, train, and supervise a small team of employees, handling scheduling and performance management</li>
            </ul>
          </div>

          <div class="experience__entry">
            <div class="experience__head">
              <div><span class="experience__company">Hey Dude</span> · <span class="experience__role">Assistant Store Manager</span></div>
              <span class="experience__dates">May 2023 – Nov 2025</span>
            </div>
            <ul class="experience__bullets">
              <li>Money handling and management of employees</li>
              <li>Maintaining a clean and organized sales floor</li>
              <li>Communicating sales goals and promotions from corporate to employees / customers</li>
            </ul>
          </div>

          <div class="experience__entry">
            <div class="experience__head">
              <div><span class="experience__company">Journeys</span> · <span class="experience__role">Co-Manager</span></div>
              <span class="experience__dates">Dec 2022 – Apr 2023</span>
            </div>
            <ul class="experience__bullets">
              <li>Knowledge of current fashion trends</li>
              <li>Money and employee management</li>
              <li>Sales knowledge with abilities to upsell customers with socks and accessories</li>
            </ul>
          </div>

          <div class="experience__entry">
            <div class="experience__head">
              <div><span class="experience__company">Fleur de Tea</span> · <span class="experience__role">Barista</span></div>
              <span class="experience__dates">Nov 2021 – Nov 2022</span>
            </div>
            <ul class="experience__bullets">
              <li>Interacted with customers and filled orders in fast-paced environment</li>
              <li>Collaborated with team members to maintain a productive and positive work environment</li>
              <li>Responsible for handling and counting money</li>
            </ul>
          </div>
        </section>
      </div>

    </main>

    <div class="foot">
      <div class="foot__eyebrow">↳ Filter: B&amp;W Print</div>
      <div class="foot__msg">View the colorized version at <a href="https://hannahjayne.art/resume.pdf">hannahjayne.art/resume.pdf</a></div>
      <div class="foot__page">p. 01 / 01</div>
    </div>

  </article>
</body>
</html>
```

- [ ] **Step 3: Verify in browser**

Open `src/resume-bw.html` in a browser.

Expected:
- White background, all text in black.
- Header band: white background with curved-mask bottom edge + thin ink line beneath it (the `.band` border-bottom we added in `resume.bw.css`).
- "Resume · 2026" eyebrow + "Hannah" / "Roach" stacked, all in black.
- Asterisk flower in top-right: solid black petals with white center.
- Body content identical to color version; section numbers, dates, "role italic" all in black.
- Footer card: dashed border, "↳ Filter: B&W Print" left · "View the colorized version at hannahjayne.art/resume.pdf" middle · "p. 01 / 01" right.
- Same vertical fit as color version.

**Cross-link sanity check:** the color version's footer points to `/resume-print.pdf`; the B&W version's footer points to `/resume.pdf`. Each version honestly cross-links the *other* version. Verify both files have the right href.

- [ ] **Step 4: Commit**

```bash
git add src/resume.bw.css src/resume-bw.html
git commit -m "Add B&W resume source: monochrome palette + content HTML with cross-link to color version"
```

---

## Task 5: Install Playwright

Install the single dev dependency needed for PDF generation. This is a one-time setup; you won't run it again unless `package.json` changes or you re-clone the repo.

**Files:**
- Modify: `package-lock.json` (auto-generated by npm install)
- Modify: `node_modules/` (auto-installed; gitignored)

- [ ] **Step 1: Install dependencies**

```bash
npm install
```

Expected output: npm installs `playwright` and a few transitive dependencies. Should finish in 30–90 seconds depending on network speed.

- [ ] **Step 2: Install the Chromium browser binary**

Playwright npm install does NOT automatically install the browser binaries — you need a separate command:

```bash
npx playwright install chromium
```

Expected output: Playwright downloads ~130MB of Chromium to a system cache directory (e.g., `~/Library/Caches/ms-playwright/` on macOS, `%USERPROFILE%\AppData\Local\ms-playwright\` on Windows). Should finish in 1–3 minutes.

- [ ] **Step 3: Verify Playwright loads**

```bash
node -e "import('playwright').then(p => console.log('Playwright', p.chromium ? 'OK' : 'FAIL'))"
```

Expected output: `Playwright OK`

- [ ] **Step 4: Commit `package-lock.json`**

```bash
git add package-lock.json
git commit -m "Add package-lock.json after npm install"
```

(`node_modules/` should be ignored by `.gitignore` — verify with `git status` that it's not staged.)

---

## Task 6: PDF generation script

Write the Node script that drives headless Chromium to render each resume HTML and print it to a PDF at the repo root. Then run it and commit the resulting PDFs.

**Files:**
- Create: `scripts/build-pdfs.mjs`
- Create (built artifacts): `resume.pdf`, `resume-print.pdf`

- [ ] **Step 1: Create `scripts/build-pdfs.mjs`**

```javascript
// scripts/build-pdfs.mjs
//
// Render the two resume source HTML files to PDF using headless Chromium.
// Output files land at the repo root so GitHub Pages serves them directly.
// Run via: npm run build:pdfs

import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { stat } from 'node:fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const repoRoot = resolve(__dirname, '..');

const targets = [
  { src: 'src/resume-color.html', out: 'resume.pdf' },
  { src: 'src/resume-bw.html',    out: 'resume-print.pdf' },
];

const browser = await chromium.launch();
try {
  for (const { src, out } of targets) {
    const srcPath = resolve(repoRoot, src);
    const outPath = resolve(repoRoot, out);
    const page = await browser.newPage();

    console.log(`→ Rendering ${src}`);
    await page.goto(pathToFileURL(srcPath).href);
    await page.evaluate(() => document.fonts.ready);

    await page.pdf({
      path: outPath,
      format: 'Letter',
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      printBackground: true,
      preferCSSPageSize: true,
    });

    const { size } = await stat(outPath);
    console.log(`  ✓ ${out} (${(size / 1024).toFixed(1)} KB)`);

    await page.close();
  }
} finally {
  await browser.close();
}

console.log('\nDone. Verify the PDFs visually before committing.');
```

- [ ] **Step 2: Run the build**

```bash
npm run build:pdfs
```

Expected output:
```
> hannahjayne-art@0.0.0 build:pdfs
> node scripts/build-pdfs.mjs

→ Rendering src/resume-color.html
  ✓ resume.pdf (XX.X KB)
→ Rendering src/resume-bw.html
  ✓ resume-print.pdf (XX.X KB)

Done. Verify the PDFs visually before committing.
```

Both PDFs should be in the 30–100 KB range. Significantly bigger or smaller is a smell — investigate before committing.

- [ ] **Step 3: Visually verify both PDFs**

Open each PDF in a browser or PDF viewer. Check:

For `resume.pdf` (color):
- Page is **US Letter** size (8.5″ × 11″) — confirm in PDF viewer's page-size indicator if available, or by opening in Acrobat → Document Properties.
- Single page only (no orphan blank page 2).
- Cream background, deep-purple header band with curved bottom edge.
- All four experience entries (Pitaya, Hey Dude, Journeys, Fleur de Tea) visible — none cut off at the bottom.
- Footer card visible above the bottom edge.
- The cross-link "hannahjayne.art/resume-print.pdf" is **clickable** in the PDF viewer (hover should show the URL `https://hannahjayne.art/resume-print.pdf`).

For `resume-print.pdf` (B&W):
- US Letter, single page.
- White background, black text everywhere.
- Same content as color version.
- Cross-link "hannahjayne.art/resume.pdf" is clickable.

**If content overflows vertically** (common failure: the bottom experience entry's bullets get cut off): tighten the layout by editing `src/resume.css`. Most-likely-helpful adjustments:
- Reduce `.section { margin-bottom: 26px }` → `20px` or `18px`.
- Reduce `.experience__entry { margin-bottom: 14px }` → `10px`.
- Reduce `.experience__bullets { line-height: 1.45 }` → `1.35`.
After any CSS change, re-run `npm run build:pdfs` and re-verify.

**If the link is not clickable** (rare — text shows but is not a hyperlink): check that the `<a href>` in the source HTML is a real anchor tag (it is, in the spec), and that you ran the build *after* creating the source HTMLs. Re-running the build script regenerates the PDFs.

- [ ] **Step 4: Commit the script + PDFs**

```bash
git add scripts/build-pdfs.mjs resume.pdf resume-print.pdf
git commit -m "Add build-pdfs script and generate Letter-sized resume PDFs (color + B&W)"
```

---

## Task 7: Resume landing page

Build the small landing page at `/resume` that gives visitors two big buttons linking to the PDFs. Visual identity matches the **Hannah Roach** editorial aesthetic (not the store/coming-soon aesthetic).

**Files:**
- Create: `assets/resume-landing.css`
- Create: `resume/index.html`

- [ ] **Step 1: Create `assets/resume-landing.css`**

```css
/* assets/resume-landing.css — Hannah Roach editorial style for /resume page. */

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: #F4EFE0;
  color: #0E0A1F;
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh;
}

.rl-wrap {
  max-width: 880px;
  margin: 0 auto;
  padding: 96px 32px 64px;
  text-align: center;
}

.rl-name {
  font-family: 'DM Sans', sans-serif;
  font-size: 76px;
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 0.95;
  margin: 0;
}

.rl-eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #3B1F6B;
  margin: 28px 0 36px;
}

.rl-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.rl-card {
  display: block;
  background: #FFFFFF;
  border: 1.5px dashed #0E0A1F;
  padding: 28px 24px 22px;
  text-align: left;
  text-decoration: none;
  color: inherit;
  position: relative;
  border-bottom-width: 6px;
  border-bottom-style: solid;
  transition: transform 120ms ease;
}

.rl-card:hover {
  transform: translateY(-2px);
}

.rl-card--color {
  border-bottom-color: #B8DC2E;
}

.rl-card--bw {
  border-bottom-color: #3B1F6B;
}

.rl-card__flower {
  width: 36px;
  height: 36px;
  margin-bottom: 16px;
}

.rl-card--color .rl-card__flower ellipse { fill: #FF3D8A; }
.rl-card--color .rl-card__flower circle { fill: #B8DC2E; }
.rl-card--bw .rl-card__flower ellipse { fill: #0E0A1F; }
.rl-card--bw .rl-card__flower circle { fill: #FFFFFF; }

.rl-card__title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin: 0 0 6px;
}

.rl-card__desc {
  font-size: 14px;
  line-height: 1.5;
  margin: 0 0 18px;
  opacity: 0.75;
}

.rl-card__cta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
}

@media (max-width: 720px) {
  .rl-wrap { padding: 56px 20px; }
  .rl-name { font-size: 48px; }
  .rl-cards { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Create `resume/index.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Hannah Roach — Resume</title>
  <meta name="description" content="Hannah Roach — resume, available as a color PDF or print-friendly B&amp;W PDF.">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="alternate icon" href="/favicon-32.png" sizes="32x32">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/resume-landing.css">
</head>
<body>
  <main class="rl-wrap">
    <h1 class="rl-name">Hannah Roach</h1>
    <p class="rl-eyebrow">↳ Filter: Pick your format</p>

    <div class="rl-cards">
      <a class="rl-card rl-card--color" href="/resume.pdf" target="_blank" rel="noopener">
        <svg class="rl-card__flower" viewBox="0 0 60 60" aria-hidden="true">
          <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(0 30 30)"/>
          <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(60 30 30)"/>
          <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(120 30 30)"/>
          <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(180 30 30)"/>
          <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(240 30 30)"/>
          <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(300 30 30)"/>
          <circle cx="30" cy="30" r="5"/>
        </svg>
        <h2 class="rl-card__title">Color version</h2>
        <p class="rl-card__desc">Vibrant. Best on screen.</p>
        <span class="rl-card__cta">resume.pdf →</span>
      </a>

      <a class="rl-card rl-card--bw" href="/resume-print.pdf" target="_blank" rel="noopener">
        <svg class="rl-card__flower" viewBox="0 0 60 60" aria-hidden="true">
          <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(0 30 30)"/>
          <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(60 30 30)"/>
          <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(120 30 30)"/>
          <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(180 30 30)"/>
          <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(240 30 30)"/>
          <ellipse cx="30" cy="14" rx="7" ry="13" transform="rotate(300 30 30)"/>
          <circle cx="30" cy="30" r="5"/>
        </svg>
        <h2 class="rl-card__title">Print version</h2>
        <p class="rl-card__desc">Black &amp; white. Best on paper.</p>
        <span class="rl-card__cta">resume-print.pdf →</span>
      </a>
    </div>
  </main>
</body>
</html>
```

- [ ] **Step 3: Verify in browser**

Open `resume/index.html` in a browser.

Expected:
- Cream `#F4EFE0` background.
- Centered "Hannah Roach" wordmark, large DM Sans bold.
- Below it: "↳ FILTER: PICK YOUR FORMAT" mono eyebrow in deep purple.
- Two cards side-by-side: left card has lime bottom-stripe + pink/lime flower; right card has purple bottom-stripe + ink/white flower.
- Each card has flower (top), title, description, mono CTA.
- Hover: cards lift slightly (`translateY(-2px)`).
- The links go to `/resume.pdf` and `/resume-print.pdf`. Note: clicking will probably 404 *until you preview the site with a local static server* (since the file:// browser context has the resume PDFs at `../resume.pdf`, not `/resume.pdf`). Test via:
  ```bash
  npx http-server . -p 8080
  ```
  Then open `http://localhost:8080/resume/`. Cards should now correctly open the PDFs.
- Mobile: resize browser to <720px wide. Cards should stack vertically; wordmark scales down to ~48px.

- [ ] **Step 4: Commit**

```bash
git add assets/resume-landing.css resume/index.html
git commit -m "Add /resume landing page: two cards linking color + print PDFs"
```

---

## Task 8: Coming-soon page

Build `index.html` — the Hannah's Handiworks coming-soon landing with Buttondown email signup. De-React'd from `Claude Design Exports/Hannah Store/confetti.jsx` `ConfettiComingSoon`.

**Files:**
- Create: `assets/coming-soon.css`
- Create: `index.html`

**Buttondown handle:** Per spec, leave the literal placeholder string `HANDLE` in the `action` URL. The user will sign up for Buttondown post-launch and search-replace `HANDLE` → their actual username.

- [ ] **Step 1: Create `assets/coming-soon.css`**

```css
/* assets/coming-soon.css — Hannah's Handiworks coming-soon page.
   Ported from confetti.jsx ConfettiComingSoon (de-React'd, no JS). */

* { box-sizing: border-box; }

html, body {
  margin: 0;
  padding: 0;
  background: #FFF4E0;
  color: #23153C;
  font-family: 'Bricolage Grotesque', 'Inter', system-ui, sans-serif;
  min-height: 100vh;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.cs-wrap {
  max-width: 980px;
  margin: 0 auto;
  padding: 80px 32px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cs-logo {
  font-family: 'Caprasimo', 'Fraunces', serif;
  font-size: 72px;
  line-height: 1;
  letter-spacing: -0.025em;
  color: #23153C;
  margin: 0;
  font-weight: 400;
}

.cs-logo em {
  font-family: 'Fraunces', serif;
  font-style: italic;
  font-weight: 900;
  color: #E63E62;
}

.cs-signup {
  margin-top: 64px;
  width: 100%;
  max-width: 520px;
}

.cs-eyebrow {
  font-family: 'Bricolage Grotesque', 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #E63E62;
  margin: 0 0 14px;
}

.cs-form {
  display: flex;
  gap: 10px;
  align-items: stretch;
  background: #FFFFFF;
  border: 3px solid #23153C;
  border-radius: 999px;
  padding: 6px;
  box-shadow: 5px 5px 0 #23153C;
}

.cs-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  padding: 12px 20px;
  font-family: inherit;
  font-size: 16px;
  color: #23153C;
  min-width: 0;
}

.cs-input::placeholder {
  color: #23153C;
  opacity: 0.5;
}

.cs-btn {
  background: #23153C;
  color: #FFFFFF;
  border: none;
  padding: 14px 26px;
  border-radius: 999px;
  font-family: inherit;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
}

.cs-btn:hover {
  opacity: 0.9;
}

.cs-fine {
  font-size: 14px;
  opacity: 0.65;
  margin: 14px 0 0;
}

.cs-footer {
  margin-top: 64px;
  font-size: 14px;
  opacity: 0.6;
}

@media (max-width: 599px) {
  .cs-wrap { padding: 56px 20px; }
  .cs-logo { font-size: 40px; line-height: 1.05; white-space: normal; }
  .cs-form {
    flex-direction: column;
    border-radius: 22px;
    padding: 10px;
    gap: 10px;
    box-shadow: 4px 4px 0 #23153C;
  }
  .cs-input { padding: 14px 16px; text-align: center; }
  .cs-btn { padding: 14px 20px; border-radius: 14px; }
  .cs-signup { margin-top: 40px; }
  .cs-footer { margin-top: 48px; font-size: 13px; }
}
```

- [ ] **Step 2: Create `index.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Hannah's Handiworks — Coming Soon</title>
  <meta name="description" content="Hannah's Handiworks — small art for everyday rooms. Made by hand in Louisville, KY. Coming soon.">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="alternate icon" href="/favicon-32.png" sizes="32x32">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Fraunces:ital,wght@0,400;1,900&family=Inter:wght@400;500;700&family=Bricolage+Grotesque:opsz,wght@10..48,400;10..48,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/coming-soon.css">
</head>
<body>
  <main class="cs-wrap">
    <h1 class="cs-logo">Hannah's <em>Handiworks</em></h1>

    <section class="cs-signup">
      <p class="cs-eyebrow">get on the list</p>
      <form action="https://buttondown.com/api/emails/embed-subscribe/HANDLE"
            method="post"
            target="popupwindow"
            onsubmit="window.open('https://buttondown.com/HANDLE','popupwindow')"
            class="cs-form">
        <label class="visually-hidden" for="cs-email">Email address</label>
        <input id="cs-email" class="cs-input" type="email" name="email" placeholder="your@email.com" required>
        <input type="hidden" name="tag" value="coming-soon">
        <input type="text" name="hp" tabindex="-1" autocomplete="off" class="visually-hidden" aria-hidden="true">
        <button type="submit" class="cs-btn">Notify me →</button>
      </form>
      <p class="cs-fine">One email, max. No spam. Pinky promise.</p>
    </section>

    <footer class="cs-footer">© 2026 Hannah's Handiworks · Made by hand in Louisville, KY</footer>
  </main>
</body>
</html>
```

- [ ] **Step 3: Verify in browser**

Start a local static server (so `/assets/coming-soon.css` resolves correctly — `file://` URLs treat absolute paths differently):

```bash
npx http-server . -p 8080
```

Open `http://localhost:8080/`.

Expected:
- Cream `#FFF4E0` background.
- Centered wordmark: "Hannah's" in dark purple (Caprasimo), "Handiworks" in italic hot-pink (Fraunces 900).
- Below it: "GET ON THE LIST" in hot-pink uppercase mono-ish eyebrow.
- White pill-shaped form: rounded email input + dark "NOTIFY ME →" button, with 5px hard ink shadow offset.
- Below form: "One email, max. No spam. Pinky promise." in subdued ink.
- Bottom: "© 2026 Hannah's Handiworks · Made by hand in Louisville, KY".
- No decorations / sparkles / hearts (matches spec).

**Form behavior check (without submitting):**
- Click the email field → cursor enters; placeholder fades.
- Tab key advances focus from email → button (the honeypot `hp` field is `tabindex="-1"`, so it's skipped).
- Click "Notify me →" without entering anything → browser native validation message appears ("Please fill out this field" or similar), form does not submit. ✓
- Enter a valid email and click submit → form would post to Buttondown's `embed-subscribe/HANDLE` endpoint. Don't actually submit (the `HANDLE` placeholder will 404). The intent is verified.

**Mobile responsive check:**
- Resize browser to <600px wide.
- Wordmark drops to 40px, may wrap to two lines.
- Form stacks vertically (input above button), both rounded rectangles instead of pills.

- [ ] **Step 4: Commit**

```bash
git add assets/coming-soon.css index.html
git commit -m "Add coming-soon page: Hannah's Handiworks wordmark + Buttondown signup form (HANDLE placeholder)"
```

---

## Task 9: 404 page

Build a custom 404 that GH Pages serves automatically for unknown paths. Mirrors the coming-soon visual identity, with no signup form and a single link back home.

**Files:**
- Create: `404.html`

- [ ] **Step 1: Create `404.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Hannah's Handiworks — Page not found</title>
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="alternate icon" href="/favicon-32.png" sizes="32x32">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caprasimo&family=Fraunces:ital,wght@0,400;1,900&family=Inter:wght@400;500;700&family=Bricolage+Grotesque:opsz,wght@10..48,400;10..48,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/coming-soon.css">
  <style>
    .nf-eyebrow {
      font-family: 'Bricolage Grotesque', 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: #E63E62;
      margin: 56px 0 8px;
    }
    .nf-msg {
      font-size: 18px;
      max-width: 480px;
      margin: 0 0 28px;
      line-height: 1.5;
    }
    .nf-link {
      display: inline-block;
      font-family: inherit;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #FFFFFF;
      background: #23153C;
      padding: 14px 26px;
      border-radius: 999px;
      text-decoration: none;
    }
    .nf-link:hover { opacity: 0.9; }
  </style>
</head>
<body>
  <main class="cs-wrap">
    <h1 class="cs-logo">Hannah's <em>Handiworks</em></h1>

    <p class="nf-eyebrow">404 · page not found</p>
    <p class="nf-msg">Looks like that page doesn't exist (yet). Head back home for the latest.</p>
    <a class="nf-link" href="/">← Back to hannahjayne.art</a>

    <footer class="cs-footer">© 2026 Hannah's Handiworks · Made by hand in Louisville, KY</footer>
  </main>
</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Start the local server (or reuse the one from Task 8):

```bash
npx http-server . -p 8080
```

Open `http://localhost:8080/this-path-does-not-exist`.

Expected: `http-server` returns its built-in 404. To preview *our* 404, instead open `http://localhost:8080/404.html` directly.

Verify:
- Same wordmark and styling as `index.html`.
- Hot-pink "404 · PAGE NOT FOUND" eyebrow.
- "Looks like that page doesn't exist (yet)..." message.
- "← BACK TO HANNAHJAYNE.ART" pill button.
- Footer line same as coming-soon page.
- No signup form.

**On the live GH Pages site**, GitHub will serve this `404.html` automatically for any unknown path — no configuration needed. We won't be able to verify that until the site is deployed.

- [ ] **Step 3: Commit**

```bash
git add 404.html
git commit -m "Add 404 page mirroring coming-soon wordmark, with link back home"
```

---

## Task 10: Final README

Replace the stub README with a real maintenance guide for future-self / handoff.

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace `README.md` with the full content**

```markdown
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
│   └── build-pdfs.mjs          # Headless Chromium → PDFs
├── favicon.svg                 # Asterisk-flower glyph (hot pink on cream)
├── favicon-32.png              # 32×32 PNG fallback
├── CNAME                       # Custom domain config (hannahjayne.art)
├── .nojekyll                   # GH Pages: skip Jekyll, serve files as-is
├── package.json                # Node dev deps + build script
└── Claude Design Exports/      # Original design references — DO NOT MODIFY
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
- **Google Fonts**: DM Sans + JetBrains Mono (resume); Caveat + Caprasimo + Fraunces + Inter + Bricolage Grotesque (coming-soon).

## Design references

The `Claude Design Exports/` folder contains the original design source files (React-rendered HTMLs, Hannah Store mockups, JSX). These are **reference only** — do not edit them, and do not point any `<link>` or `<script>` at them. The live site re-implements those designs in plain HTML/CSS.

## Spec & plan

- Design spec: `docs/superpowers/specs/2026-05-05-hannahjayne-art-design.md`
- Implementation plan: `docs/superpowers/plans/2026-05-05-hannahjayne-art-website.md`
```

- [ ] **Step 2: Verify**

Open `README.md` in a markdown previewer (e.g., VS Code preview, `glow README.md`, or just GitHub's web view after pushing).

Expected:
- Headers render at appropriate levels.
- Repo layout tree is in a code block, monospace.
- DNS table renders with four A records and one CNAME row.
- Internal links to spec and plan files are valid (they exist in the repo).

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "Replace stub README with full maintenance guide"
```

---

## Final verification (no checkboxes — read-through only)

After Task 10, the repo state should be:

```
.
├── 404.html
├── CNAME
├── README.md
├── assets/
│   ├── coming-soon.css
│   └── resume-landing.css
├── docs/superpowers/...
├── favicon-32.png
├── favicon.svg
├── index.html
├── package-lock.json
├── package.json
├── resume-print.pdf
├── resume.pdf
├── resume/
│   └── index.html
├── scripts/
│   └── build-pdfs.mjs
├── src/
│   ├── resume-bw.html
│   ├── resume-color.html
│   ├── resume.bw.css
│   ├── resume.color.css
│   └── resume.css
├── .gitignore
├── .nojekyll
└── Claude Design Exports/   (untouched)
```

Run a final local preview with `npx http-server . -p 8080`, then visit each URL and confirm:

- `http://localhost:8080/` → coming-soon page.
- `http://localhost:8080/resume/` → resume landing.
- `http://localhost:8080/resume.pdf` → color resume PDF.
- `http://localhost:8080/resume-print.pdf` → B&W resume PDF.
- `http://localhost:8080/404.html` → 404 page.
- `http://localhost:8080/some-bogus-path` → http-server's built-in 404 (the GH Pages 404 only takes effect on the live site).

Then push to GitHub:

```bash
# One-time (if not already done):
git remote add origin https://github.com/hannahjayneart/hannahjayneart.github.io.git
git branch -M main

# Every time:
git push -u origin main
```

In GitHub, configure: **Settings → Pages** → Source: `Deploy from a branch`, Branch: `main` / `(root)`. Wait for the first build, then visit `https://hannahjayneart.github.io/` to confirm the site is live (without custom domain). Then add custom domain per the README's DNS section.

---

## Open follow-ups (post-launch, not in this plan)

These are deliberately out of scope for v1, but worth tracking for later:

- Replace the `HANDLE` placeholder with a real Buttondown username after sign-up.
- Add Open Graph / Twitter Card image (e.g., a single asterisk-flower with the wordmark, exported as `og.png`, referenced in `<meta property="og:image">`).
- Add `<meta name="theme-color">` for nice mobile browser chrome coloring.
- Add Plausible / Fathom analytics (privacy-friendly, GH-Pages-compatible) if traffic data ever becomes useful.
- Once the store launches, swap `index.html` from coming-soon to the actual storefront (a separate sub-project; the `Hannah Store/` mockups in `Claude Design Exports/` are the visual reference).
