# Groundwork — Estate, FM, Strata & Planning Study PWA

A single-file, offline-first study companion for the 20-hour / 10-session plan on Singapore estate management, facilities management & maintenance, strata, and master planning.

**v3 (19 Jul 2026)** — resources restructured on adult-learning principles (Knowles/Merrill): every resource is now a five-part activity — **Prime** (prediction/recall before opening the source), **Where** (navigation), **Do** (judgment tasks, not reading), **Produce** (a named artefact; 47 across the plan), **Check yourself** (success criteria). Sessions gained observable **objectives** (Learn tab) and a **This week at work** transfer commitment (Resources tab). Tick rule changed: a resource is done when its artefact exists, not when the page has been read. Resource counts per session unchanged, so `gw-state-v2` progress carries over. SW cache `groundwork-20260719c`.

**v2 (19 Jul 2026)** — re-pitched from Singapore-property level to civil-service level: how a government department gets, funds, builds and runs its own estate. Two new sessions on the IBC (integrated building contractor) relationship, a procurement session, strata compressed into part of Session 10. Resources rewritten with exact navigation paths, time estimates, what-to-look-for lists and a "after this you can" test. State key bumped to `gw-state-v2`; SW cache `groundwork-20260719b`.

## What it does
- **10 "sheets" (sessions)**, each with three tabs:
  - **Learn** — the why-this-session framing plus core concepts, each tickable as you master it
  - **Resources** — the reading list with links (links need a connection; everything else is offline)
  - **Review** — a 15-minute countdown timer plus active-recall flashcards (Show answer → Got it / Fumbled)
- **Fumble list** — any card marked "Fumbled" collects on the home screen; retest until cleared (spaced repetition)
- **Zoning-legend progress strip** — 10 segments, coloured by track (planning blue, FM teal, strata terracotta, smart violet, green, capstone gold), filled as sessions complete
- Mark session complete / undo, with SGT-safe completion dates

## Files
- `index.html` — the whole app (vanilla JS, system fonts, no CDN)
- `sw.js` — cache-versioned service worker (`groundwork-20260719`)
- `manifest.json`, `icon-192.png`, `icon-512.png`

## Deploy (GitHub Pages)
1. Push all 5 files to a repo, enable Pages on the main branch root.
2. Open the Pages URL on your phone → Add to Home Screen.
3. On every future edit of `index.html`: **bump the cache name in `sw.js` first (M1)** and push both files together.

## Conventions notes
- Follows Master AAR M1–M20: SW registered first line (M3), individual cache puts (M4), navigate-by-mode (M5), `localDateStr()` for all dates (M6), `min-height:0` on scroll areas (M8), action button in a sticky footer outside scroll content (M9), core button handler reset explicitly on screen entry (M13).
- **One deliberate deviation:** progress state uses `localStorage` (single JSON key `gw-state-v2`, ~2 KB) instead of IndexedDB — all study content is embedded in the file, so there is no dataset to store. Reads/writes are wrapped in try/catch and the app degrades to in-memory if storage is unavailable. Easy to swap to the guarded IDB pattern if you extend it (e.g. per-day study logs).

## Resetting progress
DevTools console → `localStorage.removeItem('gw-state-v2')` → reload. (A settings screen wasn't worth the weight for a personal app; say the word if you want one.)
