// ═══════════════════════════════════════════════════════════════
//  BRIDGE SIMULATOR V6 — LOCAL LEADERBOARD
//  All data stored in localStorage — no server needed
// ═══════════════════════════════════════════════════════════════

const LEADERBOARD_KEY        = 'bridgeScores';
const MAX_SCORES_PER_LEVEL   = 10;

const LEVEL_NAMES = [
  'Tutorial Gap','River Crossing','Double Span','Deep Chasm',
  'Asymmetric','Tight Budget','Mid-River Rock','Triple Chasm',
  'Steep Canyon','Grand Finale'
];

// ── READ ────────────────────────────────────────────────────────
function lbLoad() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    return raw ? JSON.parse(raw) : { scores: [] };
  } catch(e) { return { scores: [] }; }
}

// ── WRITE ───────────────────────────────────────────────────────
function lbSave(data) {
  try { localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(data)); }
  catch(e) { console.warn('Leaderboard save failed:', e); }
}

// ── ADD SCORE ───────────────────────────────────────────────────
// Called on win — adds entry, sorts, trims to top MAX per level
function lbAddScore(name, level, stars, cost, mode) {
  const data = lbLoad();

  const entry = {
    name  : (name || 'Anonymous').trim().slice(0, 20),
    level : level,
    stars : stars,
    cost  : cost,
    mode  : mode,
    date  : new Date().toISOString().split('T')[0]
  };

  data.scores.push(entry);

  // Sort: group by level, then most stars first, then lowest cost
  data.scores.sort((a, b) => {
    if (a.level !== b.level) return a.level - b.level;
    if (b.stars  !== a.stars) return b.stars  - a.stars;
    return a.cost - b.cost;
  });

  // Keep only top MAX_SCORES_PER_LEVEL per level
  const byLevel = {};
  data.scores.forEach(s => {
    if (!byLevel[s.level]) byLevel[s.level] = [];
    if (byLevel[s.level].length < MAX_SCORES_PER_LEVEL)
      byLevel[s.level].push(s);
  });
  data.scores = Object.values(byLevel).flat();

  lbSave(data);
  return entry;
}

// ── GET SCORES FOR ONE LEVEL ────────────────────────────────────
function lbGetLevel(level) {
  return lbLoad().scores
    .filter(s => s.level === level)
    .sort((a, b) => b.stars - a.stars || a.cost - b.cost);
}

// ── GET ALL SCORES grouped by level ─────────────────────────────
function lbGetAll() {
  const data = lbLoad();
  const grouped = {};
  for (let i = 0; i < 10; i++) grouped[i] = [];
  data.scores.forEach(s => { if (grouped[s.level]) grouped[s.level].push(s); });
  return grouped;
}

// ── GET RANK (1-based) ──────────────────────────────────────────
function lbGetRank(level, stars, cost) {
  let rank = 1;
  lbGetLevel(level).forEach(s => {
    if (s.stars > stars || (s.stars === stars && s.cost < cost)) rank++;
  });
  return rank;
}

// ── CLEAR ALL ───────────────────────────────────────────────────
function lbClear() { localStorage.removeItem(LEADERBOARD_KEY); }

// ── EXPORT AS TEXT ──────────────────────────────────────────────
function lbExportText() {
  const grouped = lbGetAll();
  let out = '=== BRIDGE SIMULATOR V6 — LEADERBOARD ===\n';
  out += `Exported: ${new Date().toLocaleString()}\n\n`;
  for (let i = 0; i < 10; i++) {
    const scores = grouped[i];
    if (!scores.length) continue;
    out += `--- Level ${i+1}: ${LEVEL_NAMES[i]} ---\n`;
    scores.forEach((s, idx) => {
      const stars = '★'.repeat(s.stars) + '☆'.repeat(3 - s.stars);
      out += `  ${idx+1}. ${s.name.padEnd(20)} ${stars}  $${s.cost}  [${s.mode}]  ${s.date}\n`;
    });
    out += '\n';
  }
  return out;
}
