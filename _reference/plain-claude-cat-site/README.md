# Movaro — Premium DTC Site (Cat Calm Wrap)

A fast, mobile-first, single-product DTC site for **Movaro** — *Calm, not trapped.*
Pure HTML / CSS / vanilla JS. No build step, no dependencies. Just open `index.html`.

## Run it
```bash
# easiest — double-click index.html, or:
python3 -m http.server 8000
# then open http://localhost:8000
```

## File structure
```
.
├── index.html              # Home — all 15 sections (hero → footer)
├── product.html            # Product page (PDP) with sticky mobile add-to-cart
├── about.html              # About Us / brand story + values
├── faq.html                # Full FAQ (accordion)
├── size-guide.html         # Size finder + measurement guide + chart
├── shipping-returns.html   # Shipping, Returns, Privacy, Terms (#privacy, #terms)
├── contact.html            # Contact info + demo contact form
└── assets/
    ├── css/styles.css      # Design system + all components, fully responsive
    ├── js/main.js          # Nav, scroll-reveal, FAQ, gallery, swatches,
    │                       #   sticky cart, demo cart counter, toast, form
    └── img/                # SVG placeholder artwork (brand palette)
        ├── hero.svg            cat in wrap + owner trimming a paw
        ├── cat-calm.svg        relaxed cat resting in the wrap
        ├── product.svg         folded product shot
        ├── paw-access.svg      paw-by-paw access close-up
        ├── fabric.svg          soft/quiet fabric close-up
        ├── size-visual.svg     measurement diagram
        └── lifestyle.svg       owner caring for wrapped cat at home
```

## Design system (tokens in `:root`)
- **Background:** warm ivory `#F8F4ED`, soft beige `#EFE8DB`, clean white
- **Accents:** sage green `#5E7052`/`#7E9072`, soft clay `#C07A5E`, warm taupe `#A99A85`
- **Type:** Fraunces (serif headings) + Inter (body) via Google Fonts
- **Feel:** large clean headings, lots of air, rounded cards, soft shadows

## Built-in interactions
- Sticky translucent header (solid border on scroll) + mobile hamburger menu
- IntersectionObserver fade-in reveals (`.reveal`, `.d1`–`.d4` delays)
- Smooth FAQ accordions
- PDP gallery thumbnails, color swatches, size selector
- **Sticky Add-to-Cart** appears on mobile when the main CTA scrolls away
- Demo cart counter (localStorage) + toast confirmation
- Demo contact form (client-side success state, nothing stored)
- `prefers-reduced-motion` respected

## Copy & compliance notes
- Tone: calm, caring, premium, emotionally intelligent.
- No medical claims — uses "helps your cat feel secure", "supports calmer handling".
- Avoids harsh positioning words (cage/trap/restrain) in favor of wrap/swaddle/calming access.
- Reviews are style examples — no unverifiable hard numbers; rating shown as "early customer feedback".

## Swapping in real assets
Replace any file in `assets/img/` with a real `.jpg`/`.png`/`.mp4` of the same name
(or update the `src=` paths). For video heroes, swap the hero `<img>` for a
`<video autoplay muted loop playsinline>`.

## Making it a real store
Drop these into a Shopify theme: section markup maps cleanly to Liquid sections,
the offer/value-stack/comparison/FAQ blocks become reusable sections, and
`[data-add-cart]` buttons wire to the Shopify AJAX Cart API.
```
