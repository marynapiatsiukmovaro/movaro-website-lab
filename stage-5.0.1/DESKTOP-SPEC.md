# Stage 5.0.1 — DESKTOP version of the product page (Movaro)

**Date:** 2026-06-14 · **Status:** first desktop version (5.0.1). If a rework is needed → 5.0.1.1.
**Live on:** Shopify theme «Movaro» [LIVE] #188865773931 · template `product.movaro-pp.json`.
**Review:** `https://9109bw-8y.myshopify.com/products/pro-cat-wrap?preview_theme_id=188865773931` (open on a computer; the plain URL lags behind the store's slow cache).

> ⚠ Why this stage is a snapshot + spec, not a standalone viewable HTML like the other stages:
> the DESKTOP layout is provided mostly by the **purchased theme** (Be Yours): the 2-column Hero,
> announcement bar, header and footer are NATIVE theme + theme settings — they only render on Shopify,
> not in a standalone Lab page. **Our custom desktop work = the body CSS media queries** (`movaro-product.css`,
> `@media (min-width:990px)`) + a few theme settings + a header nav-center snippet. All captured here.
> Mobile (the priority — ads run on phone) is UNCHANGED; everything desktop is behind `@media(min-width:990px)`.

## Files in this snapshot
- `movaro-product.css` — the live body CSS (mobile + the `@media(min-width:990px)` desktop block). **Source of truth for our custom desktop layout.**
- `product.movaro-pp.json` — the live product template (sections carry desktop scoping classes: `ugc-d · ab-d · mech-d · inst-d · vet-d`; mechanism has a tiny JS that opens its accordions on desktop).
- `header-nav-center.css` — the snippet (lives in `sections/header.liquid`) that centers the nav on desktop.

## What the THEME gives on desktop (no custom build — just settings)
- **Announcement bar** = full-width; setting `layout: carousel` → the two phrases ROTATE (like mobile). (`mobile_layout: carousel` already.)
- **Header** = single row: logo LEFT (`logo_position: middle-left`, `logo_height: 40` — made smaller so it doesn't dominate; mobile stays `mobile_logo_position: center`, `mobile_logo_height: 44`), nav CENTERED (our `header.liquid` snippet, desktop only), cart RIGHT. Search/account stay hidden (keep-and-hide, scoped `.header-wrapper`).
- **Hero** = native 2-column: gallery LEFT + our buy-box (`mv_buybox`) RIGHT, sticky. **Gallery layout = `columns`** → desktop shows all photos **2-per-row, several rows** (Marina's pick); **mobile auto-renders as a slider** (theme handles per-device). Old competitor screenshots removed from the product — gallery = our 5 photos only. Buy-box untouched (Marina: great).
- **Footer** = native re-skinned petrol footer → columns in a row on desktop.

## Our custom desktop body layout (`@media(min-width:990px)` in movaro-product.css)
- **Default body column** widened: `.mvb-sec` max-width 520 → **740** (+ more vertical padding).
- **UGC** (`.ugc-d`, max-width 1120): the 5 review cards become a **5-column grid, no horizontal scroll**.
- **About** (`.ab-d`, max-width 1040) = **eyebrow + heading «Nail day…» + the 2 lead paragraphs CENTERED full-width on top**, then a **2-column row: cat hotspot image LEFT (sticky) / the 3 photo-description (brow) rows RIGHT**. (Marina's "option 1".)
- **Mechanism** (`.mech-d`, max-width 1040) = section heading on top, then **2-column: the diagram collage LEFT (sticky) / the 3 points RIGHT**. The points (`.mpt` accordions) are **always OPEN on desktop** (JS sets `open` at ≥990px; the «+» chevron hidden). Mobile stays collapsed.
- **Before/After** and **Us-vs-Them (compare)** — UNCHANGED (Marina: great as-is; compare uses `table-layout:fixed`, scales cleanly).
- **Vet / brand block** (`.vet-d`, max-width 860) — widened a touch (was narrow).
- **Instruction "Calm in 3 simple steps"** (`.inst-d`, max-width 980): the 3 steps become a **3-column grid (no scroll), photos larger (1:1) with more gap**, side margins tightened.

## Breakpoint & discipline
- Desktop breakpoint = **990px** (matches the theme's desktop). Everything above is desktop-only; mobile untouched.
- Verify desktop on the `?preview_theme_id=` URL (bypasses the store's slow FPC). Edit theme CSS with exact full-rule replaces (never regex over `@keyframes`); re-check brace balance.

## Open / next
- Whether a 2nd image-optimization pass is needed (prototype photos already ~1MB) — see dept `hypotheses/_active.md`.
- Spine travelling DOT still deferred (mobile + desktop) — redo as a `label::before` next calm pass.
- Home page on desktop is still the theme DEMO (home not yet ported — separate task).
