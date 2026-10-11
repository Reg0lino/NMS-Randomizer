# No Man's Sky: Atlas Terminal (Procedural Interloper Mission Matrix)

> **"16 // 16 // 16 // The Atlas awakens."**  
> A mobile-first, zero-token procedural mission generator, expedition simulator, and challenge engine for *No Man's Sky*, crafted for AMOLED screens, full touch legibility, and 100% static hosting on **GitHub Pages**.

🌐**Live Deployment:** https://reg0lino.github.io/NMS-Randomizer/

---

## 🌔 Overview

**No Man's Sky: Atlas Terminal** is an authentic companion tool that generates infinite procedurally generated adventures, tactical field directives, and seasonal community campaigns for explorers traversing the Euclid, Hilbert, and Eissentam galaxies.

Whether you are looking for chill planetary safaris, high-altitude stellar base building, high-speed Exocraft dune racing, or grueling Permadeath survival trials, the Atlas Terminal delivers lore-grounded objectives with rich gameplay mechanics.

---

## 🙩 Core Features & Game Modes

### 1. Procedural Mission Matrix (One-Tap Adventures & Hybrid Fusion)
- supports 12 canonical mission styles including Orbital & Stellar Waypoints, Minotaur Titan Worm Purge, Exocraft Combat & Vehicle Rallies, and Galactic Faction Standings.
- Hybrid Fusion Mode to combine multiple disciplines into overarching adventures.
- Three Thematic Paths (Alpha, Beta, Gamma) per mission with distinct approaches and tactical advantages.

### 2. 💸 Photo Mode Reconnaissance & Sub-Goals
- Specific Photo Mode framing objectives awarding +500 to +750 bonus Nanites.
- Observatories & Star Vistas, Unique Biomes & Anomalies, Space Dogfights, Titanic Horrors, and End-of-Mission Poses.

### 3. Tactical Fullscreen Mission HUD
- Large tactile tiles, live mission chronometer, and focus inspect mode.

22# 4. 🔔 Exosuit Voice Synthesizer (TTS)
- Audio voice briefings with 4 authentic persona presets.

### 5. Logbook & Offline Telemetry Vault
- 26 pre-cached procedural missions and 20 offline directives ready for 0-token offline play.

---

## �z Mobile-First Ergonomics & Broken Digitizer Safe Zone
- Top 15–15% Non-Touch Safe Zone for broken upper screen digitizers.
- Fluid Full-Width Scaling for mobiles to avoid shrunken bezels.
- True AMOLED #000000 Theme.

---

## 📦 Deploying to GitHub Pages
https://reg0lino.github.io/NMS-Randomizer/

---

## ⚠️ Important: GitHub Pages White Screen Fix

If you see a blank or white screen when visiting `https://reg0lino.github.io/NMS-Randomizer/`:

### Why this happens:
GitHub Pages can deploy in two ways:
1. **GitHub Actions (Modern Vite SPA mode - Recommended)**: It runs `npm run build` and serves the compiled bundle from `dist/`.
2. **Deploy from a branch (Classic mode)**: If your GitHub repository is configured to deploy directly from the **`main`** branch root rather than **GitHub Actions**, GitHub serves the uncompiled raw `index.html` which references `/src/main.tsx`. Mobile browsers cannot execute raw unbundled TypeScript files directly, which results in a white screen.

### How to fix it in 30 seconds:
1. On GitHub, navigate to your repository: **`reg0lino/NMS-Randomizer`**.
2. Click **Settings** (gear icon) > **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - Change **Source** from *"Deploy from a branch"* to **"GitHub Actions"**.
4. That is it! GitHub Actions will trigger `.github/workflows/deploy.yml`, build the production bundle, and your site will be live and visible.

*(Note: We have also updated `.github/workflows/deploy.yml` with an automated fallback that publishes the compiled `dist` bundle to a `gh-pages` branch so both methods work).*
