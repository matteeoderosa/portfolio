# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Matteo De Rosa's bilingual (IT default, EN under `/en`) static portfolio in Next.js, ready to publish on GitHub Pages and later on `matteoderosa.it`.

**Architecture:** Next.js App Router with `output: "export"`. Two route trees (`src/app/(it)` at the root, `src/app/en`) are thin wrappers over shared view components in `src/views/`, which read typed dictionaries from `src/content/`. Site URL and base path are build-time env vars so one codebase serves the provisional `…github.io/portfolio` and the final domain. The 26 legacy exercises are copied verbatim into `public/`.

**Tech Stack:** Next.js (latest stable), React, TypeScript, Vitest, plain CSS with custom properties, GitHub Actions for deploy. No CSS framework, no runtime server.

**Spec:** `docs/superpowers/specs/2026-11-02-portfolio-design.md`. Legacy material, read-only: `../ITSProdigi` and `../derteo.github.io` (siblings of this repo's folder).

## Global Constraints

- Static export only; no server code (GitHub Pages, public repo `matteeoderosa/portfolio`, branch `main`).
- Italian at `/`, English at `/en`; every user-visible string lives in `src/content/`, never inside components.
- Language switch shows flag **and** the text "IT"/"EN"; the choice is remembered as a preference only; **no automatic redirect** between languages.
- Archive (`/archivio/`) is Italian-only; `/en` mirrors every other page.
- Style = direction C: ITSProdigi base (Instrument Sans body, Instrument Serif large titles, light/dark theme, localStorage key `theme`), accent green `#3fc427`, `{m}` logo, monospace only for labels and tech tags.
- Copy for a non-technical reader: no "craftsman" / "full stack" / framework names in the first screen; tech tags only in small type on project pages and cards.
- Optional contact fields (phone, LinkedIn, CV, photo) render nothing when empty.
- Legacy exercise URLs (`/frontend/...`, `/pages/navigation.html`) stay byte-for-byte reachable; no 404 for any of them.
- Lighthouse target 95+ in all four categories; usable at 320px with no horizontal scroll; respects `prefers-reduced-motion`; skip link, keyboard navigation, visible focus.
- Env vars: `NEXT_PUBLIC_BASE_PATH` (default `""`), `NEXT_PUBLIC_SITE_URL` (default `https://matteoderosa.it`), `NEXT_PUBLIC_NOINDEX` (`"1"` on the provisional build).
- Commit locally after each task; push only when Matteo says so.

## Review Focus

- Provisional build under `/portfolio`: any plain `<a>`, `<img>`, CSS `url()` or font path that skips the base path breaks only there. Test: built HTML contains no root-absolute `href`/`src` missing the prefix.
- A project lacking its English text must fail the build, not silently show Italian.
- `localStorage` blocked or throwing (private window): theme and language switch still work.
- Optional fields empty: no empty `mailto:`/`tel:` links, no broken image, no empty section.
- Every old exercise URL resolves inside `out/` after export.

---

## File Structure

```
package.json, tsconfig.json, next.config.ts, vitest.config.ts, .gitignore
.github/workflows/deploy.yml
public/ favicon.*, apple-touch-icon.png, og-image.png, frontend/** (verbatim), pages/navigation.html (stub), 404.html, CNAME (final build only)
src/fonts/*.woff2 (next/font/local)
src/lib/site.ts          env + url helpers (withBase, absoluteUrl)
src/lib/routes.ts        route table IT/EN, alternate-language lookup
src/content/dictionaries.ts  type Dictionary, it, en
src/content/projects.ts  project data, per-language text
src/content/site.ts      contacts + optional fields
src/content/exercises.ts the 26 exercises (title, href, code link, group)
src/components/          Header, Footer, ThemeToggle, LangSwitch, ProjectCard, TagList, ContactCta, ExerciseFilter
src/views/               HomeView, ProjectsView, ProjectView, AboutView, ContactView, ArchiveView
src/app/(it)/…  src/app/en/…   route wrappers, layouts, sitemap/robots
src/styles/globals.css
tests/                   *.test.ts(x)
docs/go-live.md          DNS records + redirect stub contents
docs/redirect-stubs/     matteeoderosa.it.html, derteo.github.io.html
```

---

### Task 1: Scaffold, config and URL helpers

**Files:** Create `package.json`, `tsconfig.json`, `next.config.ts`, `vitest.config.ts`, `.gitignore`, `src/lib/site.ts`, `tests/site.test.ts`.

**Interfaces:**
- Produces: `SITE_URL: string`, `BASE_PATH: string`, `NOINDEX: boolean`, `withBase(path: string): string` (prefixes `BASE_PATH` to a root-absolute path), `absoluteUrl(path: string): string` (`SITE_URL` + `withBase`-less path, used for canonical/OG).

- [ ] **Step 1:** In the repo root run `npx create-next-app@latest . --ts --app --src-dir --no-tailwind --eslint --use-npm --import-alias "@/*"`; accept overwriting nothing but keep the existing `README.md` and `docs/`. Remove the default sample page content and CSS.
- [ ] **Step 2:** Set `next.config.ts`: `output: "export"`, `trailingSlash: true`, `images: { unoptimized: true }`, `basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? ""`. Add `vitest`, `@testing-library/react`, `jsdom` as dev dependencies and scripts `test`, `test:build` (`next build`).
- [ ] **Step 3: Write failing test** `tests/site.test.ts`: `withBase("/a/")` with base `/portfolio` returns `/portfolio/a/`; with empty base returns `/a/`; `absoluteUrl("/en/")` returns `https://matteoderosa.it/en/` by default. (Helpers read env at call time via a function taking an optional env object, so the test can set values.)
- [ ] **Step 4:** Run `npx vitest run tests/site.test.ts` → FAIL (module missing).
- [ ] **Step 5:** Implement `src/lib/site.ts`; run the test → PASS.
- [ ] **Step 6:** `npm run build` succeeds and produces `out/`. Commit `chore: scaffold next.js static export`.

### Task 2: Design tokens, fonts and page shell

**Files:** Create `src/styles/globals.css`, `src/components/{Header,Footer,ThemeToggle}.tsx`, `src/app/(it)/layout.tsx`, `src/app/en/layout.tsx`; copy `../ITSProdigi/pages/fonts/*.woff2`, `../ITSProdigi/favicon.{ico,svg}`, `apple-touch-icon.png`, `pages/img/og-image.png` into `public/` (fonts to `src/fonts/`).

**Interfaces:**
- Consumes: `withBase`.
- Produces: `<Header lang="it"|"en" currentPath: string />`, `<Footer lang />`, `<ThemeToggle labels={{ dark: string; light: string }} />`; both layouts are root layouts (`<html lang>`, inline no-flash theme script reading `localStorage.theme` in try/catch), so there is no `src/app/layout.tsx`.

- [ ] **Step 1:** Port tokens and base rules from `../ITSProdigi/pages/css/site.css` (light, dark via `prefers-color-scheme` and `[data-theme]`, `--accent` becomes `#3fc427` family with a darker readable variant for text on light; check AA contrast in both themes). Add `.mono` utility for labels/tags. Load the fonts with `next/font/local` from `src/fonts/`, so no manual base-path prefixing is needed.
- [ ] **Step 2: Failing test** `tests/theme.test.tsx`: clicking ThemeToggle sets `data-theme` on `<html>`, and still does so when `localStorage.setItem` throws.
- [ ] **Step 3:** Implement the three components and both layouts; run the test → PASS.
- [ ] **Step 4:** Commit `feat: page shell and theme`.

### Task 3: Routes, dictionaries and language switch

**Files:** Create `src/lib/routes.ts`, `src/content/dictionaries.ts`, `src/components/LangSwitch.tsx`, `tests/{routes,dictionaries}.test.ts`.

**Interfaces:**
- Produces: `type Lang = "it" | "en"`; `type RouteKey = "home" | "projects" | "about" | "contact" | "archive"`; `routePath(key: RouteKey, lang: Lang): string` (IT: `/`, `/progetti/`, `/chi-sono/`, `/contatti/`, `/archivio/`; EN: `/en/`, `/en/projects/`, `/en/about/`, `/en/contact/`); `projectPath(slug: string, lang: Lang): string`; `alternatePath(pathname: string, to: Lang): string | null` (null for the archive in EN); `type Dictionary` and `dictionaries: Record<Lang, Dictionary>` with keys: `nav`, `home` (`title`, `intro`, `ctaProjects`, `servicesTitle`, `services[]`, `featuredTitle`, `contactInvite`), `projects`, `about`, `contact`, `footer`, `a11y`.
- Consumes: `withBase`.

- [ ] **Step 1: Failing tests:** `dictionaries.test.ts` asserts the IT and EN dictionaries have the identical recursive key set (helper `keyPaths(obj)`) and no empty strings; `routes.test.ts` asserts `alternatePath("/progetti/", "en") === "/en/projects/"`, the reverse, and `alternatePath("/archivio/", "en") === null`.
- [ ] **Step 2:** Run → FAIL. Implement; run → PASS.
- [ ] **Step 3:** Implement `LangSwitch` (flag emoji or inline SVG + "IT"/"EN" text, `aria-label`, link to `alternatePath`; hidden or disabled-with-tooltip when `null`; on click store `lang` in `localStorage` inside try/catch). Draft copy, to be refined with Matteo: IT title "Creo siti e applicazioni web su misura"; services "Un sito vetrina per la tua attività", "Un'applicazione web fatta su misura", "Un gestionale per organizzare il tuo lavoro"; write natural EN equivalents.
- [ ] **Step 4:** Commit `feat: i18n routes and dictionaries`.

### Task 4: Content data

**Files:** Create `src/content/projects.ts`, `src/content/site.ts`, `tests/content.test.ts`.

**Interfaces:**
- Produces: `type Project = { slug: string; demoUrl: string; repoUrl: string; tech: string[]; featured: boolean; text: Record<Lang, { name: string; summary: string; purpose: string; whatIDid: string }>; screenshot?: string }`; `projects: Project[]` (To-Do List, Utenti/post/commenti, PokèReact, GitHub Stats); `site: { email: string; github: string; linkedin?: string; phone?: string; cvUrl?: string; photo?: string }`.

- [ ] **Step 1: Failing test:** every project has non-empty `text.it` and `text.en` fields, `https://` `demoUrl`/`repoUrl`, unique `slug`, at least one `tech`; `site.email === "info@matteoderosa.it"`.
- [ ] **Step 2:** Run → FAIL. Fill `projects.ts` from `../ITSProdigi/index.html` and `../derteo.github.io/pages/projects.html`, texts written from the user's side ("Per tenere in ordine liste e note"). **Verify `tech` against the real repos** with `gh repo view derteo/<repo>` / README (the two old sites disagree on To-Do's interface and Utenti/post's database). Demo URLs use the current `https://<sub>.matteeoderosa.it` subdomains.
- [ ] **Step 3:** Run → PASS. Commit `feat: project and site content`.

### Task 5: Pages (home, projects, about, contact)

**Files:** Create `src/components/{ProjectCard,TagList,ContactCta}.tsx`, `src/views/{HomeView,ProjectsView,ProjectView,AboutView,ContactView}.tsx`, route wrappers `src/app/(it)/{page.tsx,progetti/page.tsx,progetti/[slug]/page.tsx,chi-sono/page.tsx,contatti/page.tsx}` and the mirror under `src/app/en/{page.tsx,projects/…,about/…,contact/…}`; `tests/views.test.tsx`.

**Interfaces:**
- Consumes: `dictionaries`, `projects`, `site`, `routePath`, `projectPath`.
- Produces: each `View` takes `{ lang: Lang }` (`ProjectView` also `{ slug: string }`); project route pages export `generateStaticParams()` from `projects` and `dynamicParams = false`.

- [ ] **Step 1: Failing tests** (render views with Testing Library): HomeView IT contains the dictionary title and 3 or 4 featured project cards; with `site.phone`/`linkedin`/`cvUrl` undefined, ContactView renders no `tel:` link, no LinkedIn link and no CV button; ProjectView EN renders the English `summary`; a project missing `text.en` makes `ProjectView` throw.
- [ ] **Step 2:** Run → FAIL. Implement views and wrappers; "Scrivimi" button (`mailto:`) in Header and in `ContactCta` at the foot of every page. Tech tags small and monospace, after the plain-language text.
- [ ] **Step 3:** Run tests → PASS; `npm run build`; confirm `out/index.html`, `out/progetti/<slug>/index.html`, `out/en/projects/<slug>/index.html`, `out/contatti/index.html` exist.
- [ ] **Step 4:** Commit `feat: home, projects, about, contact pages`.

### Task 6: Archive

**Files:** Create `src/content/exercises.ts`, `src/components/ExerciseFilter.tsx`, `src/views/ArchiveView.tsx`, `src/app/(it)/archivio/page.tsx`, `public/pages/navigation.html`, `tests/exercises.test.ts`; copy `../ITSProdigi/frontend/` to `public/frontend/` unchanged.

**Interfaces:**
- Produces: `type Exercise = { n: number; group: "HTML" | "JavaScript"; title: string; href: string; codeUrl: string }`; `exercises: Exercise[]` (26 entries parsed from `../ITSProdigi/pages/navigation.html`).

- [ ] **Step 1: Failing test:** `exercises.length === 26`; for each exercise `href` (root-absolute, e.g. `/frontend/html/NavigazioneBase/tutto.html`) the file exists under `public/`.
- [ ] **Step 2:** Run → FAIL. Copy `frontend/`, generate `exercises.ts` from the old page, implement the filter (search box over title, same behaviour as the old `filter.js`, `role="status"` result count) and `ArchiveView`; exercise links go through `withBase`.
- [ ] **Step 3:** `public/pages/navigation.html` is a meta-refresh + canonical stub to `/archivio/` (relative base path handled by a small inline script that prefixes the path of its own location up to `/pages/`).
- [ ] **Step 4:** Run tests → PASS; build; open one copied exercise from `out/` to confirm its images load. Commit `feat: exercises archive`.

### Task 7: SEO, 404 and social

**Files:** Create `src/app/sitemap.ts`, `robots.ts`, `public/404.html`, `src/lib/seo.ts`, `tests/seo.test.ts`; add `generateMetadata` to every page wrapper.

**Interfaces:**
- Produces: `pageMetadata(key: RouteKey | { project: string }, lang: Lang): Metadata` (title, description, `alternates.canonical` and `alternates.languages` as `absoluteUrl(...)`, Open Graph with `public/og-image.png`, `robots: { index: false }` when `NOINDEX`); `personJsonLd(lang: Lang): object` (schema.org Person, `sameAs` from `site`).

- [ ] **Step 1: Failing tests:** `pageMetadata("projects", "it")` canonical is `https://matteoderosa.it/progetti/` and its `languages` has `it` and `en` (`en` = `/en/projects/`); with `NOINDEX` true robots is noindex; archive has no `en` alternate.
- [ ] **Step 2:** Run → FAIL. Implement; add JSON-LD to the home pages; sitemap lists every page in both languages with `alternates`; `robots.txt` points to the sitemap and disallows everything when `NOINDEX`.
- [ ] **Step 3:** `public/404.html` is hand-written, self-contained (inline CSS, no external assets), bilingual (IT and EN message plus links to `/` and `/en/`), because two root layouts rule out Next's `not-found` for export.
- [ ] **Step 4:** Run tests → PASS; build and inspect `out/sitemap.xml`, `out/robots.txt`. Commit `feat: seo, sitemap, 404`.

### Task 8: Deploy to the provisional URL

**Files:** Create `.github/workflows/deploy.yml`.

- [ ] **Step 1:** Workflow on push to `main`: checkout, Node LTS, `npm ci`, `npm test`, `npm run build` with `NEXT_PUBLIC_BASE_PATH=/portfolio`, `NEXT_PUBLIC_SITE_URL=https://matteeoderosa.github.io/portfolio`, `NEXT_PUBLIC_NOINDEX=1`, then `actions/upload-pages-artifact` (`out`) and `actions/deploy-pages`. Permissions `pages: write`, `id-token: write`.
- [ ] **Step 2:** Add a test in `tests/basepath.test.ts` that builds with the provisional env (`execSync`) and asserts every `href="/…"` and `src="/…"` in `out/**/*.html` starts with `/portfolio/` (ignoring `//` and full URLs).
- [ ] **Step 3:** Ask Matteo to enable Pages with source "GitHub Actions" (repo Settings → Pages) and to approve the first push; then verify `https://matteeoderosa.github.io/portfolio/` and `/en/` load, fonts and one exercise included.
- [ ] **Step 4:** Commit `ci: deploy to github pages`.

### Task 9: Go-live kit

**Files:** Create `docs/go-live.md`, `docs/redirect-stubs/matteoderosa-old.html`, `docs/redirect-stubs/derteo-github-io.html`.

- [ ] **Step 1:** `docs/go-live.md` lists, in order: create `info@matteoderosa.it` at Register.it; DNS records (four `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `CNAME www` → `matteeoderosa.github.io`); add `public/CNAME` containing `matteoderosa.it`; set the final env (empty base path, `NEXT_PUBLIC_SITE_URL=https://matteoderosa.it`, no `NOINDEX`) in the workflow; enable "Enforce HTTPS"; remove `CNAME` from the `gh-pages` branch of ITSProdigi; publish the redirect stubs; archive ITSProdigi; last, move the four subdomains and update `demoUrl`s.
- [ ] **Step 2:** The two stubs are complete HTML files (meta refresh, `link rel=canonical`, JS `location.replace`, visible fallback link) pointing to `https://matteoderosa.it/`.
- [ ] **Step 3:** Commit `docs: go-live checklist and redirect stubs`.

### Task 10: Quality pass

- [ ] **Step 1:** Run Lighthouse (mobile and desktop) on home, one project, contacts, archive in both themes; fix anything under 95.
- [ ] **Step 2:** Check at 320px and 768px, keyboard-only navigation, and `prefers-reduced-motion`.
- [ ] **Step 3:** Run a link check over `out/` (internal links resolve, external `https`); `npm test` and `npm run build` pass clean.
- [ ] **Step 4:** Matteo reviews the provisional site and the Italian/English copy; apply edits. Commit `chore: quality pass`.
