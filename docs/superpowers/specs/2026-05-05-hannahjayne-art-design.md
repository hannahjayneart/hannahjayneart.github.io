# hannahjayne.art — Design Spec

**Status:** Approved (brainstorming complete; ready for implementation plan)
**Date:** 2026-05-05
**Local working directory:** `C:\Users\Chase\Repos\Personal\hannahjayne-art`
**GitHub remote (target):** `https://github.com/hannahjayneart/hannahjayneart.github.io`
**Live URL (target):** `https://hannahjayne.art`

---

## 1. Overview

A two-purpose static website hosted on GitHub Pages under the custom domain `hannahjayne.art`:

1. **Coming-soon page** for Hannah's Handiworks (an upcoming online art store), with email signup powered by Buttondown.
2. **Resume hosting** for Hannah Roach, with a small landing page at `/resume` and two downloadable PDFs (color + B&W).

The two surfaces share a domain but use distinct visual identities (matching the existing Claude Design Exports). They do not link to each other; each is reached by direct URL.

## 2. Goals

- Ship a static site requiring zero build pipeline for the live pages — what's committed is what's served.
- Generate two US-Letter-sized resume PDFs that are reproducible from versioned source files.
- The resume PDFs contain a clickable hyperlink in the footer that lets the recipient jump to the alternate version.
- Email signups on the coming-soon page go to a real list the operator can email later.
- The repo is something a non-developer can maintain (edit copy, swap colors) years from now without re-learning a build toolchain.

## 3. Non-goals

- No analytics (no GA, no Plausible, no telemetry). Can be added later.
- No Open Graph / Twitter Card images. Adds polish but not blocking; can add later.
- No actual store. The Hannah's Handiworks storefront mockups in `Claude Design Exports/Hannah Store/` are a *future* project, out of scope here.
- No newsletter archive page. Buttondown hosts that publicly at `buttondown.com/<handle>` if needed.
- No contact form. The resume PDFs expose email + phone directly.
- No automated tests, no CI workflows. Manual eyeball check is the test.
- No accessibility audit beyond semantic HTML + landmark tags.

## 4. Architecture

### 4.1 Repository layout

```
hannahjayneart.github.io/                    ← GitHub repo (root === served at hannahjayne.art/)
├── index.html                               ← Coming-soon (Hannah's Handiworks)
├── resume/
│   └── index.html                           ← Resume landing page (Hannah Roach)
├── resume.pdf                               ← Vibrant resume (built from src/resume-color.html)
├── resume-print.pdf                         ← B&W resume (built from src/resume-bw.html)
├── 404.html                                 ← Custom 404, mirrors coming-soon wordmark
├── favicon.svg                              ← Asterisk-flower glyph, hot pink on cream
├── favicon-32.png                           ← PNG fallback (some browsers don't render SVG favicons)
├── CNAME                                    ← Single line: hannahjayne.art
├── .nojekyll                                ← Empty file; opt out of Jekyll processing
├── README.md                                ← Maintenance notes for future-self
├── assets/
│   ├── coming-soon.css                      ← Extracted from confetti.jsx ConfettiComingSoon
│   └── resume-landing.css                   ← Hannah Roach editorial style for /resume page
├── src/                                     ← Source-of-truth for resume PDFs
│   ├── resume.css                           ← Shared layout + asterisk-flower SVG primitive
│   ├── resume.color.css                     ← Color palette + flower colors (vibrant version)
│   ├── resume.bw.css                        ← B&W palette + monochrome flowers
│   ├── resume-color.html                    ← Vibrant resume HTML, links resume.color.css
│   └── resume-bw.html                       ← B&W resume HTML, links resume.bw.css
├── scripts/
│   └── build-pdfs.mjs                       ← Node + Playwright; builds the two .pdf files
├── package.json                             ← Single dev dep: playwright; one script: "build:pdfs"
└── Claude Design Exports/                   ← Original design references (untouched, kept for posterity)
    ├── Hannah Roach — Resume (Export).html
    ├── Hannah Roach — Resume (B&W Print).html
    └── Hannah Store/...
```

### 4.2 Hosting

