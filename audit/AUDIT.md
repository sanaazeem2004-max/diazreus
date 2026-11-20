# Diaz Reus — Website Audit (diazreus.com)

Inspected 2026-11-18 with Playwright (Microsoft Edge engine) at 1440 / 1280 / 768 / 390 px.
Every finding below was observed or measured in the browser; screenshots are in `audit/shots/`,
raw page data in `audit/pages/`, measurements in `audit/metrics.json`.

Pages inspected: Home, About Us, US & International Practice, DRT Alliance, Representative Matters,
Honors & Recognitions, Areas of Practice + all 16 practice pages, Attorneys & Counselors (4 regional
tabs), Investigators, 73 attorney/investigator profiles, News & Events, Articles & Publications,
Offices, Contact.

## 1. Structure & SEO

| # | Finding | Evidence |
|---|---|---|
| 1.1 | Homepage H1 is "Areas of Practice." — the hero headline "Global Reach. Local Grasp." is not a heading. | `metrics.json` → `_home.h1` |
| 1.2 | 14 of 16 practice pages share the same generic H1 "Areas of practice"; the practice name is not the H1. | practice pages `h1` |
| 1.3 | Representative Matters, Honors & Recognitions and US & International Practice all use H1 "About us". | `h1` per page |
| 1.4 | Investigators page has two H1s ("Investigators", "Team"). | `_investigators.h1` |
| 1.5 | Homepage repeats the H2 "DRT Alliance" three times (slider duplicates rendered in the DOM). | `_home.json` headings |
| 1.6 | Images lack alt text: 93 of 104 on Home, 20 of 25 on Honors, 12 of 17 on News. | `imgsNoAlt` |
| 1.7 | No `<meta name="description">` on Home. | `_home.json.metaDesc` = undefined |

## 2. Navigation & header

| # | Finding | Evidence |
|---|---|---|
| 2.1 | At 390px two menu toggles are visible at once (an outlined circle at top-left and a hamburger at right). | `_home-390-fold.png` |
| 2.2 | The logo lockup changes between breakpoints: "INTERNATIONAL LAW FIRM" at desktop vs "INTERNATIONAL LAW FIRM & ALLIANCE" at tablet/mobile. | `_home-1440.png` vs `_areas-of-practice-768.png` |
| 2.3 | No site search. "People" and "News & Articles" are non-navigable parents (`javascript:void(0)`). | `links.json` |
| 2.4 | "Cuba Practice" appears as a homepage practice card but has no page and is absent from the menu. | home text vs `links.json` |

## 3. Layout & spacing

| # | Finding | Evidence |
|---|---|---|
| 3.1 | Practice detail pages end with ~400px of empty white space before the footer at 1440px, with no related attorneys, imagery or call to action. | `_areas-of-practice_international-litigation-arbitration-1440.png` |
| 3.2 | Homepage DRT logo panels are oversized blocks with large empty areas; two-column rows don't align text and image heights. | `_home-1440.png` |
| 3.3 | Footer: the Headquarters block is pushed ~280px below the logo, leaving a dead column at 1440px. | practice screenshot footer |
| 3.4 | Mobile footer omits the full office list entirely. | `_about-us-390.png` |
| 3.5 | The hero video play/pause control sits on top of the headline at 390px. | `_home-390-fold.png` |

## 4. Content accuracy & consistency

| # | Finding | Evidence |
|---|---|---|
| 4.1 | Copyright year differs: "© 2026" (desktop footer) vs "© 2019" (mobile footer). | `_about-us-390.png` |
| 4.2 | Office lists disagree: the Offices page lists The Hague and Paramaribo (not in footer); the footer lists Johannesburg (not on Offices page). | `offices2.json` vs footer |
| 4.3 | Many "View On Google Maps" links point to the wrong place — e.g. Bonaire → Caracas, Caracas → Lima/Guatemala, Prague → Moscow, Oranjestad/Paramaribo → Santo Domingo, Washington D.C. address 1120 Connecticut Ave vs map 1050 Connecticut Ave, Houston address 3663 N. Sam Houston Pkwy vs map 20333 TX-249. | `offices2.json` |
| 4.4 | Attorney profiles print emails as raw text "mailto:mdiaz@diazreus.com". | profile page text |
| 4.5 | Practice copy contains a duplicated sentence (Intellectual Property: "We also are expert(s) in all aspects of trademark and copyright applications…" twice). | practice text |
| 4.6 | Phone numbers use non-standard formatting ("+1 . (877) . 247 . 92 . 77") and none on the site are `tel:` links. | home footer; zero `a[href^=tel]` |
| 4.7 | Social links are inconsistent (Twitter → @DRT_Alliance in one place, @michaeldiazjr in another; Facebook goes to a personal page). | `social.mjs` output |

## 5. Contact & conversion

| # | Finding | Evidence |
|---|---|---|
| 5.1 | The contact form has only Full Name, Company and Comment — **no email or phone field**, so the firm cannot reply to a web inquiry; no field is required. | `contact.json` form fields |
| 5.2 | The attorney-client disclaimer is truncated ("does not establish an attorney client." — missing "relationship"). | contact page text |

## 6. Typography & visual system

| # | Finding | Evidence |
|---|---|---|
| 6.1 | Body text falls back to Times New Roman (computed `body` font); Nunito Sans is applied only to individual elements. | `metrics.json` `_home.body.font` |
| 6.2 | Headings are light-weight Nunito at modest sizes (H1 40px, H2 35px) with no editorial hierarchy; the orange-red rule is the only accent. | computed styles |
| 6.3 | Imagery is low-resolution (section images 577×442, attorney photos often 300×247) and heavily blue-tinted, which flattens the photography. | `_about-us.json` images |
| 6.4 | Awards and client logos are shown in paginated sliders, hiding most recognitions behind dots/arrows. | `_home-1440.png` |

## What we verified was *not* a problem

- No horizontal overflow at any tested width (`docWidth == viewport` on every page).
- No console errors on tested pages.
- Images reported as `naturalWidth = 0` are lazy-load placeholders with empty `src`, not broken URLs — **not** reported as broken.

## Redesign responses (summary)

1.x → one H1 per page from the page subject, unique titles + meta descriptions, alt text on every image.
2.x → single responsive header with one toggle, consistent logo, search, mega-menu with real routes, Cuba Practice page from the published blurb.
3.x → one shared container (`max-width 1280px; width: calc(100% - 80px)`), shared Section / SectionHeading components, practice template with services, attorneys, related areas and CTA.
4.x → single office dataset feeding footer, map, and directory; map links generated from the printed address; emails/phones as real links.
5.x → contact form keeps original field names (`fullname`, `company`, `comment`) and adds required email/phone; full disclaimer restored.
6.x → Inter Tight + Instrument Serif type system, firm blue #00548B as accent on a monochrome editorial base, full-colour high-resolution photography, award/client walls without pagination.
