#  Bridge Simulator V6

A physics-based browser bridge-building game built with vanilla JavaScript and HTML5 Canvas — no frameworks, no server, no dependencies.

---

## 📋 Table of Contents

- [Overview](#overview)
- [How to Run](#how-to-run)
- [Game Modes](#game-modes)
- [How to Play](#how-to-play)
- [Materials](#materials)
- [Levels](#levels)
- [V6 New Features](#v6-new-features)
  - [Local Leaderboard](#local-leaderboard)
  - [Replay System](#replay-system)
- [localStorage Keys](#localstorage-keys)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)

---

## Overview

Bridge Simulator challenges players to design and build structurally sound bridges using different materials, then test them under the weight of a moving vehicle. Each level has a unique terrain, budget, and difficulty. The game tracks scores locally — no account or internet connection required after the initial font load.

![Game Screenshot](https://via.placeholder.com/800x400/0d1030/ffd44a?text=Bridge+Simulator+V6)

---

## How to Run

1. Download or clone this repository
2. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari)
3. No installation, build step, or server required

```
git clone https://github.com/yourusername/bridge-simulator-v6
cd bridge-simulator-v6
open index.html
```

> **Note:** The game uses `localStorage` to save all data. Clearing browser storage will reset progress, scores, and replays.

---

## Game Modes

|Mode      |	Budget	            |Stars                      |	Progression            |
|----------|----------------------|---------------------------|------------------------|
|Classic   |Unlimited	            |Always 3 ⭐⭐⭐	          |All levels open         |
|Ranked	   |Strict per-level limit|	Based on cost efficiency	|Must unlock sequentially|  


In **Ranked** mode, spending under 50% of budget earns 3 stars, under 75% earns 2 stars, and completing within budget earns 1 star.

---

## How to Play

1. **Select a material** from the bottom bar (Road, Wood, Steel, Cable, Iron)
2. **Click a red anchor** to select it
3. **Click another anchor or empty space** to draw a beam between them
4. **Add diagonal braces** — triangles are structurally much stronger than squares
5. **Press TEST** to launch the vehicle and watch stress colours appear
6. **Right-click** any node or beam to delete it
7. **Ctrl+Z** to undo the last action

**Stress colour guide:**
- 🟢 Normal colour = safe
- 🟡 Orange = stressed
- 🔴 Red = about to snap

---

## Materials

| Material | Cost/px | Max Strength             | Best Used For              |
|----------|---------|--------------------------|----------------------------| 
| Road     | $3.0    | High                     | Deck surface               |
|  Wood    | $1.0    | Low                      | Light spans, budget builds |
|  Steel   | $2.2    | Medium                   | General structural beams   |
|  Cable   | $0.5    | Very low (tension only)  | Suspension cables          |
|  Iron    | $1.6    | Very high                | Heavy load-bearing members |

---

## Levels

Each level has a unique animated background — from sunny meadows and tropical jungles to aurora borealis, volcanic lava, and epic thunderstorms.

| No | Name             | Terrain    | Budget    |
|--- |--------------    |---------   |-----------|
| 1  | Tutorial Gap     | Grass      | Unlimited |
| 2  | River Crossing   | Grass      | $5,000    |
| 3  | Double Span      | Rock       | $7,000    |
| 4  | Deep Chasm       | Ice        | $6,500    |
| 5  | Asymmetric       | Grass      | $6,000    |
| 6  | Tight Budget     | Ice        | $2,200    |
| 7  | Mid-River Rock   | Rock       | $7,500    |
| 8  | Triple Chasm     | Ice        | $10,000   |
| 9  | Steep Canyon     | Rock       | $8,000    |
| 10 | Grand Finale     | Ice + Rock | $14,000   |

## V6 New Features

### Local Leaderboard

All scores are saved permanently in the browser using `localStorage` — no server or database needed.

**How it works:**
- On first launch, the game asks for your player name via a modal. You **cannot skip this** — the game does not start until a name is entered.
- Every time you complete a level, your score (name, stars, cost, mode, date) is automatically saved.
- The top **10 scores per level** are kept, sorted by most stars then lowest cost.
- Access the leaderboard from the home screen (**🏆 LEADERBOARD** button) or directly from the win modal (**🏆 SCORES** button).

**Leaderboard features:**
- Tab navigation per level
- medal rows for top 3
- Your own scores highlighted in gold
- Your rank shown in the win modal after each victory
- **Export button** — downloads a formatted `.txt` file of all scores (useful for assignment submission)
- **Clear All** button to reset scores

**Leaderboard page:** `leaderboard.html`  
**Logic file:** `leaderboard.js`

---

### Replay System

When you win a level, the game automatically saves a snapshot of your bridge structure to `localStorage`.

**How it works:**
- Node positions are stored as **0–1 fractions** of the canvas size, making snapshots resolution-independent — they load correctly on any screen size.
- Beam materials, lengths, and connections are stored alongside the nodes.
- To load a replay: switch to **BUILD mode**, then click the **📼 REPLAY** button in the toolbar.
- The saved bridge is restored into the editor — you can then modify it, re-test it, or submit it as-is.

**Key details:**
- One snapshot per level — each win overwrites the previous
- If no replay exists for a level yet, the button shows a helpful message
- Loaded bridges are fully editable and support undo (Ctrl+Z)
- Replay metadata (stars, cost, date) is shown in a popup on load

**Logic file:** `replay.js`

---

## localStorage Keys

| Key | Description |
|---|---|
| `bridgePlayerName` | Player display name (set on first launch) |
| `bridgeProgress` | Ranked mode unlock progress and star ratings |
| `bridgeSettings` | Sound settings (master volume, SFX, on/off) |
| `bridgeScores` | Leaderboard entries for all levels |
| `bridgeReplays` | Bridge snapshots for each completed level |

---

## File Structure

```
bridgeSimV6/
├── index.html          — Home screen (mode select, nav)
├── levelselect.html    — Level selection screen
├── game.html           — Main game canvas + UI
├── leaderboard.html    — Leaderboard viewer page
├── howToPlay.html      — Instructions page
├── settings.html       — Audio settings page
├── style.css           — Shared styles
├── game.js             — Core game engine (physics, rendering, input)
├── audio.js            — Web Audio API sound engine (BSAudio)
├── leaderboard.js      — localStorage leaderboard system
└── replay.js           — localStorage bridge snapshot/replay system
```

---

## Technologies Used

- **HTML5 Canvas** — all game rendering (no WebGL, no libraries)
- **Vanilla JavaScript** — physics engine, game logic, UI
- **Web Audio API** — procedurally generated sound effects and music (no audio files)
- **localStorage** — persistent scores, replays, settings, and progress
- **CSS3** — animations, glassmorphism UI, responsive layout
- **Google Fonts** — Nunito, Baloo 2

---

## Physics Overview

The game uses a **Verlet integration** particle system with constraint-based beam solving:

- Nodes store current and previous position — velocity is implicit
- Each frame runs **24 constraint iterations** to resolve beam lengths
- Beams accumulate **fatigue** under stress and break when exceeded
- The vehicle applies **distributed load** across 5 sample points
- Cable beams are **tension-only** — they go slack under compression

---

## Version History

| Version | Key Changes |

| V1 | Basic canvas physics prototype |
| V2 | Materials system, budget |
| V3 | Level progression, win/fail modals |
| V4 | Audio engine, ranked mode, star ratings |
| V5 | Unique animated backgrounds per level, tutorial overhaul, classic/ranked mode split |
| **V6** | **Local leaderboard system, bridge replay system, required player name modal** |

---

## Author

Made for a university assignment.  
Built entirely with vanilla web technologies — no game engines, no frameworks.