- **GitHub Pages**, source: `main` branch, root directory.
- Repo named `hannahjayneart.github.io` (the `<user>.github.io` convention serves at the root path with no project subpath, so the URLs `hannahjayne.art/resume.pdf` and `hannahjayne.art/resume-print.pdf` — already baked into the resume PDF footer cross-links — work without rewriting).
- Settings → Pages → Custom domain: `hannahjayne.art`. Tick "Enforce HTTPS" once the cert provisions.
- `.nojekyll` opts out of Jekyll processing so files (including ones with leading underscores or non-Jekyll-friendly names) are served verbatim.

### 4.3 DNS

At the domain registrar for `hannahjayne.art`:

| Type | Name | Value |
|------|------|-------|
| A | `@` (apex) | `185.199.108.153` |
| A | `@` (apex) | `185.199.109.153` |
| A | `@` (apex) | `185.199.110.153` |
| A | `@` (apex) | `185.199.111.153` |
| CNAME | `www` | `hannahjayneart.github.io` |

DNS setup is a documented step in the README; not automated.

## 5. Coming-soon page (`index.html`)

### 5.1 Source

Port the `ConfettiComingSoon` component from `Claude Design Exports/Hannah Store/confetti.jsx` into a single self-contained HTML file. Only that one component is ported (not the rest of the file's `ConfettiHome`, `ConfettiCollection`, etc. — those are future-store mockups, out of scope).

### 5.2 De-React conversion

- React + Babel runtime: removed entirely. The page is plain HTML + CSS, zero JavaScript.
- Inline JSX style objects: extracted into `assets/coming-soon.css`.
- The mobile breakpoint (originally `useState(window.innerWidth < 600)` + `resize` listener) becomes a `@media (max-width: 599px)` rule. Native CSS, no JS needed.
- Decorative SVGs (Sparkle, Heart, Star, etc. from `shared.jsx`): **not included** on the coming-soon page. The original design has none on this surface.

### 5.3 Markup outline

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
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Fraunces:ital,wght@0,400;1,900&family=Inter:wght@400;500;700&family=Caprasimo&family=Bricolage+Grotesque:opsz,wght@10..48,400;10..48,700&display=swap" rel="stylesheet">
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

### 5.4 Buttondown integration

- Form `action` is `https://buttondown.com/api/emails/embed-subscribe/HANDLE`.
- `HANDLE` is a placeholder — replace with the real Buttondown username after sign-up. README documents this.
- `target="popupwindow"` + `onsubmit="window.open(...)"`: Buttondown's standard "no full-page redirect" pattern. The form opens a small popup that confirms subscription; visitor stays on the coming-soon page.
- Hidden `tag=coming-soon` field auto-tags signups (useful when there are other lists later).
- Hidden `hp` honeypot field is a spam guard; Buttondown auto-rejects submissions where it's non-empty.
- Graceful degradation: if `window.open` is blocked or JS is disabled, the form falls back to a normal POST → full-page redirect to Buttondown's confirmation page. Acceptable.

### 5.5 Visual identity (from confetti.jsx)

- Background: cream `#FFF4E0`
- Ink: `#23153C` (dark purple-black)
- Wordmark accent (italic Fraunces "Handiworks"): hot pink `#E63E62`
- Eyebrow ("get on the list"): hot pink, uppercase, tracked
- Body: Bricolage Grotesque / Inter
- Display (wordmark): Caprasimo + Fraunces italic 900
- Border / shadow on form: 3px solid ink, 5px hard-shadow offset
- All copy verbatim from the source.

### 5.6 Mobile responsive

- `< 600px`: wordmark drops to 40px, wraps to 2 lines; form stacks vertically (input above button), both rounded-rectangle (not pill); padding reduces.
- `≥ 600px`: 72px wordmark on one line; pill-shaped horizontal form.

### 5.7 Accessibility

- `<main>`, `<section>`, `<footer>` landmarks.
- Visible label hidden visually but available to screen readers (`.visually-hidden`).
- `required` on email input → free native browser validation.
- Color contrast: ink on cream is WCAG AAA. Hot pink is accent-only (never body text).

## 6. Resume landing page (`/resume/index.html`)

### 6.1 Purpose

Single landing page reachable at `hannahjayne.art/resume` for anyone given that URL. Two big cards link to the two PDFs at `/resume.pdf` and `/resume-print.pdf`. Visual identity matches the **Hannah Roach** resume aesthetic (not the Hannah's Handiworks store aesthetic), so recipients perceive a single coherent piece.

### 6.2 Visual identity

- Background: cream `#F4EFE0`
- Ink: `#0E0A1F`
- Accent (deep purple): `#3B1F6B`
- Pop (lime): `#B8DC2E`
- Hot (pink): `#FF3D8A`
- Fonts: DM Sans (body) + JetBrains Mono (mono accents)
- Decoration: 6-petal asterisk "flower" SVG, lifted from the resume source

### 6.3 Layout

```
┌─────────────────────────────────────────────────┐
│                Hannah Roach                     │  ← wordmark, large DM Sans
│                                                 │
│      ↳ FILTER: PICK YOUR FORMAT                 │  ← mono eyebrow (echoes resume footer language)
│                                                 │
│   ┌────────────────────┐  ┌────────────────────┐│
│   │  ✻                 │  │  ✻                 ││
│   │  Color version     │  │  Print version     ││
│   │                    │  │                    ││
│   │  Vibrant. Best on  │  │  Black & white.    ││
│   │  screen.           │  │  Best on paper.    ││
│   │                    │  │                    ││
│   │  resume.pdf →      │  │  resume-print.pdf →││
│   └────────────────────┘  └────────────────────┘│
│                                                 │
│   {blank — reserved for one-line context}       │
│                                                 │
└─────────────────────────────────────────────────┘
```

- Left card ("Color version"): lime `#B8DC2E` border-bottom stripe + hot pink `#FF3D8A` flower.
- Right card ("Print version"): purple `#3B1F6B` border-bottom + ink-colored flower.
- Both cards: cream background, ink text, dashed border (echoing the dashed footer card on the resume itself).

### 6.4 Behavior

- Each card is `<a href="/resume.pdf" target="_blank" rel="noopener">` → opens PDF in new tab. Browsers natively render PDFs inline; visitor reads or saves.
- No `download` attribute — feels pushy on a cold link.

### 6.5 Mobile responsive

- `≥ 720px`: cards side by side (2 columns).
- `< 720px`: cards stack vertically; wordmark scales down.

## 7. Resume PDFs (rebuild + generation)

### 7.1 Why rebuild instead of using the React exports

The Claude Design Exports include two React-rendered HTMLs that were saved with their dependencies — *except* `resume-data.js`, which contains the actual resume content (`window.RESUME = {...}`). That file was never captured locally. Without it, opening either HTML locally would render an empty template.

The rendered DOM in the saved HTMLs *does* contain the content (it was captured at save-time), but only as a static snapshot. Since we have to author resume HTML from scratch anyway to control content, we also benefit from:

- Dropping the React/Babel runtime (faster, simpler, smaller).
- Native US Letter sizing instead of patching A4 sources.
- A single `resume-data.json` shared by both color and B&W versions.
- The footer URL becomes a real `<a href>` from the start (no DOM patching needed).
- The original Claude Design Exports stay 100% untouched as visual reference.

### 7.2 Source files

```
src/
├── resume.css           ← Shared layout, typography, asterisk-flower SVG primitive
├── resume.color.css     ← Color palette overrides + colored flowers
├── resume.bw.css        ← B&W palette overrides + monochrome flowers
├── resume-color.html    ← <link>s resume.css + resume.color.css; footer points to /resume-print.pdf
└── resume-bw.html       ← <link>s resume.css + resume.bw.css;    footer points to /resume.pdf
```

Both HTML files contain the **same content markup** (literal HTML, with the resume content inlined — no template engine, no JS, no JSON loaded at runtime). They differ only in:

- Which two CSS files they link.
- The footer card's link text and `href`:
  - `resume-color.html` footer: `↳ Filter: Vibrant Colors` · `View the printer-friendly version at hannahjayne.art/resume-print.pdf`
  - `resume-bw.html` footer:    `↳ Filter: B&W Print`     · `View the colorized version at hannahjayne.art/resume.pdf`

### 7.3 Layout (US Letter native — 8.5" × 11", 816px × 1056px @ 96dpi)

```
┌─────────────────────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  ← purple header band
│ ▓ Resume · 2026                       ✻ ▓▓▓ │     curved bottom mask (SVG)
│ ▓                                         ▓ │     asterisk flower top-right
│ ▓ Hannah                                  ▓ │
│ ▓ Roach                                   ▓ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│  ╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱  │  ← wavy bottom edge
│                                             │
│ ┌──────────────┬────────────────────────┐   │
│ │ 01 Skills    │ 02 Education           │   │  ← two-col CSS Grid
│ │  • bullet    │   Campbellsville Univ. │   │     33% sidebar / 67% main
│ │  • ...       │   2021 · BA Liberal... │   │
│ │              │                        │   │
│ │ Personal     │ 03 Experience          │   │
│ │  email       │   Pitaya · Store Mgr   │   │
│ │  phone       │   Nov 2025 – Present   │   │
│ │  location    │     • bullet           │   │
│ │              │   Hey Dude · Asst SM   │   │
│ │              │   ...                  │   │
│ └──────────────┴────────────────────────┘   │
│                                             │
│ ┌─ ↳ Filter: Vibrant Colors ─── p. 01/01 ─┐│  ← dashed-border footer card
│ │ View the printer-friendly version at     ││     mono font (JetBrains Mono)
│ │ hannahjayne.art/resume-print.pdf →       ││     URL is a real <a href>
│ └──────────────────────────────────────────┘│
└─────────────────────────────────────────────┘
```

- Wrapper: fixed `width: 816px; height: 1056px;` with `@page { size: letter; margin: 0; }`.
- Header band: lifts the `mask-image: url("data:image/svg+xml;...")` curved-bottom trick directly from the source, with `viewBox` adjusted to `0 0 816 400`.
- Asterisk-flower SVG primitive: lifted directly from the source's `Flower` function (6-petal pinwheel, configurable size + color + rotation).
- Section numbers ("01", "02", "03"): JetBrains Mono.
- Section titles, name, body text: DM Sans.

### 7.4 Color palette (color version → `resume.color.css`)

- Background: cream `#F4EFE0`
- Ink: `#0E0A1F`
- Header band: deep purple `#3B1F6B`, white text
- Lime accent: `#B8DC2E`
- Hot pink: `#FF3D8A`
- Flowers: mix of pop (lime) and hot (pink)

### 7.5 Color palette (B&W version → `resume.bw.css`)

- Background: white `#FFFFFF`
- Ink: black `#000000`
- Header band: white background with black text (overrides the purple)
- Flowers: single ink color (no mixed grays)
- Footer text: `↳ Filter: B&W Print`

### 7.6 Resume content (canonical reference)

The structured listing below is the source-of-truth for resume content as of this spec. It is reproduced verbatim into `src/resume-color.html` and `src/resume-bw.html` during implementation. It is **not** a runtime artifact — there's no JSON file in the repo. To update content later: edit both HTML files (search-replace makes it cheap; e.g., updating the Pitaya start date is one find-replace touching both files).

```json
{
  "topLabel": "Resume · 2026",
  "name": { "first": "Hannah", "last": "Roach" },
  "skills": [
    "Experience collaborating in a team environment",
    "Experience with customer support",
    "Learns new skills quickly",
    "Proficient in Microsoft Office",
    "Experience scanning and copying documents"
  ],
  "personal": {
    "email": "hjroach01@gmail.com",
    "phone": "502-523-7203",
    "location": "Louisville, KY"
  },
  "education": [
    {
      "school": "Campbellsville University",
      "date": "Graduated 2021",
      "degree": "Bachelor of Arts in Liberal Arts"
    },
    {
      "school": "Assumption High School",
      "date": "Graduated 2015",
      "degree": "High School Curriculum"
    }
  ],
  "experience": [
    {
      "company": "Pitaya",
      "role": "Store Manager",
      "dates": "Nov 2025 – Present",
      "bullets": [
        "Manage inventory across product categories, including ordering & stock tracking",
        "Oversee building operations, coordinating vendors for maintenance, repairs, and supply procurement",
        "Recruit, hire, train, and supervise a small team of employees, handling scheduling and performance management"
      ]
    },
    {
      "company": "Hey Dude",
      "role": "Assistant Store Manager",
      "dates": "May 2023 – Nov 2025",
      "bullets": [
        "Money handling and management of employees",
        "Maintaining a clean and organized sales floor",
        "Communicating sales goals and promotions from corporate to employees / customers"
      ]
    },
    {
      "company": "Journeys",
      "role": "Co-Manager",
      "dates": "Dec 2022 – Apr 2023",
      "bullets": [
        "Knowledge of current fashion trends",
        "Money and employee management",
        "Sales knowledge with abilities to upsell customers with socks and accessories"
      ]
    },
    {
      "company": "Fleur de Tea",
      "role": "Barista",
      "dates": "Nov 2021 – Nov 2022",
      "bullets": [
        "Interacted with customers and filled orders in fast-paced environment",
        "Collaborated with team members to maintain a productive and positive work environment",
        "Responsible for handling and counting money"
      ]
    }
  ],
  "pageNumber": "p. 01 / 01"
}
```

The two HTML files are the **runtime source of truth** for content. When content changes: edit both `src/resume-color.html` and `src/resume-bw.html` (search-replace covers most updates), then re-run `npm run build:pdfs`, then commit. README documents this workflow.

### 7.7 PDF generation script (`scripts/build-pdfs.mjs`)

```js
// Pseudocode:
//
// import { chromium } from 'playwright';
//
// const targets = [
//   { src: 'src/resume-color.html', out: 'resume.pdf' },
//   { src: 'src/resume-bw.html',    out: 'resume-print.pdf' },
// ];
//
// const browser = await chromium.launch();
// for (const { src, out } of targets) {
//   const page = await browser.newPage();
//   await page.goto('file://' + path.resolve(src));
//   await page.evaluate(() => document.fonts.ready);
//   await page.pdf({
//     path: out,
//     format: 'Letter',
//     margin: { top: 0, right: 0, bottom: 0, left: 0 },
//     printBackground: true,
//   });
// }
// await browser.close();
```

- Run with `npm run build:pdfs`.
- Output PDFs are committed to git (GitHub Pages serves them directly, no CI).
- Script is idempotent; re-run any time the source HTML changes.

### 7.8 `package.json`

```json
{
  "name": "hannahjayne-art",
  "private": true,
  "type": "module",
  "scripts": {
    "build:pdfs": "node scripts/build-pdfs.mjs"
  },
  "devDependencies": {
    "playwright": "^1.x"
  }
}
```

Single dev dependency; nothing shipped to production.

## 8. Misc

### 8.1 Favicon

- `favicon.svg`: a single asterisk-flower glyph (lifted from the resume `Flower` SVG primitive), hot pink `#E63E62` on cream `#FFF4E0`.
- `favicon-32.png`: 32×32 PNG raster fallback for browsers that don't render SVG favicons (mostly older Safari).
- Both linked in `<head>` of `index.html`, `404.html`, and `resume/index.html`.

### 8.2 404 page (`404.html`)

GitHub Pages auto-serves `404.html` for any unknown path. We provide one that mirrors the coming-soon page's wordmark with a single line:

> **Page not found.** Head back to [hannahjayne.art](/).

Same cream background, same wordmark styling, no signup form, no decorations. ~30 lines of HTML.

### 8.3 README.md

Concise (≤200 lines) maintenance guide for future-self / handoff:

- What lives where (mirror of § 4.1).
- How to edit copy on the coming-soon page (`index.html` + `assets/coming-soon.css`).
- How to plug in the Buttondown handle (search-replace `HANDLE` in `index.html`).
- How to update resume content: edit both `src/resume-color.html` and `src/resume-bw.html` (search-replace covers most updates); then `npm run build:pdfs`; commit.
- DNS records to set at registrar (table from § 4.3).
- How to verify locally before pushing (open `index.html` in browser; open `src/resume-color.html` in browser).

### 8.4 CNAME

Single file at repo root, single line:

```
hannahjayne.art
```

GitHub Pages reads this and routes the custom domain. Settings → Pages also needs the domain set in the UI (one-time manual step, documented in README).

### 8.5 .nojekyll

Empty file at repo root. Opts the repo out of Jekyll processing so GH Pages serves files verbatim (no build step, no underscore-folder filtering, no template rendering).

## 9. File-level summary

| File | Purpose | Hand-edited? | Build output? |
|------|---------|---|---|
| `index.html` | Coming-soon page | yes | no |
| `404.html` | Custom 404 | yes | no |
| `resume/index.html` | Resume landing page | yes | no |
| `resume.pdf` | Color resume PDF | no | yes (via `npm run build:pdfs`) |
| `resume-print.pdf` | B&W resume PDF | no | yes (via `npm run build:pdfs`) |
| `assets/coming-soon.css` | Coming-soon styles | yes | no |
| `assets/resume-landing.css` | Resume landing styles | yes | no |
| `src/resume.css` | Shared resume layout | yes | no |
| `src/resume.color.css` | Color palette for resume | yes | no |
| `src/resume.bw.css` | B&W palette for resume | yes | no |
| `src/resume-color.html` | Color resume markup | yes | no (input to PDF build) |
| `src/resume-bw.html` | B&W resume markup | yes | no (input to PDF build) |
| `scripts/build-pdfs.mjs` | PDF generation script | yes | no |
| `package.json` | Node dev deps + scripts | yes | no |
| `favicon.svg` | SVG favicon | yes | no |
| `favicon-32.png` | PNG favicon fallback | yes | no |
| `CNAME` | Custom domain | yes | no |
| `.nojekyll` | Jekyll opt-out | yes (empty) | no |
| `README.md` | Maintenance notes | yes | no |
| `Claude Design Exports/...` | Original design references | no — preserve as-is | no |

## 10. Decisions log (resolved during brainstorming)

| Decision | Choice | Reasoning |
|---|---|---|
| Domain | Custom `hannahjayne.art` | Already baked into resume PDF footer URLs |
| Coming-soon source | `ConfettiComingSoon` from confetti.jsx | Already designed, matches store aesthetic |
| Coming-soon decorations | None | Match existing design exactly |
| Coming-soon copy | Verbatim from source | "get on the list", "Pinky promise.", etc. |
| Email signup provider | Buttondown | Form embed is plain HTML, no JS lib, no Mailchimp branding |
| Buttondown handle | `HANDLE` placeholder for now | User signs up, fills in later |
| Resume URL strategy | Tiny `/resume` landing page → two PDFs | Friendlier than raw URL share |
| Resume landing one-liner | Blank for now | Reserved for future use |
| PDF generation owner | I generate (via Playwright, headless Chromium) | Reproducible, scripted |
| PDF page size | US Letter | User in US |
| PDF source approach | **Rebuild from scratch in plain HTML/CSS** | Source resume-data.js never captured; rebuild is also cleaner |
| Resume content | Extracted from rendered DOM + user updates | See § 7.6 for final |
| Resume content updates | Hey Dude end → Nov 2025; remove Gimme a 5; add Pitaya Store Manager Nov 2025–Present | Per user |
| Build pipeline for live site | None (pure static) | YAGNI; two pages + two PDFs |
| `gh-pages` branch | No (single `main` branch) | YAGNI |
| Static site generator (Astro/11ty) | No | Massive overkill at this scope |
| Analytics | None | Out of scope for v1 |
| OG / social previews | None | Out of scope for v1 |
| Contact form | None | Resume PDFs expose email + phone |
| 404 page | Yes, minimal | Stops typos showing GitHub default 404 |
| Favicon | Yes (SVG + PNG fallback) | Tiny effort, big polish |

## 11. Implementation order (rough)

This spec doesn't prescribe exact sequencing — that's the job of the implementation plan (see writing-plans skill, next step). At a high level the work decomposes into roughly five units that are each independently testable:

1. Repo skeleton + GH Pages config + DNS instructions in README.
2. Resume rebuild in `src/` + Playwright script + first PDF generation.
3. Resume landing page (`/resume/index.html`).
4. Coming-soon page (`index.html`) with Buttondown form.
5. Polish: 404, favicon, README final pass.
