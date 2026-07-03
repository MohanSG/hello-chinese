# HelloChinese — drop-in for your React app (`react-with-flask`)

Layout is inline `style={{}}` (pixel-matches the design). One CSS file
(`hello-home.css`) holds only `:hover`, `:focus`, keyframes, and the Google Fonts
`@import`.

--------------------------------------------------------------------------------
## Step 1 — Copy files into `src/`

The `react-export/` folder mirrors your `src/` folder. Merge them:

    react-export/                     ->  react-with-flask/src/
    ├── App.jsx                       ->  src/App.jsx                     (overwrite — adds /Classes route)
    ├── pages/Home.jsx                ->  src/pages/Home.jsx             (overwrite)
    ├── pages/Book.jsx                ->  src/pages/Book.jsx             (overwrite — restyled, SAME logic)
    ├── components/NavBar.jsx         ->  src/components/NavBar.jsx      (overwrite)
    ├── components/Hero.jsx           ->  src/components/Hero.jsx        (new — home slider, replaces Carousel)
    ├── components/Faq.jsx            ->  src/components/Faq.jsx         (overwrite)
    ├── components/Contact.jsx        ->  src/components/Contact.jsx     (new — home contact SECTION)
    ├── components/Footer.jsx         ->  src/components/Footer.jsx      (overwrite)
    ├── components/BookingForm.jsx    ->  src/components/BookingForm.jsx (overwrite — restyled, SAME logic)
    ├── styles/hello-home.css        ->  src/styles/hello-home.css      (new)
    └── assets/logo-panda.png        ->  src/assets/logo-panda.png      (new)

Nothing else changes. These files stay exactly as they are:
`api/client.js`, `pages/Contact.jsx` (your standalone /Contact page),
`pages/About.jsx`, `pages/Chat.jsx`, `assets/Icons/Home/*` (reused by the
philosophy cards).

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

**Fonts** are `@import`ed in `hello-home.css`, which `Home.jsx` and `Book.jsx`
import — so they load on those pages automatically. If you want the fonts on
every page (About, standalone Contact, etc.), move this line into `src/index.css`:

    @import url("https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600;6..72,700&family=Hanken+Grotesk:wght@400;500;600;700;800&family=Noto+Serif+SC:wght@500;600;700&display=swap");

**Clean up (optional):** `Carousel.jsx` is no longer used on the home page — keep
or delete it. The old `styles/home.css`, `styles/navbar.css`, `styles/book.css`,
and `styles/footer.css` are no longer imported by these files.

**Hero photos:** `Hero.jsx` uses striped placeholder slides. To use real photos,
replace each striped `<div>` in `SLIDES.map(...)` with an `<img>` (example inside
the file / earlier note).

**Contact form submit:** `components/Contact.jsx` `handleSubmit` has a `// TODO`
where you can POST to your Flask API; right now it shows a thank-you state.
