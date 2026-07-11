# HelloChinese — drop-in for your React app (`react-with-flask`)

Every component and page has its own CSS file (e.g. `NavBar.jsx` + `NavBar.css`,
`Home.jsx` + `Home.css`). No inline `style={{}}` layout — only a handful of
genuinely dynamic values stay inline (hero slide background colors, which are
data-driven, not design tokens).

Two shared stylesheets underpin everything:
- `styles/variables.css` — CSS custom properties (colors, fonts) + the Google
  Fonts `@import`, global reset, and the `hcFloat` keyframe. Import this once.
- `styles/shared.css` — small reusable primitives used across pages/components:
  `.eyebrow`, `.section-title`, `.photo-placeholder`, `.stat-strip`, `.btn-red`,
  `.btn-dark`, `.pill`, `.hc-float`.

Each page/component file imports `variables.css` (and `shared.css` where it
uses a shared primitive) plus its own `.css` file. Nothing is imported twice
into the DOM — repeated imports of the same CSS module are deduped by the
bundler.

--------------------------------------------------------------------------------
## Step 1 — Copy files into `src/`

The `react-export/` folder mirrors your `src/` folder. Merge them:

    react-export/                        ->  react-with-flask/src/
    ├── App.jsx                          ->  src/App.jsx                     (overwrite — wires up /About & /Classes)
    ├── pages/Home.jsx + Home.css        ->  src/pages/                     (overwrite)
    ├── pages/About.jsx + About.css      ->  src/pages/                     (overwrite — new design)
    ├── pages/Classes.jsx + Classes.css  ->  src/pages/                     (new)
    ├── pages/Book.jsx + Book.css        ->  src/pages/                     (overwrite — restyled, SAME logic)
    ├── components/NavBar.jsx + .css     ->  src/components/                (overwrite)
    ├── components/Hero.jsx + .css       ->  src/components/                (new — home slider, replaces Carousel)
    ├── components/Faq.jsx + .css        ->  src/components/                (overwrite)
    ├── components/Contact.jsx + .css    ->  src/components/                (new — home contact SECTION)
    ├── components/Footer.jsx + .css     ->  src/components/                (overwrite)
    ├── components/BookingForm.jsx + .css-> src/components/                (overwrite — restyled, SAME logic)
    ├── styles/variables.css             ->  src/styles/                    (new)
    ├── styles/shared.css                ->  src/styles/                    (new)
    └── assets/logo-panda.png            ->  src/assets/                    (new)

Nothing else changes. These files stay exactly as they are:
`api/client.js`, `pages/Contact.jsx` (your standalone /Contact page),
`pages/Chat.jsx`, `assets/Icons/Home/*` (reused by the philosophy cards).

**About & Classes pages:** both are static content pages (no backend calls) that
reuse your shared `NavBar` / `Footer` and the shared token/primitive stylesheets.
`About.jsx` covers story, values, and a teacher grid. `Classes.jsx` covers
Mandarin, Math, the combo, and a pricing recap. Photo spots are striped
placeholders — swap for real `<img>`s the same way as the Home hero (see below).

--------------------------------------------------------------------------------
## Step 2 — Run it

    cd react-with-flask
    npm run dev            # fonts + styles load automatically

Visit `/` (home) and `/Book` (booking). Done.

--------------------------------------------------------------------------------
## Notes

**Book page logic is unchanged.** `Book.jsx` keeps your `formList` state,
`updateForm`, `AddStudent`, `RemoveStudent`, and the `handleSubmit` that POSTs to
`/send-test-email` via `apiRequest`. `BookingForm.jsx` keeps every
`onChange`/`updateForm` call and option value. Only presentation changed:
- `BookingForm` takes a `num` prop for the student-number badge (Book.jsx passes it).
- The remove `<img>` is now a styled `×` button — you can delete `assets/Icons/Book/remove.png`.
- `emailStatus` renders as a styled success/error line under Submit.
- You can delete `styles/book.css` (the new Book page doesn't use it).

**Fonts** are `@import`ed in `styles/variables.css`, which every page imports —
so they load everywhere automatically. Import it once near your app root if
you'd rather not repeat it per-page (it's already deduped either way).

**Clean up (optional):** `Carousel.jsx` is no longer used on the home page — keep
or delete it. The old `styles/home.css`, `styles/navbar.css`, `styles/book.css`,
`styles/footer.css`, and `styles/hello-home.css` are no longer imported by these
files.

**Hero photos:** `Hero.jsx` uses striped placeholder slides driven by CSS custom
properties (`--tan-1`, `--rose-1`, `--sage-1`, etc. from `variables.css`). To use
real photos, replace each striped `<div>` in `SLIDES.map(...)` with an `<img>`.

**Contact form submit:** `components/Contact.jsx` `handleSubmit` has a `// TODO`
where you can POST to your Flask API; right now it shows a thank-you state.

**Editing colors/fonts globally:** everything reads from the CSS custom
properties in `styles/variables.css` (`--color-brand`, `--font-serif`, etc.) —
change a value there and it updates across every page and component.
