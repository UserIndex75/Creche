# Crèche Minou — interactive invitation (FR + العربية)

Open `index.html` in a browser (double-click works). Direct Arabic link: `index.html?lang=ar`.
Bootstrap is loaded from a CDN, so the first visit needs an internet connection.

## Project structure

```
creche-minou/
├── index.html                 page markup (Bootstrap grid + utilities)
├── README.md
└── assets/
    ├── css/
    │   ├── base.css           colours, fonts, Bootstrap overrides, page layout
    │   ├── background.css     floating decorative icons + their animations
    │   ├── components.css     buttons, language switch, music button, cards, lightbox
    │   └── sections.css       one block per section (intro → contact)
    ├── js/
    │   ├── config.js          ★ event + contact info (edit here)
    │   ├── i18n/fr.js         ★ French texts
    │   ├── i18n/ar.js         ★ Arabic texts
    │   ├── modules/           dom, i18n, reveal, audio, envelope, lightbox
    │   └── main.js            starts everything
    ├── images/gallery/        photos
    └── audio/                 optional music.mp3
```

## Change the information
- **Date, time, address, phone, WhatsApp, Instagram, Facebook, Google Maps** → `assets/js/config.js`.
  A value left as `[PLACEHOLDER]` hides the matching button.
- **Any text** → same key in `assets/js/i18n/fr.js` **and** `assets/js/i18n/ar.js`.
- **Colours** → variables at the top of `assets/css/base.css`.

## Add a photo to the gallery
1. Put the image in `assets/images/gallery/`.
2. In `index.html`, copy one `<div class="col-12 …">` block inside `.gallery-row`; change `data-full`, `src`, `width`/`height` and the `data-i18n-alt` key.
3. Add that alt key (`alt4`…) to `fr.js` and `ar.js`.

## Music (optional)
Put `music.mp3` in `assets/audio/`. It only starts after the "Ouvrir l'invitation" click.

## Notes
- Scripts are plain files (not ES modules) so the page also works from `file://`.
- Only Bootstrap's CSS is used (no Bootstrap JS needed). Do not use Bootstrap's `text-start`, `ms-*`, `me-*`, `ps-*`, `pe-*` classes: they are left/right-based and would break the Arabic (RTL) layout. Use `text-center`, `d-flex`, `gap-*`, `row`/`col-*`, and the CSS logical properties already used in the project.
- To publish: upload the whole folder to any static host (Netlify, GitHub Pages, Vercel…).
