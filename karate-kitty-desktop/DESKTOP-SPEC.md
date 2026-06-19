# Karate Cat — DESKTOP spec (blueprint)

**Date:** 2026-06-19 · **Status:** FIRST desktop port of the 2nd product — RAW base, our first experience porting onto an already-built theme. Not "the only way" — recorded so the next port is smoother (the mobile port was quick; this desktop port was less smooth).
**Live:** Shopify theme «Movaro» [LIVE] #188865773931 · template `product.movaro-kk.json` · CSS `assets/movaro-karate.css` (`@media (min-width:990px)`).
**Review:** `https://9109bw-8y.myshopify.com/products/movaro-karate-cat?preview_theme_id=188865773931` (open on a computer; plain URL lags the store cache).
**Renders:** `renders/desktop-full.png` + `renders/mobile-full.png` (our body; the theme shell isn't in the repro).

> ⚠ Like Cat Wrap 5.0.1, this is a snapshot + spec, not a standalone viewable page: the desktop **shell** (2-col hero, announcement bar, header, footer, cart drawer) is the **bought theme** — renders only on Shopify. Our custom desktop work = the **body CSS media queries**. Mobile is the priority and is UNCHANGED (everything desktop is behind `@media(min-width:990px)`).

## What the THEME gives on desktop (no build — just the native section)
- **Hero** = native `main-product` 2-col: gallery LEFT (product images) + our **buy-box** block (`mv_buybox`, `#mvpp`) RIGHT, sticky. Announcement bar / header / footer / **cart drawer** = native theme.
- **Buy-box buttons** = our CTA triggers the theme's **native `<product-form>`** (see learnings — embed `{% form 'product' %}` + `product-form.js`; CTA sets variant + clicks native submit). ⚠️ OPEN: live still redirects to `/cart` instead of opening the drawer — deferred (research Be Yours/Shopify online next session; don't guess).

## Our custom desktop body (`@media (min-width:990px)` in movaro-karate.css)
Key structural note: our sections are `<section class="s-*">` (bg ON the section), NOT Cat Wrap's `.mvb`(bg)+`.mvb-sec`(content) split. To get **full-bleed colour bands + contained content** without a markup refactor we use the **side-padding trick**:
`padding-inline: max(24px, calc((100% - 1040px)/2))` → the section bg fills full width, content centres to ~1040.

Per-block (data-block):
- **Base**: `section{padding:80px 24px}`; `section > *{max-width:760px; margin-inline:auto}` (contain content, bg stays full-bleed); `.sect-head{max-width:620px}`, `.lead-p{max-width:680px}`.
- **trust-strip** — full-bleed accent bar (not in a `<section>`, untouched).
- **ugc** — 5 cards in a row: `.scroll{max-width:1160px; display:grid; grid-template-columns:repeat(5,1fr); gap:14px; overflow:visible; margin:28px auto 0}`; `.ugc-card{min-width:0}`.
- **about** — 2-col (side-padding trick, grid `minmax(0,420px) minmax(0,1fr)` gap 50): eyebrow+lead-h+lead-p `grid-column:1/-1` centred max 680; `.tape` (hotspot image) `grid-column:1; grid-row:4/span 3; position:sticky; top:100px`; the 3 `.brow` rows `grid-column:2`.
- **before-after / compare** — contained; `.ba-grid`/`.cmp` max-width 720 (unchanged otherwise).
- **science** — 2-col (side-padding trick, `1fr 1fr` gap 48): `.sect-head` spans + centred; `.mech-collage` `grid-column:1; position:sticky; top:100px`; **all `.mpt` accordions wrapped in ONE `.mech-pts` container** `grid-column:2` (REQUIRED — without the wrapper the tall collage row leaves a big gap between accordion 1 and 2). Accordions **opened on desktop** via JS (`matchMedia('(min-width:990px)') → details[open]`); chevron `.ch` hidden.
- **brand** — contained (760).
- **instruction** — 3 steps in a row: `.scroll{max-width:960px; display:grid; grid-template-columns:repeat(3,1fr); gap:26px; overflow:visible}`; `.step-card .ill{aspect-ratio:4/3}`.
- **offer** — contained; **`> *{margin-inline:auto}`** to centre every row (the guarantee card has `margin:20px 0` which zeroed its auto side-margins → it drifted left → this fixes it).
- **faq / reviews / close** — contained; reviews `> *{max-width:700px}` (a touch more side air).
- **spine** — KEPT on desktop (matches Calm Wrap); centred over the contained body.

## Breakpoint & discipline
- Desktop breakpoint = **990px** (matches the theme). Mobile untouched.
- Verify on the `?preview_theme_id=` URL on a computer; verify deploys via Admin API GET (FPC cache is slow/sticky).

## Open / next
- 🔴 **Buy-box button still redirects to /cart instead of opening the drawer** — buttons add to cart fine, but the drawer doesn't open. Native `<product-form>` embed meets `product-form.js` requirements yet live still redirects → **research online (Shopify/Be Yours docs) next session, don't guess** (Marina).
- Real gallery photos (replace the 6 drawn-slide placeholders).
- A cleaner future port = adopt the `.mvk-sec` / `bg-*` wrapper so desktop rules copy Cat Wrap verbatim (avoids the side-padding trick).
- Bring Calm Wrap to the same native-form button.
