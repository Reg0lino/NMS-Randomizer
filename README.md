# No Man's Sky: Atlas Terminal (Interloper Directive Engine)

> **"16 // 16 // 16 // The Atlas awakens."**
> A mobile-first, procedural mission, expedition, and challenge generator for *No Man's Sky*, optimized for OLED screens, Samsung Galaxy devices, and 100% static hosting on **GitHub Pages**.

---

## 🚀 Key Features

* **Mode 1: The Anomaly Transceiver (One-Tap Mission Generator)**
  * Central interactive Atlas Monolith with audio-reactive pulses.
  * Three intensity thresholds:
    * **Cadet:** Chill exploration, culinary arts, architecture, scanning & photography.
    * **Interloper:** Mechanical survival constraints (No Hyperdrives, Foraging Only, Scrapper).
    * **Atlas Protocol:** Extreme survival (Permadeath, Zero Economy, No HUD, Dreadnought hunting).
  * Checkable primary directives with milestone completion audio chimes and one-tap Discord/Reddit markdown copy.

* **Mode 2: The Journey Weaver (Modular Matrix Builder)**
  * 4-Axis combinatorial matrix synthesizing 12 Vocations, 6 Economic Rules, 5 Mobility Modifiers, and 6 Biome Targets.
  * Balanced Survival Manifestos with cosmic lore rationales, recommended game configurations, and progressive 3-phase milestones.

* **Mode 3: Procedural Expedition Creator (Seasonal Campaigns)**
  * Multi-phase seasonal campaigns simulating official *No Man's Sky* community expeditions (Aquarius, Orbital, Echoes, Worlds, etc.).
  * 4 progressive phases with 16 distinct milestones, flavor rewards, and localStorage progress tracking.

* **Mode 4: Atlas Archive & Telemetry Vault**
  * 16 pre-cached offline directives ready to play with **zero tokens**.
  * Local storage memory for saved directives, manifestos, and active campaigns.
  * One-click JSON backup export and import for seamless cross-device migration.

* **Atmospheric Audio & Visual Immersion**
  * Synthesized Web Audio API sound effects (terminal clicks, Atlas harmonic pulses, milestone jingles).
  * **55Hz Atlas Sub-Bass Ambient Drone** reproducing the low-frequency resonance of space stations.
  * Retro CRT Scanline mesh overlay (toggleable).
  * True `#000000` AMOLED void background for battery conservation and infinite contrast.

* **Broken Digitizer & One-Handed Mobile Ergonomics**
  * **Top 15% Dead-Zone Protection:** The top area features a static, non-interactive telemetry readout so accidental touches on cracked or defective upper screen digitizers cause zero misclicks.
  * **Scrollable Control Matrix:** All buttons and interactive dials sit safely below the top bar, scrolling into the functional middle and lower 85% of your screen.
  * **Thumb Navigation:** 48px+ touch targets positioned in the bottom 60% thumb zone.

---

## 📦 Deploying to GitHub Pages (Static Hosting)

This application is built with **zero server dependencies** for production deployment on GitHub Pages. It functions completely offline using pre-cached procedural generators, and supports user-provided Gemini API keys via browser `localStorage`.

### Option A: Automatic Deployment via GitHub Actions (Recommended)
1. Initialize a git repository and push this codebase to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial Atlas Terminal build"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   * Go to **Settings** > **Pages**.
   * Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) will automatically build and publish your site!
4. Your terminal will be live at `https://<YOUR_USERNAME>.github.io/<YOUR_REPO_NAME>/`.

### Option B: Manual Static Build
```bash
npm install
npm run build
```
Upload the contents of the `dist/` directory to any static host (GitHub Pages, Vercel, Netlify, Cloudflare Pages).

---

## 🔑 Using with Google Gemini API

* **100% Free-Tier / 0-Token Procedural Mode:**
  The terminal runs seamlessly without an API key using the integrated procedural matrix and 16 curated offline directives.
* **Neural Link (Gemini AI):**
  * If running the full-stack dev server (`npm run dev`), the backend proxies calls using `GEMINI_API_KEY` from `.env`.
  * If running on **GitHub Pages**, open **CONFIG / KEY** in the terminal controls to paste your Gemini API key. It is saved purely inside your browser's private `localStorage`.

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Run full-stack development server (Express + Vite)
npm run dev

# Run type check and lint
npm run lint

# Build static output for GitHub Pages
npm run build
```

---

## 🪐 Credits & Lore
Inspired by *No Man's Sky* by Hello Games. Built for interlopers across the Euclid, Hilbert, and Eissentam galaxies.
